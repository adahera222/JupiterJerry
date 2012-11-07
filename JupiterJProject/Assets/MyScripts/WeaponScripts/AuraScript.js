#pragma strict

var dmg:float;
var repell:float;
var asteroidBehave:AsteroidBehaviour;
var player:Transform;
var fireAura:FireAura;
var curScale:float;
var defaultScale:float;
var rez2ScaleBooster:float;

function Start () {
	player = GameObject.Find("PlayerShip").transform;
	fireAura = player.GetComponent(FireAura);
}

function Update () {
	transform.position = player.position;
	fireAura.charge -= Time.deltaTime;
	if (fireAura.charge <= 0.0 || !Input.GetButton("Fire1") || AsteroidsPlayer.currentWeapon != "Aura")
		Destroy(gameObject);
	curScale = defaultScale + ((Resource2Script.resource2Num - 4) * rez2ScaleBooster);
	transform.localScale = Vector3(curScale, curScale, curScale);
}

function OnTriggerStay (hostile:Collider) {

	var hostileTag = hostile.tag;
    if (hostileTag.Length > 8 && hostileTag.Substring(0,8) == "Asteroid" && hostileTag != "AsteroidG" && hostileTag != "AsteroidH") {
    	asteroidBehave = hostile.GetComponent(AsteroidBehaviour);
    	asteroidBehave.curHP -= dmg * Time.deltaTime;
    	asteroidBehave.HPCheck("bullet");
    	Debug.Log(asteroidBehave.curHP);
    }
    if (hostileTag == "AsteroidG" || hostileTag == "AsteroidH") {
    	var heading = hostile.transform.position - transform.position;
    	var force = repell * Time.deltaTime;
    	hostile.rigidbody.AddForce(heading * force);
    }
}