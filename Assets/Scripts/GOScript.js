#pragma strict
var highScore: int;
var text: UnityEngine.UI.Text;
var score: int;
var thescore;

function Start () {
text = GetComponent(UnityEngine.UI.Text);
highScore = PlayerPrefs.GetInt("High Score");
}

function Update () {
	//print(highScore);
	//print(score);
    if (score > highScore) {
        highScore = score;
        PlayerPrefs.SetInt("High Score", highScore);
    }
    text.text = "YOUR SCORE: " + thescore + "\n\n HIGH SCORE: " + highScore;
}



function gameOver(score : int) {
    thescore = score;
    
}

function destroy() {
	Destroy(gameObject);
}
