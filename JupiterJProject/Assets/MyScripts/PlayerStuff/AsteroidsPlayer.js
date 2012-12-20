#pragma strict

var acceleration = 3.0;
var thrust:float;
var latThrust:float;
var rotateSpeed=3.0;
private var rotStop = 1.0;
static var currentWeapon = "SinglePulse";
static var damaged = false;
var playerHealth:float;
var playerHealthMax:float;
var playerHealth1percent:float;
var playerDmgDealt:float;
var playerHeal = true;
var playerHealAmt:float;
var playerHealGoal:float;
var playerHealGoalMax:float;
		
		var hullTapSound = new AudioClip[3];
		var hullTapVolume:float;

		var hullCrunchSound = new AudioClip[3];
		var hullCrunchVolume:float;
		var asterImpact2Threshold:float;

		var hullCrackSound = new AudioClip[3];
		var hullCrackVolume:float;
		var asterImpact3Threshold:float;
		
		var shieldImpactSound = new AudioClip[3];
		var shieldImpactVolume:float;
		var shieldImpactVolumeMin:float;
		var shieldImpactVolumeMax:float;
	
		var shieldCrack:AudioClip;
		var shieldCrackVolume:float;

var rotFollowObj:Transform;
var explosionPrefab:Transform;
var explosionSound:AudioClip;
var explosionVolume:float;
var thrustersPrefabF:Transform;
var thrustersPrefabB:Transform;
var thrustersPrefabL:Transform;
var thrustersPrefabR:Transform;
var pickupMessagePrefab:GameObject;

var colorMineral1:Color;
var colorMineral2:Color;
var dmgMessageColor:Color;

var impactDmgDivider:float;
var extraLevelsDmg:float;

var asteroidHurtCheck:AsteroidShockwave;
var asteroidSpawn:AsteroidSpawn;
var shieldScript:PlayerShieldScript;
var shieldUpScript:ShieldUp;
var fireBomb:FireBomb;
var megaBombShockPrefab:Transform;
var glowBombShockPrefab:Transform;
var shipGlowLight:Transform;
var flarePrefab:Transform;
var explodePrefabH:Transform;
var megaBombShockSound:AudioClip;
var megaBombShockVolume:float;
var start = false;
var startClock = 0.0;
var alphaInterval:float;

function Start(){

	transform.renderer.material.color.a = 0.0;
	currentWeapon = "SinglePulse";
	asteroidSpawn = GameObject.Find("AsteroidSpawn").GetComponent(AsteroidSpawn);
	playerHealAmt = playerHealthMax * 0.15;
	playerHealth1percent = playerHealth * 0.01;
	asterImpact2Threshold *= playerHealthMax;
	asterImpact3Threshold *= playerHealthMax;
	fireBomb = gameObject.GetComponent(FireBomb);
	damaged = false;
}



function FixedUpdate(){
	
// Increases rotation slowdown when keyboard controls are active and player releases the rotate key
	if (Input.GetAxisRaw("Horizontal") == 1 || Input.GetAxisRaw("Horizontal") == -1 || Input.GetAxis("JoyHorizontal")){ 
			rotStop = 1.0;
		} else {
			rotStop = 0;
	}
	
}

