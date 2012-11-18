#pragma strict

var menuCamera:Menu;
var enableOn:String;

function Update () {

	if (menuCamera.currentScreen == enableOn)
		guiTexture.enabled = true;
	else
		guiTexture.enabled = false;
}