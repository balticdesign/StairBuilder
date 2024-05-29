const toggleButton = document.getElementById("goto3d");
let is3DLoaded = false;
let is3DView = false;
let simulator;
let variables;

function getString (formElementId) {
  // get the value of the form element
  var value = jQuery("#" + formElementId).val();

  // split the value using the colon separator
  var valueParts = value.split(":");

  // get the second part of the resulting array (index 1)
  var theValueString = valueParts[0];

  // return the second part of the value
  return theValueString;
}

function showSpinner() {
  const canvasContainer = document.getElementById("canvas-container");
  const spinner = document.createElement("img");
  spinner.src = pluginDirUrl + "assets/images/spinner.svg";
  spinner.className = "spinner";
  canvasContainer.appendChild(spinner);
}

function hideSpinner() {
  const spinner = document.querySelector(".spinner");
  if (spinner) {
    spinner.parentNode.removeChild(spinner);
  }
}

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

jQuery('#left-featured-step').hide();
jQuery('#right-featured-step').hide();

function grabFormValues(){

let tits = parseFloat(jQuery("#treadit").val());
let beforeturn = '';
let afterturn1 = '';
let afterturn2 = '';
let afterturn2a = '';
let going = parseFloat(jQuery("#going").val()) || 240;
let floor_h = jQuery("#floor-height").val();
let direction = jQuery("#sc-direction").val();
let nposts = getString("newel-posts");
let spinglass = jQuery('input[name="ballustrades"]:checked').val();
let height = parseFloat(floor_h.replace(/,/g, ''));
let adj = parseFloat(height / 0.90040404);
let widthadj = parseFloat(jQuery("#stair-width").val());
let width2 = parseFloat(jQuery("#stair-width2").val());
let width = (widthadj + 30);
let topriser = (width + 12);
let modifier =  0; 
let risers = parseFloat(jQuery("#risers").val()) || 14;
beforeturn = parseFloat(jQuery("#treadbt").val());
afterturn1 = parseInt(risers - beforeturn - tits);
jQuery("#treadat").val(afterturn1);
//let regcheck = Math.ceil(height / risers);
//if (regcheck > 220) {modifier = 1; }
let treads = risers;
let riserh = Math.ceil(height / treads);
let total_run =  (going * treads);
let rake = Math.sqrt((height * height) + (total_run * total_run)).toFixed(2);
let pitch = Math.atan(height / total_run) * (180/Math.PI);
let tl = false;
let tr = false;
let br = false;
let bl = false;
let f1bc = false;
let boxcorner = false;
let f2bc = false;
let spLmod = 0;
let spRmod = 0;
let featureTreadConfig = jQuery('#feature_tread').find('option:selected').data('config');
//let fr = jQuery("#right-featured-step").val();
//let fl = jQuery("#left-featured-step").val();
const [fl, fr] = featureTreadConfig.split(',');
let bal_l = false;
let bal_r = false;
let bal2_l = false;
let bal2_r = false;
let turntop = false;
let turnside = false;
let newel_style = jQuery("#newel_type").val().toUpperCase();
let handrail_type = jQuery("#handrail_type").val().toUpperCase(); 
let spin_style = jQuery("#spindle_type").val().toUpperCase();
let newel_cap = getString("newel_cap").toUpperCase();

  if (nposts === "custom") {
      jQuery('#custom').show();
      
      if (jQuery("#tl-post").is(":checked")) {
        switch(direction) {
            case 'left':
            tl = true;
            break;
            case 'right':
            tr = true;
            break; }  }    
      if (jQuery("#tr-post").is(":checked")) {
        switch(direction) {
            case 'left':
            tr = true;
            break;
            case 'right':
            tl = true;
            break; } } 
    if (jQuery("#box-post").is(":checked")) {
     switch(direction) {
            case 'left':
            boxcorner = true;
            break;
            case 'right':
            f2bc = true;
            break; }     
          }  
    if (jQuery("#bo-post").is(":checked")) {
        switch(direction) {
            case 'left':
            f2bc = true;
            break;
            case 'right':
            boxcorner = true;
            break; }    
        } 
  
      bl = jQuery("#bl-post").is(":checked");
      br = jQuery("#br-post").is(":checked");
      f1bc = jQuery("#to-post").is(":checked");

        if (spinglass === "true") {
        switch (direction) {
            case 'left':
                bal_r = f1bc && br;
                bal_l = bl;
                bal2_r = f2bc && tr;
                bal2_l = tl;
                turntop = boxcorner && f2bc;
                turnside = boxcorner && f1bc;
                break;
            case 'right':
                bal_l = br;
                bal_r = f1bc && bl;
                bal2_r = boxcorner && tr;
                bal2_l = tl;
                turntop = boxcorner && f2bc;
                turnside = f2bc && f1bc;
                break;
        }
    }
      
  } else { jQuery('#custom').hide(); }  


const variables = {
  tits,
  beforeturn,
  afterturn1,
  afterturn2,
  afterturn2a,
  direction,
  going,
  floor_h,
  nposts,
  spinglass,
  height,
  adj,
  widthadj,
  width,
  width2,
  topriser,
  modifier,
  risers,
  treads,
  riserh,
  total_run,
  rake,
  pitch,
  tl,
  tr,
  br,
  bl,
  f1bc,
  boxcorner,
  f2bc,
  spLmod,
  spRmod,
  fr,
  fl,
  bal_l,
  bal_r,
  bal2_l,
  bal2_r,
  turntop,
  turnside,
  newel_style,
  handrail_type,
  spin_style,
  newel_cap
};

return variables;

};

