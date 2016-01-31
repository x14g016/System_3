/*
 * おまじない
 */
enchant();

/*
 * 定数
 */

// パラメータ
var SCREEN_WIDTH = 800; // 横幅
var SCREEN_HEIGHT = 600; // 縦幅

// 画像
// 部屋
var ROOM1_IMAGE = "nouth.png";
var ROOM2_IMAGE = "east.png";
var ROOM3_IMAGE = "south.png";
var ROOM4_IMAGE = "west.png";
var ROOM5_IMAGE = "quebig.png";

// アセットリスト
var ASSETS = [ ROOM1_IMAGE, ROOM2_IMAGE, ROOM3_IMAGE, ROOM4_IMAGE, ROOM5_IMAGE, ];

/*
 * グローバル変数
 */
var game = null;

/*
 * 汎用処理
 */
// ランダム値生成
var randfloat = function(min, max) {
	return Math.random() * (max - min) + min;
};

/*
 * メイン処理
 */
window.onload = function() {
	// ゲームオブジェクトの生成
	game = new Game(SCREEN_WIDTH, SCREEN_HEIGHT);
	var isTouch = false; // タッチフラグ(タッチ中のみ true にする)
	var touchX = null; // タッチX座標
	var touchY = null; // タッチY座標

	game.preload(ASSETS);
	// 矢印
	game.preload("migi.png");
	game.preload("hidari.png");
	game.preload("back.png");
	// 扉
	game.preload("doorr.png");
	game.preload("dooropen.png");
	// 外
	// game.preload("http://jsrun.it/assets/a/M/t/e/aMteN.png");
	// 謎
	game.preload("que.png");
	game.preload("switchaON.png");
	game.preload("switchaOFF.png");
	game.preload("switchwON.png");
	game.preload("switchwOFF.png");
	game.preload("switchcON.png");
	game.preload("switchcOFF.png");



	// ゲーム開始時の処理
	game.onload = function() {

		var scene = game.rootScene;
		scene.backgroundColor = "black";
		// 配列
		var item = Array();

		var e = 3;

		var a = 0;
		var w = 0;
		var c = 0;

		// timeLabel = new TimeLabel(600,800);
		// timeLabel.time = 0;
		// game.rootScene.addChild(timeLabel);

		var view1 = 1;
		Room(view1);

		// 部屋の絵表示
		function Room(view) {

			switch (view) {
			case 1:
				var room1 = new Sprite(800, 600);
				room1.image = game.assets[ROOM1_IMAGE];
				room1.moveTo(10, 20);
				scene.addChild(room1);
				Right();
				Left();
				Door();
				break;
			case 2:
				var room2 = new Sprite(800, 600);
				room2.image = game.assets[ROOM2_IMAGE];
				room2.moveTo(10, 20);
				scene.addChild(room2);
				Right();
				Left();
				break;
			case 3:
				var room3 = new Sprite(800, 600);
				room3.image = game.assets[ROOM3_IMAGE];
				room3.moveTo(10, 20);
				scene.addChild(room3);
				Right();
				Left();
				Key();
				break;
			case 4:
				var room4 = new Sprite(800, 600);
				room4.image = game.assets[ROOM4_IMAGE];
				room4.moveTo(10, 20);
				scene.addChild(room4);
				Right();
				Left();
				break;
			case 5:
				var queb = new Sprite(800, 600);
				queb.image = game.assets[ROOM5_IMAGE];
				scene.addChild(queb);
				QueA();
				QueW();
				QueC();
				Back();
				break;
			}

			// 右
			function Right() {
				var right = new Sprite(102, 85);
				right.image = game.assets["migi.png"];
				right.moveTo(700, 225);
				scene.addChild(right);

				right.ontouchstart = function() {
					switch (view) {
					case 1:
						Room(2);
						break;
					case 2:
						Room(3);
						break;
					case 3:
						Room(4);
						break;
					case 4:
						Room(1);
						break;
					}
				};
			}

			// 左
			function Left() {
				var left = new Sprite(102, 85);
				left.image = game.assets["hidari.png"];
				left.moveTo(20, 225);
				scene.addChild(left);

				left.ontouchstart = function() {
					switch (view) {
					case 1:
						Room(4);
						break;
					case 2:
						Room(1);
						break;
					case 3:
						Room(2);
						break;
					case 4:
						Room(3);
						break;
					}
				};
			}

			// 後退


			function Back() {

				var back = new Sprite(102, 85);
				back.image = game.assets["back.png"];
				back.moveTo(350, 500);
				scene.addChild(back);

				back.ontouchstart = function() {
					Room(3);
				}

			}

			function Door() {
				var door = new Sprite(125, 196);
				if (a == 1 && w == 0 && c == 0) {
					// var door2 = new Sprite(125, 196);
					door.image = game.assets["dooropen.png"];
				}else{
				door.image = game.assets["doorr.png"];}
				door.moveTo(355, 260);
				scene.addChild(door);

				door.ontouchstart = function() {
					if (a == 1 && w == 0 && c == 0) {
						stopShowing();
						location.href = "/home/akira/Workbench/SystemProject/System_2/start.html";
					}
					;
				}
			}
			function Key() {
				if (e == 3) {
					var key = new Sprite(309, 143);
					key.image = game.assets["que.png"];
					key.moveTo(270, 200);
					scene.addChild(key);

					key.ontouchstart = function() {
						Room(5);
					};
				}
			}

			function QueA() {
				var aswi = new Sprite(100, 171);
				if (a == 0) {
					aswi.image = game.assets["switchaOFF.png"];
				} else {
					aswi.image = game.assets["switchaON.png"];
				}
				aswi.moveTo(25, 175);
				scene.addChild(aswi);

				aswi.ontouchstart = function() {
					if (a == 0) {
						aswi.image = game.assets["switchaON.png"];
						a = 1;
					} else {
						aswi.image = game.assets["switchaOFF.png"];
						a = 0;
					}
				}
			}

			function QueW() {

				var wswi = new Sprite(100, 171);
				if (w == 0) {
					wswi.image = game.assets["switchwOFF.png"];
				} else {
					wswi.image = game.assets["switchwON.png"];
				}
				wswi.moveTo(125, 175);
				scene.addChild(wswi);

				wswi.ontouchstart = function() {

					if (w == 0) {
						wswi.image = game.assets["switchwON.png"];
						w = 1;
					} else {
						wswi.image = game.assets["switchwOFF.png"];
						w = 0;
					}
				}
			}

			function QueC() {

				var cswi = new Sprite(100, 171);
				if (c == 0) {
					cswi.image = game.assets["switchcOFF.png"];
				} else {
					cswi.image = game.assets["switchcON.png"];
				}
				cswi.moveTo(225, 175);
				scene.addChild(cswi);

				cswi.ontouchstart = function() {

					if (c == 0) {
						cswi.image = game.assets["switchcON.png"];
						c = 1;
					} else {
						cswi.image = game.assets["switchcOFF.png"];
						c = 0;
					}
				}
			}


			return;
		}
	}
	startShowing();
	game.start();
}
