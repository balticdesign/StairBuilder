function calculateTotalPrice(){
  let $height = grabFormValues().height;
  let treads = grabFormValues().treads;
  let $qtBefore = grabFormValues().beforeturn;
  let $qtAfter = grabFormValues().afterturn1;
  let $htAfter2 = grabFormValues().afterturn2;
  let rightBal = +grabFormValues().bal_r;
  let leftBal = +grabFormValues().bal_l;
  let rightBal2 = +grabFormValues().bal2_r;
  let leftBal2 = +grabFormValues().bal2_l;
  let leftBal3  = +grabFormValues().bal3_l;
  let rightBal3 = +grabFormValues().bal3_r;
  let boxBal1 = +grabFormValues().turntop || 0;
  let boxBal2 = +grabFormValues().turnside || 0;
  let boxBal3 = +grabFormValues().turn2top || 0;
  let boxBal4 = +grabFormValues().turn2side || 0;
  let $riserh = grabFormValues().riserh;
  let $pitch = grabFormValues().pitch;
  let $width = parseFloat(grabFormValues().width);
  let $rake = grabFormValues().rake;
  let $spLmod = parseFloat(grabFormValues().spLmod);
let $spRmod = parseFloat(grabFormValues().spRmod);
let $wmp = parseFloat(jQuery('#widthmulti').val());
let $vatRate = parseFloat(jQuery('#vatRate').val());
let $setup_fee = 0;
let $addprice = 0;
let $duodeliv = 0; 
let $fixkit = 0; 
let $asspkg = 0; 
let $xtrap = 0; 
let $ctype = parseFloat(jQuery('#construction_type option:selected').attr('data-price'));
let $boxSpindleNo =  parseFloat(Math.ceil($width / 112));
if (typeof bonuslogic === "function") {
   $addprice = bonuslogic();
   bonuslogic(); } 
   $stringer_price = getNumber('stringer_material');
   $tread_price = getNumber('tread_material');
   $riser_price = getNumber('riser_material');
   var $adj = parseFloat($height / 0.90040404);
var $going = parseFloat(jQuery("#going").val());
$risers = Math.ceil($adj / $going);
   $str_price = ($stringer_price + $tread_price + $riser_price) * $risers;
   
   var $delivery = parseFloat(jQuery('.deliv_btn').attr('data-price'));
   if (jQuery('#duodeliv').is(':checked')) {
    $duodeliv = parseFloat(jQuery('#duodeliv').val());  // Add £200 if the checkbox is checked
} 
if (jQuery('#fixkit').is(':checked')) {
   $fixkit = parseFloat(jQuery('#fixkit').val());  
} 

if (jQuery('#asspkg').is(':checked')) {
   $asspkg = parseFloat(jQuery('#asspkg').val()); 
} 
if (jQuery('#xtrap').is(':checked')) {
   $xtrap = parseFloat(jQuery('#xtrap').val()); 
} 
   if ( $width > 1000 ) {
    $width_price = parseFloat($str_price) * $wmp;
    // console.log("$width_price:", $width_price);
   } else { $width_price = 0; }
   if ($risers < 7) { $setup_fee =  parseFloat(jQuery('#setupfee').val()); }
   
   $newel_amt =  getNumber('newel-posts');
   $newel_cost = getNumber('newel_material');
   $caps = getNumber('newel_cap');
   $cap_cost = $caps * getNumber('cap_material');
   $spindle_cost = getNumber('bal_material');
   $hdr_cost = getNumber('hdr_material');
   $bsr_cost = getNumber('bsr_material');

   $leftFeatStep = parseFloat(jQuery('#leftFeatStep').val());
   $rightFeatStep = parseFloat(jQuery('#rightFeatStep').val());

   //need to activate / deactivate caps / handrails / baserails / newels depending on choices
   
   $newels_price = ($newel_cost * $newel_amt);
   $caps_price = ($cap_cost * $newel_amt);
   
if ($qtBefore) { 
   
let totalSpindles = 0;

// Calculate spindles for the first and second flights
let flight1Spindles = $qtBefore * 2 * (rightBal + leftBal);
let flight2Spindles = $qtAfter * 2 * (rightBal2 + leftBal2);
let flight3Spindles = 0; 
let section3Length = 0; 
let rakeDivided = $rake / (treads -1);

if ($htAfter2) { 
   flight3Spindles = $htAfter2 * 2 * (rightBal3 + leftBal3);
   section3Length = $htAfter2 * rakeDivided * (rightBal2 + leftBal2);
}

// Calculate spindles for box sections
let boxSpindles = $boxSpindleNo * (boxBal1 + boxBal2 + boxBal3 + boxBal4);


// Now assign and log the spindle_price
$spindle_price = (flight1Spindles + flight2Spindles + flight3Spindles + boxSpindles) * $spindle_cost;

// Calculate total spindles
totalSpindles = parseInt(flight1Spindles + flight2Spindles + flight3Spindles + boxSpindles);


$spindle_price = totalSpindles * $spindle_cost;

let section1Length = $qtBefore * rakeDivided * (rightBal + leftBal);
let section2Length = $qtAfter * rakeDivided * (rightBal2 + leftBal2);


// Add the width of active box sections
let activeBoxWidth = 0;
if (boxBal1) activeBoxWidth += $width;
if (boxBal2) activeBoxWidth += $width;

// Calculate total length in mm
let totalLength = section1Length + section2Length + section3Length + activeBoxWidth;

// Convert total length to units and round up
let totalUnits = Math.ceil(totalLength / 1000);
$hdr_price = $hdr_cost * totalUnits;
$bsr_price = $bsr_cost * totalUnits;
$ball_price = ($hdr_price + $bsr_price);

} else {

   $spindles_needed = ($risers * 2) * ($spLmod + $spRmod);

   $spindle_price = $spindles_needed * $spindle_cost;

   $hdrUnits = Math.ceil($rake / 1000);
   $hdr_price = $hdr_cost * $hdrUnits;
   $bsr_price = $bsr_cost * $hdrUnits;

   $ball_price = ($hdr_price + $bsr_price) * ($spLmod + $spRmod);
}

    
   $total = $setup_fee + $str_price + $ctype + $width_price + $newels_price + $caps_price + $spindle_price + $ball_price + $duodeliv + $fixkit + $xtrap + $asspkg + $delivery + $leftFeatStep + $rightFeatStep + $addprice;
   var price = parseFloat($total);  // this is your price without VAT
   var vatAmount =  parseFloat(price * ($vatRate / 100));
   var priceWithVat =  parseFloat(price + vatAmount);

   const { selectedRiserHeight, numberOfStairs, lowestStairNumber } = getStaircaseConfig($going, $height);

   jQuery("#floor").text($height + ' mm');
   jQuery("#tread").text($going + ' mm');
   jQuery("#rise").text(selectedRiserHeight + ' mm');
   jQuery("#scwidth").text($width + ' mm');
   jQuery("#angl").html($pitch.toFixed(2) + ' &deg;');

   jQuery("#priceCalc").text('£' + $total.toFixed(2));
   jQuery("#vat").text('£' + vatAmount.toFixed(2));
   jQuery("#total").text('£' + priceWithVat.toFixed(2));
}
jQuery('#stairbuild :input').change(function(){
  calculateTotalPrice();
});