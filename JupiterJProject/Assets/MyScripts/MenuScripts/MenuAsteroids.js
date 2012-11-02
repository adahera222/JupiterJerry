#pragma strict

private var trans:Transform;

var spawnX:float;
var spawnZ:float;

var minSpd = 100.0;
var maxSpd = 300.0;

var minAsteroids=20;
var maxAsteroids=50;
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

function Start () {

	trans = transform;

	var numAsteroids = Random.Range(minAsteroids, maxAsteroids);
	
	for (var i = 0; i < numAsteroids; i++) {
		percentChanceCalc = Random.Range(0, 100);
		var asRotx = Random.Range(0,360);
		var asRoty = Random.Range(0,360);
		var asRotz = Random.Range(0,360);
		var asZ = Random.Range((-1 * spawnZ), spawnZ);
		var asX = Random.Range((-1 * spawnX), spawnX);
				
				if (percentChanceG >= percentChanceCalc && Physics.CheckSphere(Vector3(asX, 3, asZ), 17.5) == false) {
					var asteroid = Instantiate(asteroidPrefabG, new Vector3(asX, 3, asZ), Quaternion.Euler(asRotx, asRoty, asRotz));
					//asteroid.transform.eulerAngles.y = asRoty;
					asteroid.rigidbody.AddRelativeForce(Vector3.forward * Random.Range(minSpd, maxSpd));
				}
				else if (percentChanceH >= percentChanceCalc && Physics.CheckSphere(Vector3(asX, 3, asZ), 7) == false && percentChanceG < percentChanceCalc) {
					asteroid = Instantiate(asteroidPrefabH, new Vector3(asX, 3, asZ), Quaternion.Euler(asRotx, asRoty, asRotz));
					//asteroid.transform.eulerAngles.y = asRoty;
					asteroid.rigidbody.AddRelativeForce(Vector3.forward * Random.Range(minSpd, maxSpd));
				}
				else if (percentChanceB >= percentChanceCalc && Physics.CheckSphere(Vector3(asX, 3, asZ), 3) == false && percentChanceH < percentChanceCalc){
					asteroid = Instantiate(asteroidPrefabB, new Vector3(asX, 3, asZ), Quaternion.Euler(asRotx, asRoty, asRotz));
					//asteroid.transform.eulerAngles.y = asRoty;
					asteroid.rigidbody.AddRelativeForce(Vector3.forward * Random.Range(minSpd, maxSpd));
				}
				else if (percentChanceM >= percentChanceCalc && Physics.CheckSphere(Vector3(asX, 3, asZ), 2) == false && percentChanceB < percentChanceCalc){
					asteroid = Instantiate(asteroidPrefabM, new Vector3(asX, 3, asZ), Quaternion.Euler(asRotx, asRoty, asRotz));
					//asteroid.transform.eulerAngles.y = asRoty;
					asteroid.rigidbody.AddRelativeForce(Vector3.forward * Random.Range(minSpd, maxSpd));
				}
				else if (percentChanceS >= percentChanceCalc && Physics.CheckSphere(Vector3(asX, 3, asZ), 1) == false && percentChanceM < percentChanceCalc){
					asteroid = Instantiate(asteroidPrefabS, new Vector3(asX, 3, asZ), Quaternion.Euler(asRotx, asRoty, asRotz));
					//asteroid.transform.eulerAngles.y = asRoty;
					asteroid.rigidbody.AddRelativeForce(Vector3.forward * Random.Range(minSpd, maxSpd));
				}else{
				i--;
				}
	}
}

