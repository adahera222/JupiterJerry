#pragma strict

var zoom:float;
var zoomSpd:float;
var orthoMax:float;
var orthoMin:float;

function Start () {

}

function Update () {

		zoom = (camera.orthographicSize / orthoMax) * zoomSpd;
	
	if (Input.GetAxis("Mouse ScrollWheel") > 0 && camera.orthographicSize > orthoMin){
		camera.orthographicSize -= zoom;
	} else if (Input.GetAxis("Mouse ScrollWheel") < 0 && camera.orthographicSize < orthoMax){
		camera.orthographicSize += zoom;
	}
	Debug.Log(zoom);
}