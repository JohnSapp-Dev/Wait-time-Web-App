// const div = document.querySelector('div');


const submitButton = document.getElementById("ParkSelection");

const dropDownParks = document.getElementById("ParkDropDown");

submitButton.addEventListener("click", function() {
    const parkOption = document.querySelector('input[name="Park"]:checked');
    if (parkOption) {
        console.log(parkOption.value);
        getDataByPark(parkOption.value).then(jsonResponse => {

            const htmlString = jsonResponse.LandInformation.Attractions
                .map(attraction => `<div>${attraction.name} (ID: ${attraction.id})</div>`)
                .join('');

            div.innerHTML = htmlString;
        });

    } else {
        console.log("Park selection is empty");
    }

});

dropDownParks.addEventListener("focus", function() {
    console.log("DropDown parks focus");

    let optionString = '';

    getAllUniqueParks().then(jsonResponse => {
        const optionData = jsonResponse.ParkNames;

        if (optionData && Array.isArray(optionData)) {
            optionData.forEach(name => {
                optionString += `<option value="${name}">${name}</option>`;
            });

            dropDownParks.innerHTML = optionString;
        }
    });
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






