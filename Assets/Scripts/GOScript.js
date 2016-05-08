#pragma strict
var highScore: int;
var text: UnityEngine.UI.Text;
var score: int;
var thescore: int;

function Start () {
text = GetComponent(UnityEngine.UI.Text);
highScore = PlayerPrefs.GetInt("High Score");
}

function Update () {
	print(highScore);
	print(thescore);
    if (thescore > highScore) {
        highScore = thescore;
        PlayerPrefs.SetInt("High Score", highScore);
    }
    text.text = "YOUR SCORE: " + thescore + "\n\n HIGH SCORE: " + highScore;
    
}



function gameOver(score : int) {
    thescore = score;
    print(thescore);
    
}

function destroy() {
	Destroy(gameObject);
}