function grab3dValues(){
  let post_material = getString('newel_material').toUpperCase();
  let spin_material = getString('bal_material').toUpperCase();
  let cap_material = getString('cap_material').toUpperCase();
  let stringer_material = getString('stringer_material').toUpperCase();
  let tread_material = getString('tread_material').toUpperCase();
  let riser_material = getString('riser_material').toUpperCase();
  let hdr_material = getString('hdr_material').toUpperCase();
  let bsr_material = getString('bsr_material').toUpperCase();
  let construction_type = jQuery("#construction_type").val();
  let fr = jQuery("#right-featured-step").val();
  let fl = jQuery("#left-featured-step").val();
  let featured_step = jQuery("#feature_tread").val(); /** to select from the right option here  */

  const variables3d = {
    post_material,
    spin_material,
    cap_material,
    stringer_material,
    tread_material,
    riser_material,
    hdr_material,
    bsr_material,
    construction_type,
    featured_step
  };
  return variables3d;
}
function bonuslogic(){
  materials = grab3dValues();
  string_material = materials.stringer_material;
  tread_material = materials.tread_material;
  riser_material = materials.riser_material;
let no_oak_price = jQuery("#quarter_landing_no_oak").val();
let oak_tread_price = jQuery("#quarter_landing_oak_tread").val();
let oak_tread_riser_price = jQuery("#quarter_landing_oak_tr").val();
let oak_string_price = jQuery("#quarter_landing_oak_string").val();
let all_oak_price = jQuery("#quarter_landing_all_oak").val();

let price_addon = 0; 

if (string_material === 'OAK' && tread_material === 'OAK' && riser_material === 'OAK') {
  price_addon = all_oak_price;
} else if (tread_material === 'OAK' && riser_material === 'OAK') {
  price_addon = oak_tread_riser_price;
} else if (tread_material === 'OAK') {
  price_addon = oak_tread_price;
} else if (string_material === 'OAK') {
  price_addon = oak_string_price;
} else {
  price_addon = no_oak_price;
}

return parseFloat(price_addon);

}

const getLowestStairNumber = (validConfigs) => { return validConfigs[0].risers; };

function getStaircaseConfig(going,height) {
// Capture the currently selected value from the dropdown
let currentSelected = jQuery("#risers").val();

if (currentSelected === '' || currentSelected === null) {
  currentSelected = 14;
}
  
  // Your valid configuration code here...
  let validConfigs = [];
  let uniqueRiserCounts = new Set(); // To keep track of unique number of risers
  
  for (let possibleRiserHeight = 150; possibleRiserHeight <= 220; possibleRiserHeight++) {
    let possibleRisers = Math.ceil(height / possibleRiserHeight);
    
    if (uniqueRiserCounts.has(possibleRisers)) {
      continue; // Skip if this number of risers has already been processed
    }

    uniqueRiserCounts.add(possibleRisers);

    let newTotalRun = going * (possibleRisers - 1);
    let newPitch = Math.atan(height / newTotalRun) * (180/Math.PI);

    if (going >= 220 && going <= 300 && newPitch <= 42) {
      validConfigs.push({
        risers: possibleRisers,
        height: possibleRiserHeight.toFixed(1)
      });
    }
  }

  // Sort configs by the number of risers
  validConfigs.sort((a, b) => a.risers - b.risers);

  // Update the <select> box
  let selectBox = jQuery("#risers");
  selectBox.empty();
  validConfigs.forEach(function(config) {
    selectBox.append(jQuery('<option>', {
      value: config.risers,
      text: `${config.risers} @ ${config.height}mm`
    }));
  });

  // Try to restore the captured value, if it exists. Otherwise, default to the first option.
  if (selectBox.find(`option[value="${currentSelected}"]`).length > 0) {
    selectBox.val(currentSelected);
  } else {
    selectBox.val(selectBox.find("option:first").val());
  }

  // Get the lowest stair number
  const lowestStairNumber = getLowestStairNumber(validConfigs);

  const selectedConfig = validConfigs.find(config => config.risers === parseInt(currentSelected));
  
  if (selectedConfig) {
    return {
      selectedRiserHeight: selectedConfig.height,
      numberOfStairs: selectedConfig.risers,
      lowestStairNumber: lowestStairNumber
    };
  } else {
    return {
      selectedRiserHeight: null,
      numberOfStairs: null,
      lowestStairNumber: lowestStairNumber
    };
  }
}

