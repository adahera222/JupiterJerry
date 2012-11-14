#pragma strict

var onTex:Texture;
var offTex:Texture;
var giveRadar:GiveRadar;

function Update () {

	if (Application.loadedLevelName == "DarkLevel"){
		if (giveRadar.radarActive == false)
			guiTexture.texture = onTex;
		if (giveRadar.radarActive == true)
			guiTexture.texture = offTex;
	}
}