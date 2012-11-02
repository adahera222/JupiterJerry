#pragma strict

var zoom:float;
var zoomActual:float;
var zoomSpd:float;
var zoomDivider:float;



function Start () {

}

function Update () {
	
	
	if (Input.GetAxis("Mouse ScrollWheel") > 0){
		zoom -= zoomSpd;
		zoomActual = -zoom;
	}
	else if (Input.GetAxis("Mouse ScrollWheel") < 0){
		zoom += zoomSpd;
		zoomActual = zoom;
	}
	else if (Input.GetAxis("Mouse ScrollWheel") == 0)
		zoomActual = 0;
		
	if (zoomActual > 0)
		camera.orthographicSize += Mathf.Pow((zoomActual/zoomDivider), 2);
	else if (zoomActual < 0)
		camera.orthographicSize -= Mathf.Pow((zoomActual/zoomDivider), 2);
}