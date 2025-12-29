import {ParkURL} from "../src/config/constants.js";


const getWaitTime = async (req, res) => {

    try{

        const { id } = req.body; // get the theme park id from the request body
        console.log(`id number: ${id}`);

        if (!id){
            return res.status(404).json({ message: "Please enter an ID number" });
        }

        const url = `${ParkURL}${id}/queue_times.json`; // builds API URL
        // const response = await fetch(url); // calls external API
        //
        // if (!response.ok) { // checks return status from the API call
        //     const error = await response.text();
        //     console.error(`Request failed with status code ${response.status}: ${error}`);
        //     return res.status(response.status).json({ message: "Request failed form theme park api" });
        // }
        //
        // const data = await response.json();
        // return res.json(data);

    } catch (error) {
        res.status(500).json({ message: `Internal server error: ${error}`, error: error });
    }

};

export{
    getWaitTime
}