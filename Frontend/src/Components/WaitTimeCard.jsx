import "../css/WaitTimeCard.css"

function WaitTimeCard({Attraction}) {

    const lastEntry = Attraction.RideInformation.WaitTimeData.length - 1;


    return (

        <div className="WaitTimeCard">
            <h1>{Attraction.RideInformation.WaitTimeData[lastEntry].waitTime}</h1>
        </div>
    )
}

export default WaitTimeCard