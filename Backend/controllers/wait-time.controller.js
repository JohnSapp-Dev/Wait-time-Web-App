import {ParkURL} from "../src/config/constants.js";
import {WaitTime} from "../../DB_Models/Wait-Time-model.js";


const getSingleRideData = async (req, res) => {

    try{

        const { id } = req.body; // Get the ride ID from the request
        console.log(`id number: ${id}`);

        if (!id){
            return res.status(404).json({ message: "Please enter an ID number" });
        }

        try{

            const getRideData = await WaitTime.findOne({
                id: id,
            });

            if (!getRideData){
                return res.status(404).json({ message: `Ride ID: ${id} not in database` });
            }

            res.status(200).json({
                message: "Ride Data Found",
                RideInformation: {
                    id: getRideData.id,
                    name: getRideData.name,
                    WaitTimeData: getRideData.data
                }
            });

        } catch(error){
            res.status(500).json({ message: `Fetch error, internal server error: ${error}`, error: error });
        }

    } catch (error) {
        res.status(500).json({ message: `Internal server error: ${error}`, error: error });
    }
};

const getLandData = async (req, res) => {

    try{

        const { landName } = req.body; // Get the ride ID from the request

        if (!landName){
            return res.status(404).json({ message: "Please enter a Land Name" });
        }

        try{

            const getLandData = await WaitTime.find({
                land: landName, // Filters by land name
            },
                {
                    name: 1 , id: 1, _id: 0 // returns only the name of the attractions in the selected land
                });

            if (!getLandData){
                return res.status(404).json({ message: `Land: "${landName}" not in database` });
            }

            res.status(200).json({
                message: "Land Data Found",
                LandInformation: {
                    name: landName,
                    id: getLandData.id,
                    numberOfAttractions: getLandData.length,
                    Attractions: getLandData
                }
            });

        } catch(error){
            res.status(500).json({ message: `Fetch error, internal server error: ${error}`, error: error });
        }

    } catch (error) {
        res.status(500).json({ message: `Internal server error: ${error}`, error: error });
    }
}

const getParkData = async (req, res) => {

    try{

        const { parkName } = req.body; // Get the ride ID from the request

        if (!parkName){
            return res.status(404).json({ message: "Please enter a Park Name" });
        }

        try{

            const getParkData = await WaitTime.find({
                    park: parkName, // Filters by land name
                },
                {
                    name: 1 , id: 1, _id: 0 // returns only the name of the attractions in the selected Park
                });

            if (!getParkData){
                return res.status(404).json({ message: `Land: "${parkName}" not in database` });
            }

            res.status(200).json({
                message: "Park Data Found",
                LandInformation: {
                    name: parkName,
                    numberOfAttractions: getParkData.length,
                    Attractions: getParkData
                }
            });

        } catch(error){
            res.status(500).json({ message: `Fetch error, internal server error: ${error}`, error: error });
        }

    } catch (error) {
        res.status(500).json({ message: `Internal server error: ${error}`, error: error });
    }
}

export{
    getSingleRideData,
    getLandData,
    getParkData
}