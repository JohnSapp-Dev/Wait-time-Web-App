import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";
import { WaitTime } from '../../DB_Models/Wait-Time-model.js'
import { DisneyWorldParksURL } from "./config/constants.js";

dotenv.config({
    path: './.env'
});

const syncAllParks = async () => {
    console.log(`\n--- Starting API Sync: ${new Date().toLocaleString()} ---`);
    for (const url of DisneyWorldParksURL) {
        console.log(`\n--- Syncing URL: ${url} ---`);
        try {
            // We await here so we don't spam the DB/Network all at once
            await fillDBWithAPIData(url);
        } catch (error) {
            console.error(`Error syncing ${url}:`, error.message);
        }
    }
    console.log(`----- Sync Cycle Complete -----\n`);
};

const startServer = async () => {

    try{

        await connectDB();
        app.on("error",(error) => {
            console.log("Start error",error)
            throw error;
        });

        app.listen(process.env.PORT || 8000, () =>{
            console.log("Server started on port: " + process.env.PORT )
        });


        await syncAllParks(); // makes initial call to API on sever start
        setInterval(syncAllParks, 300000); //Makes a call once every 5 minutes

    } catch (error) {
        console.log("MongoDB connection error: " + error, error);
    }
}

// automate calls to queue-times.com API to gather wait time data
async function fillDBWithAPIData(URL){

    const response = await fetch(URL); // calls external API

    if (!response.ok) { // checks return status from the API call
        const error = await response.text();
        console.error(`Request failed with status code ${response.status}: ${error}`);
        // return res.status(response.status).json({ message: "Request failed form theme park api" });

    }

    const data = await response.json();
    // return res.json(data);
    // console.log(data);

    for (const land of data.lands){

        for(const ride of land.rides){

            const newDataEntry = {
                isOpen: ride.is_open,
                waitTime: ride.wait_time,
                updated: ride.last_updated
            };

            try{

                await WaitTime.findOneAndUpdate(
                    {id: ride.id},
                    {
                        $setOnInsert: {
                            id: ride.id,
                            name: ride.name,

                        },
                        $push: {data: newDataEntry}
                    },
                    {
                        upsert: true,
                        new: true,
                        runValidators: true
                    }
                );

                const id = String(ride.id).padEnd(5, ' ');

                console.log(`Successfully updated/created document: ID: ${id} Name: ${ride.name}`);

                // console.log(`Successfully updated/created document: id:${ride.id}, name:${ride.name}`);

            }catch(error){
                console.error(`Database error on ride id: ${ ride.id }: ${error}`);
            }
        }

    }
}

startServer();