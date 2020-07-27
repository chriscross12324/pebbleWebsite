var gradientJSON = [];

function updateTime() {
  var date = new Date();
  var hours = 0;
  var minutes = "0";
  var seconds = "0"
  if (date.getHours() > 12) {
    hours = date.getHours() - 12;
  } else {
    hours = date.getHours();
    if (hours == 0) {
      hours = 12
    }
  }

  if (date.getMinutes() < 10) {
    minutes = "0" + date.getMinutes();
  } else {
    minutes = date.getMinutes();
  }

  if (date.getSeconds() < 10) {
    seconds = "0" + date.getSeconds();
  } else {
    seconds = date.getSeconds();
  }
  pebbleText.innerText = "The time is: " + hours + ":" + minutes + ":" + seconds;
}

function getGradients() {
  var SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwFkoSBTbmeB6l9iIiZWGczp9sDEjqX0jiYeglczbLKFAXsmtB1/exec";
  $(document).ready(function() {
    $.getJSON(SCRIPT_URL + "?action=getGradients",
              function(data) {
                try {
                  gradientJSON = JSON.parse(JSON.stringify(data));
                  pebbleLogo.src = "assets/images/icon_pebble_sunshine.png"

                  let gradientModule =
                    `<div class="gradientHolder">
                      <div id="gradientViewer class="gradientViewer></div>
                      <h1 id="gradientName" class=gradientName></h1>
                    </div>`;
                  //console.log(gradientJSON);
                  //alert(Object.keys(gradientJSON.items).length);
                  //alert(gradientJSON.items.length);
                  //var template = document.getElementsByClassName("gradientHolder")[0];
                  let toAppend = '';

                  for (var i = gradientJSON.items.length - 1; i >= 0; i--) {
                    var itemObject = gradientJSON.items[i];

                    //var div = document.createElement("div");
                    //template.appendChild(div);
                    //var h1 = document.createElement("h1");
                    //h1.innerHTML = itemObject.gradientName;
                    //template.appendChild(h1);
                    toAppend +=
                      `<div class="gradientHolder"><style>div.gradientHolder {margin: auto; position: relative;}</style>
                        <div id="marginManager" class="marginManager"><style>div.marginManager {margin-top: 120px;}</style>
                          <div id="gradientViewer${i}" class="gradientViewer${i}"><style>div.gradientViewer${i} {height: 170px; width: 130px; background-image: linear-gradient(145deg, ${itemObject.startColour}, ${itemObject.endColour}); border: none;
                          border-radius: 20px;
                          margin: auto;}</style></div>
                          <h1 id="gradientName" class="gradientName">${itemObject.gradientName}</h1>
                        </div>
                      </div>`;


                    //var itemq = {}
                    //item["gradientName"] = itemObject["gradientName"];
                    //item["startColour"] = itemObject["startColour"];
                    //item["endColour"] = itemObject["endColour"];
                    //item["description"] = itemObject["description"];

                    //array[i]
                    //console.log(item);
                  }
                  $('.wrapper').empty().append(toAppend);
                } catch (e) {
                  console.log(e);
                }
              });
  });
}
