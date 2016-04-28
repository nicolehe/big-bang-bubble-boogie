#pragma strict
import UnityEngine.SceneManagement;
var music: AudioSource;


/*
TO ADD A NEW LEVEL BY INSTANTIATING ONE MORE CIRCLE THAN BEFORE:

1) In update function: 
	a) Add an if statement to the final else to reflect the time range you'd like that level to represent
	b) Add an additional else statement and set level to next higest integer
2) In displayCircles function:
	a) Add a new else if statement to check for when lvl is equal to the integer created in 2b
	b) Add lines instantiating circles a number of times equal to this integer. The values in each Vector3 need to be changed by hand
3) PARTY
*/


var RedCircle: GameObject;
var GreenCircle: GameObject;
var YellowCircle: GameObject;
var WhiteCircle: GameObject;

var colors = ['red', 'green', 'white', 'yellow'];
var colorPick: String;

var lastTime: float = 0;

var level: int = 0;




//change this variable to make levels shorter or longer, in seconds
var timeBetweenLevels = 20;

//change this variable to give players more or less time to react, in seconds
var timeToReact = 5;

function Start() {
    music.pitch = 1;
}

function Update() {

    var counting = Time.timeSinceLevelLoad - lastTime;

    if (level == 1) {
        music.pitch = 1;
    } else if (level == 2) {
        music.pitch = 1.1;
    } else if (level == 3) {
        music.pitch = 1.2;
    }

//call function to instantiate circles at interval set by timeToReact variable
    if (counting > timeToReact) {
        displayCircles(level);
        lastTime = Time.timeSinceLevelLoad;
    }
 }

 function currentLevel(currentLevel : int) {
    level = currentLevel;
}


//display circles according to level passed in from update function
function displayCircles(lvl) {
	if(lvl == 1) {
		Instantiate(pickColor(), Vector3(0, 3, 0), Quaternion.identity);
	} else if(lvl == 2) {
		Instantiate(pickColor(), Vector3(-2, 3, 0), Quaternion.identity);
		Instantiate(pickColor(), Vector3(2, 3, 0), Quaternion.identity);
	} else if(lvl == 3) {
		Instantiate(pickColor(), Vector3(-4, 3, 0), Quaternion.identity);
		Instantiate(pickColor(), Vector3(0, 3, 0), Quaternion.identity);
		Instantiate(pickColor(), Vector3(4, 3, 0), Quaternion.identity);
	}
}

//choose a random color and return the one selected every time this function is called from displayCircles
function pickColor() : GameObject {

	var colorPick = colors[Random.Range(0, colors.length)];

    if (colorPick == 'green') {
    	return GreenCircle;
    } else if(colorPick == 'red') {
    	return RedCircle;
    } else if(colorPick == 'white') {
    	return WhiteCircle;
    } else if(colorPick == 'yellow') {
    	return YellowCircle;
    }
}