var newelValue = "none:0";
var numChecked = 0;
var customValue = "custom:0";
var $spinglass = window.$spinglass;


function getNumber(formElementId) {
  // get the value of the form element
  var value = jQuery("#" + formElementId).val();

  // split the value using the colon separator
  var valueParts = value.split(":");

  // get the second part of the resulting array (index 1)
  var Price = valueParts[1];

  Price = parseFloat(Price);

  // return the second part of the value
  return Price;
}

function getNewelIds() {
  let newelIds = [];
  var newel_amt =  getNumber('newel-posts');
  jQuery('#newel_material option:selected[data-product-id]').each(function () {
    let productId = jQuery(this).data('product-id');
    if (productId) {
      newelIds.push({id:productId, qty:newel_amt});
    }
  });
  return newelIds;
}

function getCapIds() {
  let capIds = [];
  var newel_amt =  getNumber('newel-posts');
  jQuery('#cap_material option:selected[data-product-id]').each(function () {
    let productId = jQuery(this).data('product-id');
    if (productId) {
      capIds.push({id:productId, qty:newel_amt});
    }
  });
  return capIds;
}

function updateNewelPosts(newelType, capType, hrType, spindleType) {
    jQuery.ajax({
      url: stairBuilderVars.ajax_url,
      type: 'POST',
      data: { 
        action: 'fetch_sp_prices',
        newelType: newelType,
        capType: capType,
        hrType: hrType,
        spindleType: spindleType,
        security: stairBuilderVars.nonce
      },
      dataType: 'json',
      success: function(response) {
        

        jQuery('#newel_material').html(response.newel_options.join(''));
        jQuery('#cap_material').html(response.cap_options.join(''));
        jQuery('#hdr_material').html(response.handrail_options.join(''));
        jQuery('#bal_material').html(response.spindle_options.join(''));

        calculateTotalPrice();
        // Recalculate the total price
        
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log('AJAX error: ' + textStatus + ' - ' + errorThrown);
      }
    });
  }

  function getDeliveryPrice() {
    var postcode = jQuery('#postcode').val();

    jQuery.ajax({
        url: stairBuilderVars.ajax_url,
        method: 'POST',
        data: {
            action: 'get_delivery_price',
            postcode: postcode,
            security: stairBuilderVars.nonce
        },
        success: function(response) {
            if (response.success) {
              var price = response.data;
         // Check if the price is a number
        if (jQuery.isNumeric(price)) {
          jQuery('.deliv_btn').text("Update Delivery (£" + price + ")").attr('data-price', price);
          calculateTotalPrice();
      } else {
          // handle non-numeric price (e.g., "not found")
          jQuery('.deliv_btn').text("Update Delivery (" + price + ")").attr('data-price', '0');
      }
      
  } else {
      // handle error
  }
        },
        error: function() {
            // handle error
        }
    });
}

function addSBtoCart() {
  var price = $total;
  var formDataArray = jQuery('#stairbuild').serializeArray();
  var newelIds = getNewelIds();
  var capIds = getCapIds();
// Iterate over the form data array and modify the values
formDataArray.forEach(function(field) {
  var colonIndex = field.value.indexOf(':');
  if (colonIndex !== -1) {
    field.value = field.value.substring(0, colonIndex);
  }
});

// Serialize the modified form data array
var formData = jQuery.param(formDataArray);

var canvas = document.getElementById("canvas");
  var dataUrl = canvas.toDataURL("image/png");
  console.log(dataUrl);
  jQuery.ajax({
      url: stairBuilderVars.ajax_url,
      method: 'POST',
      data: {
          action: 'custom_add_to_cart',
          product_id: 7024,
          custom_price: price,
          custom_meta: formData,
          newel_product_ids: newelIds,
          cap_product_ids: capIds,
          canvas_image: dataUrl,
          security: stairBuilderVars.nonce
      },
      success: function(response) {
        if (response.success) {
          jQuery(document.body).trigger('wc_update_cart');
        jQuery(document.body).trigger('wc_fragment_refresh');
        window.location.href = stairBuilderVars.cart_url;
        } else {
            // handle error
            console.log("Failed to add product to cart ");
        }
    },
      error: function() {
          // handle error
      }
  });
}

