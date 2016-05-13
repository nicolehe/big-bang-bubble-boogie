#pragma strict
import UnityEngine.SceneManagement;

var bgColor: Color32;
var rg: int;


function Start() {
    rg = 255;
    bgColor = Color32(rg, rg, 255, 255);
}

function Update() {
	bgColor = Color32(rg, rg, 255, 255);
    GetComponent(SpriteRenderer).color = bgColor;
}

function changeBG() {
    rg -= 50;
}
