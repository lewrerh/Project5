//$(document).ready(function () {//
let employeeCards = [];
//let gallery = $("#gallery");//

$.ajax({
    url: 'https://randomuser.me/api/?results=12',
    dataType: 'json',
    success: function (data) {
        console.log(data);
        employeeCards = data.results;
        createEmployeeCard(employeeCards);
    }
});
//Create function with for loop//
function createEmployeeCard(employeeCards) {


    for (let i = 0; i < employeeCards.length; i++) {
        let card =
            `<div class="card" index="${i}">
                <div class="card-img-container">
                <img class="modal-img" src="${employeeCards[i].picture.medium}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name0" class="card-name cap">${employeeCards[i].name.first} ${employeeCards[i].name.last}</h3>
                    <p class="card-text">email${employeeCards[i].email}</p>
                    <p class="card-text cap">${employeeCards[i].location.city}, ${employeeCards[i].location.city}</p>
                </div>
            </div>`
        $(".gallery").append(card);

    };
}

// Create the modal container with class modal-container and hide it
let modalContainer = $("<div>");
modalContainer.addClass("modal-container");
modalContainer.css("display", "none");

// Create a modal div with class modal
let modalDiv = $("<div>");
modalDiv.addClass("modal");

// Create a close button with type button, id modal-close-btn, class modal-close-btn
let buttonClose = $("<button>");
buttonClose.attr("type", "button");
buttonClose.attr("id", "modal-close-btn");
buttonClose.addClass("modal-close-btn");

// Create a strong tag
let strong = $("<strong>");
strong.text("X");

// Append the strong to the close button and append the close button to the modalDiv
buttonClose.append(strong);
modalDiv.append(buttonClose);
