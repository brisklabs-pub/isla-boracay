const baseURL = 'https://raw.githubusercontent.com/brisklabs/isla-boracay/main/datas/';
window.onload = (event) => {
  // Standing
  openExploreTab('eat');
  const eat = elementBy('eat-tab');
  onClick(eat, ()=>{ openExploreTab('eat'); });
  const fun = elementBy('fun-tab');
  onClick(fun, ()=>{ openExploreTab('fun'); });
  const stay = elementBy('stay-tab');
  onClick(stay, ()=>{ openExploreTab('stay'); });
  const relax = elementBy('relax-tab');
  onClick(relax, ()=>{ openExploreTab('relax'); });
  const party = elementBy('party-tab');
  onClick(party, ()=>{ openExploreTab('party');});
  const shop = elementBy('shop-tab');
  onClick(shop, ()=>{ openExploreTab('shop');});
  const directory = elementBy('emergency-tab');
  onClick(directory, ()=>{ openExploreTab('emergency');});

  addData('eat');
  addData('fun');
  addData('stay');
  addData('relax');
  addData('party');
  addData('shop');

  // DEALS
  openDealTab('relax-deal');
  const activities_deal = elementBy('activities-deal-tab');
  onClick(activities_deal, ()=>{ openDealTab('activities-deal');});
  const relax_deal = elementBy('relax-deal-tab');
  onClick(relax_deal, ()=>{ openDealTab('relax-deal');});
};

function addData(type) {
  const url = baseURL + type +'.json'
  fetch(url)
  .then((response) => response.json())
  .then((json) => {
    let tab = elementBy(type + '-content');
    removeAllDOMChildren(tab);
    for (index in json) {
      const item = json[index];
      const row = cardView(item);
      tab.appendChild(row);
    }
  });
}

function cardView(item) {
  const card = document.createElement('div');
  card.setAttribute('class', 'card');
  card.setAttribute('style', `background-image:url(${item.thumbnail}); background-size: cover; background-position: center;`);
  card.innerHTML = `
    <div class ="card-item">
      <h3 class="card-title">${item.name}</h3>
      <p class="card-text">${item.address}</p>
      <button class="card-btn">
        <a href=${item.link} target="_blank">VISIT</a>
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
  console.log( tablinks)
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
