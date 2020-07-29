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
  //pebbleText.innerText = "The time is: " + hours + ":" + minutes + ":" + seconds;
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
                      `<div class="gradientHolder">
                        <div class="gradientView${i}"><style>div.gradientView${i} {height: 170px; width: 130px; background-image: linear-gradient(145deg, ${itemObject.startColour}, ${itemObject.endColour});
                          box-shadow: 0px 4px 25px 0px ${itemObject.endColour}; border-radius: 20px; margin: auto; position: relative; z-index: 1;}</style></div>
                          <div class="infoHolder"><style>div.infoHolder {height: 200px; width: 400px; box-shadow: 0 10px 18px 12px #eeeeee; background: #ffffff;
                          text-align: center; border-radius: 1rem; position: relative; bottom: 65px; margin: auto;}</style>
                            <h2 class="gradientName"><style>h2.gradientName {top: 105px; position: relative;}</style>${itemObject.gradientName}</h2>
                            <div class="hexHolder">
                              <div class="startColourPreview"></div>
                              <h4 class="startColourHEX">#232323</h4>
                              <div class="endColourPreview"></div>
                              <h4 class="endColourHEX">#454545</h4>
                            </div>
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
