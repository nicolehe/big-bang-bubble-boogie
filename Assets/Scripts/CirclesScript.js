#pragma strict
import UnityEngine.SceneManagement;

var GCScript: GC;
var colorN: String;

function Start() {

    GCScript = GameObject.Find('GameController').GetComponent(GC);
    GetComponent(Rigidbody2D).gravityScale = -0.3;
}

function Update() {
	if(transform.position.y >= 6.2){
		GameObject.Find("Lives").BroadcastMessage("loseLife");
		GameObject.Find("GameController").BroadcastMessage("audienceNeg");
		destroy();
	}



}


function destroy() {
	print("REICEIVED");
	Destroy(gameObject);
}