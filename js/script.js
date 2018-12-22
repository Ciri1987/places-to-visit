'use strict';

// mustache

var templateSlide = document.getElementById('template-carousel').innerHTML;
var carousel = document.querySelector('.main-carousel');

Mustache.parse(templateSlide);
var renderedTemplates = '';

for (var i = 0; i < data.length; i++) {
    renderedTemplates += Mustache.render(templateSlide, data[i]);
}
carousel.innerHTML = renderedTemplates;

var elem = document.querySelector('.main-carousel');
var flkty = new Flickity(elem, {
    // options
    imagesLoaded: true,
    cellAlign: 'left',
    pageDots: false,
    contain: true,
    hash: true,
});

// Use progress bar scroll

var progressBar = document.querySelector('.progress-bar');
flkty.on('scroll', function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + '%';
});


var buttonGroup = document.querySelector('.button-group');

var buttons = buttonGroup.querySelectorAll('.restart-button');

buttons = fizzyUIUtils.makeArray(buttons);
buttonGroup.addEventListener('click', function (event) {
    // filter for button clicks
    if (!matchesSelector(event.target, '.restart-button')) {
        return;
    }
    var index = buttons.indexOf(event.target);
    flkty.select(index);
});


(function () {

    window.initMap = function () {

        var map = new google.maps.Map(
            document.getElementById('map'), {
                zoom: 6,
                center: data[0].coords
            });
        var markers = [];
        // add markers
        for (var i = 0; i < data.length; i++) {
            markers[i] = new google.maps.Marker({
                position: data[i].coords,
                map: map
            });
            markers[i].addListener('click', function () {

            });
        }

    }
})();