#pragma strict
import UnityEngine.SceneManagement;

public
var score: int; // The player's score.
var text: UnityEngine.UI.Text; // Reference to the Text component.
var boo: GameObject;
var claps: ParticleSystem;
var frowns: ParticleSystem;
var great: GameObject;
var thresh2: int;
var thresh3: int;
var thresh4: int;
var thresh5: int;
var thresh6: int;
var highScore: int;
var l1Done = false;
var l2Done = false;
var l3Done = false;
var l4Done = false;
var l5Done = false;
var l6Done = false;
var GO = false;

function Awake() {
    // Set up the reference.
    text = GetComponent(UnityEngine.UI.Text);
    // Reset the score.
    //score = 0;

    highScore = PlayerPrefs.GetInt("High Score");
    thresh2 = 150;
    thresh3 = 300;
    thresh4 = 450;
    thresh5 = 650;
    thresh6 = 850;

}



function Update() {
    print("l1 " + l1Done);
    print("l2" + l2Done);
    GameObject.Find("GameController").BroadcastMessage("keepScore", score);
    if (GO == false) {
        updateScore();
    }

    if (score > highScore) {
        highScore = score;
        PlayerPrefs.SetInt("High Score", highScore);
    }
    //print(Time.timeSinceLevelLoad);
    if (score < thresh2 && Time.timeSinceLevelLoad < 30) {
        print("level 1");
        l1Done = true;
        broadcast(1);
    } else if (score >= thresh2 && l2Done == false || Time.timeSinceLevelLoad >= 60 && l2Done == false) {
        print("level 2");
        l2Done = true;
        broadcast(2);
    } else if (score >= thresh3 && l3Done == false || Time.timeSinceLevelLoad >= 90 && l3Done == false) {
        print("level 3");
        broadcast(3);
    } else if (score >= thresh4 && l4Done == false || Time.timeSinceLevelLoad >= 120 && l4Done == false ) {
        print("level 3");
        broadcast(4);
    } else if (score >= thresh5 && l5Done == false || Time.timeSinceLevelLoad >= 150 && l5Done == false ) {
        print("level 3");
        broadcast(5);
    } else if (score >= thresh6 && l6Done == false || Time.timeSinceLevelLoad >= 180 && l6Done == false ) {
        print("level 3");
        broadcast(6);
    } else if (Time.timeSinceLevelLoad >= 175) {
        //GameObject.Find("GameController").BroadcastMessage("gameOver");
    }
}

function updateScore() {
    text.text = "Score: " + score;
}


function broadcast(lvl) {
        GameObject.Find("GameController").BroadcastMessage("currentLevel", lvl);
        GameObject.Find("LevelText").BroadcastMessage("currentLevel", lvl);
        GameObject.Find("SpaceMermaid").BroadcastMessage("currentLevel", lvl);
        GameObject.Find("Astrocrab").BroadcastMessage("currentLevel", lvl);
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
