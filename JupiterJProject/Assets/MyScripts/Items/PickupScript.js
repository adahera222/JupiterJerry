#pragma strict

var lifeTime:float;
var rotateSpd:float;
var scaleSpd:float;
var grow = true;
var collected = false;
var itemType:String;
var weaponType:String;
var isChild = false;
var darkLevGlow:Transform;

function Start() {

	if (isChild == false && Application.loadedLevelName == "DarkLevel"){
		var pickupGlow = Instantiate(darkLevGlow, transform.position, Quaternion.identity);
		pickupGlow.GetComponent(PickupGlowScript).followPickup = transform; 
	}
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





