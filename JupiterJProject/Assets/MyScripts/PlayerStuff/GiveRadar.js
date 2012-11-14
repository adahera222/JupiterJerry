#pragma strict

var radarPulsePrefab:Transform;
var radarActive = false;
var errorSound:AudioSource;
var radar:Transform;


function Update () {
	
	if (Input.GetButtonDown("Fire3") && radarActive == false){
		radar = Instantiate(radarPulsePrefab, transform.position, Quaternion.identity);		
	} else if (Input.GetButtonDown("Fire3") && radarActive == true)
		errorSound.audio.Play();
	if (radar){
		radarActive = true;
	} else {
		radarActive = false;
	}
}