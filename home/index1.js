(function() {
    var img = new Image();
    img.src = "banner.jpg"
    img.onload = () => {
        var ctx = document.querySelector("#canvas").getContext("2d");
        ctx.drawImage(img, 0, 0, 1920, 1080, 0, 0, 1920, 1080);
        var data = ctx.getImageData(0, 0, 1920, 1080).data;
        for (var i = 0; i < 1080; i += 1) {
            for (var j = 0; j < 1920; j += 1) {
                var index = i * 1920 * 4 + j * 4;
                if (data[index] == 0 && data[index + 1] == 0 && data[index + 2] == 0 && data[index + 3] == 0) {
                    data[index] = 1;
                    data[index + 1] = 1;
                    data[index + 2] = 1;
                    data[index + 3] = 1;
                    return;
                }
            }
        }
        cxt.putImageData(data, 0, 0);
    }
})()