function onLoad(changedElement= null){
// console.log('2D Staircase Running');
const variables = grabFormValues();

let going = variables.going;
let height = variables.height;
let RiserNo;

const { selectedRiserHeight, numberOfStairs, lowestStairNumber } = getStaircaseConfig(going, height);

if (changedElement) {
  switch (changedElement) {
    case 'floor-height':
      RiserNo = lowestStairNumber;
      break;
      case 'going':
      RiserNo = lowestStairNumber;
      break;
      case 'risers':
        RiserNo = numberOfStairs;
        break;
        default:
        RiserNo = numberOfStairs;
  }
} else { RiserNo = numberOfStairs; }


if ((going < 220) || (going > 250)) { jQuery('#going').css({ 'color': 'red' }); } else { jQuery('#going').css({ 'color': 'inherit' }); } 


quarterturnStairsConfig = {
  type: 'quarterturn',
  direction: variables.direction,
  backgroundColor : 'transparent',
  font: 'Varela Round',
  treadHeight: variables.going, // in millimeters
  flight1Treads : {
      amount : variables.beforeturn,
      width : variables.width, // in millimeters
      fillColor : acf_colours.treads_fill, //optional
                      strokeColor : acf_colours.treads_outline, //optional
                      textColor : acf_colours.treads_text //optional
  },
  turnTreadsAmount : variables.tits,
  flight2Treads : {
      maxAmount :  variables.afterturn1,
      amount : variables.afterturn1,
      width : variables.width2, // in millimeters
      fillColor : acf_colours.treads_fill, //optional
                      strokeColor : acf_colours.treads_outline, //optional
                      textColor : acf_colours.treads_text //optional
  },
  posts : {
      turnTopLeft : variables.f2bc, //optional: default false
      turnTopRight : variables.boxcorner, //optional: default false
      turnBottom : variables.f1bc, // for outside post. inside bottom post is not optional
      flight1BottomLeft : variables.bl, //optional: default false
      flight1BottomRight : variables.br, //optional: default false
      flight2Top : variables.tr, //optional: default false
      flight2Bottom : variables.tl, //optional: default false
      fillColor : acf_colours.posts_fill, //optional
                      strokeColor : acf_colours.posts_outline, //optional
                      textColor : acf_colours.posts_text //optional
  },
  ballustrades : {
      flight1Outside: variables.bal_r, //optional: default false
      flight1Inside: variables.bal_l, //optional: default false
      flight2Outside: variables.bal2_r, //optional: default false
      flight2Inside: variables.bal2_l, //optional: default false
      turnTop: variables.turntop, //optional: default false
      turnSide: variables.turnside, //optional: default false
      primaryFillColor : acf_colours.stringer_fill, //optional
                      secondaryFillColor : acf_colours.spindles, //optional
                      strokeColor : acf_colours.stringer_outline, //optional
  },
  featureTread : {
      left : variables.fl, //0: none 1: curtail 2: bullnose 3: double going curtail plus single curtail 4: double going curtail plus bullnose
      right : variables.fr, //0: none 1: curtail 2: bullnose 3: double going curtail plus single curtail 4: double going curtail plus bullnose
  },
  minHeight : 50,  // in millimeters
  maxHeight : 300,  // in millimeters
  minWidth : 800, // in millimeters
  maxWidth : 1200  // in millimeters
}
             var canvas = document.getElementById("canvas");
             Stairs.init(canvas,quarterturnStairsConfig);

            }

            function drawQuarterTurn() {
              const variables = grabFormValues();
              const variables3d = grab3dValues();
              var going = variables.going;
              var directiona = variables.direction.toUpperCase();
              let height = variables.height;

              let { selectedRiserHeight, numberOfStairs } = getStaircaseConfig(going, height);

              simulator.drawQuarterTurn({
                stair_width: variables.width,
                floor_height: variables.height,
                stair_going: going,
                stair_riser: selectedRiserHeight,
                direction: directiona,
                section1: {
                  num: variables.beforeturn,
                  width: variables.width,
                  caps: {
                    type: variables.newel_cap,
                    material: variables3d.cap_material,
                    direction: {
                      left: variables.bl,
                      right: variables.br,
                    },
                  },
                  post: {
                    type: variables.newel_style,
                    material: variables3d.post_material,
                    direction: {
                      left: variables.bl,
                      right: variables.br,
                    },
                  },
                  handrails: {
                    type: variables.spin_style,
                    material: variables3d.spin_material,
                    baseMaterial: variables3d.stringer_material,
                    direction: {
                    left: variables.bal_l,
                    right: variables.bal_r,
                    },
                  },
                },
                section2: {
                  num: variables.afterturn1,
                  width: variables.width2,
                  caps: {
                    type: variables.newel_cap,
                    material: variables3d.cap_material,
                    direction: {
                      left: variables.tl,
                      right: variables.tr,
                    },
                  },
                  post: {
                    type: variables.newel_style,
                    material: variables3d.post_material,
                    direction: {
                      left: variables.tl,
                      right: variables.tr,
                    },
                  },
                  handrails: {
                    type: variables.spin_style,
                    material: variables3d.spin_material,
                    baseMaterial: variables3d.stringer_material,
                    direction: {
                    left: variables.bal2_l,
                    right: variables.bal2_r,
                    },
                  },
                },
                box: {
                  tnum: variables.tits,
                  post: {
                    direction: {
                    bottom: variables.f1bc,
                    top: variables.f2bc,
                    corner: variables.boxcorner,
                    },
                  },
                  handrails: {
                    type: variables.spin_style,
                    material: variables3d.spin_material,
                    baseMaterial: variables3d.stringer_material,
                    direction: {
                      left: variables.turntop,
                      right: variables.turnside,
                    },
                  },
                },
                construct:  variables3d.construction_type,
                feature: variables3d.featured_step
              });

            }       
            
