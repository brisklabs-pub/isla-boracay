/**********************

custom.js
=============

Author:  Gino Aliaj
Template: Swimmerland - Water Park HTML Template
Version: 1.0

Author URI: gnodesign.com
***************************/


(function ($) {

    "use strict";


    $(window).on('load', function () {
        /*----------------------------------------------------
          LOADING PAGE
        ----------------------------------------------------*/
    }); // end of window load function





    $(document).ready(function () {

        /*----------------------------------------------------
          INITIALIZE WOW
        ----------------------------------------------------*/
        new WOW().init();

        /*----------------------------------------------------
          EXPLORE SECTION
        ----------------------------------------------------*/

        /*----------------------------------------------------
          INITIALIZE SWIPER
        ----------------------------------------------------*/
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplay: 7000,
            loop: true,
            simulateTouch: false
        });



        /*----------------------------------------------------
          SCROLL DOWN
        ----------------------------------------------------*/
        var $scrolldown = $('.scroll-down a');

        $scrolldown.on('click', function (e) {
            e.preventDefault();

            var target = this.hash;
            var $target = $(target);

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, 1300, function () {
                window.location.hash = target;
            });
        });



        /*----------------------------------------------------
          SHUFFLE IMAGE GALLERY
        ----------------------------------------------------*/

        var shuffleme = (function ($) {
            'use strict';
            var $grid = $('#grid'), //locate what we want to sort 
                $filterOptions = $('.gallery-sorting li'), //locate the filter categories
                $sizer = $grid.find('.shuffle_sizer'), //sizer stores the size of the items

                init = function () {

                    // None of these need to be executed synchronously
                    setTimeout(function () {
                        listen();
                        setupFilters();
                    }, 100);

                    // initialize the plugin
                    $grid.shuffle({
                        itemSelector: '[class*="col-"]',
                        sizer: $sizer,
                        speed: 300
                    });
                },



                // Set up button clicks
                setupFilters = function () {
                    var $btns = $filterOptions.children();
                    $btns.on('click', function (e) {
                        e.preventDefault();
                        var $this = $(this),
                            isActive = $this.hasClass('active'),
                            group = isActive ? 'all' : $this.data('group');

                        // Hide current label, show current label in title
                        if (!isActive) {
                            $('.gallery-sorting li a').removeClass('active');
                        }

                        $this.toggleClass('active');

                        // Filter elements
                        $grid.shuffle('shuffle', group);
                    });

                    $btns = null;
                },


                // Re layout shuffle when images load. This is only needed
                // below 768 pixels because the .picture-item height is auto and therefore

                listen = function () {
                    var debouncedLayout = $.throttle(300, function () {
                        $grid.shuffle('update');
                    });

                    // Get all images inside shuffle
                    $grid.find('img').each(function () {
                        var proxyImage;

                        // Image already loaded
                        if (this.complete && this.naturalWidth !== undefined) {
                            return;
                        }

                        // If none of the checks above matched, simulate loading on detached element.
                        proxyImage = new Image();
                        $(proxyImage).on('load', function () {
                            $(this).off('load');
                            debouncedLayout();
                        });

                        proxyImage.src = this.src;
                    });

                    setTimeout(function () {
                        debouncedLayout();
                    }, 500);
                };

            return {
                init: init
            };
        }(jQuery));

        shuffleme.init(); //filter portfolio


        /*----------------------------------------------------
          MAGNIFIC POP UP
        ----------------------------------------------------*/

        $('section#gallery .gallery-items').each(function () { // the containers for all your galleries
            $(this).magnificPopup({
                delegate: 'a', // the selector for gallery item
                type: 'image',
                mainClass: 'mfp-fade',

                gallery: {
                    enabled: true
                },

                retina: {
                    ratio: 1, // Increase this number to enable retina image support.
                    replaceSrc: function (item, ratio) {
                        return item.src.replace(/\.\w+$/, function (m) {
                            return '@2x' + m;
                        });
                    }
                },

                zoom: {
                    enabled: true, // change to 'false' if you want to disable the zoming effect
                    duration: 300, // duration of the effect, in milliseconds
                    easing: 'ease-in-out', // CSS transition easing function
                    opener: function (openerElement) {
                        return openerElement.is('img') ? openerElement : openerElement.find('img');
                    }
                }

            });
        });

        // $('.popup-video').magnificPopup({
        //     type: 'iframe',
        //     mainClass: 'mfp-fade',

        //     iframe: {
        //         markup: '<div class="mfp-iframe-scaler">' +
        //             '<div class="mfp-close"></div>' +
        //             '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
        //             '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button

        //         patterns: {
        //             youtube: {
        //                 index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

        //                 id: 'v=', // String that splits URL in a two parts, second part should be %id%
        //                 // Or null - full URL will be returned
        //                 // Or a function that should return %id%, for example:
        //                 // id: function(url) { return 'parsed id'; }

        //                 src: '//www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
        //             },
        //             vimeo: {
        //                 index: 'vimeo.com/',
        //                 id: '/',
        //                 src: '//player.vimeo.com/video/%id%?autoplay=1'
        //             },
        //             gmaps: {
        //                 index: '//maps.google.',
        //                 src: '%id%&output=embed'
        //             }

        //             // you may add here more sources

        //         },

        //         srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
        //     }
        // });


        /*----------------------------------------------------
          PARTNERS OWL SLIDER
        ----------------------------------------------------*/
        $('.partners-slider').owlCarousel({
            // Most important features
            items: 6,
            itemsDesktop: [1199, 6],
            itemsDesktopSmall: [992, 4],
            itemsTablet: [768, 3],
            itemsTabletSmall: false,
            itemsMobile: [479, 2],

            //Basic Speeds
            slideSpeed: 200,
            paginationSpeed: 800,

            //Autoplay
            autoPlay: 8000,
            stopOnHover: false,

            // Navigation
            navigation: false,
            navigationText: ["prev", "next"],
            rewindNav: true,
            scrollPerPage: false,

            //Pagination
            pagination: true,

            // Responsive 
            responsive: true,
            responsiveRefreshRate: 200
        });

       
    }); //end of document ready function

})(jQuery);