<?php require_once  (plugin_dir_path( __FILE__ ) . '../includes/stairbuilder-prices.php');
global $post;
  
// Get the ACF field value for stair_type
$stair_type = get_field('staircase_type', $post->ID);
$fields = []; // array of ACF field names
$direction = false;
$flight2 = false;
$flight3 = false;
if ($stair_type === 'half') {
  $flight3 = true;
  $direction = true;
  $flight2 = true;
  $fields = [
    'half_landing_all_oak',
    'half_landing_oak_string',
    'half_landing_oak_tr',
    'half_landing_oak_tread',
    'half_landing_no_oak'
  ];
} else if ($stair_type === 'quarter'){
  $direction = true;
  $flight2 = true;
  $fields = [
    'quarter_landing_all_oak',
    'quarter_landing_oak_string',
    'quarter_landing_oak_tr',
    'quarter_landing_oak_tread',
    'quarter_landing_no_oak'
  ];
}
$bonuslogic = "";
if($fields) {
foreach ($fields as $field) {
  $value = get_field($field, 'option');
  $bonuslogic .= "<input type=\"hidden\" id=\"$field\" value=\"$value\">";
}
}
?>

<div class="form-wrapper">
  <form id="stairbuild" method="post">
    <div class="form-tabs">
  <div class="form-tab"><!--- Measurments -->
  <input type="radio" class="form-chk" id="chck1" name="rd">
  <label class="tab-label" for="chck1">Measurements</label>
    <div id="msrm" class="tab-content">
 <?php if ($direction) {?>
    <div class="form-row">
            <label for="sc-direction">Direction:</label>
            <select id="sc-direction" name="sc-direction">
            <option value="left">Left</option>
            <option value="right">Right</option>
            </select>
        </div>
        <?php } ?>
        <div class="form-row">
            <label for="floor-height">Floor Height:</label>
            <input type="number" id="floor-height" name="floor-height" value="">
        </div>
        <div class="form-row">
            <label for="risers">No. of Risers</label>
            <select id="risers" name="risers">
 </select>
          <!-- <input type="number" id="risers" name="risers" value=""> -->
            <!-- <select id="risers" name="risers">
            <option value="13">13</option> -->
            </select>
        </div>
        <div class="form-row">
            <label for="going">Going:</label>
            <input type="number" id="going" name="going" value="">
        </div>
        <div class="form-row">
            <label for="stair-width">Width:</label>
            <input type="number" id="stair-width" name="stair-width" value="">
            <?php if ($flight2) {?>
            <label for="stair-width2">Flight 2 Width:</label>
            <input type="number" id="stair-width2" name="stair-width2" value="">
            <?php } ?>
            <?php if ($flight3) {?>
            <label for="stair-width3">Flight 3 Width:</label>
            <input type="number" id="stair-width3" name="stair-width3" value="">
            <?php } ?>
            <input type="hidden" id="widthmulti" value="<?php echo $width_mp; ?>">
            <input type="hidden" id="setupfee" value="<?php echo $setup_fee; ?>">
        </div>
        </div>
        </div>
        <?php if ($flight2) {?>
          <div class="form-tab"><!--- Flights -->
  <input type="radio" class="form-chk" id="flights" name="rd">
  <label class="tab-label" for="flights">Sections</label>
    <div id="tits" class="tab-content">
          <div class="form-row">
            <h4>Flight 1</h4>
        <label for="treadit">Treads before Turn:</label>
        <input type="number" id="treadbt" name="treadbt" value="6">
        </div>
        <div class="form-row">
        <label for="treadit">Treads in Turn:</label>
        <select id="treadit" name="treadit">
        <option value="1">Quarter Landing</option>
        <option value="2">2 Winders</option>
        <option value="3">3 Winders</option>
        <?php if ($flight3) {?>
        <option value="4">Half Landing</option>
        <?php } ?>
        </select>
        </div>
        <h4>Flight 2</h4>
        <div class="form-row">
        <label for="treadat">Treads after Turn:</label>
        <input type="number" id="treadat" name="treadat" value="3">
        </div>
        <?php if ($flight3) {?> 
         <div class="form-row">
        <label for="treadit2">Treads in Turn2:</label>
        <select id="treadit2" name="treadit2">
        <option value="1">Quarter Landing</option>
        <option value="2">2 Winders</option>
        <option value="3">3 Winders</option>
        </select>
        </div>
        <h4>Flight 3</h4>
        <div class="form-row">
        <label for="treadat2">Treads after Turn2:</label>
        <input type="number" id="treadat2" name="treadat2" value="" readonly>
        </div>
        <?php } ?>
        </div>
        </div>
        <?php } ?>
    
    <div class="form-tab"><!--- Posts & Balustrades -->
  <input type="radio" class="form-chk" id="psts1" name="rd">
  <label class="tab-label" for="psts1">Posts & Balustrades</label>
    <div id="posts" class="tab-content">
    <div class="form-row">
    <label for="newel-posts">Add Newel Posts?</label>
      <select id="newel-posts" name="newel-posts">
        <option value="none:0">None Required</option>
        <?php if (!$flight2) {?>
        <option value="left:2">Left</option>
        <option value="right:2">Right</option>
        <option value="both:4">Both Sides</option>
        <option value="custom:0">Custom</option>
        <?php } else { ?>
          <option value="custom:0">Yes</option>
        <?php } ?>
      </select>
    </div>
    <div id="custom">
    <h3>Top (Flt.3)</h3>
    <div class="form-row">
        <div class="form-col">
        <label for="tl-post">Left</label>
            <input id="tl-post" type="checkbox" name="tl-post" value="1">
            </div><div class="form-col">
        <label for="tr-post">Right</label>
            <input id="tr-post" type="checkbox" name="tr-post" value="1">
        </div>
    </div>
    <?php if ($flight3) {?>
      <h3>Box 2</h3>
      <div class="form-row">
        <div class="form-col">
        <label for="to-post2">Flt.2 Top Outside</label>
            <input id="to-post2" type="checkbox" name="to-post2" value="1">
            </div><div class="form-col">
        <label for="bo-post2">Flt.3 Bottom Outside</label>
            <input id="bo-post2" type="checkbox" name="bo-post2" value="1">
            </div><div class="form-col">
            <label for="box-post2">Flt.2 Box Corner</label>
            <input id="box-post2" type="checkbox" name="box-post2" value="1">
        </div>
    </div>
    <?php } ?>
    <?php if ($flight2) {?> 
      <h3>Box</h3>
      <div class="form-row">
        <div class="form-col">
        <label for="to-post">Flt.1 Top Outside</label>
            <input id="to-post" type="checkbox" name="to-post" value="1">
            </div><div class="form-col">
        <label for="bo-post">Flt.2 Bottom Outside</label>
            <input id="bo-post" type="checkbox" name="bo-post" value="1">
            </div><div class="form-col">
            <label for="box-post">Flt.1 Box Corner</label>
            <input id="box-post" type="checkbox" name="box-post" value="1">
        </div>
    </div>
    <?php } ?>
    <h3>Bottom (Flt.1)</h3>
    <div class="form-row">
        <div class="form-col">
        <label for="bl-post">Left</label>
            <input id="bl-post" type="checkbox" name="bl-post" value="1">
            </div><div class="form-col">
        <label for="br-post">Right</label>
            <input id="br-post" type="checkbox" name="br-post" value="1">
        </div>
    </div>
    </div>
    <div id="posts">
    <div class="form-row">
    <label for="newel_type">Newel Style</label>
      <select id="newel_type" name="newel_type">
        <option value="square">Plain Square</option>
        <option value="chamfered">Chamfered</option>
        <option value="turned">Turned</option>
        <option value="base">Base Only</option>
      </select>
    </div>
    <div class="form-row">
    <label for="newel_cap">Newel Caps</label>
      <select id="newel_cap" name="newel_cap">
        <option value="none:0">None</option>
        <option value="flat:1">Flat</option>
        <option value="pyramid:1">Pyramid</option>
        <option value="ball:1">Ball</option>
      </select>
    </div>
    <div class="form-row">
    <h4>Do you require Ballustrades?</h4>
    <div class="form-col">
    <label for="ballustrades-yes">Yes</label>
     <input id="ballustrades-yes" type="radio" name="ballustrades" value="true">
     <label for="ballustrades-no">No</label>
     <input id="ballustrades-no" type="radio" name="ballustrades" value="false" checked>
