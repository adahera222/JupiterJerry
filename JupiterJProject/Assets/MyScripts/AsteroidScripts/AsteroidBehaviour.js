#pragma strict
//var gigScore = 1;
//var hugeScore = 1;
//var bigScore = 1;
//var medScore = 1;
//var smScore = 1;

var startHP:float;
var curHP:float;
var lifeTime:float;
var fuse = 0.0;
var explosive = false;

var explosionPrefab : Transform;
var explosionSound = new AudioClip[3];
var explosionSoundVolume = new float[3];
var pickupShipHealPrefab : Transform;
var pickupRateOfFirePrefab : Transform;
var pickupBombPrefab : Transform;
var pickupPrefabWeapons = new Transform[5];
var pickupMegaBombPrefab:Transform;
var pickupShieldPrefab:Transform;
var pickupLightsPrefab = new Transform[4];
var asterShockwave:Transform;
var gravityWellChance:float;
var gravityWellRound:float;
var gravityWellPrefab:Transform;

var randomX:float;
var randomZ:float;
var pickupChanceHeal:float;
var pickupChanceROF:float;
var pickupChanceBomb:float;
static var pickupChanceBombBoost = 0;
var pickupChanceWeapons:float;
var pickupChanceMegaBomb:float;
var pickupChanceShield:float;
var pickupChanceLights:float;
static var pickupFlareNum = 0;
private var pickupRoundAdjustment:float;
private var pickupChanceHealDefault:float;
private var pickupChanceROFDefault:float;
private var pickupChanceBombDefault:float;
private var pickupChanceWeaponsDefault:float;
private var pickupChanceMegaBombDefault:float;
private var pickupChanceShieldDefault:float;
private var pickupChanceLightsDefault:float;
var min2Max:float;

var asterExChance_M:float;
var asterExChance_S:float;
var asterExChance_MBase:float;
var asterExChance_SBase:float;

//var resourceLv1=15.0;
//var resourceLv2=30.0;
//var resourceLv3=45.0;
var asterExChanceBoost:float;

var gigExThreshold:int;
//First 2 numbers are the chance range. 3rd is the calculated chance.
var gigExChance = [0.0, 0.0, 0.0];
var gigExRandom:float;
var gigExClock = 0.0;
var stopGigExRandom = false;
var lateGameExplodeChance:int;
var lateGameExplodeThreshold:int;

var radius:float;
var spawn = true;
var bombed = false;


var asterSpawn:AsteroidSpawn;

var obTag:String;
var gameTrans:Transform;

var shot = false;
var lazerImpactPrefab:Transform;

function Awake(){
	
	AsteroidSpawn.asteroidNumber++;

}
function Start () {
	
	pickupChanceROF += pickupChanceHeal;
	pickupChanceBomb += pickupChanceROF;
	pickupChanceWeapons += pickupChanceBomb;
	pickupChanceMegaBomb += pickupChanceWeapons;
	pickupChanceShield += pickupChanceMegaBomb;
	pickupChanceLights += pickupChanceShield;
	
	pickupChanceHealDefault = pickupChanceHeal;
	pickupChanceROFDefault = pickupChanceROF;
	pickupChanceBombDefault = pickupChanceBomb;
	pickupChanceWeaponsDefault = pickupChanceWeapons;
	pickupChanceMegaBombDefault = pickupChanceMegaBomb;
	pickupChanceShieldDefault = pickupChanceShield;
	pickupChanceLightsDefault = pickupChanceLights;
	
	curHP = startHP;
	
	asterSpawn = GameObject.Find("AsteroidSpawn").GetComponent(AsteroidSpawn);
	obTag = gameObject.tag;
	gameTrans = transform;
	
	gigExChance[2] = Random.Range(gigExChance[0], gigExChance[1]);
		
}

