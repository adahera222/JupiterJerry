#pragma strict

var ready = false;
var player:Transform;
var playerGrab:TractorBeamGrabPlayer;
var tractorEffect:Transform;
var tractorBeam = new Transform[4];
var tractorOrigin = new Transform[4];
var tractorSpd:float;
var beam = true;
var clock = 0.0;
var clockGo = false;
var pickupMessagePrefab:Transform;
var message1 = false;
var colorMessage1:Color;
var message2 = false;
var colorMessage2:Color;

function Awake () {

	playerGrab = player.GetComponent(TractorBeamGrabPlayer);

}

function Update () {

	if (clockGo == true){
		clock += Time.deltaTime;
	}
	if (beam == true){
			for (var i=0; i < 4; i++){
				tractorBeam[i] = Instantiate(tractorEffect, transform.position, Quaternion.identity);
				tractorBeam[i].GetComponent(TractorBeamEffectAlien).alienTractor = tractorOrigin[i];
			}
		beam = false;
	}
	if (player.transform.position != Vector3(0,3,0)){
		
		playerGrab.enabled = true;
		var distance = player.transform.position - Vector3(0, 3, 0);
		if (distance.magnitude < 0.01){
			player.transform.position = new Vector3(0,3,0);
		}
	} else {
		playerGrab.enabled = false;
		clockGo = true;
		if (message1 == false && clock > 0.75){
		
		var pickupMessage1 = Instantiate(pickupMessagePrefab, Vector3(0.5,0.52,0), Quaternion.identity);
			pickupMessage1.guiText.material.color = colorMessage1;
			pickupMessage1.guiText.text = "Weapon Downgraded";
			pickupMessage1.guiText.fontSize = 9;
			pickupMessage1.GetComponent(PickupMessageScript).alphaInterval = 0.75;
			message1 = true;
			Resource2Script.resource2Num = player.GetComponent(FirePulseLaser).startMin2;
		}
		if (message2 == false && clock > 2.0){
		
		var pickupMessage2 = Instantiate(pickupMessagePrefab, Vector3(0.5,0.52,0), Quaternion.identity);
			pickupMessage2.guiText.material.color = colorMessage2;
			pickupMessage2.guiText.text = "Bombs Depleted";
			pickupMessage2.guiText.fontSize = 9;
			pickupMessage2.GetComponent(PickupMessageScript).alphaInterval = 0.75;
			message2 = true;
			player.GetComponent(FireBomb).bombAmmo = 0;
			player.GetComponent(FireBomb).canFire = false;
		}
		if (clock > 3.5){
			ready = true;
		}
		
			
	}
}