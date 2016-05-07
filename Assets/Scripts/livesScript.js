#pragma strict
import UnityEngine.SceneManagement;
var text: UnityEngine.UI.Text; // Reference to the Text component.
public
var lives: float = 5;
var frowns: ParticleSystem;
var boo: GameObject;

function Start() {
    text = GetComponent(UnityEngine.UI.Text);

}

function Update() {
    text.text = "Lives: " + lives;
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