</div>
    </div>
</div>
<div id="ball">
<div class="form-row">
    <label for="handrail_type">Handrail Style</label>
      <select id="handrail_type" name="handrail_type">
        <option value="crown">Crown</option>
        <option value="hdr">HDR</option>
      </select>
    </div>
<div class="form-row">
    <label for="spindle_type">Spindle Style</label>
      <select id="spindle_type" name="spindle_type">
        <option value="chamfered">Chamfered</option>
        <option value="edwardian">Edwardian</option>
        <option value="twist">Twist</option>
        <option value="fluted">Fluted</option>
        <option value="tulip">Tulip</option>
        <option value="victorian">Victorian</option>
        <option value="provincial">Provincial</option>
      </select>
    </div>
</div>
    </div>
 </div>
    <div id="cnstr" class="form-tab"><!--- Construction -->
    <input type="radio" class="form-chk" id="chck2" name="rd">
    <label class="tab-label" for="chck2">Construction</label>
    <div class="tab-content">
    <div class="form-row">
    <label for="construction_type">Construction Type:</label>
      <select id="construction_type" name="construction_type">
        <option data-price="0" value="standard">Standard Closed String</option>
        <option data-price="<?php echo $cut_string_price; ?>" value="cut">Cut String</option>
      </select>
    </div>
    <div class="form-row">
    <label for="tread-profile">Tread Profile:</label>
      <select id="tread-profile" name="tread-profile">
        <option value="rounded">25mm Rounded</option>
        <option value="square">25mm Square</option>
      </select>
    </div>
    <div class="form-row">
        <h4>Do you require a feature tread?</h4>

        <label for="feature_tread">Featured Tread:</label>
      <select id="feature_tread" class="form-select">
        <option data-config="0,0" value="None" selected="selected">None</option>
        <option data-config="2,0" value="Left Bullnose Step">Left Bullnose Step</option>
        <option data-config="0,2" value="Right Bullnose Step">Right Bullnose Step</option>
        <option data-config="2,2" value="Double Bullnose Step">Double Bullnose Step</option>
        <option data-config="1,0" value="Left D Step">Left Curtail Step</option>
        <option data-config="0,1" value="Right D Step">Right Curtail Step</option>
        <option data-config="1,1" value="Double D Step">Double Curtail Step</option>
        <!--<option value="Left Double Curtail Step">Left Curtail Step</option> -->
        <!--<option value="Right Double Curtail Step">Right Curtail Step</option> -->
        <!--<option value="Double Curtail Step">Double Curtail Step</option> -->
        <option data-config="4,0"  value="Left Curtail and Bullnose Step">Left Curtail and Bullnose Step</option>
        <option data-config="0,4" value="Right Curtail and Bullnose Step">Right Curtail and Bullnose Step</option>
        <option data-config="4,4" value="Double Curtail and Bullnose Step">Double Curtail and Bullnose Step</option>
      </select>
  
      <!--<label for="left-featured-step">Left Hand Side:</label>-->
      <select id="left-featured-step" name="left-featured-step">
        <option value="0">None</option>
        <option value="1">Curtail</option>
        <option value="2">Bullnose</option>
        <!--<option value="3">Curtail & Double Curtail</option>-->
        <option value="4">Full Curtail & Bullnose</option>
      </select>

      <!--<label for="right-featured-step">Right Hand Side:</label>-->
      <select id="right-featured-step" name="right-featured-step">
        <option value="0">None</option>
        <option value="1">Curtail</option>
        <option value="2">Bullnose</option>
        <!--<option value="3">Curtail & Double Curtail</option>-->
        <option value="4">Full Curtail & Bullnose</option>
      </select>
      <input type="hidden" id="leftFeatStep" value="0">
      <input type="hidden" id="rightFeatStep" value="0">
   
    </div>
