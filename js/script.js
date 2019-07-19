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