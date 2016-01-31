//ページ読み込みイベントに登録
document.addEventListener("DOMContentLoaded", main, false);

var datam0;

function main(){



	function onRecv(datas){
		datam0 = datas[0];
		var data1 = datas[1];
		var data2 = datas[2];
		var data3 = datas[3];
		var data4 = datas[4];
	}
//	{
//		//データ送信
//		var timedata = {"a":null,"b":null,"c":null};
//		AFL.sendJson("Ajax10",sendData,onRecv);
//	}

		var timedata = {"a":null,"b":null,"c":null};
		AFL.sendJson("Main",timedata,onRecv);
}