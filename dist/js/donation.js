/*--------------------------------------------------------------------------------------------
  After Rendering DOM Elements
---------------------------------------------------------------------------------------------*/

$(function() {
    getCategories();
    addEventListeners();

    $("#start_donation_btn").on("click", function(e) {
        e.preventDefault();

        var donationForm = $("#donation_form");
        var popup = $(".popup");

        openElement(".popup", "slideInUp", "bounceOutDown");

        var selectedItems = [];

        $($(".selected_items ul li")).each(function() {
            var li = $(this);
            li.each(function() {
                selectedItems.push($(this).text());
            });
        });

        var html = "";

        for (let i = 0; i < selectedItems.length; i++) {
            const itemObject = getItemByName(selectedItems[i]);
            const shortName = itemObject[0].shortName;
            const category = getCategoryByID(itemObject[0].categoryId);
            const categoryOptions = category.options;
            const ages = categoryOptions[0].age;
            const sizes = categoryOptions[0].size;
            const priceRanges = categoryOptions[0].priceRange;
            const quantity = categoryOptions[0].quantity;

            html += `
            <div class="popup_tab">
                <div class="container pt-4">
                    <div class="poput_tab_title text-center">
                        <h1>Donacija: <span>${selectedItems[i]}</span></h1>
                        <p>Popuni formu ispod i rezerviši donaciju.</p>
                        <hr/>
                    </div>
                    <div class="popup_header">
                        <button type="button" class="btn btn_transparent" id="prevBtn" onclick="nextPrev(-1)">
                            <img src="img/multistep/arrow-pointing-to-right.svg" alt=""> Prethodni korak
                        </button>
                        <div class="close" id="closePopup">
                            <img src="img/multistep/cancel.svg" alt="">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 m-auto text-center" id="${shortName}_select_area">
                            <p>Odaberi pol:</p>
                            <div class="gender_area">
                            
                                <label for="${shortName}-female" id="${shortName}-label-female">
                                    <img src="img/multistep/group-217.svg" alt="">
                                    <p>Žensko</p>
                                </label>
                                <input type="radio" name="${shortName}-gender" class="${shortName}-gender" id="${shortName}-female" value="female">
                                <label for="${shortName}-male" id="${shortName}-label-male">
                                    <img src="img/multistep/group-216.svg" alt="">
                                    <p>Muško</p>
                                </label>
                                <input type="radio" name="${shortName}-gender" class="${shortName}-gender" id="${shortName}-male" value="male"> 
                            </div>
                            <div class="select_area" >`;

            if (category.id == 1) {
                html += `           
                                <select class="wide" id="age" name="age">
                                    <option data-display="Uzrast">Odaberi</option>
                                     `;
                for (let i = 0; i < ages.length; i++) {
                    html += `<option value="${ages[i]}">${ages[i]}</option>`;
                }

                html += `
                                    </select>
                                    <select class="wide" id="size" name="size">
                                        <option data-display="Broj">Odaberi</option>
                                        `;
                for (let i = 0; i < sizes.length; i++) {
                    html += `<option value="${sizes[i]}">${sizes[i]}</option>`;
                }
                html += `
                                    </select>`;
            }

            html += `

            <select class="wide" id="price" name="price">
                                        <option data-display="Cijenovni raspon">Odaberi</option>
                                        <option value="${priceRanges}">${priceRanges}</option>
                                    </select>

                                    <input type="number" class="mb-4" id="quantity" name="quantity" min="1" max="${quantity}" placeholder="Količina">
                                    
                                </div>
                                <button type="button" class="btn btn_primary" id="nextBtn" onclick="nextPrev(1), ${storeItem(
                                  shortName
                                )}">Sledeći korak</button>
                            </div>
                        </div>
                    </div>
                </div>`;
        }

        var html1 = `
        <div class="container">
            <div class="row">
                <div class="popup_indicators m-auto">
                    <span>1</span> /
                    <span>${selectedItems.length + 2}</span>
                </div>
            </div>
        </div>`;

        donationForm.append(html1);

        donationForm.prepend(html);

        showTab(currentTab); // Display the current tab
        $("select").niceSelect();
    });
});