</div>
</div>
<div id="mat" class="form-tab"><!--- Material -->
<input type="radio" class="form-chk" id="chck3" name="rd">
    <label class="tab-label" for="chck3">Material</label>
    <div class="tab-content">
    <button type="button" id="all_pine">Set all to Pine</button>
    <button type="button" id="all_oak">Set all to Oak</button>
    <div class="form-row">
    <label for="stringer_material">Stringer:</label>
    <select id="stringer_material" name="construction_type">
    <?php if (!empty($stringer_options)): ?>
      <?php foreach ($stringer_options as $name => $value): ?>
        <option value="<?php echo esc_attr($name) . ':' . esc_attr($value); ?>">
          <?php echo esc_html($name); ?>
        </option>
      <?php endforeach; ?>
    <?php else: ?>
      <option value="">No options available</option>
    <?php endif; ?>
      </select>
    </div>
    <div class="form-row">
  <label for="tread_material">Treads:</label>
  <select id="tread_material" name="tread_material">
    <?php if (!empty($tread_options)): ?>
      <?php foreach ($tread_options as $name => $value): ?>
        <option value="<?php echo esc_attr($name) . ':' . esc_attr($value); ?>">
          <?php echo esc_html($name); ?>
        </option>
      <?php endforeach; ?>
    <?php else: ?>
      <option value="">No options available</option>
    <?php endif; ?>
  </select>
