// const dropDownParks = document.getElementById("ParkDropDown");
//
// const dropDownAttractions = document.getElementById("AttractionDropDown");
//
// const waitTimeDIV = document.getElementById("WaitTimeDIV");
//
// // document.addEventListener("DOMContentLoaded", initialParks); // Loads park names from database on page load
//
// // Sets the "Select an Attraction" dropdown menu based on the selected park
// dropDownParks.addEventListener("change", function() {
//     console.log("DropDown parks clicked");
//
//     const selectedPark = dropDownParks.querySelector("option");
//     selectedPark.value = dropDownParks.value; // Gets the park selected via the dropdown
//
//     console.log(`park selected ${selectedPark.value}`);
//
//     if (selectedPark.value) { // check if value is not null
//
//         console.log(`click listener ${selectedPark.value}`); // debugging code
//         getDataByPark(selectedPark.value).then(jsonResponse => {
//
//             // create HTML selection string
//             const htmlString = jsonResponse.LandInformation.Attractions
//                 // .map(attraction => `<option value="${attraction.name}">${attraction.name}</option>`)
//                 .map(attraction => `<option id="${attraction.id}" value="${attraction.name}">${attraction.name}</option>`)
//                 .join('');
//
//             dropDownAttractions.innerHTML = htmlString; // update page html with dynamic attraction options
//         });
//
//     }
// });
//
// // displays single attraction data
// dropDownAttractions.addEventListener("change", function() {
//     // const selectedAttraction = dropDownAttractions.querySelector("#dropDownAttractions option");
//     const selectedAttraction = this.options[this.selectedIndex];
//
//     let selectedAttraction_Value = selectedAttraction.value;
//     let selectedAttraction_id = selectedAttraction.id;
//
//     console.log(`selectedAttraction value ${selectedAttraction_Value}`);
//     console.log(`selectedAttraction id ${selectedAttraction_id}`);
//
//     getAttractionData(selectedAttraction_id).then(jsonResponse => {
//
//         const htmlString = jsonResponse.RideInformation.WaitTimeData
//             .map(attraction => `<div> Open: ${attraction.isOpen} Wait Time: ${attraction.waitTime} Updated ${attraction.updated}</div>`)
//             .join('');
//
//         waitTimeDIV.innerHTML = htmlString; // update page html with dynamic attraction options
//     });
// });

//  async function getDataByPark(parkOption) {
//
//     const URL = `http://localhost:4000/api/v1/waitTime/GetParkData?parkName=${parkOption}`;
//
//     const response = await fetch(URL, {
//         method: 'GET'
//     });
//
//     if (!response.ok) {
//         console.log(`Error: ${response.status}`);
//     } else{
//         return await response.json();
//     }
// }

export const getDataByPark = async (parkOption) => {
    console.log(`park option ${parkOption}`);
    const URL = `http://localhost:4000/api/v1/waitTime/GetParkData?parkName=${parkOption}`;

    const response = await fetch(URL, {
        method: 'GET'
    });

    if (!response.ok) {
        console.log(`Error: ${response.status}`);
    } else{
        const data = await response.json();
        console.log(`Park Data: ${data}`);
        return data
    }
}


// async function getAllUniqueParks() {
//     const URL = `http://localhost:4000/api/v1/waitTime/GetAllParks`;
//
//     const response = await fetch(URL, {
//         method: 'GET'
//     });
//
//     if (!response.ok) {
//         console.log(`Error: ${response.status}`);
//     } else{
//         return await response.json();
//
//     }
// }
//
// async function getAttractionData(attractionID){
//     const URL = `http://localhost:4000/api/v1/waitTime/GetData/${attractionID}`;
//
//     const response = await fetch(URL, {
//         method: 'GET'
//     });
//
//     if (!response.ok) {
//         console.log(`Error: ${response.status}`);
//     } else{
//         return await response.json();
//     }
// }
//
// async function initialParks(){
//     console.log("Initializing parks...");
//
//     getAllUniqueParks().then(jsonResponse => {
//         const optionData = jsonResponse.ParkNames;
//
//         let optionString = '<option value="default">Select an option</option>';
//
//         if (optionData && Array.isArray(optionData)) {
//             optionData.forEach(name => {
//                 optionString += `<option value="${name}">${name}</option>`;
//             });
//
//             dropDownParks.innerHTML = optionString;
//         }
//     });
// }
