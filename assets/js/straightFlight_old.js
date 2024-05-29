function getString(formElementId) {
  // get the value of the form element
  var value = jQuery("#" + formElementId).val();

  // split the value using the colon separator
  var valueParts = value.split(":");

  // get the second part of the resulting array (index 1)
  var String = valueParts[0];

  // return the second part of the value
  return String;
}

$treads = '';
$tits = '';
$beforeturn = '';
$afterturn1 = '';
$afterturn2 = '';
$afterturn2a = '';
var $going = 250;


function onLoad(){
$floor_h = jQuery("#floor-height").val();
$nposts = getString("newel-posts");
$spinglass = jQuery('input[name="ballustrades"]:checked').val();

$height = parseFloat($floor_h.replace(/,/g, ''));
var $adj = parseFloat($height / 0.90040404);
var $widthadj = parseFloat(jQuery("#stair-width").val());
var $width = ($widthadj + 30);
var $topriser = ($width + 12);
var $going = parseFloat(jQuery("#going").val());
var $modifier =  0; 
$risers = Math.ceil($adj / $going);
var $regcheck = Math.ceil($height / $risers);
if ($regcheck > 220) { $modifier = 1; }
if (($going < 220) || ($going > 250)) { jQuery('#going').css({ 'color': 'red' }); } else { jQuery('#going').css({ 'color': 'inherit' }); } 
$total_run =  ($going * $risers);
$rake = Math.sqrt(($height * $height) + ($total_run * $total_run)).toFixed(2);
$treads = parseFloat($risers + $modifier);
jQuery("#risers").val($treads);
$tl = false;
$tr = false;
$br = false;
$bl = false;
$spLmod = 0;
$spRmod = 0;
$fr = jQuery("#right-featured-step").val();
$fl = jQuery("#left-featured-step").val();
$bal_l = false;
$bal_r = false;
if ($nposts === "left") {
$tl = true; $bl = true; }   
if ($nposts === "right") {
$tr = true; $br = true; }   
if ($nposts === "both") {
$tl = true; $bl = true; $tr = true; $br = true; }   
if ($nposts === "custom") {
    jQuery('#custom').show();
    if (jQuery("#tl-post").is(":checked")) {$tl = true; }   
    if (jQuery("#tr-post").is(":checked")) {$tr = true; }
    if (jQuery("#bl-post").is(":checked")) {$bl = true; }
    if (jQuery("#br-post").is(":checked")) {$br = true; }  
} else { jQuery('#custom').hide(); }  
if ($spinglass === "true") {
if (($tr == true) && ($br == true)) {
$bal_r = true; $spRmod = 1;
}
if (($tl == true) && ($bl == true)) {
$bal_l = true; $spLmod = 1;
}
}
 regularStairsConfig = {
                    type: 'regular',
                    backgroundColor : 'transparent',
                    font: 'Varela Round',
                    treads : {
                        amount : $treads,
                        width : $width, // in millimiters
                        height : $going, // in millimiters
                        fillColor : '#d3cece', //optional
                        strokeColor : '#2f2f2f', //optional
                        textColor : '#2f2f2f' //optional
                    },
                  posts : {
                        topLeft : $tl, //optional: default false
                        topRight : $tr, //optional: default false
                        bottomLeft : $bl, //optional: default false
                        bottomRight : $br, //optional: default false
                        fillColor : '#aba7a7', //optional
                        strokeColor : '#2f2f2f', //optional
                        textColor : '#2f2f2f' //optional
                    },
                 ballustrades : {
                        left : $bal_l, //optional: default false
                        right : $bal_r, //optional: default false
                        primaryFillColor : '#aba7a7', //optional
                        secondaryFillColor : '#eeeeee', //optional
                        strokeColor : '#2f2f2f', //optional
                    },
                 featureTread : {
                        left : $fl, //0: none 1: curtail 2: bullnose 3: double going curtail plus single curtail 4: double going curtail plus bullnose
                        right : $fr, //0: none 1: curtail 2: bullnose 3: double going curtail plus single curtail 4: double going curtail plus bullnose
                    },
                    minHeight : 220,  // in millimeters
                    maxHeight : 250,  // in millimeters
                    minWidth : 800, // in millimeters
                    maxWidth : 1200  // in millimeters
                }
                var canvas = document.getElementById("canvas");
                Stairs.init(canvas,regularStairsConfig);
            }
