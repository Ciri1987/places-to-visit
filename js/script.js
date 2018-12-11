var elem = document.querySelector('.main-carousel');
var progressBar = document.querySelector('.progress-bar');
var buttonGroup = document.querySelector('.button-group');
var buttons = buttonGroup.querySelectorAll('.restart-button');

var flkty = new Flickity(elem, {
    // options
    imagesLoaded: true,
    cellAlign: 'left',
    pageDots: false,
    contain: true,
    hash: true,
});

// Use progress bar scroll


flkty.on('scroll', function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + '%';
});

buttons = fizzyUIUtils.makeArray(buttons);
buttonGroup.addEventListener('click', function (event) {
    // filter for button clicks
    if (!matchesSelector(event.target, '.restart-button')) {
        return;
    }
    var index = buttons.indexOf(event.target);
    flkty.select(index);
});