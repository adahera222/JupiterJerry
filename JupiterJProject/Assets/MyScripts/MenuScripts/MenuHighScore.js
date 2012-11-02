#pragma strict

static var highScore:float;

function Start () {

}

function OnGUI(){

	guiText.text = "Current High Score: " + highScore;

}