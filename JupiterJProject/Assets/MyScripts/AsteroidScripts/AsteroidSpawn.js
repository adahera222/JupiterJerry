#pragma strict

var asterPlayer:AsteroidsPlayer;
var asterSpawnSound:Transform;

var spawnX:float;
var spawnZ:float;
var border:Transform;

var minSpd = 100.0;
var maxSpd = 300.0;

var numAsteroidsStart:int;
var numAsteroidsLevUp:int;
var numAsteroidsMax:int;
//var minAsteroids=20;
//var maxAsteroids=50;
var percentChanceG:float;
var percentChanceH:float;
var percentChanceB:float;
var percentChanceM:float;
var percentChanceS:float;
private var percentChanceCalc:float;

var asteroidPrefabG:Transform;
var asteroidPrefabH:Transform;
var asteroidPrefabB:Transform;
var asteroidPrefabM:Transform;
var asteroidPrefabS:Transform;
var asteroidPrefabSx:Transform;
var asteroidPrefabMx:Transform;

var asterSPoints = 1;
var asterMPoints = 4;
var asterBPoints = 10;
var asterHPoints = 52;
var asterGPoints = 218;

var burstSpdMinMBase = 50.0;
var burstSpdMaxMBase = 100.0;
var burstSpdMinSBase = 50.0;
var burstSpdMaxSBase = 100.0;
var burstLevUp:float;

private var burstSpdMinM:float;
private var burstSpdMaxM:float;
private var burstSpdMinS:float;
private var burstSpdMaxS:float;
var curBurstLev = 0.0;

var burstMaxAddMult:float;
var burstMinAddMult:float;
var maxBurstLev:float;
var asteroidThreatLev = 0.0;
var threatBeyondMaxLev = 0.0;

static var asteroidNumber:int;

var firstRoundStart = false;

static var gravityWellActive = false;

var gigSpawn = true;
var hugeSpawn = true;
var hugeSpawnNum = 0.0;

var round2HugeSpawn = false;

function Start () {
	
	asteroidNumber = 0;	
	
	asterPlayer = GameObject.Find("PlayerShip").GetComponent(AsteroidsPlayer);
	
}

