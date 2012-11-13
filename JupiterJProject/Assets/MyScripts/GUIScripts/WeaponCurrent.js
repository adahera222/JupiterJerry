#pragma strict

var guiWeaponTexAura:Texture;
var guiWeaponTexBeam:Texture;
var guiWeaponTexDouble:Texture;
var guiWeaponTexMini:Texture;
var guiWeaponTexSingle:Texture;
var guiWeaponTexTriple:Texture;
var guiWeaponTexWave:Texture;

function Update () {

	if (AsteroidsPlayer.currentWeapon == "SinglePulse")
		guiTexture.texture = guiWeaponTexSingle;
	if (AsteroidsPlayer.currentWeapon == "DoublePulse")
		guiTexture.texture = guiWeaponTexDouble;
	if (AsteroidsPlayer.currentWeapon == "TriplePulse")
		guiTexture.texture = guiWeaponTexTriple;
	if (AsteroidsPlayer.currentWeapon == "Aura")
		guiTexture.texture = guiWeaponTexAura;
	if (AsteroidsPlayer.currentWeapon == "MiniBomb")
		guiTexture.texture = guiWeaponTexMini;
	if (AsteroidsPlayer.currentWeapon == "BeamLaser")
		guiTexture.texture = guiWeaponTexBeam;
	if (AsteroidsPlayer.currentWeapon == "Waveform")
		guiTexture.texture = guiWeaponTexWave;
}