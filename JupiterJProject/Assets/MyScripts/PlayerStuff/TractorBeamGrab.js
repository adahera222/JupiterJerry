#pragma strict

var tractorBeam:Transform;
var tractorSpd:float;
var alienTractorNE:Transform;
var alienTractorNW:Transform;
var alienTractorSW:Transform;
var alienTractorSE:Transform;

function Start() {

	if (gameObject.tag.Substring(0,6) == "Pickup")
		tractorBeam = GameObject.Find("TractorBeam").transform;

}

function Update () {


	if (transform.IsChildOf(tractorBeam) && gameObject.tag.Substring(0,6) == "Pickup") {
		transform.Translate((transform.localPosition.x * tractorSpd * Time.deltaTime * -1),0,(transform.localPosition.z * tractorSpd * Time.deltaTime * -1), tractorBeam.transform);
		transform.localPosition.y = 0;
	}
	if (gameObject.tag == "Debuff"){
	
		var x = 1;
	
	}
}