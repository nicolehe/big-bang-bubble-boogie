#pragma strict
import UnityEngine.SceneManagement;
static var score: int; // The player's score.
private var text: UnityEngine.UI.Text; // Reference to the Text component.


function Awake() {
    // Set up the reference.
    text = GetComponent(UnityEngine.UI.Text);

    // Reset the score.
    score = 0;
}



function Update() {
    text.text = "Score: " + score;
}

function addPoints() {
    score += 10;
    print(score);

}

function minusPoints() {
    score -= 5;
    print(score);

}
