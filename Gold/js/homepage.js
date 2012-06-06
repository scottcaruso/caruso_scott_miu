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
      for(var x in json){
         var id = Math.floor(Math.random()*3253533);
         localStorage.setItem(id, JSON.stringify(json[x]));
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

function displayCards(){
         if (localStorage.length === 0){
            var ask = confirm("There is no data in local storage. Would you like to populate it with default/dummy data?");
            if (ask) {
               fillWithJsonData();
            };
         };
         var makeDiv = document.createElement("div");
         makeDiv.setAttribute("id", "cards");
         var listCardsDL = document.createElement("dl");
         makeDiv.appendChild(listCardsDL);
         document.body.appendChild(makeDiv);
         for(var i=0, y=localStorage.length; i<y; i++){
            var makedt = document.createElement("dt");
            var editDeleteLinks = document.createElement("dd");
            listCardsDL.appendChild(makedt);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var obj = JSON.parse(value);
            var cardTitle = (obj.name[0] + " " + obj.name[1]);
            makedt.innerHTML = cardTitle;
            makedt.setAttribute("class", "cardtitle");
            //makeCardTypeImage(obj.type[1],makedt);
            var makeCardDetails = document.createElement("dd");
            makedt.appendChild(makeCardDetails);
            delete obj.name;
            for(var n in obj){
               var makeCardDetailItem = document.createElement("dd");
               makeCardDetails.appendChild(makeCardDetailItem);
               var cardText = (obj[n][0] + " " + obj[n][1]);
               makeCardDetailItem.innerHTML = cardText;
               //makeCardDetails.appendChild(editDeleteLinks);
            };
            //makeEditDeleteLinks(localStorage.key(i), editDeleteLinks);
         };
      };

//Take the user to a clean Add Item page
function addItemLink(){
   $.mobile.changePage("additem.html");
};
var addItem = elementName("addcard"); 
addItem.addEventListener("click",addItemLink);


//Make things happen when the links are clicked.
var clearCardData = elementName("eraseData");
clearCardData.addEventListener("click", eraseCardData); 
var fillData = elementName("fillJsonData");
fillData.addEventListener("click", fillWithJsonData);
//var showCards = elementName("white");
//showCards.addEventListener("click", displayCards);
