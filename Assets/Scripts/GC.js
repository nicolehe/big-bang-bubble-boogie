#pragma strict
import UnityEngine.SceneManagement;

var RedCircle: GameObject;
var GreenCircle: GameObject;
var YellowCircle: GameObject;
var BlueCircle: GameObject;
var lastTime: float = 0;


function Start() {

}

function Update() {
	//make a variable to keep track of how many seconds have elapsed since "lastTime"
    var counting = Time.timeSinceLevelLoad - lastTime;
    //every 5 seconds, run pickColor() and reset "lastTime"
    if (counting > 5) {
        pickColor();
        lastTime = Time.timeSinceLevelLoad;
    }


}

function pickColor() {
	//make an array of colors, then randomly pick one from the array
	var colors = ['red', 'green', 'blue', 'yellow'];
    var colorPick = colors[Random.Range(0, colors.length)];
    print (colorPick);
    //depending on what was picked, create an instance of that color circle
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



