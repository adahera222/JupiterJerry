#pragma strict

function Start () {

}

function Update () {
	if (particleSystem.GetParticles == 0)
		Destroy(gameObject);
}