jQuery(document).ready(function() {

  jQuery('#floor-height').val(2600);
  jQuery('#going').val(grabFormValues().going);
  jQuery('#stair-width').val(800);
  jQuery('#stair-width2').val(800);
  jQuery('#custom').hide();

  toggleButton.addEventListener("click", (event) => {
    event.preventDefault();
    // Load 3D script if not loaded yet
    if (!is3DLoaded) {
     
      const canvasContainer = document.getElementById("canvas-container");

      const script = document.createElement("script");
      script.src = pluginDirUrl + "assets/js/stair_min.js";
      script.onload = () => {
        is3DLoaded = true;
        toggleView();
      };
      document.body.appendChild(script);
    } else {
      toggleView();
      is3DLoaded = false;
    }
  });
  function toggleView() {
    const canvasContainer = document.getElementById("canvas-container");
    if (is3DView) {
      toggleButton.textContent = "Switch to 3D";
      const builderWrap = document.getElementById("builder-wrap");
      const innerWrap = builderWrap.querySelector(".ct-section-inner-wrap");
      let canvas3D = document.getElementById("canvas3D");

        // if canvas3D exists, remove it
        if (canvas3D) {
            canvas3D.parentNode.removeChild(canvas3D);
        }
      let canvas = document.getElementById("canvas");
      if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.id = "canvas";
        canvas.width = 558; // Set the desired width value in pixels
        canvas.height = 556;
        builderWrap.insertBefore(canvas, builderWrap.firstChild);
        canvasContainer.appendChild(canvas);
      }
     
    canvas.style.display = "block";
    innerWrap.style.padding = "75px auto !important";
      onLoad(); // Call the 2D drawing function
      is3DView = false;
    } else {
      toggleButton.textContent = "Switch to 2D";
      let canvas = document.getElementById("canvas");
      if (canvas) {
          canvas.parentNode.removeChild(canvas);
      }
     // Create new canvas element
     let canvas3D = document.createElement("canvas");
     canvas3D.id = "canvas3D";
     canvasContainer.appendChild(canvas3D);
     
     //showSpinner();
     const vpWidth = 0.98 * document.documentElement.clientWidth;
      const vpHeight =  0.98 * document.documentElement.clientHeight;
      simulator = new STAIR.StairSimulator(canvas3D);
       simulator.on('started', () => {
        drawQuarterTurn();
      });
      simulator.setSize(vpWidth, vpHeight);
      const builderWrap = document.getElementById("builder-wrap");
     const innerWrap = builderWrap.querySelector(".ct-section-inner-wrap");
      innerWrap.style.padding = "0";
      //hideSpinner();
      is3DView = true;
    }
  }

              // Set the default value of the input
              
              if(!is3DView) { onLoad(); }
       
              jQuery('#stairbuild').on('change', ':input', function() {
                const changedElement = jQuery(this).attr('id');
                if (!is3DLoaded) {
                  onLoad(changedElement);
                } else { 
                  drawQuarterTurn();
                }
              });
             
});