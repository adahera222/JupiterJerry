#pragma strict

var onTex:Texture;
var offTex:Texture;
var fireBomb:FireBomb;

function Update () {

	if (fireBomb.canFire == false)
		guiTexture.texture = offTex;
	if (fireBomb.canFire == true)
		guiTexture.texture = onTex;

}