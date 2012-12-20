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
private var pickupPracticePenalty = 2.0;

var asterExChance_M:float;
var asterExChance_S:float;
var asterExChance_MBase:float;
var asterExChance_SBase:float;
var asterExChanceBoost:float;


var lateGameExplodeChance:int;
var lateGameExplodeThreshold:int;

var radius:float;
var spawn = true;
var bombed = false;


var asterSpawn:AsteroidSpawn;

var obTag:String;

var shot = false;
var lazerImpactPrefab:Transform;

function Awake(){
	
	AsteroidSpawn.asteroidNumber++;

}
function Start () {
	
	if (Application.loadedLevelName == "PracticeLevel")
		pickupPracticePenalty = 0.5;
	else
		pickupPracticePenalty = 1;

// Slows down the rate of item drop for Practice Mode
	pickupChanceHeal *= pickupPracticePenalty;
	pickupChanceROF *= pickupPracticePenalty;
	pickupChanceWeapons *= pickupPracticePenalty;
	pickupChanceBomb *= pickupPracticePenalty;
	pickupChanceMegaBomb *= pickupPracticePenalty;
	pickupChanceShield *= pickupPracticePenalty;
	pickupChanceLights *= pickupPracticePenalty;
	
// Sets up Spawn Rate numbers for levels
	pickupChanceROF += pickupChanceHeal;
	pickupChanceBomb += pickupChanceROF;
	pickupChanceWeapons += pickupChanceBomb;
	pickupChanceMegaBomb += pickupChanceWeapons;
	pickupChanceShield += pickupChanceMegaBomb;
	pickupChanceLights += pickupChanceShield;
	
// Sets HP count denoted in inspector panel
	curHP = startHP;


	asterSpawn = GameObject.Find("AsteroidSpawn").GetComponent(AsteroidSpawn);
	obTag = gameObject.tag;
		
}

function Update(){


	
/////////////  Asteroid Destroy for Dev Cheating   /////////////////
//	if (Input.GetKeyDown("0")){
//		curHP = 0;
//		HPCheck();
//		}

	
// Increases frequency of Asteroid Explosive property with round progression
	asterExChance_M = asterExChance_MBase + (asterExChanceBoost * (CameraScript.roundNum - 1));
	asterExChance_S = asterExChance_SBase + (asterExChanceBoost * (CameraScript.roundNum - 1));

}

function FixedUpdate(){

// If the asteroid doesn't have any velocity at all, it can cause some collision problems
	if (rigidbody.velocity == Vector3(0, 0, 0)){
		rigidbody.AddForce(transform.forward * 1);
	}
	
// Explosive Asteroid behaviour
	if (explosive == true){
			fuse += Time.deltaTime;
		if (fuse >= lifeTime){
			Destroy(gameObject);
			Instantiate(asterShockwave, transform.position, Quaternion.identity);
			Instantiate(explosionPrefab, transform.position, Quaternion.identity);
		} 
	}

}

function ScoreTick(){

	if (RestartCheck.enableRestart == false){
		ScoreKeeper.score++;
	}

}