function Update () {
// Initial fade in of player ship
	if (startClock < 0.75)
		startClock += Time.deltaTime;
	if (start == false && startClock > 0.75)
		transform.renderer.material.color.a += alphaInterval * Time.deltaTime;
	if (transform.renderer.material.color.a >= 1 && start == false){
		if (Application.loadedLevelName == "DarkLevel")
			GetComponent(GiveRadar).enabled = true;
		GetComponent(FirePulseLaser).enabled = true;
		start = true;
	}
	
	if (playerHealth < playerHealthMax)
		damaged = true;
	else
		damaged = false;
		
// Determines how much extra damage per point of threatBeyondMaxLev
	extraLevelsDmg = asteroidSpawn.threatBeyondMaxLev * playerHealth1percent;
	
	if (start == true){
		// Controls scripting
		if (Menu.currentControls == "keyLeft" || Menu.currentControls == "keyRight"){
			if (Input.GetAxis("Horizontal")){
				var input = Input.GetAxis("Horizontal");
			} else if(Input.GetAxis("JoyHorizontal")){
				input = Input.GetAxis("JoyHorizontal");
			}
			transform.Rotate(0, input * rotateSpeed * rotStop * Time.deltaTime, 0);
		}
		if (Menu.currentControls == "mouse"){
			transform.LookAt(rotFollowObj); // Mouse look
			
			if (Input.GetAxis("Horizontal") != 0) {
		
				var latThrustInput = Input.GetAxis("Horizontal");
				latThrust = acceleration * latThrustInput;
				rigidbody.AddForce(transform.right * latThrust * Time.deltaTime);
				if (latThrustInput > 0){
					thrustersPrefabL.particleSystem.enableEmission = true;
					thrustersPrefabL.audio.enabled = true;
				}
				else if (latThrustInput < 0){
					thrustersPrefabR.particleSystem.enableEmission = true;
					thrustersPrefabR.audio.enabled = true;
				}
			}
		}
		if (Input.GetAxis("Vertical") != 0){
		
			var thrustInput = Input.GetAxis("Vertical");
			
			//Applies sampled input to the rate at which you want the ship to accelerate
			thrust = acceleration * thrustInput;
		
			//Applies thrust force to ship
			rigidbody.AddForce(transform.forward * thrust * Time.deltaTime);
			if (thrustInput > 0){
				thrustersPrefabB.particleSystem.enableEmission = true;
				thrustersPrefabB.audio.enabled = true;
			}
			else if (thrustInput < 0){
				thrustersPrefabF.particleSystem.enableEmission = true;
				thrustersPrefabF.audio.enabled = true;
			}
			
		}
	// Makes sure thruster particle effects turn off when there is no input
		if (!Input.GetButton("AllStop") && thrustInput <= 0){
			thrustersPrefabB.particleSystem.enableEmission = false;
			thrustersPrefabB.audio.enabled = false;
		}
		if (!Input.GetButton("AllStop") && thrustInput >= 0){
			thrustersPrefabF.particleSystem.enableEmission = false;
			thrustersPrefabF.audio.enabled = false;
		}
		if (!Input.GetButton("AllStop") && latThrustInput >= 0){
			thrustersPrefabR.particleSystem.enableEmission = false;
			thrustersPrefabR.audio.enabled = false;
		}
		if (!Input.GetButton("AllStop") && latThrustInput <= 0){
			thrustersPrefabL.particleSystem.enableEmission = false;
			thrustersPrefabL.audio.enabled = false;
		}
	// Brake button
		if (Input.GetButton("AllStop")){
			rigidbody.AddForce(rigidbody.velocity.normalized * -acceleration * Time.deltaTime);
			thrustersPrefabF.particleSystem.enableEmission = true;
			thrustersPrefabB.particleSystem.enableEmission = true;
			thrustersPrefabL.particleSystem.enableEmission = true;
			thrustersPrefabR.particleSystem.enableEmission = true;
			thrustersPrefabB.audio.enabled = true;
		}
	// Player destroy scripting
		if (playerHealth <= 0) {
	    		playerHealth = 0;
	    		Destroy(gameObject);
	    		AudioSource.PlayClipAtPoint(explosionSound, transform.position, explosionVolume);
	    		Instantiate(explosionPrefab, transform.position, Quaternion.identity);
	    		RestartCheck.crash = true;
	    		RestartCheck.enableRestart = true;
	    }
	}
}

