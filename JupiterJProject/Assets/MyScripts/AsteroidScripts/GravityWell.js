#pragma strict

var mass:float;

function Awake(){
	AsteroidSpawn.gravityWellActive = true;
}
function OnTriggerStay (object:Collider){
	
	var obTag = object.tag;
	if ((obTag.Length == 9 && obTag.Substring(0,8) == "Asteroid") || 
		(obTag.Length == 12 && obTag.Substring(0,8) == "Asteroid" && obTag.Substring(10,2) == "Ex") ||
		obTag == "Player" || obTag == "bomb"){
		var heading = transform.position - object.transform.position;
		object.rigidbody.AddForce (heading * ((mass * object.rigidbody.mass)/heading.sqrMagnitude));
	}

}

function OnDestroy(){
	AsteroidSpawn.gravityWellActive = false;
}