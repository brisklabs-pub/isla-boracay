const exploreBaseURL = 'https://raw.githubusercontent.com/brisklabs/isla-boracay/main/datas/explore/';
const dealsBaseURL = 'https://raw.githubusercontent.com/brisklabs/isla-boracay/main/datas/deals/';
var coordinates = [11.969, 121.924];
var currentName = null;
var modal = elementBy('modal-popup');
var videoModal = elementBy('videoPopup');

const initialItems = 5;
const cardsToShowIncrement = 6;

window.onload = (event) => {
  // EXPLORE
  openExploreTab('eat');  
  
  const eat = elementBy('eat-tab');
  onClick(eat, ()=>{ 
    openExploreTab('eat'); 
    tagEvent('did_open_explore_eat');
  });

  const fun = elementBy('fun-tab');
  onClick(fun, ()=>{
    openExploreTab('fun'); 
    tagEvent('did_open_explore_fun');
  });

  const stay = elementBy('stay-tab');
  onClick(stay, ()=>{ 
    openExploreTab('stay');
    tagEvent('did_open_explore_stay');
  });
  
  const relax = elementBy('relax-tab');
  onClick(relax, ()=>{ 
    openExploreTab('relax');
    tagEvent('did_open_explore_relax');
  });
  
  const party = elementBy('party-tab');
  onClick(party, ()=>{ 
    openExploreTab('party');
    tagEvent('did_open_explore_party');
  });
  
  const shop = elementBy('shop-tab');
  onClick(shop, ()=>{ 
    openExploreTab('shop');
    tagEvent('did_open_explore_shop');
  });
  addExploreData('eat');
  addExploreData('fun');
  addExploreData('stay');
  addExploreData('relax');
  addExploreData('party');
  addExploreData('shop');

  // DEALS
  openDealTab('relax-deal');
  const activities_deal = elementBy('activities-deal-tab');
  onClick(activities_deal, ()=>{ 
    openDealTab('activities-deal');
    tagEvent('did_open_deals_activities');
  });
  
  const relax_deal = elementBy('relax-deal-tab');
  onClick(relax_deal, ()=>{ 
    openDealTab('relax-deal');
    tagEvent('did_open_deals_relax');
  });

  addDealsData('relax');
  addDealsData('activities');

  // Direction popup
  window.addEventListener('click', function(event) {
    if (event.target == modal) {
      modal.className = modal.className.replace(" open", "");
    }
  });
  // Video popup
  window.addEventListener('click', function(event) {
    if (event.target == videoModal) {
      videoModal.className = modal.className.replace(" open", "");
    }
  });
};

// EXPLORE
function addExploreData(type) {
  var request = new XMLHttpRequest();
  request.open('GET', exploreBaseURL + type +'.json', true);
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      var json = JSON.parse(request.responseText);
      let tab = elementBy(type + '-content');
      removeAllDOMChildren(tab);
      for (index in json) {
        const item = json[index];
        const row = exploreCardView(item, index);
        onClick(row, ()=>{
          openItem(item.name);
        });
        tab.appendChild(row);
        assignMagnificPopup();
      }
      const loadMore = elementBy('loadMore-'+type);
      onClick(loadMore, ()=> { 
        showCards(type);
        tagEvent('did_load_more_explore_'+type);
      });
    }
  };
  request.send();
}

function exploreCardView(item, index) {
  const card = document.createElement('div');
  card.setAttribute('class', 'card');
  card.setAttribute('id', item.name);
  // Load initial cound
  if (index <= initialItems) {
    card.setAttribute('style', `display:block; background-image:url(${item.thumbnail}); background-size: cover; background-position: center;`);
  } else {
    card.classList.add("fade-in");
    card.setAttribute('style', `display:none; background-image:url(${item.thumbnail}); background-size: cover; background-position: center;`);
  }

  const cardItem = document.createElement('div');
  cardItem.setAttribute('class', 'card-item');
  cardItem.innerHTML = `
    <h3 class="card-title">${item.name}</h3> 
    <p class="card-text">${item.address}</p>`;

  const cardMore = document.createElement('div');
  cardMore.setAttribute('class', 'card-more');
  cardMore.innerHTML = `<p class="card-text">${item.notes}</p>`;

  // Buttons
  const visitBtn =  document.createElement('button');
  visitBtn.setAttribute('class', 'card-btn');
  visitBtn.innerText = `VISIT`;
  // Direction
  const directionBtn =  document.createElement('button');
  directionBtn.setAttribute('class', 'card-btn');
  directionBtn.innerText = `DIRECTION`;

  cardMore.appendChild(visitBtn);
  cardMore.appendChild(directionBtn);
  
  if (item.video !== "") {
    // Video
    const videoBtn =  document.createElement('a');
    videoBtn.setAttribute('href', item.video);
    videoBtn.setAttribute('class', 'video-popup card-btn');
    videoBtn.innerText = "VIDEO";
    cardMore.appendChild(videoBtn);
  }
  cardItem.appendChild(cardMore);
  card.appendChild(cardItem);

  onClick(directionBtn, ()=> {
    openMapPopup(item.coordinates, item);
  });


  onClick(visitBtn, ()=> {
    window.open(item.link, "_blank");
  });

  return card;
}