function Update(){

/////////////   Round degression on Pickup spawn chances to cut down on item bloat    /////////////////
	//pickupRoundAdjustment = 1 - ((CameraScript.roundNum - 1) * 0.05);
	//pickupChanceHeal = pickupChanceHealDefault * pickupRoundAdjustment;
	//pickupChanceROF = pickupChanceROFDefault * pickupRoundAdjustment;
	//pickupChanceBomb = pickupChanceBombDefault * pickupRoundAdjustment;
	//pickupChanceWeapons = pickupChanceWeaponsDefault * pickupRoundAdjustment;
	//pickupChanceMegaBomb = pickupChanceMegaBombDefault * pickupRoundAdjustment;
	//pickupChanceShield = pickupChanceShieldDefault * pickupRoundAdjustment;
	//pickupChanceLights = pickupChanceLightsDefault * pickupRoundAdjustment;
	
/////////////  Asteroid Destroy for Dev Cheating   /////////////////
	if (Input.GetKeyDown("0")){
		curHP = 0;
		HPCheck("notBullet");
		}
	/////////////    Old Super Rock Smasher clear code   ////////////////
	
	//if (Application.loadedLevelName != "MainMenu"){
	//	if (asterSpawn.destroyAsteroids == true){
	//		spawn = false;
	//		curHP = 0;
	//		HPCheck("notBullet");
	//	}
	//}
	
//////////////////     New Explosive Asteroid level progression      ///////////////////////////

	asterExChance_M = asterExChance_MBase + (asterExChanceBoost * (CameraScript.roundNum - 1));
	asterExChance_S = asterExChance_SBase + (asterExChanceBoost * (CameraScript.roundNum - 1));
//////////////////     Old Explosive Asteroid/Resource level progression      //////////////////
//	if (Resource1Script.resourceNum < resourceLv1){
//		asterExChance_M = asterExChance_MBase;
//		asterExChance_S = asterExChance_SBase;
//	} 
//		else if (Resource1Script.resourceNum >= resourceLv1 && Resource1Script.resourceNum < resourceLv2){
//			asterExChance_M = asterExChance_MBase + asterExChanceBoost;
//			asterExChance_S = asterExChance_SBase + asterExChanceBoost;
//	}
//		else if (Resource1Script.resourceNum >= resourceLv2 && Resource1Script.resourceNum < resourceLv3){
//			asterExChance_M = asterExChance_MBase + (asterExChanceBoost * 2);
//			asterExChance_S = asterExChance_SBase + (asterExChanceBoost * 2);
//	}
//		else if (Resource1Script.resourceNum >= resourceLv3){
//			asterExChance_M = asterExChance_MBase + (asterExChanceBoost * 3);
//			asterExChance_S = asterExChance_SBase + (asterExChanceBoost * 3);
//	}
}

function FixedUpdate(){

	
	if (Application.loadedLevelName != "MainMenu"){
		if (gigExThreshold <= asterSpawn.curBurstLev && gameObject.tag == "AsteroidG" && stopGigExRandom == false){
		
			gigExClock += Time.deltaTime;
			if (gigExClock >= 1){
		
				gigExRandom = Random.Range(0.0, 100.0);
				if (gigExRandom <= gigExChance[2]){
					transform.Find("GiganticCrackle").particleSystem.enableEmission = true;
					explosive = true;
					stopGigExRandom = true;
				}
				gigExClock = 0.0;
		
			}
		}
	}

	if (rigidbody.velocity == Vector3(0, 0, 0)){
		rigidbody.AddForce(transform.forward * 1);
	}
	if (explosive == true){
			fuse += Time.deltaTime;
		if (fuse >= lifeTime){
			Destroy(gameObject);
			Instantiate(asterShockwave, transform.position, Quaternion.identity);
			Instantiate(explosionPrefab, transform.position, Quaternion.identity);
		} 
	}

}

function OnTriggerEnter(object:Collider){

	HPCheck(object.tag);
}

function ScoreTick(){

	if (RestartCheck.enableRestart == false){
		ScoreKeeper.score++;
	}

}

function OnCollisionEnter(collision : Collision) {
    // Rotate the object so that the y-axis faces along the normal of the surface
    var contact : ContactPoint = collision.contacts[0];
    var rot : Quaternion = Quaternion.FromToRotation(Vector3.up, contact.normal);
    var pos : Vector3 = contact.point;
    Instantiate(lazerImpactPrefab, pos, rot);
}

