
let currentPark = 'default'

const dropDownParks = document.getElementById("ParkDropDown");

const dropDownAttractions = document.getElementById("AttractionDropDown");

document.addEventListener("DOMContentLoaded", initialParks); // Loads park names from database on page load

// Sets the "Select an Attraction" dropdown menu based on the selected park
dropDownParks.addEventListener("click", function() {
    console.log("DropDown parks clicked");

    const selectedPark = dropDownParks.querySelector("option");
    selectedPark.value = dropDownParks.value; // Gets the park selected via the dropdown

    console.log(`park selected ${selectedPark.value}`);

    if (selectedPark.value !== currentPark) { // only allows new API call if a new option is selected
        if (selectedPark.value) { // check if value is not null
            console.log(`click listener ${selectedPark.value}`); // debugging code
            getDataByPark(selectedPark.value).then(jsonResponse => {

                // create HTML selection string
                const htmlString = jsonResponse.LandInformation.Attractions
                    .map(attraction => `<option value="${attraction.name}">${attraction.name}</option>`)
                    .join('');

                dropDownAttractions.innerHTML = htmlString; // update page html with dynamic attraction options
            });

            currentPark = selectedPark.value; // Updates with the current park selection
        }

    } else {
        console.log(`Else case current park ${selectedPark.value}`);
    }

});

async function getDataByPark(parkOption) {

    const URL = `http://localhost:4000/api/v1/waitTime/GetParkData?parkName=${parkOption}`;

    const response = await fetch(URL, {
        method: 'GET'
    });

    if (!response.ok) {
        console.log(`Error: ${response.status}`);
    } else{
        return await response.json();
    }
}

async function getAllUniqueParks() {
    const URL = `http://localhost:4000/api/v1/waitTime/GetAllParks`;

    const response = await fetch(URL, {
        method: 'GET'
    });

    if (!response.ok) {
        console.log(`Error: ${response.status}`);
    } else{
        return await response.json();

    }
}

async function initialParks(){
    console.log("Initializing parks...");

    getAllUniqueParks().then(jsonResponse => {
        const optionData = jsonResponse.ParkNames;

        let optionString = '<option value="default">Select an option</option>';

        if (optionData && Array.isArray(optionData)) {
            optionData.forEach(name => {
                optionString += `<option value="${name}">${name}</option>`;
            });

            dropDownParks.innerHTML = optionString;
        }
    });
}