function openItem(elementName) {
  if (currentName === elementName) {
    var c_currentCard = elementBy(elementName);
    const c_subElement = c_currentCard.querySelector('.card-item.clicked');
    const c_infoElement = c_subElement.querySelector('.card-more.clicked');
    c_subElement.className = c_subElement.className.replace(" clicked", "");
    c_infoElement.className = c_infoElement.className.replace(" clicked", "");
    currentName = null;
    return;
  }
  
  var cards = document.getElementsByClassName("card-item");
  for (i = 0; i < cards.length; i++) {
    cards[i].className = cards[i].className.replace(" clicked", "");
  }
  var subInfos = document.getElementsByClassName("card-more");
  for (i = 0; i < subInfos.length; i++) {
    subInfos[i].className = subInfos[i].className.replace(" clicked", "");
  }
  
  var currentCard = elementBy(elementName);
  const subElement = currentCard.querySelector('.card-item');
  const infoElement = subElement.querySelector('.card-more');
  subElement.className += " clicked";
  infoElement.className += " clicked";
  currentName = elementName;
}

// Function to open the popup
function openMapPopup(coordinates, item) {
  modal.className += ' open';
  var iframe = document.getElementById('my-iframe');
  var params = new URLSearchParams();
  params.append('lat', coordinates[0]);
  params.append('lon', coordinates[1]);
  params.append('name', item.name);
  params.append('address', item.address);
  var queryString = params.toString();
  iframe.src = "https://www.islaboracay.xyz/mapview.html?" + queryString;
}

// Function to open the popup
function openVideoPopup(url) {
  var videoIframe = document.getElementById("videoIframe");
  videoIframe.src = url;

  const videoPopup = elementBy('videoPopup');
  videoPopup.style.display = "block";
}

// DEALS
function addDealsData(type) {
  var request = new XMLHttpRequest();
  request.open('GET', dealsBaseURL + type +'.json', true);
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      var json = JSON.parse(request.responseText);
      let tab = elementBy(type + '-deal-content');
      removeAllDOMChildren(tab);
      for (index in json) {
        const item = json[index];
        const row = dealCardView(item);
        tab.appendChild(row);
      }
    }
  };
  request.send();
}

function dealCardView(item) {
  const card = document.createElement('div');
  card.setAttribute('class', 'card');
  card.setAttribute('style', `background-image:url(${item.thumbnail}); background-size: cover; background-position: center;`);
  card.innerHTML = `
    <div class ="card-item">
      <h3 class="card-title">${item.title}</h3>
      <p class="card-text">${item.company}</p>
      <button class="card-solid-btn">
        <a href=${item.link} target="_blank">READ MORE</a>
      </button>
    </div>`;
  return card;
}

function openExploreTab(page) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="main-tab-content " and hide them
  tabcontent = document.getElementsByClassName("explore-tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="main-tab-link" and remove the class "active"
  tablinks = document.getElementsByClassName("explore-tab-links");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  var selected = elementBy(page);
  selected.style.display = "block";
  var tab = elementBy(page + "-tab");
  tab.className += " active";
}

function openDealTab(page) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="main-tab-content " and hide them
  tabcontent = document.getElementsByClassName("deal-tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="main-tab-link" and remove the class "active"
  tablinks = document.getElementsByClassName("deal-tab-links");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  var selected = elementBy(page);
  selected.style.display = "block";
  var tab = elementBy(page + "-tab");
  tab.className += " active";
}

// Function to Load more (show/hide) the cards based on the count
function showCards(section) {
  // Card container
  const cardContainer = elementBy(section+"-content");
  // Get all the cards
  const cards = cardContainer.getElementsByClassName("card");
  // Calculate the next count of cards to show
  const currentCount = Array.from(cards).filter(card => getComputedStyle(card).display !== "none").length;
  const nextCount = currentCount + cardsToShowIncrement;
  for (let i = 0; i < cards.length; i++) {
    if (i < nextCount) {
      cards[i].style.display = "block";
      setTimeout(() => {
        cards[i].classList.add("show");
      }, 10);
    } else {
      cards[i].style.display = "none";
    }
  }

  // Hide the load more button if all cards are shown
  if (nextCount >= cards.length) {
    const loadMore = elementBy('loadMore-'+section);
    const loadmsg = elementBy('loadmsg-'+section);
    loadMore.style.display = "none";
    loadMore.style.opacity = 0;
    loadmsg.innerHTML = '<div class="alert alert-success">No more items to load.</div>';
    loadmsg.style.opacity = 1;
  }
}

function assignMagnificPopup() {
  $('.video-popup').magnificPopup({
    type: 'iframe',
    iframe: {
      patterns: {
        youtube: {
          index: 'youtube.com/',
          id: 'v=',
          src: 'https://www.youtube.com/embed/%id%?autoplay=1'
        },
        vimeo: {
          index: 'vimeo.com/',
          id: '/',
          src: 'https://player.vimeo.com/video/%id%?autoplay=1'
        },
        gmaps: {
          index: '//maps.google.',
          src: '%id%&output=embed'
        }
      }
    }
  });
}

// HELPHER METHOD
function elementBy(id) {
  return document.getElementById(id);
}

function onClick(element, action) {
    if (element) {
      element.addEventListener("click", action);
    }
}

function removeAllDOMChildren(parent) {
  if(parent) {
    // Create the Range object
    var rangeObj = new Range();
    // Select all of parent's children
    rangeObj.selectNodeContents(parent);
    // Delete everything that is selected
    rangeObj.deleteContents();
  }
}

function tagEvent(event_label) {
  gtag('event', 'Click', {
    'event_category': 'Button',
    'event_label': event_label
  });
}




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