#pragma strict
import UnityEngine.SceneManagement;
var text: UnityEngine.UI.Text; // Reference to the Text component.
public
var lives: float = 5;
var frowns: ParticleSystem;
var boo: GameObject;
var livesShown;

function Start() {
    text = GetComponent(UnityEngine.UI.Text);

}

function Update() {
	findLivesShown();
    text.text = "Lives: " + livesShown;
    if (lives == 0){
    	GameObject.Find("GameController").BroadcastMessage("gameOver");
    }
}

function loseLife() {
	lives--;
    Instantiate(boo, Vector3(0, 1, 0), Quaternion.identity);
    if (frowns.isPlaying) {
        frowns.Stop();
    }
    frowns.Play();

}

function findLivesShown(){
	switch(lives){
		case 0:
			livesShown = "xxxxx";
			break;			
		case 1:
			livesShown = "<color='#00ffffff'>●</color>xxxx";
			break;
		case 2:
			livesShown = "<color='#00ffffff'>●●</color>xxx";
			break;
		case 3:
			livesShown = "<color='#00ffffff'>●●●</color>xx";
			break;
		case 4:
			livesShown = "<color='#00ffffff'>●●●●</color>x";
			break;
		case 5:
			livesShown ="<color='#00ffffff'>●●●●●</color>";
			break;
	}
}