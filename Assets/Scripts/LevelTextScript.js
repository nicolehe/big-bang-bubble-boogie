#pragma strict
import UnityEngine.SceneManagement;
static var level: int; // The player's score.
private var text: UnityEngine.UI.Text; // Reference to the Text component.


function Awake() {
    // Set up the reference.
    text = GetComponent(UnityEngine.UI.Text);

    // Reset the score.
    level = 1;
}



function Update() {
    text.text = "Level:" + level;
}

function nextLevel(nextLevel : int) {
	level = nextLevel;
}