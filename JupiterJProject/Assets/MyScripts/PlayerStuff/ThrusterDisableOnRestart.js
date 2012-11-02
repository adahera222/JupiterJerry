#pragma strict

function Update () {

	if (RestartCheck.enableRestart == true){
		particleSystem.enableEmission = false;
		audio.enabled = false;
	}

}