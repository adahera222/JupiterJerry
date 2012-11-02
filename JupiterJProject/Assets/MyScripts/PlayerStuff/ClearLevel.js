#pragma strict

var clearBombPrefab:Transform;
var clearSounds = new AudioClip[5];
var clearVolume:float;
var playSoundSequence = false;
var alreadyPlayed:AudioClip;
var mineralGoal:float;
//var nukeEnabled = true;
var nukeSpd:float;

var asterSpawn:AsteroidSpawn;
var clearNow = false;

function Start(){

	asterSpawn = GameObject.Find("AsteroidSpawn").GetComponent(AsteroidSpawn);

}

function Update () {

//	if (Input.GetButtonUp("WMD") && Resource1Script.resourceNum >= mineralGoal){
	if (clearNow == true && Resource1Script.resourceNum >= mineralGoal){

		Resource1Script.resourceNum -= mineralGoal;
		
		//Old launch nuke mechanic
		//var nuke = Instantiate(clearBombPrefab, GameObject.Find("bulletSpawn").transform.position, transform.rotation);
		//nuke.transform.eulerAngles.x = 90;
		
		//nuke.rigidbody.velocity = rigidbody.velocity;
		//nuke.rigidbody.angularVelocity = rigidbody.angularVelocity;
		
		//nuke.rigidbody.AddForce(transform.forward * nukeSpd);
		
		//nukeEnabled = false;
		
		asterSpawn.destroyAsteroids = true;
		clearNow = false;
		playSoundSequence = true;
	}
	
	if (playSoundSequence == true){
		
		AudioSource.PlayClipAtPoint(clearSounds[0], transform.position, clearVolume);
		var audioSelect = Random.Range(1,4);
		AudioSource.PlayClipAtPoint(clearSounds[audioSelect], transform.position, clearVolume);
		alreadyPlayed = clearSounds[audioSelect];
		while (clearSounds[audioSelect] == alreadyPlayed)
			audioSelect = Random.Range(1,4);
		AudioSource.PlayClipAtPoint(clearSounds[audioSelect], transform.position, clearVolume);
		playSoundSequence = false;
		
	}

}