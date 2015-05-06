var message;
var cityCircle;
//CSVのデータから緯度を取得する
var result = loadcsv2('./csvdata/planking.csv');

// 観光名所の位置情報と人気度
var citymap = new Array();

for(var i=0; i<=result.length-1; i++){
    citymap[i] = {
        //緯度 lat, 経度 lng
        center: new google.maps.LatLng(result[i].lat, result[i].lng),
        population: result[i].pop,
        company: result[i].company,
        area: result[i].area
    };
}

function start_func(){
    callPickActivity();
}

function pickImageError() {
    console.log("error!!!!");
}

function imagePicked() {
	//写真を撮ってキャンバス上に描画
    var url = window.URL.createObjectURL(this.result.blob);
    var photo = new Image();
    photo.src = url;
    photo.onload = function() {
        var canvas = document.getElementById('canvassample');
        var context = canvas.getContext('2d');
        context.drawImage(photo, 0, 0, 480, 800);
    };
    get_location();//位置情報の取得
}

// ( 1 )位置情報を取得します。
function get_location(){
  if (navigator.geolocation) {
        // 現在の位置情報取得を実施 正常に位置情報が取得できると、
        // successCallbackがコールバックされます。
        navigator.geolocation.getCurrentPosition
        (successCallback,errorCallback);
    } else {
        console.log("error")
    }
}

// ( 2 )位置情報が正常に取得されたら
function successCallback(pos) {
	var Potition_latitude = pos.coords.latitude; //緯度
	var Potition_longitude = pos.coords.longitude;　//軽度

    // 位置情報が取得出来たらGoogle Mapを表示する
    initialize(Potition_latitude,Potition_longitude);
}

function errorCallback(error) {
  console.log("error");
}

// ( 3 )Google Map API を使い、地図を読み込み
function initialize(x,y) {

    // Geolocationで取得した座標を代入
    // デバッグのためUSJで固定
     // var myLatlng = new google.maps.LatLng(34.664722, 135.433056);
    var myLatlng = new google.maps.LatLng(x,y);

	var min;
	var count;

	for( var i = 0; i < citymap.length; i++){
		var distance = google.maps.geometry.spherical.computeDistanceBetween(citymap[i].center, myLatlng);
		if( i == 0 ){
			min = distance;
			count = i;
   		 } else {
   		 	if( min > distance ){
   		 		min = distance;
   		 		count = i;
   		 	}
   		 }
   	}

  var radius = Math.sqrt(citymap[count].area/Math.PI);
  var point = 0;
  if(min<radius){

    point = citymap[count].population;
  }
     document.getElementById("area_name").innerHTML = point;


}



function callPickActivity() {//写真撮る前段階（カメラを選ぶ段階）
    if (MozActivity) {
        var pick = new MozActivity({
            name: "pick",
            data: {
                type: ["image/png", "image/jpg", "image/jpeg"]
            }
        });
        pick.onsuccess = imagePicked;
        pick.onerror = pickImageError;
    }
}
