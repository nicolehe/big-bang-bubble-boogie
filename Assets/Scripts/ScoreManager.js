#pragma strict
import UnityEngine.SceneManagement;

public
var score: int; // The player's score.
var text: UnityEngine.UI.Text; // Reference to the Text component.
var boo: GameObject;
var claps: ParticleSystem;
var frowns: ParticleSystem;
var great: GameObject;
var Thresh2 = 100;
var Thresh3 = 200;
var Thresh4 = 300;
var Thresh5 = 400;
var Thresh6 = 500;
var highScore: int;
var GO = false;

function Awake() {
    // Set up the reference.
    text = GetComponent(UnityEngine.UI.Text);
    // Reset the score.
    //score = 0;

    highScore = PlayerPrefs.GetInt("High Score");

}



function Update() {
    //print(Time.timeSinceLevelLoad);
    GameObject.Find("GameController").BroadcastMessage("keepScore", score);
    if (GO == false){
        updateScore();
    }

    if (score > highScore) {
        highScore = score;
        PlayerPrefs.SetInt("High Score", highScore);
    }
    //print(Time.timeSinceLevelLoad);
    if (score < Thresh2 && Time.timeSinceLevelLoad < 20) {
        //print("level 1");
        GameObject.Find("GameController").BroadcastMessage("currentLevel", 1);
        GameObject.Find("LevelText").BroadcastMessage("currentLevel", 1);
        GameObject.Find("SpaceMermaid").BroadcastMessage("currentLevel", 1);
        GameObject.Find("Astrocrab").BroadcastMessage("currentLevel", 1);
    } else if (score >= Thresh2 || Time.timeSinceLevelLoad >= 40) {
        //print("level 2");
        GameObject.Find("GameController").BroadcastMessage("currentLevel", 2);
        GameObject.Find("LevelText").BroadcastMessage("currentLevel", 2);
        GameObject.Find("SpaceMermaid").BroadcastMessage("currentLevel", 2);
        GameObject.Find("Astrocrab").BroadcastMessage("currentLevel", 2);
    } else if (score >= Thresh3 || Time.timeSinceLevelLoad >= 60) {
        //print("level 3");
        GameObject.Find("GameController").BroadcastMessage("currentLevel", 3);
        GameObject.Find("LevelText").BroadcastMessage("currentLevel", 3);
        GameObject.Find("SpaceMermaid").BroadcastMessage("currentLevel", 3);
        GameObject.Find("Astrocrab").BroadcastMessage("currentLevel", 3);
    } else if (score >= Thresh4 || Time.timeSinceLevelLoad >= 80) {
        //print("level 3");
        GameObject.Find("GameController").BroadcastMessage("currentLevel", 4);
        GameObject.Find("LevelText").BroadcastMessage("currentLevel", 4);
        GameObject.Find("SpaceMermaid").BroadcastMessage("currentLevel", 4);
        GameObject.Find("Astrocrab").BroadcastMessage("currentLevel", 4);
    } else if (score >= Thresh5 || Time.timeSinceLevelLoad >= 100) {
        //print("level 3");
        GameObject.Find("GameController").BroadcastMessage("currentLevel", 5);
        GameObject.Find("LevelText").BroadcastMessage("currentLevel", 5);
        GameObject.Find("SpaceMermaid").BroadcastMessage("currentLevel", 5);
        GameObject.Find("Astrocrab").BroadcastMessage("currentLevel", 5);
    } else if (score >= Thresh6 || Time.timeSinceLevelLoad >= 120) {
        //print("level 3");
        GameObject.Find("GameController").BroadcastMessage("currentLevel", 6);
        GameObject.Find("LevelText").BroadcastMessage("currentLevel", 6);
        GameObject.Find("SpaceMermaid").BroadcastMessage("currentLevel", 6);
        GameObject.Find("Astrocrab").BroadcastMessage("currentLevel", 6);
    } else if (Time.timeSinceLevelLoad >= 175) {
        //GameObject.Find("GameController").BroadcastMessage("gameOver");
    }
}
function updateScore() {
    text.text = "Score: " + score;
}


function gameOverScore() {

    GameObject.Find("finalscore").BroadcastMessage("gameOver", score);
}



function addPoints(points: float) {
    score += Mathf.Floor(points);
    //print(score);
    Instantiate(great, Vector3(0, 1, 0), Quaternion.identity);
    if (claps.isPlaying) {
        claps.Stop();
    }
    claps.Play();
}
