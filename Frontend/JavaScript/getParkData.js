const div = document.querySelector('div');

// document.getElementsByName('Park')
//     .forEach(radio => {
//         if (radio.checked) {
//             console.log(radio.value);
//         }
// });

const submitButton = document.getElementById("ParkSelection");

submitButton.addEventListener("click", function() {
    const parkOption = document.querySelector('input[name="Park"]:checked');
    if (parkOption) {
        console.log(parkOption.value);
        getDataByPark(parkOption.value).then(jsonResponse => {
            // let htmlString = '';

            // for (let i = 0; i < jsonResponse["LandInformation"].Attractions.length; i++) {
            // htmlString += `<div>${jsonResponse.LandInformation.Attractions[i]}</div>`;
            // }

            const htmlString = jsonResponse.LandInformation.Attractions
                .map(attraction => `<div>${attraction.name} (ID: ${attraction.id})</div>`)
                .join('');



            div.innerHTML = htmlString;
        });

    } else {
        console.log("Park selection is empty");
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

        // let htmlString = '';
        //
        // for (let i = 0; i < jsonResponse.length; i++) {
        // htmlString += `<div>${jsonResponse.Attractions[i]}</div>`;
        // }
        //
        // div.innerHTML = htmlString;
    }


}




