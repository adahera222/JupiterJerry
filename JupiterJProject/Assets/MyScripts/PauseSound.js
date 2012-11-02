#pragma strict

var tempToggle = false;

function Start () {

}

function Update () {

	if (CameraScript.pauseSound == true && audio.enabled == true){
		audio.enabled = false;
		tempToggle = true;
	} else if (CameraScript.pauseSound == false && tempToggle == true){
		audio.enabled = true;
		tempToggle = false;
	}

}