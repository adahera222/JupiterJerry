#pragma strict

private var expand=0.4;
private var expandStart:float;
var exSizeCheck:Transform;
var expandRate = 2.5;
var expandLimit = 14.0;
var glowMaterial:Material;
var glowShockSound:AudioClip;
var glowShockVol:float;

function Awake () {

	AudioSource.PlayClipAtPoint(glowShockSound, transform.position, glowShockVol);
	expandStart = expand;
	exSizeCheck = transform;
	transform.localRotation.eulerAngles.y = Random.Range(0, 359);

}

function FixedUpdate () {

	expand += expandRate * Time.deltaTime;
	exSizeCheck.localScale = Vector3(expand, expand / 2, expand);
	if (exSizeCheck.localScale.x >= expandLimit){
		Destroy(gameObject);
	}

}

function OnTriggerEnter (hostile:Collider){
	
	var hostileTag = hostile.tag;
	if (hostileTag.Length == 9 && hostileTag.Substring(0,8) == "Asteroid") {
		if (Application.loadedLevelName == "DarkLevel"){
			hostile.light.enabled = true;
			hostile.renderer.material = glowMaterial;
		}
	}
}