function OnCollisionEnter (collision:Collision){
	
	var collisionTag:String = collision.transform.tag;
	if (collisionTag.Length > 8 && collisionTag.Substring(0,8) == "Asteroid") {
	    
	    // Hull Damage scripting
	    if (shieldUpScript.shieldUpChk == false){
    		if (Mathf.Round(collision.relativeVelocity.magnitude * collision.rigidbody.mass) > playerHealth1percent)
    			playerDmgDealt = Mathf.Round(collision.relativeVelocity.magnitude * collision.rigidbody.mass) + extraLevelsDmg;
    		else
    			playerDmgDealt = playerHealth1percent + extraLevelsDmg;
    		playerHealth -= playerDmgDealt;
    	
    	// Hull Impact Sound    		
    		if (playerDmgDealt < asterImpact2Threshold){
    			var audioSelection = Random.Range(0, 3);
    			AudioSource.PlayClipAtPoint(hullTapSound[audioSelection], transform.position, hullTapVolume);
    				
 			} else if (playerDmgDealt < asterImpact3Threshold){
    			audioSelection = Random.Range(0, 3);
    			AudioSource.PlayClipAtPoint(hullCrunchSound[audioSelection], transform.position, hullCrunchVolume);
    		
    		} else {
    			audioSelection = Random.Range(0, 3);
   				AudioSource.PlayClipAtPoint(hullCrackSound[audioSelection], transform.position, hullCrackVolume);
    		}
    		
    		
    	}
    	// Shield damage scripting
    	if (shieldUpScript.shieldUpChk == true){
    		if (Mathf.Round(collision.relativeVelocity.magnitude * collision.rigidbody.mass) > playerHealth1percent)
    			playerDmgDealt = (Mathf.Round(collision.relativeVelocity.magnitude * collision.rigidbody.mass) + extraLevelsDmg) * shieldScript.dmgMultiplier;
    		else 
    			playerDmgDealt = shieldScript.dmgMultiplier * (playerHealth1percent + extraLevelsDmg);
    		shieldScript.shieldHealth -= playerDmgDealt;
    		
    	// Shield Impact Sound
    		if (shieldScript.shieldHealth > 0){
    			shieldImpactVolume = ((playerDmgDealt / playerHealthMax) * (shieldImpactVolumeMax - shieldImpactVolumeMin)) + shieldImpactVolumeMin;
    		
    			audioSelection = Random.Range(0, 3);
    			AudioSource.PlayClipAtPoint(shieldImpactSound[audioSelection], transform.position, shieldImpactVolume);
    		} else
    			AudioSource.PlayClipAtPoint(shieldCrack, transform.position, shieldCrackVolume);
    		
   		}
   		
   		// Damage Message
   		var dmgMessage = Instantiate(pickupMessagePrefab, Vector3(0.5,0.52,0), Quaternion.identity);
			dmgMessage.guiText.material.color = dmgMessageColor;
			var playerDmgDealtText = Mathf.Round((playerDmgDealt / playerHealthMax) * 100);
			dmgMessage.guiText.text = playerDmgDealtText.ToString();
			dmgMessage.guiText.fontSize = 15;
					
    }
}

