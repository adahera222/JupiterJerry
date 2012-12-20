#pragma strict

var numberOfClips = 3;
var soundClips = new AudioClip[numberOfClips];
var soundClipVolume:float;
var alreadyPlayed:AudioClip;

var clock:float;
var playClipAt:float;
var playClipNum = 0;

var starter = true;

function Start(){
	playClipAt = Random.Range(8.0, 12.0);
}

function Update () {

	Debug.Log(clock);
	if (starter == true){
		clock = 0.0;
		for(var i = numberOfClips - 1; i > 0; i--){
			var r = Random.Range(0, numberOfClips);
			var tmp = soundClips[i];
			soundClips[i] = soundClips[r];
			soundClips[r] = tmp;
		}
		playClipNum = 0;
		starter = false;
	}

	clock += Time.deltaTime;
	if (clock > playClipAt){
		if (playClipNum == 0 && alreadyPlayed == soundClips[playClipNum])
			playClipNum++;
		AudioSource.PlayClipAtPoint(soundClips[playClipNum], transform.position, soundClipVolume);
		if (playClipNum == numberOfClips - 1){
			alreadyPlayed = soundClips[playClipNum];
			starter = true;
		} else
			playClipNum++;
		clock = 0.0;
		playClipAt = Random.Range(18.0, 28.0);
		
	}
	
}