function OnCollisionEnter(collision : Collision) {
// Grabed from Unity3D scripting reference. This spawns a small puff of dust when an asteroid comes in contact with another
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

// Is called whenever there is the potential for the asteroid to be destroyed by player
function HPCheck(){
	if (curHP <= 0 && shot == false) {
		shot = true; 						// the "shot" variable makes sure this function isn't called twice when 2 bullets hit the same asteroid
		Destroy(gameObject);
	// The pusher shockwave spawning code
		if (asterSpawn.curBurstLev >= lateGameExplodeThreshold && Application.loadedLevelName != "MainMenu"){ 
			if (obTag != "AsteroidH" && obTag != "AsteroidG"){
				var lateGameExplodeChanceCalc = Random.Range(0.0,100.0);
				if (lateGameExplodeChanceCalc <= lateGameExplodeChance){
					var pusher = Instantiate(asterShockwave, transform.position, Quaternion.identity);
					pusher.transform.rotation.eulerAngles.y = Random.Range(0, 359);
				}
			}
		}
	// If bombed == true, makes sure that there aren't a flurry of explosion sounds when a bomb's area effect damage goes off
		if (bombed == false){
			var audioSelection = Random.Range(0, 3);
				AudioSource.PlayClipAtPoint(explosionSound[audioSelection], transform.position, explosionSoundVolume[audioSelection]);
		}
	// The following is the spawn behaviour for all the various types of Asteroids
		if (obTag == "AsteroidG") {
		
			Instantiate(explosionPrefab, transform.position, Quaternion.identity);
			
			for (var i = 0; i <= 5; i++){
			
				randomX = Random.Range(-15.0, 15.0);
				randomZ = Random.Range(-15.0, 15.0);
				Instantiate(explosionPrefab, Vector3 (transform.position.x + randomX, 3, transform.position.z + randomZ), Quaternion.identity);
			
			}
				asterSpawn.MakeAsteroidH(5.42, -4.41, transform);
				asterSpawn.MakeAsteroidH(-2.84, 6.83, transform);
    		
    			asterSpawn.MakeAsteroidB(-8.29, -5.96, transform);
    			asterSpawn.MakeAsteroidB(-3.57, -7.06, transform);
    			asterSpawn.MakeAsteroidB(-10.36, 1.15, transform);
    			asterSpawn.MakeAsteroidB(9.68, 9.19, transform);
    			asterSpawn.MakeAsteroidB(-3.82, -2.33, transform);
    			asterSpawn.MakeAsteroidB(11.24, 3.028, transform);
    			asterSpawn.MakeAsteroidB(5.614, 11.758, transform);
    			asterSpawn.MakeAsteroidB(6.455, 4.968, transform);
    		
    			asterSpawn.MakeAsteroidM(-5.55, -10.09, transform);
				asterSpawn.MakeAsteroidM(-0.915, -9.42, transform);
				asterSpawn.MakeAsteroidM(-11.122, 4.772, transform);
				asterSpawn.MakeAsteroidM(-7.311, -0.572, transform);
				asterSpawn.MakeAsteroidM(13.673, -2.324, transform);
				asterSpawn.MakeAsteroidM(2.25, 13.555, transform);
			    		    		
    			asterSpawn.MakeAsteroidS(-10.72, 6.42, transform);
				asterSpawn.MakeAsteroidS(-10.773, -3.92, transform);
	    	    asterSpawn.MakeAsteroidS(-5.52, -4.6, transform);
				asterSpawn.MakeAsteroidS(-6.469, -8.618, transform);
				asterSpawn.MakeAsteroidS(-1.606, -11.357, transform);
				asterSpawn.MakeAsteroidS(12.365,-0.849, transform);
				asterSpawn.MakeAsteroidS(13.874,5.074, transform);
				asterSpawn.MakeAsteroidS(12.42,7.701, transform);
				asterSpawn.MakeAsteroidS(9.738,6.0805, transform);
				asterSpawn.MakeAsteroidS(6.6089,8.204, transform);
    		
		}
		if (obTag == "AsteroidH") {
		
			Instantiate(explosionPrefab, transform.position, Quaternion.identity);
			
				asterSpawn.MakeAsteroidB(-2.86, 3.5, transform);
				asterSpawn.MakeAsteroidB(-2.1, -3.6, transform);
				asterSpawn.MakeAsteroidB(4.37, -0.95, transform);
    			
    			asterSpawn.MakeAsteroidM(1.2, 2.36, transform);
	       		asterSpawn.MakeAsteroidM(0.95, 5.27, transform);
	        	asterSpawn.MakeAsteroidM(2.26, -4.6, transform);
	        	asterSpawn.MakeAsteroidM(-5, -0.4, transform);
    		
    			asterSpawn.MakeAsteroidS(4.3, 2.6, transform);
	       		asterSpawn.MakeAsteroidS(0.85, -0.95, transform);
	        	asterSpawn.MakeAsteroidS(-1.55, 0.15, transform);
	        	asterSpawn.MakeAsteroidS(3.16, 4.27, transform);
    		
    			ScoreTick();
		}
		if (obTag == "AsteroidB") {
		
			Instantiate(explosionPrefab, transform.position, Quaternion.identity);
				
			randomX = Random.Range(0.0, 100.0);
			
				if (GPKMath.WithinRangef(randomX, gravityWellChance, asterExChance_M)){
					asterSpawn.MakeAsteroidMx(-0.2, 1.1, transform);
    				asterSpawn.MakeAsteroidMx(0.5, -0.8, transform);
    				
    				asterSpawn.MakeAsteroidSx(1.1, 0.66, transform);
    			} else if (randomX <= gravityWellChance && CameraScript.roundNum >= gravityWellRound && AsteroidSpawn.gravityWellActive == false && Application.loadedLevelName != "PracticeLevel"){
    				var gravityWell = Instantiate(gravityWellPrefab, transform.position, Quaternion.identity);
    			} else {
			
					asterSpawn.MakeAsteroidM(-0.2, 1.1, transform);
    				asterSpawn.MakeAsteroidM(0.5, -0.8, transform);
    				
    				asterSpawn.MakeAsteroidS(1.1, 0.66, transform);
    			}
    		
    			ScoreTick();
		}
		if (obTag == "AsteroidM") {
		
			Instantiate(explosionPrefab, transform.position, Quaternion.identity);
				
			randomX = Random.Range(0.0, 100.0);
			
				if (GPKMath.WithinRangef(randomX, gravityWellChance, asterExChance_S)){
					asterSpawn.MakeAsteroidSx(0.4, 0.4, transform);
	        		asterSpawn.MakeAsteroidSx(-0.4, -0.4, transform);
	        		asterSpawn.MakeAsteroidSx(-0.4, 0.4, transform);
    			} else if (randomX <= gravityWellChance && CameraScript.roundNum >= gravityWellRound && AsteroidSpawn.gravityWellActive == false && Application.loadedLevelName != "PracticeLevel"){
    				gravityWell = Instantiate(gravityWellPrefab, transform.position, Quaternion.identity);
    			} else {
    				asterSpawn.MakeAsteroidS(0.4, 0.4, transform);
	        		asterSpawn.MakeAsteroidS(-0.4, -0.4, transform);
	        		asterSpawn.MakeAsteroidS(-0.4, 0.4, transform);
	        	}
	        
	        	ScoreTick();
		}
		if (obTag == "AsteroidS") {
			randomX = Random.Range(0.0,100.0);
			
			Instantiate(explosionPrefab, transform.position, Quaternion.identity);
		// Item spawn calculation and events
				if (GPKMath.WithinRangef(randomX, 0, pickupChanceHeal) && AsteroidsPlayer.damaged == true) {
				
					var pickupShipHeal = Instantiate(pickupShipHealPrefab, transform.position, Quaternion.identity);
					pickupShipHeal.transform.eulerAngles.y = Random.Range(1.0,359.9);
					
				} else if (GPKMath.WithinRangef(randomX, pickupChanceHeal, pickupChanceROF) && Resource2Script.resource2Num < 10){
					
					var pickupRateOfFire = Instantiate(pickupRateOfFirePrefab, transform.position, Quaternion.identity);
					pickupRateOfFire.transform.eulerAngles.y = Random.Range(1.0,359.9);
				
				} else if (GPKMath.WithinRangef(randomX, pickupChanceROF, pickupChanceBomb + pickupChanceBombBoost)){
					
					var pickupBomb = Instantiate(pickupBombPrefab, transform.position, Quaternion.identity);
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
								var pickupWeapon = Instantiate(pickupPrefabWeapons[weaponSelect], transform.position, Quaternion.identity);
								pickupWeapon.transform.eulerAngles.y = Random.Range(1.0,359.9);
						}
				
				} else if (GPKMath.WithinRangef(randomX, pickupChanceWeapons, pickupChanceMegaBomb)){
					
					var pickupMegaBomb = Instantiate(pickupMegaBombPrefab, transform.position, Quaternion.identity);
						pickupMegaBomb.transform.eulerAngles.y = Random.Range(1.0,359.9);
				} else if (GPKMath.WithinRangef(randomX, pickupChanceMegaBomb, pickupChanceShield)){
					
					var pickupShield = Instantiate(pickupShieldPrefab, transform.position, Quaternion.identity);
						pickupShield.transform.eulerAngles.y = Random.Range(1.0,359.9);
				} else if (GPKMath.WithinRangef(randomX, pickupChanceShield, pickupChanceLights) && Application.loadedLevelName == "DarkLevel"){
					
					var lightSelect = Random.Range(0,3);
						var pickupLights = Instantiate(pickupLightsPrefab[lightSelect], transform.position, Quaternion.identity);
							pickupLights.transform.eulerAngles.y = Random.Range(1.0,359.9);
				}
				ScoreTick();
		}
		return(true);
	}
}