function OnDestroy(){

	if (RestartCheck.enableRestart == false){
		AsteroidSpawn.asteroidNumber--;
	}
	if (AsteroidSpawn.asteroidNumber == 0)
		RestartCheck.enableRestart = true;

}

function HPCheck(bulletTag:String){
	if (curHP <= 0 && shot == false) {
		shot = true;
		Destroy(gameObject);
		if (asterSpawn.curBurstLev >= lateGameExplodeThreshold && Application.loadedLevelName != "MainMenu"){ 
			if (obTag != "AsteroidH" && obTag != "AsteroidG"){
				var lateGameExplodeChanceCalc = Random.Range(0.0,100.0);
				if (lateGameExplodeChanceCalc <= lateGameExplodeChance){
					var pusher = Instantiate(asterShockwave, transform.position, Quaternion.identity);
					pusher.transform.rotation.eulerAngles.y = Random.Range(0, 359);
				}
			}
		}
		if (bombed == false && asterSpawn.destroyAsteroids == false){
			var audioSelection = Random.Range(0, 3);
				AudioSource.PlayClipAtPoint(explosionSound[audioSelection], transform.position, explosionSoundVolume[audioSelection]);
		}
		
		if (obTag == "AsteroidG") {
		
			Instantiate(explosionPrefab, gameTrans.position, Quaternion.identity);
			
			for (var i = 0; i <= 5; i++){
			
				randomX = Random.Range(-15.0, 15.0);
				randomZ = Random.Range(-15.0, 15.0);
				Instantiate(explosionPrefab, Vector3 (gameTrans.position.x + randomX, 3, gameTrans.position.z + randomZ), Quaternion.identity);
			
			}
			if(spawn == true){
				asterSpawn.MakeAsteroidH(5.42, -4.41, gameTrans);
				asterSpawn.MakeAsteroidH(-2.84, 6.83, gameTrans);
    		
    			asterSpawn.MakeAsteroidB(-8.29, -5.96, gameTrans);
    			asterSpawn.MakeAsteroidB(-3.57, -7.06, gameTrans);
    			asterSpawn.MakeAsteroidB(-10.36, 1.15, gameTrans);
    			asterSpawn.MakeAsteroidB(9.68, 9.19, gameTrans);
    			asterSpawn.MakeAsteroidB(-3.82, -2.33, gameTrans);
    			asterSpawn.MakeAsteroidB(11.24, 3.028, gameTrans);
    			asterSpawn.MakeAsteroidB(5.614, 11.758, gameTrans);
    			asterSpawn.MakeAsteroidB(6.455, 4.968, gameTrans);
    		
    			asterSpawn.MakeAsteroidM(-5.55, -10.09, gameTrans);
				//asterSpawn.MakeAsteroidM(1.099, -11.523, gameTrans);
				asterSpawn.MakeAsteroidM(-0.915, -9.42, gameTrans);
				asterSpawn.MakeAsteroidM(-11.122, 4.772, gameTrans);
				//asterSpawn.MakeAsteroidM(-9.239, -2.368, gameTrans);
				asterSpawn.MakeAsteroidM(-7.311, -0.572, gameTrans);
				asterSpawn.MakeAsteroidM(13.673, -2.324, gameTrans);
				//asterSpawn.MakeAsteroidM(14.24, 0.997, gameTrans);
				asterSpawn.MakeAsteroidM(2.25, 13.555, gameTrans);
			    		    		
    			asterSpawn.MakeAsteroidS(-10.72, 6.42, gameTrans);
				asterSpawn.MakeAsteroidS(-10.773, -3.92, gameTrans);
	    	    asterSpawn.MakeAsteroidS(-5.52, -4.6, gameTrans);
				asterSpawn.MakeAsteroidS(-6.469, -8.618, gameTrans);
				asterSpawn.MakeAsteroidS(-1.606, -11.357, gameTrans);
				asterSpawn.MakeAsteroidS(12.365,-0.849, gameTrans);
				asterSpawn.MakeAsteroidS(13.874,5.074, gameTrans);
				asterSpawn.MakeAsteroidS(12.42,7.701, gameTrans);
				asterSpawn.MakeAsteroidS(9.738,6.0805, gameTrans);
				asterSpawn.MakeAsteroidS(6.6089,8.204, gameTrans);
    		
    			if (bulletTag != "notBullet")
    				ScoreTick();
    		}
		}
		if (obTag == "AsteroidH") {
		
			Instantiate(explosionPrefab, gameTrans.position, Quaternion.identity);
			
			if(spawn == true){
				asterSpawn.MakeAsteroidB(-2.86, 3.5, gameTrans);
				asterSpawn.MakeAsteroidB(-2.1, -3.6, gameTrans);
				asterSpawn.MakeAsteroidB(4.37, -0.95, gameTrans);
    			//asterSpawn.MakeAsteroidB(1.1, -4.3, gameTrans);
    			
    			asterSpawn.MakeAsteroidM(1.2, 2.36, gameTrans);
	       		asterSpawn.MakeAsteroidM(0.95, 5.27, gameTrans);
	        	asterSpawn.MakeAsteroidM(2.26, -4.6, gameTrans);
	        	asterSpawn.MakeAsteroidM(-5, -0.4, gameTrans);
    		
    			asterSpawn.MakeAsteroidS(4.3, 2.6, gameTrans);
	       		asterSpawn.MakeAsteroidS(0.85, -0.95, gameTrans);
	        	asterSpawn.MakeAsteroidS(-1.55, 0.15, gameTrans);
	        	asterSpawn.MakeAsteroidS(3.16, 4.27, gameTrans);
    		
    			ScoreTick();
    		}
		}
		if (obTag == "AsteroidB") {
		
			Instantiate(explosionPrefab, gameTrans.position, Quaternion.identity);
				
			randomX = Random.Range(0.0, 100.0);
			
			if(spawn == true){
				if (GPKMath.WithinRangef(randomX, gravityWellChance, asterExChance_M)){
					asterSpawn.MakeAsteroidMx(-0.2, 1.1, gameTrans);
    				asterSpawn.MakeAsteroidMx(0.5, -0.8, gameTrans);
    				
    				//asterSpawn.MakeAsteroidS(-1, -0.8, gameTrans);
    				asterSpawn.MakeAsteroidSx(1.1, 0.66, gameTrans);
    				//asterSpawn.MakeAsteroidS(-1.4, 0.11, gameTrans);
    			} else if (randomX <= gravityWellChance && CameraScript.roundNum >= gravityWellRound && AsteroidSpawn.gravityWellActive == false){
    				var gravityWell = Instantiate(gravityWellPrefab, transform.position, Quaternion.identity);
    			} else {
			
					asterSpawn.MakeAsteroidM(-0.2, 1.1, gameTrans);
    				asterSpawn.MakeAsteroidM(0.5, -0.8, gameTrans);
    				
    				//asterSpawn.MakeAsteroidS(-1, -0.8, gameTrans);
    				asterSpawn.MakeAsteroidS(1.1, 0.66, gameTrans);
    				//asterSpawn.MakeAsteroidS(-1.4, 0.11, gameTrans);
    			}
    		
    			ScoreTick();
    		}
		}
		if (obTag == "AsteroidM") {
		
			Instantiate(explosionPrefab, gameTrans.position, Quaternion.identity);
				
			randomX = Random.Range(0.0, 100.0);
			
			if(spawn == true){
				if (GPKMath.WithinRangef(randomX, gravityWellChance, asterExChance_S)){
					asterSpawn.MakeAsteroidSx(0.4, 0.4, gameTrans);
	        		asterSpawn.MakeAsteroidSx(-0.4, -0.4, gameTrans);
	        		asterSpawn.MakeAsteroidSx(-0.4, 0.4, gameTrans);
    			} else if (randomX <= gravityWellChance && CameraScript.roundNum >= gravityWellRound && AsteroidSpawn.gravityWellActive == false){
    				gravityWell = Instantiate(gravityWellPrefab, transform.position, Quaternion.identity);
    			} else {
    				asterSpawn.MakeAsteroidS(0.4, 0.4, gameTrans);
	        		asterSpawn.MakeAsteroidS(-0.4, -0.4, gameTrans);
	        		asterSpawn.MakeAsteroidS(-0.4, 0.4, gameTrans);
	        	}
	        
	        	ScoreTick();
			}
		}
		if (obTag == "AsteroidS") {
			randomX = Random.Range(0.0,100.0);
			
			Instantiate(explosionPrefab, gameTrans.position, Quaternion.identity);
			
			if(spawn == true){
				if (GPKMath.WithinRangef(randomX, 0, pickupChanceHeal) && AsteroidsPlayer.damaged == true) {
				
					var pickupShipHeal = Instantiate(pickupShipHealPrefab, gameTrans.position, Quaternion.identity);
					pickupShipHeal.transform.eulerAngles.y = Random.Range(1.0,359.9);
					
				} else if (GPKMath.WithinRangef(randomX, pickupChanceHeal, pickupChanceROF) && Resource2Script.resource2Num < 10){
					
					var pickupRateOfFire = Instantiate(pickupRateOfFirePrefab, gameTrans.position, Quaternion.identity);
					pickupRateOfFire.transform.eulerAngles.y = Random.Range(1.0,359.9);
				
				} else if (GPKMath.WithinRangef(randomX, pickupChanceROF, pickupChanceBomb + pickupChanceBombBoost)){
					
					var pickupBomb = Instantiate(pickupBombPrefab, gameTrans.position, Quaternion.identity);
					pickupBomb.transform.eulerAngles.y = Random.Range(1.0,359.9);
				
				} else if (GPKMath.WithinRangef(randomX, pickupChanceBomb, pickupChanceWeapons)){
					
						var weaponSelect = Random.Range(0,7);
						if (!(AsteroidsPlayer.currentWeapon == "SinglePulse" && weaponSelect == 0) &&
							!(AsteroidsPlayer.currentWeapon == "DoublePulse" && weaponSelect == 1) &&
							!(AsteroidsPlayer.currentWeapon == "TriplePulse" && weaponSelect == 2) &&
							!(AsteroidsPlayer.currentWeapon == "MiniBomb" && weaponSelect == 3) &&
							!(AsteroidsPlayer.currentWeapon == "BeamLaser" && weaponSelect == 4) &&
							!(AsteroidsPlayer.currentWeapon == "Aura" && weaponSelect == 5) &&
							!(AsteroidsPlayer.currentWeapon == "Waveform" && weaponSelect == 6)){
								var pickupWeapon = Instantiate(pickupPrefabWeapons[weaponSelect], gameTrans.position, Quaternion.identity);
								pickupWeapon.transform.eulerAngles.y = Random.Range(1.0,359.9);
						}
				
				} else if (GPKMath.WithinRangef(randomX, pickupChanceWeapons, pickupChanceMegaBomb)){
					
					var pickupMegaBomb = Instantiate(pickupMegaBombPrefab, gameTrans.position, Quaternion.identity);
						pickupMegaBomb.transform.eulerAngles.y = Random.Range(1.0,359.9);
				} else if (GPKMath.WithinRangef(randomX, pickupChanceMegaBomb, pickupChanceShield)){
					
					var pickupShield = Instantiate(pickupShieldPrefab, gameTrans.position, Quaternion.identity);
						pickupShield.transform.eulerAngles.y = Random.Range(1.0,359.9);
				} else if (GPKMath.WithinRangef(randomX, pickupChanceShield, pickupChanceLights) && Application.loadedLevelName == "DarkLevel"){
					
					var lightSelect = Random.Range(0,3);
					///////   Flare number limiter    ////////
					//if (!(lightSelect == 3 && pickupFlareNum == 4)){
						var pickupLights = Instantiate(pickupLightsPrefab[lightSelect], gameTrans.position, Quaternion.identity);
							pickupLights.transform.eulerAngles.y = Random.Range(1.0,359.9);
					//}
				}
				ScoreTick();
			}
		}
		return(true);
	}
}



