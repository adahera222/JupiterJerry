#pragma strict

var weaponCheat = "/";
var addScore = ".";
var addMin2 = ",";
var changeToWeapon:String;

function Update () {

	if (Input.GetKeyDown(weaponCheat))
		AsteroidsPlayer.currentWeapon = changeToWeapon;
		
	if (Input.GetKey(addScore))
		ScoreKeeper.score += 10;
		
	if (Input.GetKeyDown(addMin2))
		Resource2Script.resource2Num++;

}