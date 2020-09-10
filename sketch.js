var database,canvas,mousePosition=[],dbDrawing=[],currentPath=[];
function setup(){
	canvas=createCanvas(1000,1000)
	canvas.mousePressed(startPath);
	canvas.parent('canvascontainer');
	database=firebase.database();
	
	background(51)

	var clearbutton = select('#clearbutton')
	clearbutton.mousePressed(clearDrawing);
}
function startPath(){
	currentPath=[],
	mousePosition.push(currentPath)
}
function mouseDragged(){
	var point={
		x:mouseX,
		y:mouseY
	};
	currentPath.push(point);

	var drawingReference=database.ref('drawing');
	drawingReference.set({
		"d":mousePosition
	})
}
function draw(){
	readData();
	
	stroke("white")
	strokeWeight(3)
	noFill();
	for(var i=0;i<dbDrawing.length;i++){
		var path=dbDrawing[i]
		beginShape();
		for(var j=0;j<path.length;j++){
			vertex(path[j].x,path[j].y);
		}
		endShape();
	}
	
}

function readData(){
	database.ref('drawing/').on('value',(data)=>{
		dbDrawing=data.val().d
	})
}
function clearDrawing(){
	dbdrawing = []
	var drawRef = database.ref('drawing');
    drawRef.remove()
}