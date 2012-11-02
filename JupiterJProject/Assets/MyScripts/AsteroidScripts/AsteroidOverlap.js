#pragma strict

var t = 0.0;
var asterBehave:AsteroidBehaviour;
var objectBehave:AsteroidBehaviour;

function Start () {

	asterBehave = transform.GetComponent(AsteroidBehaviour);

}

function Update(){

}



function OnTriggerEnter(object:Collider){

	var objectTag = object.tag;
	if (objectTag.Length > 8 && objectTag.Substring(0,8) == "Asteroid"){
		
		objectBehave = object.GetComponent(AsteroidBehaviour);
		if (objectBehave.radius < asterBehave.radius){
			objectBehave.spawn = false;
			objectBehave.curHP = 0;
		} else if (objectBehave.radius == asterBehave.radius){
			objectBehave.spawn = false;
			objectBehave.curHP = 0;
		} else if (objectBehave.radius > asterBehave.radius){
			asterBehave.spawn = false;
			asterBehave.curHP = 0;
		} //else if (objectTag == "AsteroidG" && gameObject.tag == "AsteroidG"){
			//objectBehave.curHP = 0;
		//}
		
	}
}

function LateUpdate(){



	if (transform.collider.isTrigger == true){
	
		t += Time.deltaTime;
		if (t >= 0.25){
			transform.collider.isTrigger = false;
			t = 0.0;
			enabled = false;
		}
	
	}
}