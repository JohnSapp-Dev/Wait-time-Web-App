import { useParams } from "react-router";
import AttractionCards from "../Components/AttractionCards.jsx";
import {useEffect, useState} from "react";
import { getDataByPark } from "../Services/getParkData.js";
import "../css/CardGrid.css"

function Park() {

    let { name } = useParams();
    console.log(`park name ${name}`);
    const [attractions, setAttractions] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAttractions = async () => {
            try{
                // console.log("Trying to load attractions");
                const attractions = await getDataByPark(name);
                setAttractions(attractions.LandInformation.Attractions)
                // console.log("Attractions loaded");
                // console.log(attractions)
            } catch (error){
                console.log(error)
                setError("failed to load attractions");
            }finally {
                setLoading(false)
            }
        }
        loadAttractions();
    },[])

    return (
        <div className="Home">

            <h1>Welcome to {name}</h1>
            <p>This is a theme park</p>

            <div className="grid">

                {attractions.map(
                    (Attraction) =>
                        (
                            <AttractionCards Attraction={Attraction} key={Attraction.id} />
                        )
                )}

            </div>

        </div>
    )
}

export default Park