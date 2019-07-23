$(document).ready(function () {

    let employeeCards = [];
    let gallery = $("#gallery");
    let currentIndex = 0;

    $.ajax({
        url: 'https://randomuser.me/api/?results=12&nat=us,au,fi,gb,ie,nz',
        dataType: 'json',
        success: function (data) {

            //console.log(data);
            employeeCards = data.results;
            
            // Create Search
            createSearch();

            // Create the random user divs
            createEmployeeCard();

            // Create the modal popup
            createModalPopup();

            // Add a click event for all the random user divs
            $(".card").on("click", function () {

                // Set the user index
                let userIndex = $(this).attr("index");

                // Set the currentIndex
                currentIndex = userIndex;
                
                populateModalPopup(currentIndex);

                // Show the modal popup
                $(".modal-container").show();
            });

            // Add a click event for the modal popup close button
            $("#modal-close-btn").on("click", function () {

                // Hide the modal popup
                $(".modal-container").hide();
            });

            // Add a click event for the search submit button
            $("#search-submit").on("click", function () {

                let searchVal = $("#search-input").val().toLowerCase();

                $(".card").hide();

                for (let j = 0; j < $(".card").length; j++) {
                    if ($("#name" + j)[0].innerText.toLowerCase().indexOf(searchVal) != -1)
                       $(".card")[j].style.display = "block";
                }
               
            });

            // Add a click event for the modal prev
            $("#modal-prev").on("click", function () {

                // Decrement the currentIndex
                currentIndex = parseInt(currentIndex) - 1;

                // If the currentIndex is less than zero, reset it to zero
                if (currentIndex < 0)
                    currentIndex = 0;

                populateModalPopup(currentIndex);

            });

            // Add a click event for the modal next
            $("#modal-next").on("click", function () {

                // Increment the currentIndex
                currentIndex = parseInt(currentIndex) + 1;
                
                // If currentIndex is greater than 11, reset it to 11 i.e. the maximum number
                // of randomn users
                if (currentIndex > 11)
                    currentIndex = 11;

                populateModalPopup(currentIndex);
            });
        }
    });

    //Create function with for loop to build the random users
    function createEmployeeCard() {


        for (let i = 0; i < employeeCards.length; i++) {
            let card =
                `<div class="card" index="${i}">
                   <div class="card-img-container">
                      <img class="card-img" src="${employeeCards[i].picture.medium}" alt="profile picture">
                   </div>
                   <div class="card-info-container">
                      <h3 id="name${i}" class="card-name cap">${employeeCards[i].name.first} ${employeeCards[i].name.last}</h3>
                      <p class="card-text">${employeeCards[i].email}</p>
                      <p class="card-text cap">${employeeCards[i].location.city}, ${employeeCards[i].location.state}</p>
                   </div>
                </div>`;

            gallery.append(card);

        }
    } 

    // Function to create the modalPopup
    function createModalPopup() {
        let modalPopup = 
             `<div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                            <h3 id="name" class="modal-name cap">name</h3>
                            <p class="modal-text">email</p>
                            <p class="modal-text cap">city</p>
                            <hr>
                                <p class="modal-text">(555) 555-5555</p>
                                <p class="modal-text cap">123 Portland Ave., Portland, OR 97204</p>
                                <p class="modal-text">Birthday: 10/21/2015</p>
                    </div>
                </div>

                // IMPORTANT: Below is only for exceeds tasks 
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
               </div>`;

        // Add the modalPopup after the gallery div
        gallery.after(modalPopup);

        // Hide the modal popup
        $(".modal-container").hide();
    }

    // Function to create the search
    function createSearch() {
        let search =
            `<form action="#" method="get">
                <input type="search" id="search-input" class="search-input" placeholder="Search...">
                <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
             </form>`;

        // Append the search to the search container
        $(".search-container").append(search);

    }

    // Function to populate the modal popup
    function populateModalPopup(index) {

        // Set the modal image
        $(".modal-img")[0].src = employeeCards[index].picture.medium;

        // Set the modal popup name
        $("#name").text(employeeCards[index].name.first + " " + employeeCards[index].name.last);

        // Set the modal popup email
        $(".modal-text")[0].innerText = employeeCards[index].email;

        // Set the modal popup city
        $(".modal-text")[1].innerText = employeeCards[index].location.city;

        // Set the modal popup phone number
        $(".modal-text")[2].innerText = employeeCards[index].cell;

        // Set the modal popup address
        $(".modal-text")[3].innerText = employeeCards[index].location.street + ", " +
            employeeCards[index].location.city + ", " +
            employeeCards[index].location.state + " " +
            employeeCards[index].location.postcode;

        // Set the Birthday
        let DOB = employeeCards[index].dob.date.split("T");
        let DOBArr = DOB[0].split("-");
        let year = DOBArr[0];
        let month = DOBArr[1];
        let day = DOBArr[2];
        $(".modal-text")[4].innerText = "Birthday: " + month + "/" + day + "/" + year;
    }
});

