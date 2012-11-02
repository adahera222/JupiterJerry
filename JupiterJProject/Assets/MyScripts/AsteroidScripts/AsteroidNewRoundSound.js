#pragma strict

var clock = 0.0;
var delay = 0.3;

function Start () {

}

function Update () {

	if (CameraScript.roundNum == 1)
		delay = 0.3;
	else
		delay = 0;
	
	if (clock < delay)
		clock += Time.deltaTime;
		
	if (clock >= delay){
		audio.Play();
		clock = 0.0;
		enabled = false;
	}

}