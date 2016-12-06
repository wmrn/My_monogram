//http://d.hatena.ne.jp/nakamura001/20110704/1309799515
//var rad=0;
var num = 0;

function Update () {
	var filename;
	//rad += 20;
	if (num <= 24) {
		//transform.Rotate(0, 5, 0);
		filename = "Assets/cap/"+num+".png";
		Application.CaptureScreenshot(filename);
		print(filename);
	}
	num++;
}