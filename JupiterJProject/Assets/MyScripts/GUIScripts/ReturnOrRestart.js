#pragma strict

var audioPlayed = false;
var returnOrRestart:String;

function Update () {

	if (audioPlayed == false){
		audio.Play();
		audioPlayed = true;
	}
	if (audio.isPlaying == false && returnOrRestart == "return")
		Application.LoadLevel("MainMenu");
	if (audio.isPlaying == false && returnOrRestart == "restart")
		Application.LoadLevel(Application.loadedLevelName);

}