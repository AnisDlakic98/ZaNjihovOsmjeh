/*  -----------------------------------------------------------
    UNIVERSAL FUNCTIONS START 
----------------------------------------------------------- */

validateInput = (input, regex, length) => {
    $(`#${input}`).on("input", function() {
        var input = $(this);
        var is_input = input.val();

        if (regex != false) {
            var is_input = regex.test(input.val());
        }
        if (length != false) {
            input.val().length > length ? (is_input = true) : (is_input = false);
        }

        is_input
            ?
            input.removeClass("invalid").addClass("valid") :
            input.removeClass("valid").addClass("invalid");
    });
};

// Validate all
function validateAll() {
    var form_data = $(".contact_form").serializeArray();
    var error_free = true;
    for (var input in form_data) {
        var element = $("#" + form_data[input]["name"]);
        var valid = element.hasClass("valid");
        var error_element = $("span", element.parent());
        if (!valid) {
            error_element.removeClass("input_err").addClass("error_show");
            element.css("border-bottom", "solid 2px #ff4444");
            error_free = false;
        } else {
            error_element.removeClass("error_show").addClass("input_err");
            element.css("border-bottom", "solid 2px #0ab6ff");
        }
    }
    if (!error_free) {
        event.preventDefault();
        return false;
    } else {
        return true;
    }
}

/*  -----------------------------------------------------------
    READY FUNCTION START 
----------------------------------------------------------- */

$(document).ready(function() {
    var emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    validateInput("nameSurname", false, false);
    validateInput("email", emailRe, false);
    validateInput("message", false, 10);

    // Submit data
    $("#contactSubmit").on("click", function(e) {
        e.preventDefault();
        if (validateAll()) {
            swal("Hvala", "Uspješno ste poslali email", "success");
        }
    });
});