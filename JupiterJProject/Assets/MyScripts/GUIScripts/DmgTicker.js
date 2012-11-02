#pragma strict

var player:AsteroidsPlayer;

function Start (){


	player = GameObject.Find("PlayerShip").GetComponent(AsteroidsPlayer);

}


function OnGUI () {

	guiText.text = "Structural Integrity: " + (Mathf.Round((player.playerHealth / player.playerHealthMax) * 100)) + " / 100%";

}