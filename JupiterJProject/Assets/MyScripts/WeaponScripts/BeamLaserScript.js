#pragma strict

function Start () {

}

function Update () {

	if ((!Input.GetButton("Fire1") && CameraScript.pauseSound == false) || AsteroidsPlayer.currentWeapon != "BeamLaser")
		Destroy(gameObject);

}