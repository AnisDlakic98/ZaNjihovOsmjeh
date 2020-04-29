/*--------------------------------------------------------------------------------------------
  After Rendering DOM Elements
---------------------------------------------------------------------------------------------*/

$(function() {
    getCategories();
    addEventListeners();

    $("#start_donation_btn").on("click", function(e) {
        e.preventDefault();

        var donationForm = $("#donation_form");

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
                        <div class="col-md-4 m-auto text-center">
                            <p>Odaberi pol:</p>
                            <div class="gender_area">
                                <div class="gender_single" id="female">
                                    <img src="img/multistep/group-217.svg" alt="">
                                    <p>Žensko</p>
                                </div>
                                <div class="gender_single" id="male">
                                    <img src="img/multistep/group-216.svg" alt="">
                                    <p>Muško</p>
                                </div>
                                <input type="radio" name="${selectedItems[i]}-gender" class="${selectedItems[i]}-gender ${selectedItems[i]}-female" value="female">
                                <input type="radio" name="${selectedItems[i]}-gender" class="${selectedItems[i]}-gender ${selectedItems[i]}-male" value="male"> 
                            </div>
                            <div class="select_area">`;

            if (category.id == 1) {
                html += `           
                                <select class="wide" id="age">
                                    <option data-display="Uzrast">Odaberi</option>
                                     `;
                for (let i = 0; i < ages.length; i++) {
                    html += `<option value="${ages[i]}">${ages[i]}</option>`;
                }

                html += `
                                    </select>
                                    <select class="wide" id="size">
                                        <option data-display="Broj">Odaberi</option>
                                        `;
                for (let i = 0; i < sizes.length; i++) {
                    html += `<option value="${sizes[i]}">${sizes[i]}</option>`;
                }
                html += `
                                    </select>`;
            }

            html += `

            <select class="wide" id="price">
                                        <option data-display="Cijenovni raspon">Odaberi</option>
                                        <option value="${priceRanges}">${priceRanges}</option>
                                    </select>

                                    <input type="number" class="mb-4" id="quantity" name="quantity" min="1" max="${quantity}" placeholder="Količina">
                                    
                                </div>
                                <button type="button" class="btn btn_primary" id="nextBtn" onclick="nextPrev(1)">Sledeći korak</button>
                            </div>
                        </div>
                    </div>
                </div>`;
        }

        html += `
        <div class="popup_tab">
            <div class="container pt-4">
                <div class="poput_tab_title text-center">
                    <h1>Lične informacije</h1>
                    <p>Informacije su nam potrebne kako bi uspješno rezervisali rezervaciju.</p>
                    <hr/>
                </div>
                <div class="popup_header">
                    <button type="button" class="btn btn_transparent" id="prevBtn" onclick="nextPrev(-1)">
                        <img src="img/multistep/arrow-pointing-to-right.svg" alt=""> Prethodni korak
                    </button>
                    <div class="close">
                        <img src="img/multistep/cancel.svg" alt="">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4 m-auto text-center">
                        <p>Odaberi:</p>
                        
                        <div class="subject_person_area">
                            <div class="subject_person_single" id="legalEntity">
                                <p>Pravno<br>Lice</p>
                            </div>
                            <div class="subject_person_single" id="physicalPerson">
                                <p>Fizičko<br>Lice</p>
                            </div>
                            <input type="radio" name="subject_person" class="subject_person legalEntity" value="legalEntity">
                            <input type="radio" name="subject_person" class="subject_person physicalPerson" value="physicalPerson"> 
                        </div>
                        <div class="personal_info">
                            <div class="form-group">
                                <input type="text" class="form-control" id="name" placeholder="Ime i Prezime" />
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" id="email" placeholder="E-mail" />
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" id="phone" placeholder="Broj telefona" />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="text-center">   
                    <button type="button" class="btn btn_primary" id="nextBtn" onclick="nextPrev(1)">Sledeći korak</button>                        
                </div>
            </div>
        </div>`;

        html += `
        <div class="popup_tab overview">
            <div class="container pt-4">
                <div class="poput_tab_title text-center">
                    <h1>Pregled rezervacije</h1>
                </div>
                <div class="popup_header">
                    <div class="close" id="closePopup">
                        <img src="img/multistep/cancel.svg" alt="">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-5 m-auto text-left">
                        <div class="donator_info">
                            <p>Informacije o donatoru:</p>
                            <ul>
                                <li>
                                    <span>Ime i prezime Donatora</span>
                                    <span><b>Anis Dlakic</b></span>
                                </li>
                                <li>
                                    <span>Email</span>
                                    <span><b>anis.dlakic.fit@gmail.com</b></span>
                                </li>
                                <li>
                                    <span>Broj telefona</span>
                                    <span><b>068848285</b></span>
                                </li>
                            </ul>
                        </div>
                        <div class="articles_info">
                            <p>Informacije o artiklima:</p>
                        </div>
                        <div class="text-center">
                            <button type="button" class="btn btn_primary" id="nextBtn" onclick="nextPrev(1)">Rezerviši donaciju</button>
                        </div>
                        <div class="tab_note text-center">
                            <p>* Donacija može biti rezervisana 5 dana od datuma rezervisanja, nakon čega prelazi u kategoriju slobodnih proizvoda.</p>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </div>`;

        html += `
        <div class="container">
            <div class="row">
                <div class="popup_indicators m-auto">
                    <span>1</span> /
                    <span>${selectedItems.length + 2}</span>
                </div>
            </div>
        </div>`;

        donationForm.html(html);

        showTab(currentTab); // Display the current tab
        $("select").niceSelect();
    });
});

/*--------------------------------------------------------------------------------------------
          All JavaScript fuctions Start
        ---------------------------------------------------------------------------------------------*/

var currentTab = 0;
const animations = ["animated", "bounceInLeft"];

function openElement(element, openAnimation, closeAnimation) {
    var element = $(element);
    element
        .removeClass(closeAnimation)
        .addClass("animated " + openAnimation + " active");
    $("body").css("overflow", "hidden");
}

function closeElement(element, openAnimation, closeAnimation) {
    var element = $(element);
    element.removeClass(openAnimation).addClass(closeAnimation + " active");
    $("body").css("overflow", "visible");
}

addEventListeners = () => {
    $(document).on("click", ".close", function() {
        openElement(".prompt", "heartBeat", "bounceOutDown");
    });

    $(document).on("click", ".positive", function() {
        closeElement(".prompt", "heartBeat", "bounceOutDown");
        closeElement(".popup", "slideInUp", "bounceOutDown");
    });

    $(document).on("click", ".negative", function() {
        closeElement(".prompt", "heartBeat", "bounceOutDown");
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

    $(document).on("click", ".gender_single", function() {
        let id = $(this).prop("id");
        if (id === "female") {
            $(".female").prop("checked", true);
            $("#male").removeClass("selected");
            $("#female").addClass("selected");
        } else {
            $(".male").prop("checked", true);
            $("#female").removeClass("selected");
            $("#male").addClass("selected");
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
    x[currentTab].style.display = "none";
    currentTab = currentTab + n;
    showTab(currentTab);
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