</div>
    <div class="form-row">
      <label for="riser_material">Risers:</label>
      <select id="riser_material" name="riser_material">
      <?php if (!empty($tread_options)) { ?>
      <?php foreach ($riser_options as $name => $value) { ?>
        <option value="<?php echo esc_attr($name) . ':' . esc_attr($value); ?>">
          <?php echo esc_html($name); ?>
        </option>
      <?php } } else { ?>
      <option value="">No options available</option>
    <?php } ?>
      </select>
    </div>
    <div class="form-row">
    <label for="newel_material">Newel Posts:</label>
      <select id="newel_material" name="newel_material">
        <option value="">Pine</option>
        <option value="">Oak</option>
      </select>
    </div>
    <div class="form-row">
  <label for="cap_material">Newel Caps:</label>
  <select id="cap_material" name="cap_material">
    <option value="">Pine</option>
    <option value="">Oak</option>
  </select>
</div>
<div class="form-row">
  <label for="bal_material">Spindles(Baluster):</label>
  <select id="bal_material" name="bal_material">
    <option value="">Pine</option>
    <option value="">Oak</option>
  </select>
</div>
<div class="form-row">
  <label for="hdr_material">Handrails:</label>
  <select id="hdr_material" name="hdr_material">
    <option value="">Pine</option>
    <option value="">Oak</option>
  </select>
</div>
<div class="form-row">
  <label for="bsr_material">Baserails:</label>
  <select id="bsr_material" name="bsr_material">
    <option value="pine:<?php echo $pine_baserail; ?>">Pine</option>
    <option value="oak:<?php echo $oak_baserail; ?>">Oak</option>
  </select>
