window.onload = (event) => {
  // Standing
  openTab('eat');
  const eat = elementBy('eat-tab');
  onClick(eat, ()=>{ openTab('eat'); });
  const fun = elementBy('fun-tab');
  onClick(fun, ()=>{ openTab('fun'); });
  const stay = elementBy('stay-tab');
  onClick(stay, ()=>{ openTab('stay'); });
  const relax = elementBy('relax-tab');
  onClick(relax, ()=>{ openTab('relax'); });
  const party = elementBy('party-tab');
  onClick(party, ()=>{ openTab('party');});

  addData();
};


function addData() {
  var eatData = JSON.parse('eats.json');
  let tab = elementBy('eat');
  for (item in eatData) {
    console.log(item);
  }


}

function openTab(page) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="main-tab-content " and hide them
  tabcontent = document.getElementsByClassName("main-tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="main-tab-link" and remove the class "active"
  tablinks = document.getElementsByClassName("main-tab-links");
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
