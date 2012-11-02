#pragma strict

var lifeTime:float;
var rotateSpd:float;
var scaleSpd:float;
var grow = true;
static var resourceNum = 0.0;
var collected = false;

function Start() {

	Destroy(gameObject, lifeTime);

}

function Update() {

	

	transform.Rotate(Vector3(0, rotateSpd * Time.deltaTime, 0));
	
	if (transform.localScale.x <= 0.6) {
		grow = true;
	}
	if (grow == true) {
		var curScale = scaleSpd * Time.deltaTime;
		transform.localScale += Vector3(curScale, curScale, curScale);
	}
	if (transform.localScale.x >= 1) {
		grow = false;
	}
	if (grow == false) {
		curScale = scaleSpd * Time.deltaTime;
		transform.localScale -= Vector3(curScale, curScale, curScale);
	}
	
	
}



