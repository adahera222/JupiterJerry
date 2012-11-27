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
var gameTrans:Transform;

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
		
	pickupChanceHeal *= pickupPracticePenalty;
	pickupChanceROF *= pickupPracticePenalty;
	pickupChanceWeapons *= pickupPracticePenalty;
	pickupChanceBomb *= pickupPracticePenalty;
	pickupChanceMegaBomb *= pickupPracticePenalty;
	pickupChanceShield *= pickupPracticePenalty;
	pickupChanceLights *= pickupPracticePenalty;
	
	pickupChanceROF += pickupChanceHeal;
	pickupChanceBomb += pickupChanceROF;
	pickupChanceWeapons += pickupChanceBomb;
	pickupChanceMegaBomb += pickupChanceWeapons;
	pickupChanceShield += pickupChanceMegaBomb;
	pickupChanceLights += pickupChanceShield;
	
	curHP = startHP;
	
	asterSpawn = GameObject.Find("AsteroidSpawn").GetComponent(AsteroidSpawn);
	obTag = gameObject.tag;
	gameTrans = transform;
		
}

function Update(){


	
/////////////  Asteroid Destroy for Dev Cheating   /////////////////
	if (Input.GetKeyDown("0")){
		curHP = 0;
		HPCheck();
		}

	

	asterExChance_M = asterExChance_MBase + (asterExChanceBoost * (CameraScript.roundNum - 1));
	asterExChance_S = asterExChance_SBase + (asterExChanceBoost * (CameraScript.roundNum - 1));

}

function FixedUpdate(){

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

function HPCheck(){
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
				asterSpawn.MakeAsteroidM(-0.915, -9.42, gameTrans);
				asterSpawn.MakeAsteroidM(-11.122, 4.772, gameTrans);
				asterSpawn.MakeAsteroidM(-7.311, -0.572, gameTrans);
				asterSpawn.MakeAsteroidM(13.673, -2.324, gameTrans);
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
    		
		}
		if (obTag == "AsteroidH") {
		
			Instantiate(explosionPrefab, gameTrans.position, Quaternion.identity);
			
				asterSpawn.MakeAsteroidB(-2.86, 3.5, gameTrans);
				asterSpawn.MakeAsteroidB(-2.1, -3.6, gameTrans);
				asterSpawn.MakeAsteroidB(4.37, -0.95, gameTrans);
    			
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
		if (obTag == "AsteroidB") {
		
			Instantiate(explosionPrefab, gameTrans.position, Quaternion.identity);
				
			randomX = Random.Range(0.0, 100.0);
			
				if (GPKMath.WithinRangef(randomX, gravityWellChance, asterExChance_M)){
					asterSpawn.MakeAsteroidMx(-0.2, 1.1, gameTrans);
    				asterSpawn.MakeAsteroidMx(0.5, -0.8, gameTrans);
    				
    				asterSpawn.MakeAsteroidSx(1.1, 0.66, gameTrans);
    			} else if (randomX <= gravityWellChance && CameraScript.roundNum >= gravityWellRound && AsteroidSpawn.gravityWellActive == false && Application.loadedLevelName != "PracticeLevel"){
    				var gravityWell = Instantiate(gravityWellPrefab, transform.position, Quaternion.identity);
    			} else {
			
					asterSpawn.MakeAsteroidM(-0.2, 1.1, gameTrans);
    				asterSpawn.MakeAsteroidM(0.5, -0.8, gameTrans);
    				
    				asterSpawn.MakeAsteroidS(1.1, 0.66, gameTrans);
    			}
    		
    			ScoreTick();
		}
		if (obTag == "AsteroidM") {
		
			Instantiate(explosionPrefab, gameTrans.position, Quaternion.identity);
				
			randomX = Random.Range(0.0, 100.0);
			
				if (GPKMath.WithinRangef(randomX, gravityWellChance, asterExChance_S)){
					asterSpawn.MakeAsteroidSx(0.4, 0.4, gameTrans);
	        		asterSpawn.MakeAsteroidSx(-0.4, -0.4, gameTrans);
	        		asterSpawn.MakeAsteroidSx(-0.4, 0.4, gameTrans);
    			} else if (randomX <= gravityWellChance && CameraScript.roundNum >= gravityWellRound && AsteroidSpawn.gravityWellActive == false && Application.loadedLevelName != "PracticeLevel"){
    				gravityWell = Instantiate(gravityWellPrefab, transform.position, Quaternion.identity);
    			} else {
    				asterSpawn.MakeAsteroidS(0.4, 0.4, gameTrans);
	        		asterSpawn.MakeAsteroidS(-0.4, -0.4, gameTrans);
	        		asterSpawn.MakeAsteroidS(-0.4, 0.4, gameTrans);
	        	}
	        
	        	ScoreTick();
		}
		if (obTag == "AsteroidS") {
			randomX = Random.Range(0.0,100.0);
			
			Instantiate(explosionPrefab, gameTrans.position, Quaternion.identity);
			
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
						var pickupLights = Instantiate(pickupLightsPrefab[lightSelect], gameTrans.position, Quaternion.identity);
							pickupLights.transform.eulerAngles.y = Random.Range(1.0,359.9);
				}
				ScoreTick();
		}
		return(true);
	}
}



