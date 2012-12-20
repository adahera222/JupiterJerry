#pragma strict

var lifeTime:float;
var rotateSpd:float;
var scaleSpd:float;
var grow = true;
var collected = false;
var itemType:String;
var weaponType:String;
var isChild = false;

function Start() {

	Destroy(gameObject, lifeTime);

}

function Update() {	

	transform.Rotate(Vector3(0, rotateSpd * Time.deltaTime, 0));
	
	if (transform.localScale.x <= 0.8) {
		grow = true;
	}
	if (grow == true) {
		var curScale = scaleSpd * Time.deltaTime;
		transform.localScale += Vector3(curScale, 0, curScale);
	}
	if (transform.localScale.x >= 1.3) {
		grow = false;
	}
	if (grow == false) {
		curScale = scaleSpd * Time.deltaTime;
		transform.localScale -= Vector3(curScale, 0, curScale);
	}
	
	
}





