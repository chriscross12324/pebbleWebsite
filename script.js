var gradientJSON = [];

$('.gradientDetails').hide();
$(".gradientDetails").animate({opacity: 0}, 200);

function getGradients() {
  var SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwFkoSBTbmeB6l9iIiZWGczp9sDEjqX0jiYeglczbLKFAXsmtB1/exec";
  $(document).ready(function() {
    $.getJSON(SCRIPT_URL + "?action=getGradients",
      function(data) {
        try {
          gradientJSON = JSON.parse(JSON.stringify(data));
          pebbleLogo.src = "assets/images/icon_pebble_sunshine.png"

          let toAppend = '';

          for (var i = gradientJSON.items.length - 1; i >= 0; i--) {
            var itemObject = gradientJSON.items[i];

            // toAppend +=
            //   `<div class="gradientHolder"><style>div.gradientHolder {position: relative;}</style>
            //             <div class="gradientView${i}"><style>div.gradientView${i} {height: 170px; width: 130px; background-image: linear-gradient(145deg, ${itemObject.startColour}, ${itemObject.endColour});
            //               box-shadow: 0px 4px 8px 0px ${itemObject.endColour}; border-radius: 20px; margin: auto; position: relative; z-index: 1;}</style></div>
            //               <div class="infoHolder"><style>div.infoHolder {height: 200px; box-shadow: 0 10px 18px 12px #eeeeee; background: #ffffff;
            //               text-align: center; border-radius: 1rem; position: relative; bottom: 65px; margin: auto;}</style>
            //                 <h2 class="gradientName"><style>h2.gradientName {top: 105px; position: relative; font-family: "GoogleSansBold";}</style>${itemObject.gradientName}</h2>
            //                 <div class="hexHolder">
            //                   <div class="startColourPreview"></div>
            //                   <h4 class="startColourHEX">#232323</h4>
            //                   <div class="endColourPreview"></div>
            //                   <h4 class="endColourHEX">#454545</h4>
            //                 </div>
            //               </div>
            //           </div>`;

            toAppend += `
            <div class="gradientHolder" id="gradientHolder" data-value="${i}"><style>div.gradientHolder {
              position: relative; transition: 0.2s;
            } div.gradientHolder:hover {
              transform: scale(1.1, 1.1);
            }</style>
              <div class="gradientView${i}"><style>div.gradientView${i} {
                height: 170px; width: 130px; background-image: linear-gradient(145deg, ${itemObject.startColour}, ${itemObject.endColour});
                box-shadow: 0px 4px 8px 0px ${itemObject.endColour}; border-radius: 20px; margin: auto; position: relative; z-index: 1; cursor: pointer;
              }</style></div>
              <div class="infoHolder"><style>div.infoHolder {
                height: 200px; box-shadow: 0px 10px 18px 12px #eeeeee; background: #ffffff; text-align: center; border-radius: 1rem;
                position: relative; bottom: 65px; margin: auto; cursor: pointer;
              }</style>
                <h2 class="gradientName">${itemObject.gradientName}<style>h2.gradientName {
                  display: -webkit-box;
                  top: 100px; position: relative; font-family: "GoogleSansBold";
                  overflow: hidden; text-overflow: ellipsis; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
                  margin-left: 25px; margin-right: 25px;
                }</style></h2>
              </div>
            </div>
            `;

            $(".wrapper").delay(200).animate({opacity: 1}, 500);
            $(".pebbleGroup").animate({opacity: 0}, 200);
            //$(".pebbleGroup").delay(300).hide();

          }
          $('.wrapper').empty().append(toAppend);
        } catch (e) {
          console.log(e);
        }
      });
  });
}

$('.pebbleGroup').click(function (event) {
  event.preventDefault();
  console.log('bruh');
});

$('.wrapper').on('click', '.gradientHolder', function(event) {
  event.preventDefault();
  var position = $(this).data('value');
  var name = gradientJSON.items[position].gradientName;
  var start = gradientJSON.items[position].startColour;
  var end = gradientJSON.items[position].endColour;
  var description = gradientJSON.items[position].description;
  $('.gradientDetails').show();
  $(".gradientDetails").animate({opacity: 1}, 200);
  $('.detailsGradientViewer').css({'background-image': 'linear-gradient(145deg,' + start +',' + end +')', 'box-shadow': '0px 4px 8px 0px' + end});
  $('.detailsGradientName').text(name);
  $('.detailsGradientDescription').text(description);
  //console.log(document.getElementsByClass('gradientHolder').getAttribute('data-myValue'));
  console.log(start);
  console.log(end);
});

$('.buttonClosePopup').click(function (event) {
  event.preventDefault();
  $(".gradientDetails").animate({opacity: 0}, 200);
  $(".gradientDetails").delay(300).hide(0);
});
