#pragma strict

private var expand=0.4;
var expandRate = 2.5;
var expandLimit = 14;

var explosionPrefabS : Transform;
var explosionPrefabM : Transform;
var explosionPrefabB : Transform;
var explosionPrefabH : Transform;
var explosionPrefabG : Transform;

var exSizeCheck:Transform;

function Awake () {
	
	exSizeCheck = transform;
	RestartCheck.enableRestart = true;
	RestartCheck.crash = false;
	

}

function FixedUpdate () {

	expand += expandRate * Time.deltaTime;
	exSizeCheck.localScale = Vector3(expand, expand, expand);
	if (exSizeCheck.localScale.x >= expandLimit){
		Destroy(gameObject);
		CameraScript.asteroidsClear = true;
	}

}

function OnTriggerEnter(hostile:Collider){
	
	var hostileTag = hostile.tag;
	if (hostileTag.Length > 8 && hostileTag.Substring(0,8) == "Asteroid") {
		if (hostileTag == "AsteroidG"){
    		Instantiate(explosionPrefabG, hostile.transform.position, Quaternion.identity);
    	}
    	if (hostileTag == "AsteroidH"){
    		Instantiate(explosionPrefabH, hostile.transform.position, Quaternion.identity);
    	}
    	if (hostileTag == "AsteroidB"){
    		Instantiate(explosionPrefabB, hostile.transform.position, Quaternion.identity);
    	}
    	if (hostileTag.Substring(0,9) == "AsteroidM"){
    		Instantiate(explosionPrefabM, hostile.transform.position, Quaternion.identity);
    	}
    	if (hostileTag.Substring(0,9) == "AsteroidS"){
    		Instantiate(explosionPrefabS, hostile.transform.position, Quaternion.identity);
    	}
    	Destroy(hostile.gameObject);
    	
	}
	if (hostileTag == "PlayerShield"){
		var shieldScript = hostile.GetComponent(PlayerShieldScript);
		shieldScript.shieldHealth -= 100;
	}
}