</div>
<?php echo $bonuslogic; ?>
</div>
</div>
<div id="deliv" class="form-tab"><!--- Packaging / Delivery -->
<input type="radio" class="form-chk" id="chck4" name="rd">
    <label class="tab-label" for="chck4">Packaging & Delivery</label>
    <div class="tab-content">
      <h5>Delivery Options</h5>
      <div class="delivery form-row rdbuttons">
          <input id="collected" type="radio" name="delivery" class="p radio__radio" checked>
          <label for="collected" class="d radio__label vertical-icon"><img src="<?php echo plugin_dir_url( __FILE__ ) . '../assets/images/collected.svg' ?>" alt="icon"> Collected </label>
          <input id="delivery" type="radio" name="delivery" class="p radio__radio">
          <label for="delivery" class="d radio__label vertical-icon"><img src="<?php echo plugin_dir_url( __FILE__ ) . '../assets/images/delivery.svg' ?>" alt="icon"> Kerb Side Delivery </label>
      </div>
      <div class="ksd form-row">
      <h5>Extra Options:</h5>
      <div class="chkboxbttn">
          <input id="duodeliv" type="checkbox" name="duodeliv" class="a chkbx" value="<?php echo $two_man_delivery_price; ?>">
          <label for="duodeliv" class="p chkbx__label">2 man delivery @ £<?php echo $two_man_delivery_price; ?> extra</label>
      </div></div>
      <div class="pcode rdbuttons form-row">
        <input id="postcode" name="postcode" type="text" placeholder="Your postcode" class="input__form ng-pristine ng-valid ng-touched" style="margin-top: 0;">
        <button class="input__btn deliv_btn input__btn--active" data-price="0"> Update Delivery (£0) </button>
</div>
      <h5>I want my Stairs</h5>
      <div class="packg form-row rdbuttons">
          <input id="flatpkg" type="radio" name="package" class="d radio__radio" checked>
          <label for="flatpkg" class="p radio__label">Flat Packed </label>
          <input id="asspkg" type="radio" name="package" class="d radio__radio" value="<?php echo $part_assembled_price; ?>">
          <label for="asspkg" class="p radio__label">Part Assembled</label>
      </div>
      <h5>Add Ons</h5>
      <div class="addon form-row rdbuttons">
        <div class="chkboxbttn">
          <input id="fixkit" type="checkbox" name="addon" class="a chkbx" checked value="<?php echo $fixing_kit_price; ?>">
          <label for="fixkit" class="p chkbx__label">Fixing Kit </label>
          </div>
          <div class="chkboxbttn">
          <input id="xtrap" type="checkbox" name="addon" class="a chkbx" value="<?php echo $extra_packaging_price; ?>">
          <input type="hidden" id="vatRate" value="<?php echo do_shortcode('[vat_rate]'); ?>">
          <label for="xtrap" class="p chkbx__label">Extra Packaging </label>
          </div>
      </div>
  </div>
</div>
<div class="form-tab">
        <input type="radio" class="form-chk" id="rd5" name="rd">
        <label for="rd5" class="tab-close">Close others &times;</label>
      </div>
</div><!--- form-tabs -->
<div class="form-row">
    <div class="breakout">
    <div id="pricetotal">
    <h4>Quote</h4>
    <span id="priceCalc" class="price">£0.00</span>
    <h4>VAT</h4>  
    <span id="vat" class="price">£0.00</span>
    <h4>Total Price</h4>    
    <span id="total" class="price">£0.00</span>
</div>
      <input id="sbbuybtn" class="sb-buynow" type="submit" value="Add to Cart">
    </div>
</div>
  </form>
  <div class="mm_breakout">
    <h4>Floor to floor</h4>
    <span id="floor" class="msmnt">00</span>
    <h4>Tread length</h4>
    <span id="tread" class="msmnt">00</span>
    <h4>Rise per tread</h4>
    <span id="rise" class="msmnt">00</span>
    <h4>Width</h4>
    <span id="scwidth" class="msmnt">00</span>
    <h4>Angle</h4>
    <span id="angl" class="msmnt">00 &deg;</span>
    </div>
</div>