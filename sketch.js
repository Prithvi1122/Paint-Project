var database,canvas,mousePosition=[],dbDrawing=[];
function setup(){
	canvas=createCanvas(1000,1000)
	canvas.parent('canvascontainer');
	database=firebase.database();
	
	background(51)

	//var clear=createButton("Clear Drawing")
	//clear.position(100,950)
	
	var clearbutton = select('#clearbutton')
	clearbutton.mousePressed(clearDrawing);
}
function mouseDragged(){
	var point={x:mouseX,y:mouseY};
	mousePosition.push(point);

	var drawingReference=database.ref('drawing');
	drawingReference.set({
		"d":mousePosition
	})
}
function draw(){
	readData();
	beginShape();
	stroke("white")
	strokeWeight(3)
	noFill();
	for(var i=0;i<dbDrawing.length;i++){
		vertex(dbDrawing[i].x,dbDrawing[i].y);
		endShape();
	}
	
}

function readData(){
	database.ref('drawing/').on('value',(data)=>{
		dbDrawing=data.val().d
	})
}
function clearDrawing(){
	db_drawing = []
	var drawRef = database.ref('drawing');
    drawRef.remove()
}
