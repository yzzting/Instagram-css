var inputField = document.querySelector('.inputImg');

function pickSample(img) {
    updateSrc(img.src);
    inputField.value = img.getAttribute('src');
}

function updateSrc(src) {
    var imgs = document.querySelectorAll('.demoItem img')
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].src = src;
    }
}

function fileSelect(e) {
    e = e || window.event;
    var files = this.files;
    var p = document.getElementById('preview');

    for (var i = 0, f; f = files[i]; i++) {
        var reader = new FileReader();
        reader.onload = (function(file) {
            return function(e) {
                console.log(this.result);
                updateSrc(this.result);
            };
        })(f);
        //读取文件内容
        reader.readAsDataURL(f);
    }
}
document.getElementById('filename').addEventListener('change', fileSelect, false);

document.addEventListener('click', function(event) {
    if (/demoImg/.test(event.target.className)) {
        pickSample(event.target)
    }
}, false)
inputField.addEventListener("input", function() {
    updateSrc(this.value)
}, false)
inputField.addEventListener("focus", function() {
    this.select()
}, false)
pickSample(document.querySelector(".demoImg"))
