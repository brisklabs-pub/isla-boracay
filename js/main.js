const exploreBaseURL = 'https://raw.githubusercontent.com/brisklabs/isla-boracay/main/datas/explore/';
const dealsBaseURL = 'https://raw.githubusercontent.com/brisklabs/isla-boracay/main/datas/deals/';

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
  
  // const directory = elementBy('emergency-tab');
  // onClick(directory, ()=>{ openExploreTab('emergency');});

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
        const row = exploreCardView(item);
        onClick(row, ()=>{
          openItem(item.name);
        });
        tab.appendChild(row);
      }
    }
  };
  request.send();
}

function exploreCardView(item) {
  const card = document.createElement('div');
  card.setAttribute('class', 'card');
  card.setAttribute('id', item.name);
  card.setAttribute('style', `background-image:url(${item.thumbnail}); background-size: cover; background-position: center;`);
  card.innerHTML = `
    <div class ="card-item">
      <h3 class="card-title">${item.name}</h3>
      <p class="card-text">${item.address}</p>
      <div class="card-more">
        <p class="card-text">${item.notes}</p>
        <button class="card-btn">
          <a href=${item.link} target="_blank">VISIT</a>
        </button>
        <button class="card-btn">
          <a href=${item.link} target="_blank">DIRECTION</a>
        </button>
      </div>
    </div>`;
  return card;
}

function openItem(elementName) {
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
