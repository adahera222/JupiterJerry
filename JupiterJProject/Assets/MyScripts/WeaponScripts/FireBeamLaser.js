#pragma strict

var firePulse:FirePulseLaser;
var beamSpawn:Transform;
var beamLaserPrefab:Transform;
var beamLaserRender:LineRenderer;
var beamOn = false;
var beamDmgBase:float;
var beamDmg:float;
var rez2DmgBooster:float;

function Start () {
}

function Update () {

	beamDmg = beamDmgBase + ((Resource2Script.resource2Num - firePulse.startMin2) * rez2DmgBooster);

	if (Input.GetButton("Fire1") && AsteroidsPlayer.currentWeapon == "BeamLaser"){
		
		var hit:RaycastHit;
		Physics.Raycast(beamSpawn.transform.position, beamSpawn.transform.forward, hit, Mathf.Infinity, LayerMask.NameToLayer("RayCast"));
		if (beamOn == false){
			var beam = Instantiate(beamLaserPrefab, beamSpawn.transform.position, Quaternion.identity);
			beam.transform.parent = beamSpawn;
			beamLaserRender = beam.GetComponent(LineRenderer);
			beamOn = true;
		}
			
		beamLaserRender.SetPosition(0, beamSpawn.transform.position);
		beamLaserRender.SetPosition(1, hit.point);
		var hitTag = hit.transform.tag;
		if (hitTag.Length > 8 && hitTag.Substring(0,8) == "Asteroid" && hitTag != "AsteroidG" && hitTag != "AsteroidH"){
		
			var asterBehave = hit.transform.GetComponent(AsteroidBehaviour);
			asterBehave.curHP -= beamDmg * Time.deltaTime;
			asterBehave.HPCheck("bullet");
		
		}
	} else {
		beamOn = false;
	}

}