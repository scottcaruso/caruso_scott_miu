//Scott Caruso
//MiU 1206
//Project 2 - Homepage JS file

//The below function gets the name of elements from the form.
function elementName(x){
   var elementName = document.getElementById(x);
   return elementName;              
};

function eraseCardData(){
	if(localStorage.length === 0){
		alert("There are no cards in your binder to clear.");
	} else {
		 var ask = confirm("Are you sure you want to erase all card data?");
			if(ask){
			localStorage.clear();
			alert("All cards have been removed from your binder.");
			window.location.reload();
			return false;
		};
	};
};

function fillWithJsonData(){
   if(localStorage.length === 0){
      var y = 1;
      for(var x in json){
         var id = y;
         localStorage.setItem(id, JSON.stringify(json[x]));
         y++;
      };
      alert("Dummy data has been added to local storage!");
   } else {
      var ask = confirm("There is already data in local storage. Would you like to clear that data and then add new dummy data?");
      if (ask){
         eraseCardData();
         fillWithJsonData();
         return false
      };
   };
};

//The below is a test function to use to verify that JS is working right in specific locations.
function testFunction(){
   alert("JS is working!")
};

//Turn what's in the search field into a string
function searchString(){
   if(localStorage.length === 0){
      alert("There is no data in Local Storage to search!");
   } else {
      var entry = elementName("searchbox");
      var searchText = entry.value;
      return searchText;
   };
};

//Parse Local Storage for the Search Text
function keywordSearch(){
   var searchText = searchString();
   var matches = [];
   for(var i=0, y=localStorage.length; i<y; i++){
      var key = localStorage.key(i);
      var value = localStorage.getItem(key);
      var obj = JSON.parse(value);
      var cardNameArray = obj.name;
      var cardName = cardNameArray[1];
      var doesSearchTermExist = cardName.match(searchText);
      if (doesSearchTermExist != null){
         matches.push(key);
      };
   };
   return matches;
};

function keywordRead(){
   clearSearchPage();
   var getKeywords = keywordSearch();
   if (getKeywords[0] === undefined){
      alert("There are no matches for this keyword.");
   } else {
      alert("We have found " + getKeywords.length + " matches for that keyword.");
      //var makeDiv = document.createElement("div");
      //makeDiv.setAttribute("id", "cards");
      var listCardsDL = document.createElement("dl");
      //makeDiv.appendChild(listCardsDL);
      var findDisplayDiv = elementName("displaybucket");
      findDisplayDiv.appendChild(listCardsDL);
      for(var i=0, y=getKeywords.length; i<y; i++){
         var cardValues = getKeywords;
         var makedt = document.createElement("dt");
         var editDeleteLinks = document.createElement("dd");
         listCardsDL.appendChild(makedt);
         var key = getKeywords[i];
         var value = localStorage.getItem(key);
         var obj = JSON.parse(value);
         var cardTitle = (obj.name[0] + " " + obj.name[1]);
         makedt.innerHTML = cardTitle;
         makedt.setAttribute("class", "cardtitle");
         makeCardTypeImage(obj.type[1],makedt);
         var makeCardDetails = document.createElement("dd");
         makedt.appendChild(makeCardDetails);
         delete obj.name;
         for(var n in obj){
            var makeCardDetailItem = document.createElement("dd");
            makeCardDetails.appendChild(makeCardDetailItem);
            var cardText = (obj[n][0] + " " + obj[n][1]);
            makeCardDetailItem.innerHTML = cardText;
            };
         };
      window.location="#display";
      };
};

function makeCardTypeImage(cardTypeName,makedt){
   var makeImageLine = document.createElement("dd");
   makedt.appendChild(makeImageLine);
   var makeImage = document.createElement("img");
   var imageSource = makeImage.setAttribute("src","img/" + cardTypeName + ".png");
   makeImageLine.appendChild(makeImage);
};

function clearSearchPage(){
   $('.displaybucket').empty();
};

function newsFeed(){
   clearSearchPage();
   if (localStorage.length === 0){
      alert("There are no cards saved in this binder to view.");
   } else {
      var findDisplayDiv = elementName("displaybucket");
      var listCardsDL = document.createElement("dl");
      listCardsDL.setAttribute("id", "listcards");
      findDisplayDiv.appendChild(listCardsDL);
      for(var y=localStorage.length; y>0; y--){
         var makedt = document.createElement("dt");
         makedt.setAttribute("id", "makedt");
         //var editDeleteLinks = document.createElement("dd");
         listCardsDL.appendChild(makedt);
         var key = y;
         var value = localStorage.getItem(key);
         var obj = JSON.parse(value);
         var cardTitle = (obj.name[0] + " " + obj.name[1]);
         makedt.innerHTML = cardTitle;
         makedt.setAttribute("class", "cardtitle");
         makeCardTypeImage(obj.type[1],makedt);
         var makeCardDetails = document.createElement("dd");
         makedt.appendChild(makeCardDetails);
         delete obj.name;
         for(var n in obj){
            var makeCardDetailItem = document.createElement("dd");
            makeCardDetailItem.setAttribute("class", "testclass");
            makeCardDetails.appendChild(makeCardDetailItem);
            var cardText = (obj[n][0] + " " + obj[n][1]);
            makeCardDetailItem.innerHTML = cardText;
            };
         };
      window.location="#display";
      };
};


//To get value from card type
function getCardType(){
   var buttons = document.forms[0].cardtype;
   for(var i=0; i<buttons.length; i++){
      if(buttons[i].selected){
         var typeValue = buttons[i].value;
      };
   };
   return typeValue
};

function saveCard() {
   var y = localStorage.length;
   var id = y+1;
   var cardColors = getCardColors();
   var cardType = getCardType();
   var card = {};
      card.name = ["Card Name:", elementName("cardname").value];
      card.usage = ["Currently In Use?", elementName("currentuse").value];
      card.type = ["Card Type:", cardType];
      card.mana = ["Mana Cost:", elementName("manacost").value];
      card.colors = ["Colors:", cardColors];
      card.notes = ["Notes:", elementName("comments").value];
      card.date = ["Date Acquired:", elementName("dateacquired").value];
   localStorage.setItem(id, JSON.stringify(card));
   alert(elementName("cardname").value + " has been added!");
   window.location.reload();
};

//To get colors
function getCardColors(){
   var colors = [];
   if(elementName("white").checked){
      colors.push("white");
   };
   if(elementName("black").checked){
      colors.push("black");
   };
   if(elementName("blue").checked){
      colors.push("blue");
   };
   if(elementName("red").checked){
      colors.push("red");
   };
   if(elementName("green").checked){
      colors.push("green");
   };    
   if(elementName("colorless").checked){
      colors.push("colorless");
   }; 
   return colors  
};

//Make things happen when the links are clicked.
var clearCardData = elementName("eraseData");
clearCardData.addEventListener("click", eraseCardData); 
var fillData = elementName("fillJsonData");
fillData.addEventListener("click", fillWithJsonData);
var searchButtonClick = elementName("searchbutton");
searchButtonClick.addEventListener("click", keywordRead);
var recentClick = elementName("recentcards");
recentClick.addEventListener("click", newsFeed);
var saveCardData = elementName("submit");
saveCardData.addEventListener("click", saveCard);
