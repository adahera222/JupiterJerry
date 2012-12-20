#pragma strict

static var mainIntroPlayed = false;
var mainTheme:Transform;

function Start () {

	if (mainIntroPlayed == false){
		mainTheme.audio.Play(44100 * 3);
		audio.Play();
		mainIntroPlayed = true;
	
	}
	if (mainIntroPlayed == true && !audio.isPlaying && !mainTheme.audio.isPlaying)
		mainTheme.audio.Play();
}

