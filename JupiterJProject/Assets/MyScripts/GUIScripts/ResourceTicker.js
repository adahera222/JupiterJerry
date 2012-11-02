#pragma strict

var clearLevel:ClearLevel;

function Start(){

	Resource1Script.resourceNum = 0;

}

function OnGUI() {

	guiText.text = "Minerals Collected: " + Resource1Script.resourceNum;
	

}