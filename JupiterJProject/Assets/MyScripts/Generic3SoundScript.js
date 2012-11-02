#pragma strict

var sound = new AudioClip[3];
var soundVolume = new float[3];

function Start () {

	var audioSelection = Random.Range(0, 3);
		AudioSource.PlayClipAtPoint(sound[audioSelection], transform.position, soundVolume[audioSelection]);

}