jQuery(document).ready(function() {

  const toggleButton = document.getElementById("goto3d");
  let is3DLoaded = false;
  let is3DView = false;
  let simulator;

  toggleButton.addEventListener("click", () => {
    event.preventDefault();
    // Load 3D script if not loaded yet
    if (!is3DLoaded) {
      const script = document.createElement("script");
      script.src = pluginDirUrl + "assets/js/stair_min.js";
      script.onload = () => {
        is3DLoaded = true;
        toggleView();
      };
      document.body.appendChild(script);
    } else {
      toggleView();
    }
  });
  function toggleView() {
    const canvasContainer = document.getElementById("canvas-container");
    function drawStraightFlight() {
      simulator.drawStraightFlight({
        stair_width: 900,
        floor_height: 2600,
        stair_going: 240,
        post: {
          direction: {
            leftTop: true,
            leftBottom: true,
            rightTop: true,
            rightBottom: true,
          },
          type: 'CHAMFERED',
          material: 'PINE',
        },
        caps: {
          direction: {
            leftTop: true,
            leftBottom: true,
            rightTop: true,
            rightBottom: true,
          },
          type: 'PYRAMID',
          material: 'PINE',
        },
        handrails: {
          direction: {
            left: true,
            right: true,
          },
          type: 'EDWARDIAN',
          material: 'PINE',
          baseMaterial: 'PINE',
        },
      });
    }
    if (is3DView) {
      toggleButton.textContent = "Switch to 3D";
      const builderWrap = document.getElementById("builder-wrap");
      const innerWrap = builderWrap.querySelector(".ct-section-inner-wrap");
      const canvasContainer = document.getElementById("canvas-container");
      let canvas3D = document.getElementById("canvas3D");
      let canvas = document.getElementById("canvas");
      if (!canvas) {
        canvas = document.createElement("canvas");
    canvas.id = "canvas";
    builderWrap.insertBefore(canvas, builderWrap.firstChild);
    canvasContainer.appendChild(canvas);
      }
      if (canvas3D) {
        canvas3D.parentNode.removeChild(canvas3D);
      }
    canvas.style.display = "block";
    innerWrap.style.padding = "75px auto !important";
      onLoad(); // Call the 2D drawing function
    } else {
      toggleButton.textContent = "Switch to 2D";
     // Create new canvas element
     const canvas3D = document.createElement("canvas");
     canvas3D.id = "canvas3D";
     const oldCanvas = document.getElementById("canvas");
     const canvasContainer = document.getElementById("canvas-container");
     if (oldCanvas) {
      oldCanvas.parentNode.removeChild(oldCanvas);
    }
     canvasContainer.appendChild(canvas3D);
    simulator = new STAIR.StairSimulator(canvas3D);
       simulator.on('started', () => {
        drawStraightFlight();
      });
      simulator.setSize(window.innerWidth, window.innerHeight);
      const builderWrap = document.getElementById("builder-wrap");
     const innerWrap = builderWrap.querySelector(".ct-section-inner-wrap");
      innerWrap.style.padding = "0";
    }
    is3DView = !is3DView;
  }

              // Set the default value of the input
              jQuery('#floor-height').val(2600);
              jQuery('#going').val(250);
              jQuery('#stair-width').val(750);
              jQuery('#custom').hide();
             if(!is3DView) { onLoad(); }
});
jQuery('#stairbuild :input').change(function(){
  onLoad();
});