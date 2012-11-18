#pragma strict

var fuelResearve:float;
var asteroidsPlayer:AsteroidsPlayer;
var thruster1:GameObject;
var thruster2:GameObject;
var thruster3:GameObject;
var thruster4:GameObject;

var fuelMeter:GameObject;
 

function Start () {
	
	asteroidsPlayer = gameObject.GetComponent(AsteroidsPlayer);
	Menu.currentControls == "mouse";
}

function Update () {
	
	if (fuelResearve < 0)
		fuelResearve = 0;
	fuelMeter.guiText.text = "Fuel: " + fuelResearve + " seconds";

	if ((Input.GetAxis("Vertical") || (Menu.currentControls == "mouse" && Input.GetAxis("Horizontal"))) && fuelResearve > 0){
	
		fuelResearve -= Time.deltaTime;
	
	}
	
	if (fuelResearve <= 0){
		
		asteroidsPlayer.acceleration = 0;
		if (thruster1){
			Destroy(thruster1);
			Destroy(thruster2);
			Destroy(thruster3);
			Destroy(thruster4);
		}
	}

}