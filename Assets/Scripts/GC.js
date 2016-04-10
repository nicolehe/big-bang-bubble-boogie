#pragma strict
import UnityEngine.SceneManagement;

var RedCircle: GameObject;
var GreenCircle: GameObject;
var YellowCircle: GameObject;
var BlueCircle: GameObject;
var lastTime: float = 0;
var score: float = 0;

function Start() {

}

function Update() {
    var counting = Time.timeSinceLevelLoad - lastTime;

    if (counting > 5) {
        pickColor();
        lastTime = Time.timeSinceLevelLoad;
    }


}

function pickColor() {
	var colors = ['red', 'green', 'blue', 'yellow'];
    var colorPick = colors[Random.Range(0, colors.length)];
    print (colorPick);
    if (colorPick == "green") {
        Instantiate(GreenCircle, Vector3(0, 3, 0), Quaternion.identity);
    } else if (colorPick == "red") {
        Instantiate(RedCircle, Vector3(0, 3, 0), Quaternion.identity);
    } else if (colorPick == "blue") {
        Instantiate(BlueCircle, Vector3(0, 3, 0), Quaternion.identity);
    } else {
        Instantiate(YellowCircle, Vector3(0, 3, 0), Quaternion.identity);
    } 

}

function addPoints() {
	score += 10;
	print(score);

}

function minusPoints() {
	score -= 5;
	print(score);

}

