#pragma strict

var radarPulsePrefab:Transform;
var radarActive = false;
var errorSound:AudioSource;
var radar:Transform;
var guiRadar:GUIText;

function Update () {
	
	if (Input.GetButtonDown("Fire3") && radarActive == false){
		radar = Instantiate(radarPulsePrefab, transform.position, Quaternion.identity);		
	} else if (Input.GetButtonDown("Fire3") && radarActive == true)
		errorSound.audio.Play();
	if (radar){
		radarActive = true;
		guiRadar.guiText.text = "Radar: Active";
	} else {
		radarActive = false;
		guiRadar.guiText.text = "Radar: Ready";
	}
}