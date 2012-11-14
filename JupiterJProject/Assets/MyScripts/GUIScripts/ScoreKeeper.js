#pragma strict

static var score = 0.0;


function Start(){

	score = 0;

}

function OnGUI () {

	if (RestartCheck.enableRestart == false){
	
		guiText.text = score.ToString();
	}
}

