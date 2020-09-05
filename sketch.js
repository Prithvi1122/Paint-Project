var database,mousePosition=[],dbDrawing=[];
function setup(){
	database=firebase.database();
	createCanvas(1000,1000)
	background(255)
}

function draw(){
	readData();
	beginShape();
	stroke("black")
	strokeWeight(3)
	noFill();
	for(var i=0;i<dbDrawing.length;i++){
		vertex(dbDrawing[i].x,dbDrawing[i].y);
		endShape();
	}
	
}
function mouseDragged(){
	var point={x:mouseX,y:mouseY};
	mousePosition.push(point);

	var drawingReference=database.ref('drawing');
	drawingReference.set({d:mousePosition})
}
function readData(){
	database.ref('drawing/').on('value',(data)=>{
		dbDrawing=data.val().d
	})
}
