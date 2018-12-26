'use strict';

(function () {

    // maps
    window.initMap = function () {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 8,
            center: data[0].coords
        });
        var markers = [];
        // add markers
        for (let i = 0; i < data.length; i++) {
            markers[i] = new google.maps.Marker({
                position: data[i].coords,
                map: map
            });
            markers[i].addListener('click', function () {
                flkty.select(i);
            });
        }

        flkty.on('change', function (index) {
            smoothPanAndZoom(map, 16, data[index].coords);
        })
    }

    // mustache

    var templateSlide = document.getElementById('template-carousel').innerHTML;
    var carousel = document.querySelector('.main-carousel');

    Mustache.parse(templateSlide);
    var renderedTemplates = '';

    for (var i = 0; i < data.length; i++) {
        renderedTemplates += Mustache.render(templateSlide, data[i]);
    }
    carousel.innerHTML = renderedTemplates;

    // flickity carousel
    var elem = document.querySelector('.main-carousel');
    var flkty = new Flickity(elem, {
        cellAlign: 'left',
        contain: true,
        hash: true,
        pageDots: false
    });
    // scroll
    var progressBar = document.querySelector('.progress-bar');

    flkty.on('scroll', function (progress) {
        progress = Math.max(0, Math.min(1, progress));
        progressBar.style.width = progress * 100 + '%';
    });
    // button restart
    var btnRestart = document.querySelector('.restart-button');
    btnRestart.addEventListener('click', function () {
        flkty.select(0);
    });

    //center map smooth
    var smoothPanAndZoom = function (map, zoom, coords) {
        var jumpZoom = zoom - Math.abs(map.getZoom() - zoom);
        jumpZoom = Math.min(jumpZoom, zoom - 1);
        jumpZoom = Math.max(jumpZoom, 3);

        smoothZoom(map, jumpZoom, function () {
            smoothPan(map, coords, function () {
                smoothZoom(map, zoom);
            });
        });
    };

    var smoothZoom = function (map, zoom, callback) {
        var startingZoom = map.getZoom();
        var steps = Math.abs(startingZoom - zoom);

        if (!steps) {
            if (callback) {
                callback();
            }
            return;
        }

        var stepChange = -(startingZoom - zoom) / steps;

        var i = 0;
        var timer = window.setInterval(function () {
            if (++i >= steps) {
                window.clearInterval(timer);
                if (callback) {
                    callback();
                }
            }
            map.setZoom(Math.round(startingZoom + stepChange * i));
        }, 80);
    };

    var smoothPan = function (map, coords, callback) {
        var mapCenter = map.getCenter();
        coords = new google.maps.LatLng(coords);

        var steps = 12;
        var panStep = {
            lat: (coords.lat() - mapCenter.lat()) / steps,
            lng: (coords.lng() - mapCenter.lng()) / steps
        };

        var i = 0;
        var timer = window.setInterval(function () {
            if (++i >= steps) {
                window.clearInterval(timer);
                if (callback) callback();
            }
            map.panTo({
                lat: mapCenter.lat() + panStep.lat * i,
                lng: mapCenter.lng() + panStep.lng * i
            });
        }, 1000 / 30);
    };
})();