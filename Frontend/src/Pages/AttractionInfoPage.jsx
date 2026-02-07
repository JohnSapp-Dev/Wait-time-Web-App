import WaitTimeGraphComp from '../Components/WaitTimeGraphComp.jsx';
import WaitTimeCardComp from "../Components/WaitTimeCardComp.jsx";
import AttractionInfoPageComp from "../Components/AttractionInfoPageComp.jsx";
import {Line} from "react-chartjs-2";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import { getAttractionData } from "../Services/getParkData.js";
import "../css/AttractionPage.css"


function AttractionInfoPage() {

    let { id } = useParams();
    const [attraction, setAttraction] = useState([null]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    let [isOpen, setIsOpen] = useState(false);
    let lastEntry = 0;

    useEffect(() => {
        const loadWaitTimeData = async () => {
            try{
                // console.log("Trying to load attractions");
                const attraction = await getAttractionData(id);
                setAttraction(attraction)
                lastEntry = attraction.RideInformation.WaitTimeData.length - 1;
                setIsOpen(attraction.RideInformation.WaitTimeData[lastEntry].isOpen);
            } catch (error){
                console.log(error)
                setError("failed to load attractions");
            }finally {
                setLoading(false)
            }
        }
        loadWaitTimeData();
    },[])


    return (
        <>

        {loading && <div>Loading Wait times...</div>}
        {error && <div>Error loading page {error}</div>}

        {!loading && !error && attraction && (
            <div className='AttractionInfoContainer'>
                { (isOpen) ? (
                    <div className='AttractionInfoWaitTime open'>
                        <WaitTimeCardComp
                            Attraction={attraction}
                            key={attraction.RideInformation?.name}
                        />
                    </div>
                ):(
                    <div className='AttractionInfoWaitTime closed'>
                        <WaitTimeCardComp
                            Attraction={attraction}
                            key={attraction.RideInformation?.name}
                        />
                    </div>
                )}

                <div className='AttractionInfo'>
                    <AttractionInfoPageComp
                        Attraction={attraction}
                        key={attraction.RideInformation?.id + 100}
                    />
                </div>
                <div className='AttractionInfoGraph'>
                    <WaitTimeGraphComp
                        waitTimeData={attraction}
                        key={attraction.RideInformation?.id}
                    />
                </div>
            </div>
        )}

        </>
    )
}

export default AttractionInfoPage
