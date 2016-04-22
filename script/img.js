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

document.addEventListener('click',function(event){
    if (/demoImg/.test(event.target.className)) {
        pickSample(event.target)
    }
},false)
// inputField.addEventListener("input", function() {
//     updatesrc(this.value)
// }, false)
// inputField.addEventListener("focus", function() {
//     this.select()
// }, false)
pickSample(document.querySelector(".demoImg"))
