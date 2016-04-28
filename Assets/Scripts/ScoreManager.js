#pragma strict
import UnityEngine.SceneManagement;
static var score: int; // The player's score.
private var text: UnityEngine.UI.Text; // Reference to the Text component.

var boo: GameObject;
var great: GameObject;


function Awake() {
    // Set up the reference.
    text = GetComponent(UnityEngine.UI.Text);

    // Reset the score.
    score = 0;
}



function Update() {
    text.text = "Score: " + score;
 if (score < 30) {
        print("level 1");
        GameObject.Find("GameController").BroadcastMessage("currentLevel", 1);
        GameObject.Find("LevelText").BroadcastMessage("currentLevel", 1);
        GameObject.Find("SpaceMermaid").BroadcastMessage("currentLevel", 1);
        GameObject.Find("Astrocrab").BroadcastMessage("currentLevel", 1);
    } else if (score >= 30) {
        print("level 2");
        GameObject.Find("GameController").BroadcastMessage("currentLevel", 2);
        GameObject.Find("LevelText").BroadcastMessage("currentLevel", 2);
        GameObject.Find("SpaceMermaid").BroadcastMessage("currentLevel", 2);
        GameObject.Find("Astrocrab").BroadcastMessage("currentLevel", 2);
    } else if (score >= 70) {
        print("level 3");
        GameObject.Find("GameController").BroadcastMessage("currentLevel", 3);
        GameObject.Find("LevelText").BroadcastMessage("currentLevel", 3);
        GameObject.Find("SpaceMermaid").BroadcastMessage("currentLevel", 3);
        GameObject.Find("Astrocrab").BroadcastMessage("currentLevel", 3);
    } 
}

function addPoints() {
    score += 10;
    print(score);
    Instantiate(great, Vector3(0, 0, 0), Quaternion.identity);

}

function minusPoints() {
    score -= 5;
    print(score);
    Instantiate(boo, Vector3(0, 0, 0), Quaternion.identity);

}
