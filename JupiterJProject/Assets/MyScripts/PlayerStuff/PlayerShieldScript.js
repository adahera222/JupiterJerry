#pragma strict

var player:GameObject;
var playerScript:AsteroidsPlayer;
var asteroidHurtCheck:AsteroidShockwave;
var shieldHealth:float;
var dmgMultiplier:float;
var shieldHealthMax:float;
var fizzlePrefab:Transform;
var playerCol:GameObject;
var shieldRender:Transform;

var shieldUp:ShieldUp;
var asteroidSpawn:AsteroidSpawn;

function Start () {

	player = GameObject.Find("PlayerShip");
	playerScript = player.GetComponent(AsteroidsPlayer);
	playerScript.shieldScript = gameObject.GetComponent(PlayerShieldScript);
	transform.position = player.transform.position;
	transform.parent = player.transform;
	shieldUp = player.GetComponent(ShieldUp);
	playerCol = GameObject.Find("PlayerCollider");
	asteroidSpawn = GameObject.Find("AsteroidSpawn").GetComponent(AsteroidSpawn);
	shieldRender = GameObject.Find("ShieldRender").transform;

	shieldHealth = playerScript.playerHealthMax;
	shieldHealthMax = playerScript.playerHealthMax;

}

function Update () {
	
	shieldRender.renderer.material.color.a = ((shieldHealth / shieldHealthMax) * 0.95) + 0.05;
	
	transform.localRotation = Quaternion.identity;
	
	if (transform.localPosition != Vector3(0,0,0))
		transform.localPosition = Vector3(0,0,0);
	if (shieldHealth <= 0) {
			shieldHealth = 0;
    		Destroy(gameObject);
    		Instantiate(fizzlePrefab, transform.position, Quaternion.identity);
    		shieldUp.shieldUpChk = false;
    		playerCol.collider.enabled = true;
    }

}

//function OnTriggerEnter(hostile:Collider){

//	var hostileTag = hostile.tag;
//	
//	if (hostileTag.Length >= 8 && hostileTag.Substring(0,8) == "Asteroid"){
//		
//		if (hostileTag.Length > 9 && hostileTag.Substring(0,10) == "AsteroidSh") {
//			asteroidHurtCheck = hostile.gameObject.GetComponent(AsteroidShockwave);
//    	}
//    	if (hostileTag == "AsteroidG"){
//    		shieldDmg += (playerScript.asteroidDmgG + asteroidSpawn.threatBeyondMaxLev) * dmgMultiplier;
//    	}
//    	if (hostileTag == "AsteroidH"){
//    		shieldDmg += (playerScript.asteroidDmgH + asteroidSpawn.threatBeyondMaxLev) * dmgMultiplier;
//    	}
//    	if (hostileTag == "AsteroidB"){
//    		shieldDmg += (playerScript.asteroidDmgB + asteroidSpawn.threatBeyondMaxLev) * dmgMultiplier;
//    	}
//    	if (hostileTag == "AsteroidM"){
//    		shieldDmg += (playerScript.asteroidDmgM + asteroidSpawn.threatBeyondMaxLev) * dmgMultiplier;
//    	}
//    	if (hostileTag == "AsteroidS"){
//    		shieldDmg += (playerScript.asteroidDmgS + asteroidSpawn.threatBeyondMaxLev) * dmgMultiplier;
//    	}
//    	if (hostileTag == "AsteroidShock_s" && asteroidHurtCheck.hurtPlayer == true){
//    		shieldDmg += (playerScript.asteroidDmgS_sw + asteroidSpawn.threatBeyondMaxLev);
//    		asteroidHurtCheck.hurtPlayer = false;
//    	}
//    		
//    	if (hostileTag == "AsteroidShock_m" && asteroidHurtCheck.hurtPlayer == true){
//    		shieldDmg += (playerScript.asteroidDmgM_sw + asteroidSpawn.threatBeyondMaxLev);
//    		asteroidHurtCheck.hurtPlayer = false;
//    	}
//	}
//}