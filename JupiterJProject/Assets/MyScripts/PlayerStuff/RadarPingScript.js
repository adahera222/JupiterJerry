#pragma strict

private var expand=0.4;
private var expandStart:float;
var expandRate = 2.5;
var expandLimit = 14;

var exSizeCheck:Transform;

function Awake () {
	
	exSizeCheck = transform;
	expandStart = expand;
	transform.localRotation.eulerAngles.y = Random.Range(0, 359);

}

function FixedUpdate () {

	expand += expandRate * Time.deltaTime;
	exSizeCheck.localScale = Vector3(expand, expand / 2, expand);
	//if (exSizeCheck.localScale.x >= expandLimit || !Input.GetButton("Fire3")){
	if (exSizeCheck.localScale.x >= expandLimit){
			Destroy(gameObject);
	}

}

