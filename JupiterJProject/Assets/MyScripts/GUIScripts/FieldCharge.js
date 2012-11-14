#pragma strict

var fieldOnTex:Texture;
var fieldOffTex:Texture;


function Update(){

	if (AsteroidsPlayer.currentWeapon == "Aura")
		guiTexture.texture = fieldOnTex;
	else
		guiTexture.texture = fieldOffTex;

}