/*--------------------------------------------------------------------------------------------
          All JavaScript fuctions Start
        ---------------------------------------------------------------------------------------------*/

var currentTab = 0;
const animations = ["animated", "bounceInLeft"];
var articlesNames = [];

function storeItem(shortName) {
    articlesNames.push(shortName);
}

function confirmDonation() {
    var formValues = serializeDiv($(`#donation_form`), "serializeArray");
    console.log(formValues);
    openElement("#prompt_success", "heartBeat", "bounceOutDown");
}

function addDonation() {
    var formValues = [];
    var html = "";

    for (let i = 0; i < articlesNames.length; i++) {
        formValues.push(
            serializeDiv($(`#${articlesNames[i]}_select_area`), "serializeArray")
        );
    }

    console.log(formValues);

    for (let i = 0; i < formValues.length; i++) {
        const itemObject = getItemByShortName(articlesNames[i]);
        html += `
        <div class="card">
            <div class="card-header" role="tab" id="${articlesNames[i]}">
                <a data-toggle="collapse" data-parent="#accordionEx" href="#${
                  articlesNames[i]
                }-collapse" aria-expanded="true" aria-controls="${
      articlesNames[i]
    }-collapse">
                    <h5 class="mb-0">
                        ${itemObject[0].name}
                        <i class="fas fa-angle-up rotate-icon"></i>
                    </h5>
                </a>
            </div>
            <div id="${articlesNames[i]}-collapse" class="collapse ${
      i === 0 ? "show" : ""
    }" role="tabpanel" aria-labelledby="${
      articlesNames[i]
    }" data-parent="#accordionEx">
                <div class="card-body">`;

        for (let j = 0; j < formValues[i].length; j++) {
            var option = "";
            switch (formValues[i][j].name) {
                case "age":
                    option = "Godine:";
                    break;
                case "size":
                    option = "Veličina:";
                    break;
                case "price":
                    option = "Godine:";
                    break;
                case "quantity":
                    option = "Količina:";
                    break;
                case "male":
                    option = "Muško::";
                    break;
                case "female":
                    option = "Žensko:";
                    break;
                default:
                    option = "Pol:";
                    break;
            }
            var value = "";
            switch (formValues[i][j].value) {
                case "male":
                    value = "Muško";
                    break;
                case "female":
                    value = "Žensko";
                    break;
                default:
                    value = formValues[i][j].value;
                    break;
            }

            html += `
                <li>
                    <span>${option}</span>
                    <span><b>${value}</b></span>
                </li>

            `;
        }

        html += `</div>
            </div>
        </div>
        `;
    }

    $("#accordionEx").append(html);
    formValues.push(serializeDiv($("#personal_info_area"), "serializeArray"));
}

function serializeDiv($div, serialize_method) {
    // Accepts 'serialize', 'serializeArray'; Implicit 'serialize'
    serialize_method = serialize_method || "serialize";

    // Unique selector for wrapper forms
    var inner_wrapper_class = "any_unique_class_for_wrapped_content";

    // Wrap content with a form
    $div.wrapInner("<form class='" + inner_wrapper_class + "'></form>");

    // Serialize inputs
    var result = $("." + inner_wrapper_class, $div)[serialize_method]();

    // Eliminate newly created form
    $(".script_wrap_inner_div_form", $div).contents().unwrap();

    // Return result
    return result;
}

function openElement(element, openAnimation, closeAnimation) {
    var element = $(element);
    element
        .removeClass(closeAnimation)
        .addClass("animated " + openAnimation + " active");
    $("body").css("overflow", "hidden");
}

function closeElement(element, openAnimation, closeAnimation) {
    var element = $(element);
    element.removeClass(openAnimation + " active").addClass(closeAnimation);
    $("body").css("overflow", "visible");
}