// Spawns asteroid field at beginning of round. Coordinates and size distribution are randomized. 
// Number of asteroids starts with a base number that is increased as the rounds progress.
// Huge class asteroids start at round 2 and Gigantic asteroids start at round 3. Neither Huge nor Gigantic spawn in Practice Mode.
function GenerateAsteroids(){

	if (Application.loadedLevelName == "PracticeLevel")
		round2HugeSpawn = true;
	var numAsteroids = numAsteroidsStart + ((CameraScript.roundNum - 1) * numAsteroidsLevUp);
	if (numAsteroids > numAsteroidsMax)
		numAsteroids = numAsteroidsMax;
	spawnX = (border.GetComponent(TransformWrap).xStart * (1 + (border.GetComponent(TransformWrap).roundScaleIncrease * (CameraScript.roundNum - 1)))) - 5;
	spawnZ = (border.GetComponent(TransformWrap).zStart * (1 + (border.GetComponent(TransformWrap).roundScaleIncrease * (CameraScript.roundNum - 1)))) - 5;
	if (CameraScript.roundNum > 2 && Application.loadedLevelName != "PracticeLevel")
		gigSpawn = false;
	else
		gigSpawn = true;
	

	
	for (var i = 0; i < numAsteroids; i++) {
		percentChanceCalc = Random.Range(0.0, 100.0);
		var asRotx = Random.Range(0.0,360.0);
		var asRoty = Random.Range(0.0,360.0);
		var asRotz = Random.Range(0.0,360.0);
		var asZ = Random.Range((-1.0 * spawnZ), spawnZ);
		var asX = Random.Range((-1.0 * spawnX), spawnX);
				if (gigSpawn == false){
					if ((asX < -17 || asX > 17 || asZ < -17 || asZ > 17)) {
						var asteroid = Instantiate(asteroidPrefabG, new Vector3(asX, 3, asZ), Quaternion.Euler(asRotx, asRoty, asRotz));
						asteroid.rigidbody.AddRelativeForce(Vector3.forward * Random.Range(minSpd, maxSpd));
						asteroid.GetComponent(AsteroidNewRoundScale).enabled = true;
						gigSpawn = true;
					}else{
						i--;
					}
				}
				else if (percentChanceCalc <= percentChanceH || (CameraScript.roundNum == 2 && round2HugeSpawn == false)){
					if (gigSpawn == true && CameraScript.roundNum > 1 && Application.loadedLevelName != "PracticeLevel"){
						if (Physics.CheckSphere(Vector3(asX, 3, asZ), 7.5) == false && (asX < -15 || asX > 15 || asZ < -15 || asZ > 15)) {
						
							asteroid = Instantiate(asteroidPrefabH, new Vector3(asX, 3, asZ), Quaternion.Euler(asRotx, asRoty, asRotz));
							asteroid.rigidbody.AddRelativeForce(Vector3.forward * Random.Range(minSpd, maxSpd));
							asteroid.GetComponent(AsteroidNewRoundScale).enabled = true;
							round2HugeSpawn = true;
						}else{
							i--;
						}
					} else
						i--;
				}
				else if (gigSpawn == true && GPKMath.WithinRangef(percentChanceCalc, percentChanceH, percentChanceB)){
					if (Physics.CheckSphere(Vector3(asX, 3, asZ), 2.5) == false && (asX < -10 || asX > 10 || asZ < -10 || asZ > 10)){
						
						asteroid = Instantiate(asteroidPrefabB, new Vector3(asX, 3, asZ), Quaternion.Euler(asRotx, asRoty, asRotz));
						asteroid.rigidbody.AddRelativeForce(Vector3.forward * Random.Range(minSpd, maxSpd));
						asteroid.GetComponent(AsteroidNewRoundScale).enabled = true;
					}else{
						i--;
					}
				}
				else if (gigSpawn == true && GPKMath.WithinRangef(percentChanceCalc, percentChanceB, percentChanceM)){
					if (Physics.CheckSphere(Vector3(asX, 3, asZ), 1.5) == false && (asX < -8 || asX > 8 || asZ < -8 || asZ > 8)){
						
						asteroid = Instantiate(asteroidPrefabM, new Vector3(asX, 3, asZ), Quaternion.Euler(asRotx, asRoty, asRotz));
						asteroid.rigidbody.AddRelativeForce(Vector3.forward * Random.Range(minSpd, maxSpd));
						asteroid.GetComponent(AsteroidNewRoundScale).enabled = true;
					}else{
						i--;
					}
				}
				else if (gigSpawn == true && percentChanceCalc > percentChanceM){
					if (Physics.CheckSphere(Vector3(asX, 3, asZ), 1) == false && (asX < -8 || asX > 8 || asZ < -8 || asZ > 8)){
						
						asteroid = Instantiate(asteroidPrefabS, new Vector3(asX, 3, asZ), Quaternion.Euler(asRotx, asRoty, asRotz));
						asteroid.rigidbody.AddRelativeForce(Vector3.forward * Random.Range(minSpd, maxSpd));
						asteroid.GetComponent(AsteroidNewRoundScale).enabled = true;
					}else{
						i--;
					}
				}
		}
	asterSpawnSound.audio.Play();
}

function Update() {

// Delays the asteroid field in first round to allow player fade in.
	if (asterPlayer.start == true && firstRoundStart == false){
		GenerateAsteroids();
		firstRoundStart = true;
	}
	//if (asteroidNumber !=0)
		//Debug.Log(asteroidNumber);
	
// The Burst Level influences how much force is added to asteroids as they are spawned.
// At a certain point, asteroids become too vigerous when the Burst Level becomes large. 
// threatBeyondMaxLev is there to add damage to the player if they reach the Maximum Burst Level to continue difficulty progression.
	if (curBurstLev < maxBurstLev){
		curBurstLev = (ScoreKeeper.score - (ScoreKeeper.score % burstLevUp)) / burstLevUp;
	} else if (curBurstLev == maxBurstLev){
		threatBeyondMaxLev = ((ScoreKeeper.score - (ScoreKeeper.score % burstLevUp)) / burstLevUp) - maxBurstLev;
	}
	
	burstSpdMinM = burstSpdMinMBase + (curBurstLev * burstLevUp * burstMinAddMult);
	burstSpdMaxM = burstSpdMaxMBase + (curBurstLev * burstLevUp * burstMaxAddMult);
	burstSpdMinS = burstSpdMinSBase + (curBurstLev * burstLevUp * burstMinAddMult);
	burstSpdMaxS = burstSpdMaxSBase + (curBurstLev * burstLevUp * burstMaxAddMult);
	
	asteroidThreatLev = curBurstLev + threatBeyondMaxLev;

}
// The following are all the asteroid spawn functions
function MakeAsteroidH(x:float, z:float, pos:Transform){
	
	var asteroidH = Instantiate(asteroidPrefabH, Vector3(pos.position.x + x, 3, pos.position.z + z), Quaternion.Euler(Random.Range(1.0,359.9), Random.Range(1.0,359.9), Random.Range(1.0,359.9)));
			
       	//Inherit original asteroid's velocity and direction
      		asteroidH.rigidbody.velocity = pos.rigidbody.velocity;
			asteroidH.rigidbody.angularVelocity = pos.rigidbody.angularVelocity;
			
		// Add random amount of force in random direction
			asteroidH.rigidbody.AddForce(asteroidH.forward * Random.Range(burstSpdMinM, burstSpdMaxM));
}

