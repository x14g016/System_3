var passSec;//秒数カウント

function showPassage() {
	   passSec++; // カウントアップ
	}
function startShowing() {
	   passSec = 0; // カウンタのリセット
	   passSec = setInterval('showPassage()',1000); // タイマーをセット(1000ms間隔)
	}
function stopShowing() {
	   clearInterval(passSec);
		var sec = Math.floor(passSec/60);
		var minutes = passSec - (sec*60);
		document.getElementById("time").innerHTML = sec+":"+minutes;
		var timedata = {"a":"テスト","b":sec,"c":minutes};
		AFL.sendJson("Main",timedata,onJson);
	}

function onJson(datas){

}