// Item collection scripting
function OnTriggerEnter (item : Collider) {
	
	var itemTag:String = item.tag;
    if (itemTag.Substring(0,6) == "Pickup"){
    	
    	if (itemTag == "PickupItem"){
    		
    		var pickupScript = item.GetComponent(PickupScript);
    		if (pickupScript.collected == false){
    		
    			pickupScript.collected = true;
				if (pickupScript.itemType == "ShipHeal"){
					var pickupMessage = Instantiate(pickupMessagePrefab, Vector3(0.5,0.53,0), Quaternion.identity);
					pickupMessage.guiText.material.color = colorMineral1;
					pickupMessage.guiText.text = "Repair Preformed";
					pickupMessage.GetComponent(PickupMessageScript).moveInterval *= -1;
					if ((playerHealthMax - playerHealth) >= playerHealAmt)
						playerHealth += playerHealAmt;
					else if ((playerHealthMax - playerHealth) < playerHealAmt && playerHealth != playerHealthMax)
						playerHealth = playerHealthMax;
					else if (playerHealth == playerHealthMax){
						pickupMessage.guiText.text = "No Damage to Ship";
					}
				}
				if (pickupScript.itemType == "RateOfFire"){
					pickupMessage = Instantiate(pickupMessagePrefab, Vector3(0.5,0.53,0), Quaternion.identity);
					pickupMessage.guiText.material.color = colorMineral1;
					pickupMessage.guiText.text = "Weapon Upgrade";
					Resource2Script.resource2Num += 1;
				}
				if (pickupScript.itemType == "Bomb"){
					pickupMessage = Instantiate(pickupMessagePrefab, Vector3(0.5,0.53,0), Quaternion.identity);
					pickupMessage.guiText.material.color = colorMineral1;
					pickupMessage.guiText.text = "+1 Bomb";
					fireBomb.bombAmmo++;
				}
				if (pickupScript.itemType == "MegaBomb"){
					Instantiate(megaBombShockPrefab, transform.position, Quaternion.identity);
					Instantiate(explodePrefabH, transform.position, Quaternion.identity);
					AudioSource.PlayClipAtPoint(megaBombShockSound, transform.position, megaBombShockVolume);
				}
				if (pickupScript.itemType == "Shield"){
					pickupMessage = Instantiate(pickupMessagePrefab, Vector3(0.5,0.53,0), Quaternion.identity);
					pickupMessage.guiText.material.color = colorMineral1;
					if (shieldUpScript.shieldUpChk == false){
						shieldUpScript.shieldUp = true;
						pickupMessage.guiText.text = "Energy Shield Up";
					} else if (shieldUpScript.shieldUpChk == true && shieldScript.shieldHealth < shieldScript.shieldHealthMax){
						if (shieldScript.shieldHealthMax - shieldScript.shieldHealth >= playerHealAmt)
							shieldScript.shieldHealth += playerHealAmt;
						else
							shieldScript.shieldHealth = shieldScript.shieldHealthMax;
						pickupMessage.guiText.text = "Shield Boost";
					} else if (shieldUpScript.shieldUpChk == true && shieldScript.shieldHealth == shieldScript.shieldHealthMax)
						pickupMessage.guiText.text = "Shield At Full";
					
				}
				if (pickupScript.itemType == "GlowBomb"){
					pickupMessage = Instantiate(pickupMessagePrefab, Vector3(0.5,0.53,0), Quaternion.identity);
					pickupMessage.guiText.material.color = colorMineral1;
					pickupMessage.guiText.text = "Glow Bomb Activated";
					Instantiate(glowBombShockPrefab, transform.position, Quaternion.identity);
				}
				if (pickupScript.itemType == "ShipGlow"){
					pickupMessage = Instantiate(pickupMessagePrefab, Vector3(0.5,0.53,0), Quaternion.identity);
					pickupMessage.guiText.material.color = colorMineral1;
					pickupMessage.guiText.text = "Ship Glow Bonus";
					shipGlowLight.light.range += 1.3;
					//shipGlowLight.light.intensity += 0.05;
				}
				Destroy(item.transform.parent.gameObject, 0.1);
				
			}
		}
    	
    	if (itemTag == "PickupW"){
    		
    		 	pickupScript = item.GetComponent(PickupScript);
    		if (pickupScript.collected == false){
    		
    			pickupScript.collected = true;
    			pickupMessage = Instantiate(pickupMessagePrefab, Vector3(0.5,0.53,0), Quaternion.identity);
				pickupMessage.guiText.material.color = colorMineral2;
				if (pickupScript.weaponType == "SinglePulse")
					pickupMessage.guiText.text = "Single Pulser";
				if (pickupScript.weaponType == "DoublePulse")
					pickupMessage.guiText.text = "Double Pulser";
				if (pickupScript.weaponType == "TriplePulse")
					pickupMessage.guiText.text = "Triple Pulser";
				if (pickupScript.weaponType == "MiniBomb")
					pickupMessage.guiText.text = "Mini-Bomb Launcher";
				if (pickupScript.weaponType == "BeamLaser")
					pickupMessage.guiText.text = "LasOr Beam Pew-Pew!";
				if (pickupScript.weaponType == "Aura")
					pickupMessage.guiText.text = "Disintegration Field";
				if (pickupScript.weaponType == "Waveform")
					pickupMessage.guiText.text = "Wave Emitter";
				Destroy(item.transform.parent.gameObject, 0.1);
				currentWeapon = pickupScript.weaponType;
			}
		}
    	
	}
}



