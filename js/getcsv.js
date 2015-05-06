function loadcsv2(url) {
    var httpObj = new XMLHttpRequest();
    httpObj.open('GET',url+"?"+(new Date()).getTime(),false);
    // ?以降はキャッシュされたファイルではなく、毎回読み込むためのもの
    httpObj.send(null);
    var rows = httpObj.responseText.split("\r\n");
    var data = new Array();

    var n;
    for (n = 1; n < rows.length; n++) {
    	var fields = rows[n].split(",");

        var lat = parseFloat(fields[0]);
        var lng = parseFloat(fields[1]);
        var pop = parseFloat(fields[2]);
        var company = fields[3];
        var area = parseFloat(fields[4]);
        data.push({'lat': lat, 'lng': lng, 'pop': pop, 'company': company, 'area': area});
        // console.log(data[n-1]);
    }
    return data;
}
