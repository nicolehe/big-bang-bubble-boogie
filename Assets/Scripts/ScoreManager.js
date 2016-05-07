#pragma strict
import UnityEngine.SceneManagement;

public var score: int; // The player's score.
var text: UnityEngine.UI.Text; // Reference to the Text component.

var boo: GameObject;
var claps: ParticleSystem;
var frowns: ParticleSystem;
var great: GameObject;
var level1Done = false;
var level2Done = false;
var level3Done = false;
var level4Done = false;
var level5Done = false;
var level6Done = false;



function Awake() {
    // Set up the reference.
    text = GetComponent(UnityEngine.UI.Text);

    // Reset the score.
    score = 0;
}



function Update() {
    //print(Time.timeSinceLevelLoad);
    text.text = "Score: " + score;

    if (score < -20) {
        GameObject.Find("GameController").BroadcastMessage("gameOverFailed");
    }
    //print(Time.timeSinceLevelLoad);
    if (score < 30 && Time.timeSinceLevelLoad < 5 && level1Done == false) {
        //print("level 1");
        GameObject.Find("GameController").BroadcastMessage("currentLevel", 1);
        GameObject.Find("LevelText").BroadcastMessage("currentLevel", 1);
        GameObject.Find("SpaceMermaid").BroadcastMessage("currentLevel", 1);
        GameObject.Find("Astrocrab").BroadcastMessage("currentLevel", 1);
        level1Done = true;
    } else if (score >= 30 && level2Done == false || Time.timeSinceLevelLoad >= 10 && level2Done == false) {
        //print("level 2");
        GameObject.Find("GameController").BroadcastMessage("currentLevel", 2);
        GameObject.Find("LevelText").BroadcastMessage("currentLevel", 2);
        GameObject.Find("SpaceMermaid").BroadcastMessage("currentLevel", 2);
        GameObject.Find("Astrocrab").BroadcastMessage("currentLevel", 2);
        level2Done = true;
    } else if (score >= 70 && level3Done == false || Time.timeSinceLevelLoad >= 15 && level3Done == false) {
        //print("level 3");
        GameObject.Find("GameController").BroadcastMessage("currentLevel", 3);
        GameObject.Find("LevelText").BroadcastMessage("currentLevel", 3);
        GameObject.Find("SpaceMermaid").BroadcastMessage("currentLevel", 3);
        GameObject.Find("Astrocrab").BroadcastMessage("currentLevel", 3);
        level3Done = true;
    } else if (score >= 100 && level4Done == false || Time.timeSinceLevelLoad >= 20 && level4Done == false) {
        //print("level 3");
        GameObject.Find("GameController").BroadcastMessage("currentLevel", 4);
        GameObject.Find("LevelText").BroadcastMessage("currentLevel", 4);
        GameObject.Find("SpaceMermaid").BroadcastMessage("currentLevel", 4);
        GameObject.Find("Astrocrab").BroadcastMessage("currentLevel", 4);
        level4Done = true;
    } else if (score >= 130 && level5Done == false || Time.timeSinceLevelLoad >= 25 && level5Done == false) {
        //print("level 3");
        GameObject.Find("GameController").BroadcastMessage("currentLevel", 5);
        GameObject.Find("LevelText").BroadcastMessage("currentLevel", 5);
        GameObject.Find("SpaceMermaid").BroadcastMessage("currentLevel", 5);
        GameObject.Find("Astrocrab").BroadcastMessage("currentLevel", 5);
        level5Done = true;
    } else if (score >= 160 && level6Done == false || Time.timeSinceLevelLoad >= 50 && level6Done == false) {
        //print("level 3");
        GameObject.Find("GameController").BroadcastMessage("currentLevel", 6);
        GameObject.Find("LevelText").BroadcastMessage("currentLevel", 6);
        GameObject.Find("SpaceMermaid").BroadcastMessage("currentLevel", 6);
        GameObject.Find("Astrocrab").BroadcastMessage("currentLevel", 6);
        level6Done = true;
    } else if (Time.timeSinceLevelLoad >= 175 && level6Done == true) {
        GameObject.Find("GameController").BroadcastMessage("gameOverHighScore");
    }
}



    function addPoints(counting: float) {
        score += Mathf.Floor(8 / counting);
        //print(score);
        Instantiate(great, Vector3(0, 1, 0), Quaternion.identity);
        if (claps.isPlaying) {
            claps.Stop();
        }
        claps.Play();
    }

