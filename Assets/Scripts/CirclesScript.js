#pragma strict
import UnityEngine.SceneManagement;
var pop: AudioSource;

var GCScript: GC;
var colorN: String;
var timeCreated: float;
var counting: float;
var y: float;
var points: float;

function Awake() {
	timeCreated = Time.time;
}

function Start() {

    GCScript = GameObject.Find('GameController').GetComponent(GC);
    GetComponent(Rigidbody2D).gravityScale = -0.3;
}

function Update() {
	y = transform.position.y;
	points = 100 / (y + 10);
	if(y >= 6.2){
		pop.Play();
		GameObject.Find("Lives").BroadcastMessage("loseLife");
		GameObject.Find("GameController").BroadcastMessage("audienceNeg");
		destroy();
	}




}

function addPoints() {
	GameObject.Find("ScoreText").BroadcastMessage("addPoints", points);
}


function destroy() {
	print("d");
	Destroy(gameObject);
}