function MakeAsteroidB(x:float, z:float, pos:Transform){
	
	var asteroidB = Instantiate(asteroidPrefabB, Vector3(pos.position.x + x, 3, pos.position.z + z), Quaternion.Euler(Random.Range(1.0,359.9), Random.Range(1.0,359.9), Random.Range(1.0,359.9)));

      		asteroidB.rigidbody.velocity = pos.rigidbody.velocity;
			asteroidB.rigidbody.angularVelocity = pos.rigidbody.angularVelocity;
			
			asteroidB.rigidbody.AddForce(asteroidB.forward * Random.Range(burstSpdMinM, burstSpdMaxM));
}

function MakeAsteroidM(x:float, z:float, pos:Transform){

   	var asteroidM = Instantiate(asteroidPrefabM, Vector3(pos.position.x + x, 3, pos.position.z + z), Quaternion.Euler(Random.Range(1.0,359.9), Random.Range(1.0,359.9), Random.Range(1.0,359.9)));

      	asteroidM.rigidbody.velocity = pos.rigidbody.velocity;
		asteroidM.rigidbody.angularVelocity = pos.rigidbody.angularVelocity;
			
		asteroidM.rigidbody.AddForce(asteroidM.forward * Random.Range(burstSpdMinM, burstSpdMaxM));
}

function MakeAsteroidS(x:float, z:float, pos:Transform){
	var asteroidS = Instantiate(asteroidPrefabS, Vector3(pos.position.x + x, 3, pos.position.z + z), Quaternion.Euler(Random.Range(1.0,359.9), Random.Range(1.0,359.9), Random.Range(1.0,359.9)));

      		asteroidS.rigidbody.velocity = pos.rigidbody.velocity;
			asteroidS.rigidbody.angularVelocity = pos.rigidbody.angularVelocity;
			
			asteroidS.rigidbody.AddForce(asteroidS.forward * Random.Range(burstSpdMinS, burstSpdMaxS));
	
}

function MakeAsteroidMx(x:float, z:float, pos:Transform){

   	var asteroidMx = Instantiate(asteroidPrefabMx, Vector3(pos.position.x + x, 3, pos.position.z + z), Quaternion.Euler(Random.Range(1.0,359.9), Random.Range(1.0,359.9), Random.Range(1.0,359.9)));

      	asteroidMx.rigidbody.velocity = pos.rigidbody.velocity;
		asteroidMx.rigidbody.angularVelocity = pos.rigidbody.angularVelocity;
			
		asteroidMx.rigidbody.AddForce(asteroidMx.forward * Random.Range(burstSpdMinM, burstSpdMaxM));
}

function MakeAsteroidSx(x:float, z:float, pos:Transform){
	var asteroidSx = Instantiate(asteroidPrefabSx, Vector3(pos.position.x + x, 3, pos.position.z + z), Quaternion.Euler(Random.Range(1.0,359.9), Random.Range(1.0,359.9), Random.Range(1.0,359.9)));

      		asteroidSx.rigidbody.velocity = pos.rigidbody.velocity;
			asteroidSx.rigidbody.angularVelocity = pos.rigidbody.angularVelocity;
			
			asteroidSx.rigidbody.AddForce(asteroidSx.forward * Random.Range(burstSpdMinS, burstSpdMaxS));
	
}