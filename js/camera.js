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

    var lat = localStorage.getItem("lat");
    var lng = localStorage.getItem("lng");
    initialize(lat,lng);
}

// google Map API を使い、地図を読み込み
function initialize(x,y) {
    document.getElementById("area_name").innerHTML = localStorage.getItem("point");
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
