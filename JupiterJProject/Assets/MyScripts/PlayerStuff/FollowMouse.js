#pragma strict

var pos:Vector3;
var cam:Camera;
var camHeight:float;


function Update () {

	camHeight = cam.transform.position.y;
			
	pos = cam.camera.ScreenToWorldPoint(Vector3(Input.mousePosition.x,Input.mousePosition.y, camHeight - 3));
	transform.position = pos;
	
}