#pragma strict

var small = true;
var big = false;
var scaleRate = 100.0;
var ready = false;
var defaultScale:float;
var gigMassBoost:float;
var defaultMass:float;

function Start () {
	
	defaultScale = transform.localScale.x;
	defaultMass = rigidbody.mass;

}

function FixedUpdate () {

	
	if (big == true){
		
		ready = false;
			if (transform.localScale.x < (defaultScale - 0.01)){
				if (gameObject.tag == "AsteroidG")
					rigidbody.mass = gigMassBoost;
				transform.localScale.x += (defaultScale - transform.localScale.x) * scaleRate * Time.deltaTime;
				transform.localScale.y += (defaultScale - transform.localScale.y) * scaleRate * Time.deltaTime;
				transform.localScale.z += (defaultScale - transform.localScale.z) * scaleRate * Time.deltaTime;
			}
	
	}
	if (small == true){
	
		if (transform.localScale.x > 0.01){
			transform.localScale.x -= (transform.localScale.x - 0.005) * scaleRate * Time.deltaTime;
			transform.localScale.y -= (transform.localScale.y - 0.005) * scaleRate * Time.deltaTime;
			transform.localScale.z -= (transform.localScale.z - 0.005) * scaleRate * Time.deltaTime;
		}else {
			ready = true;
			small = false;
			big = true;
		}
	}
	
	if (transform.localScale.x >= (defaultScale - 0.01) && big == true){
				rigidbody.mass = defaultMass;
				transform.localScale = Vector3(defaultScale, defaultScale, defaultScale);
				big = false;
				small = true;
				ready = false;
				enabled = false;
	}

}