addEventListeners = () => {
    $(document).on("keyup", "#donation_form #name", function() {
        $(".donator_info ul li:nth-child(1) span:nth-child(2) b").html(
            $(this).val()
        );
    });

    $(document).on("keyup", "#donation_form #email", function() {
        $(".donator_info ul li:nth-child(2) span:nth-child(2) b").html(
            $(this).val()
        );
    });

    $(document).on("keyup", "#donation_form #phone", function() {
        $(".donator_info ul li:nth-child(3) span:nth-child(2) b").html(
            $(this).val()
        );
    });

    $("#accordionEx").on("hide.bs.collapse show.bs.collapse", (e) => {
        $(e.target)
            .prev()
            .find("i:last-child")
            .toggleClass("fa-angle-up fa-angle-down");
    });

    $(".collapse.show");

    $(document).on("click", ".close", function() {
        openElement("#prompt_cancel", "heartBeat", "bounceOutDown");
    });

    $(document).on("click", "#prompt_success_cancel", function() {
        closeElement("#prompt_success", "heartBeat", "bounceOutDown");
        closeElement(".popup", "heartBeat", "bounceOutDown");
        location.reload();
    });

    $(document).on("click", ".positive", function() {
        closeElement("#prompt_cancel", "heartBeat", "bounceOutDown");
        closeElement(".popup", "slideInUp", "bounceOutDown");
        location.reload();
    });

    $(document).on("click", ".negative", function() {
        closeElement("#prompt_cancel", "heartBeat", "bounceOutDown");
    });

    $(document).on("click", ".subject_person_single", function() {
        let id = $(this).prop("id");
        if (id === "legalEntity") {
            $(".legalEntity").prop("checked", true);
            $("#physicalPerson").removeClass("selected");
            $("#legalEntity").addClass("selected");
            $("#donation_form #name").attr("placeholder", "Naziv Kompanije");
        } else {
            $(".physicalPerson").prop("checked", true);
            $("#legalEntity").removeClass("selected");
            $("#physicalPerson").addClass("selected");
            $("#donation_form #name").attr("placeholder", "Ime i Prezime");
        }
    });

    $(document).on("click", ".gender_area label", function() {
        let id = $(this).next().attr("id");
        let idArray = id.split("-");
        let gender = idArray[idArray.length - 1];

        let label = `${id}-label`.split("-");
        label = label[0];

        if (gender == "female") {
            $(`#${label}-label-male`).removeClass("selected");
            $(`#${label}-label-female`).addClass("selected");
        } else {
            $(`#${label}-label-female`).removeClass("selected");
            $(`#${label}-label-male`).addClass("selected");
        }
    });

    $(document).on("click", ".styled-checkbox", function() {
        $(this).is(":checked") ?
            $(this).attr("disabled", true) :
            $(this).attr("disabled", false);

        const item = $(this).val();
        const id = $(this).attr("id");
        $("#" + id).attr("checked", true);
        var element =
            "<li class='selected_item_single' id='" + id + "'>" + item + "</li>";

        $(".selected_items ul").append(element);
        $(".selected_items ul").on("click", ".selected_item_single", function() {
            const id = $(this).attr("id");
            $("#" + id).attr("checked", false);
            $(this).remove();
            $(".form-group #" + id).attr("disabled", false);
        });
    });

    //________Get Categories Function________//
    $("#start_donation_btn").hide();
    $(".selected_items ul").on("DOMSubtreeModified", function() {
        let selectedItems = $(".selected_items ul");
        let startDonationBtn = $("#start_donation_btn");
        selectedItems.children().length === 0 ?
            startDonationBtn.hide() :
            startDonationBtn.show();
    });
};

function showTab(n) {
    var x = $(".popup_tab");
    x[n].classList.add(...animations);
    x[n].style.display = "block";
    $(".popup").scrollTop(0);
    $(".popup_indicators span:first-child").html(n + 1);

    n === 0 ?
        $("#prevBtn").css("display", "none") :
        $("#prevBtn").css("display", "inline");
}

