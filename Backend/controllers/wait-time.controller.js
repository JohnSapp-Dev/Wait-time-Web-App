import {ParkURL} from "../src/config/constants.js";


const getWaitTime = async (req, res) => {

    try{

        const { id } = req.body;
        console.log(`id number: ${id}`);

        if (!id){
            return res.status(404).json({ message: "Please enter an ID number" });
        }

        const url = `${ParkURL}${id}/queue_times.json`;
        const response = await fetch(url);

        if (!response.ok) {
            const error = await response.text();
            console.error(`Request failed with status code ${response.status}: ${error}`);
            return res.status(response.status).json({ message: "Request failed form theme park api" });
        }

        // const data = await response.json();
        const data = await response.json();

        return res.json(data);

    } catch (error) {
        console.log(`Error fetching data ${error}`);
    }

};

export{
    getWaitTime
}