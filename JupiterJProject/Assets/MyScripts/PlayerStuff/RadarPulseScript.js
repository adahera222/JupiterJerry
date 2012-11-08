#pragma strict

private var expand=0.4;
private var expandStart:float;
var expandRate = 2.5;
var expandLimit = 14;

var exSizeCheck:Transform;
var transPos:Vector3;

var radarPingSmall:Transform;
var radarPingMedium:Transform;
var radarPingBig:Transform;
var radarPingHuge:Transform;
var radarPingGigantic:Transform;

function Awake () {
	
	exSizeCheck = transform;
	expandStart = expand;
	transPos = transform.position;
	transform.localRotation.eulerAngles.y = Random.Range(0, 359);

}

function FixedUpdate () {

	expand += expandRate * Time.deltaTime;
	exSizeCheck.localScale = Vector3(expand, expand / 2, expand);
	if (exSizeCheck.localScale.x >= expandLimit){
		Destroy(gameObject);
	}
	//if (!Input.GetButton("Fire3")){
	//	Destroy(gameObject);
	//}

}

function OnTriggerEnter (hostile:Collider){
	
	var hostileTag = hostile.tag;
	var hostileTransPos = Vector3(hostile.transform.position.x, 20, hostile.transform.position.z);
	
	if (hostileTag == "AsteroidS"){
		Instantiate(radarPingSmall, hostileTransPos, Quaternion.identity);
	}
	if (hostileTag == "AsteroidM"){
		Instantiate(radarPingMedium, hostileTransPos, Quaternion.identity);
	}
	if (hostileTag == "AsteroidB"){
		Instantiate(radarPingBig, hostileTransPos, Quaternion.identity);
	}
	if (hostileTag == "AsteroidH"){
		Instantiate(radarPingHuge, hostileTransPos, Quaternion.identity);
	}
	if (hostileTag == "AsteroidG"){
		Instantiate(radarPingGigantic, hostileTransPos, Quaternion.identity);
	}

}