function nextPrev(n) {
    var x = $(".popup_tab");
    if (n >= 1 && !validateForm()) return false;
    x[currentTab].style.display = "none";
    currentTab = currentTab + n;
    showTab(currentTab);
}

function validateForm() {
    var x,
        y,
        i,
        valid = true;
    x = document.getElementsByClassName("popup_tab");

    var selectMenus = x[currentTab].querySelectorAll("select, input");

    console.log(selectMenus);

    for (i = 0; i < selectMenus.length; i++) {
        console.log(selectMenus[i]);

        console.log(selectMenus[i]);
        if (
            selectMenus[i].value == "Odaberi" ||
            selectMenus[i].value == "" ||
            selectMenus[i].value < 1 ||
            (!selectMenus[0].checked && !selectMenus[1].checked)
        ) {
            selectMenus[i].classList.remove("valid");
            selectMenus[i].classList.add("invalid");
            valid = false;
        } else {
            selectMenus[i].classList.remove("invalid");
            selectMenus[i].classList.add("valid");
            valid = true;
        }
    }
    return valid;
}

//________Get Categories Function________//
getCategories = () => {
    $.ajax({
        url: "http://localhost:3000/categories",
        type: "GET",
        success: function(data) {
            loadCategories(data);
        },
    });
};

beforecreate: function getItemByName(name) {
    var item = null;
    $.ajax({
        url: `http://localhost:3000/items?name=${name}`,
        type: "GET",
        success: function(data) {
            item = data;
        },
        async: false,
    });
    return item;
}

beforecreate: function getItemById(id) {
    var item = null;
    $.ajax({
        url: `http://localhost:3000/items`,
        type: "GET",
        data: "id=" + id,
        success: function(data) {
            item = data;
        },
        async: false,
    });
    return item;
}

beforecreate: function getItemByShortName(shortName) {
    var item = null;
    $.ajax({
        url: `http://localhost:3000/items/?shortName=${shortName}`,
        async: false,
        dataType: "json",
    }).done(function(data) {
        item = data;
    });
    return item;
}

beforecreate: function getCategoryByID(id) {
    var category = null;
    $.ajax({
        url: `http://localhost:3000/categories/${id}`,
        async: false,
        dataType: "json",
    }).done(function(data) {
        category = data;
    });
    return category;
}

beforecreate: function getSubcategories(id) {
    var subCategories = [];
    let html = "";
    $.ajax({
        url: `http://localhost:3000/categories/${id}/items`,
        type: "GET",
        success: function(data) {
            subCategories = data;
        },
        async: false,
    });

    for (let i = 0; i < subCategories.length; i++) {
        html += `
        <div class="form-group">
            <input class="styled-checkbox" id="${subCategories[i].shortName}" type="checkbox" value="${subCategories[i].name}">
            <label for="${subCategories[i].shortName}">${subCategories[i].name}</label>
        </div>`;
    }
    return html;
}

loadCategories = (data) => {
        let dataItems = data.map((item, index) => {
                    return $(`
        <li class="nav-item">
            <a class="nav-link ${index === 0 ? `active` : ``}" 
            id="${item.shortName}-tab" data-toggle="tab" href="#${
      item.shortName
    }" role="tab" aria-controls="${item.name}" aria-selected="${
      index === 0 ? true : false
    }">
                    <div class="nav-link-content">
                        <img src="${item.image}" alt="">
                        <div>${item.name}</div>
                    </div>
                </a>
            </li>`);
  });

  let dataCategories = data.map((item, index) => {
    return $(`
    <div class="tab-pane fade show ${index === 0 ? `active` : ``}" 
    id="${item.shortName}" role="tabpanel" 
    aria-labelledby="${item.shortName}-tab">
        ${getSubcategories(item.id)}
    </div>`);
  });

  $("#myTabContent").html(dataCategories);
  $("#myTab").html(dataItems);
};