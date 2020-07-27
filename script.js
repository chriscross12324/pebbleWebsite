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

let gradientModule =
  `<div class="gradientHolder">
    <div id="gradientViewer" class="gradientViewer"></div>
    <h1 id="gradientName" class="gradientName">Green Lagoon</h1>
  </div>`;

function getGradients() {
  var SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwFkoSBTbmeB6l9iIiZWGczp9sDEjqX0jiYeglczbLKFAXsmtB1/exec";
  $(document).ready(function() {
    $.getJSON(SCRIPT_URL + "?action=getGradients",
              function(data) {
                try {
                  gradientJSON = JSON.parse(JSON.stringify(data));
                  pebbleLogo.src = "assets/images/icon_pebble_sunshine.png"
                  //console.log(gradientJSON);
                  //alert(Object.keys(gradientJSON.items).length);
                  //alert(gradientJSON.items.length);

                  for (var i = gradientJSON.items.length - 1; i >= 0; i--) {
                    var itemObject = gradientJSON.items[i];

                    var itemq = {}
                    item["gradientName"] = itemObject["gradientName"];
                    item["startColour"] = itemObject["startColour"];
                    item["endColour"] = itemObject["endColour"];
                    item["description"] = itemObject["description"];

                    //array[i]
                    //console.log(item);
                  }
                  let item = gradientJSON.reduce((acc, {gradientName}) =>
                        acc += `
                        <div class="gradientHolder">
                          <div id="gradientViewer" class="gradientViewer"></div>
                          <h1 id="gradientName" class="gradientName">Green Lagoon</h1>
                        </div>`, ``
                      );

                $('.content').append(item);
                } catch (e) {
                  console.log(e);
                }
              });
  });
}