function getFeaturedStepCosts() {
  // Get the values from your select boxes
  const variables = grabFormValues();
  let treadMaterial = getString('tread_material'); //assuming this is the id for the tread material select box

  // Set up our data for the AJAX call
  let data = {
    action: 'get_featured_step', // This should match the hook in your PHP code
    leftFeat: variables.fl,
    rightFeat: variables.fr,
    tread_material: treadMaterial,
    security: stairBuilderVars.nonce  // Include nonce for security
  };

  // Make the AJAX call
  jQuery.ajax({
    url: stairBuilderVars.ajax_url,
    method: 'POST',
    data: data,
    success: function(response) {
      // Parse the JSON response
      let responseObj = JSON.parse(response);

      // Insert the response into your page
      // Update the value of hidden input fields
      jQuery("#leftFeatStep").val(responseObj.leftCost);
      jQuery("#rightFeatStep").val(responseObj.rightCost);
      calculateTotalPrice();
    },
    error: function() {
      // handle error
      console.log("Failed to fetch cost of featured steps");
    }
  });
}
function resetInputs() {
  // Reset text inputs
  jQuery(".ksd input[type='text'], .pcode input[type='text']").val('');
  
  // Uncheck checkboxes
  jQuery(".ksd input[type='checkbox'], .pcode input[type='checkbox']").prop('checked', false);
 
}
  jQuery(document).ready(function() {
    jQuery('#ball').hide();
    jQuery('#ball :input').prop('disabled', true);
    var newelType = jQuery('#newel_type').val();
    spindleType = jQuery('#spindle_type').val();
    var hrType = jQuery('#handrail_type').val();
    var capType = getString('newel_cap');
    updateNewelPosts(newelType,capType,hrType,spindleType);

    if (jQuery("#collected").is(":checked")) {
      jQuery(".ksd").hide();
      jQuery(".pcode").hide();
  }

    jQuery('#newel-posts option[value="custom:0"]').val(customValue);
    newelValue = getString('newel-posts');

    getNewelIds()

    jQuery('.deliv_btn').click(function(e) {
      e.preventDefault(); // Prevent the button from submitting the form
      getDeliveryPrice();
  });

  jQuery('#sbbuybtn').click(function(e) {
    e.preventDefault(); // Prevent the button from submitting the form
    addSBtoCart();
});

jQuery('#all_oak').click(function(e) {
  e.preventDefault();
  setMaterial("Oak");
  calculateTotalPrice();
});

jQuery('#all_pine').click(function(e) {
  e.preventDefault();
  setMaterial("Pine");
  calculateTotalPrice();
});

function setMaterial(material) {
  // Loop through each select element in the form
  jQuery('#mat select').each(function() {
    // Look for an option that contains the material text and set it as selected
    jQuery(this).find(`option:contains(${material})`).prop('selected', true);
  });
}

});

jQuery(document.body).on('wc_fragments_loaded', function () {
  // This event will be triggered after cart fragments are loaded
  console.log("Cart fragments loaded");
});
jQuery('#feature_tread').on('change', getFeaturedStepCosts);
jQuery('#posts :input').change(function(){
      
        // Show/hide the #custom section based on the selection of #newel-posts
        newelValue = getString('newel-posts');
        var newelMat = getString('newel_material');
        if (newelValue === 'custom') {
          jQuery('#custom').show();
          jQuery('#custom :input').prop('disabled', false);
        } else {
          jQuery('#custom').hide();
          jQuery('#custom :input').prop('disabled', true);
        }
    numChecked = jQuery('#custom :checkbox:checked').length;
    customValue = 'custom:' + Math.min(numChecked, 7);
    jQuery('#newel-posts').find('option').filter(function() {
        return this.value.startsWith('custom:');
      }).val(customValue);
      getNewelIds();
      newelType = jQuery('#newel_type').val();
      spindleType = jQuery('#spindle_type').val();
      hrType = jQuery('#handrail_type').val();
      capType = getString('newel_cap');
      if(jQuery("#ballustrades-yes").is(":checked")) { 
        jQuery('#ball').show();
        jQuery('#ball :input').prop('disabled', false); } else { 
        jQuery('#ball').hide();
        jQuery('#ball :input').prop('disabled', true); } 
      
    updateNewelPosts(newelType,capType,hrType,spindleType);
   });
   jQuery("input[name='delivery']").change(function() {
    if (jQuery("#collected").is(":checked")) {
      jQuery(".ksd").hide();
      jQuery(".pcode").hide();
      resetInputs();
      getDeliveryPrice();
    } else if (jQuery("#delivery").is(":checked")) {
      jQuery(".ksd").show();
      jQuery(".pcode").show();
    }
});