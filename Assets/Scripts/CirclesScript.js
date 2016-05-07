#pragma strict
import UnityEngine.SceneManagement;
var pop: AudioSource;

var GCScript: GC;

var y: float;
var points: float;
var originalColor: Color;


function Awake() {
// 	var original = GetComponent(SpriteRenderer).color.ToString;
// 	print(GetComponent(SpriteRenderer).color.ToString);
 }
function Start() {
	var originalColor = GetComponent(SpriteRenderer).color;
	print(originalColor);
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

	
	Destroy(gameObject);
}

function popIt() {
	transform.localScale += new Vector3(0.5, 0.5, 0.5);
}

function changeColor(){
	GetComponent(SpriteRenderer).color = originalColor.grey;
	yield WaitForSeconds(0.5);
	GetComponent(SpriteRenderer).color = originalColor;
	
}