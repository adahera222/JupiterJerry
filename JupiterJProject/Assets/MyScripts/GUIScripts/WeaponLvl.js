#pragma strict

var level:int;
var levelOn:Texture;
var levelOff:Texture;

function Update () {

	if (Resource2Script.resource2Num >= level)
		guiTexture.texture = levelOn;
	else
		guiTexture.texture = levelOff;

}