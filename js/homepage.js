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
      };
   };
};

//Make things happen when the links are clicked.
var clearCardData = elementName("eraseData");
clearCardData.addEventListener("click", eraseCardData); 
var fillData = elementName("fillJsonData");
fillData.addEventListener("click", fillWithJsonData);
