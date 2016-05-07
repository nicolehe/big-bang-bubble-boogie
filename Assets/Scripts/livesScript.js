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
    	GameObject.Find("GameController").BroadcastMessage("gameOverFailed");
    }
}

function loseLife() {
    Instantiate(boo, Vector3(0, 1, 0), Quaternion.identity);
    if (frowns.isPlaying) {
        frowns.Stop();
    }
    frowns.Play();

    lives--;
}

function findLivesShown(){
	switch(lives){
		case 1:
			livesShown = "<color='#00ffffff'>O</color>xxxx";
			break;
		case 2:
			livesShown = "<color='#00ffffff'>OO</color>xxx";
			break;
		case 3:
			livesShown = "<color='#00ffffff'>OOO</color>xx";
			break;
		case 4:
			livesShown = "<color='#00ffffff'>OOOO</color>x";
			break;
		case 5:
			livesShown ="<color='#00ffffff'>OOOOO</color>";
	}
}