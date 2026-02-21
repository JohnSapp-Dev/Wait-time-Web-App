import "../../css/AttractionInfoCard.css"

function AttractionInfoPageComp({Attraction}) {

    const maxWaitTime = Math.max(...Attraction.RideInformation.WaitTimeData.map(i => i.waitTime));
    const minWaitTime = Math.min(...Attraction.RideInformation.WaitTimeData.map(i => i.waitTime));
    const lastEntry = Attraction.RideInformation.WaitTimeData.length - 1;
    const currentWaitTime = Attraction.RideInformation.WaitTimeData[lastEntry].waitTime;
    let differance = 0

    if (currentWaitTime < maxWaitTime) {
        differance = maxWaitTime - currentWaitTime;
    }


    return (

        <div className="attractionInfoCard">
            <h3>{Attraction.RideInformation.name}</h3>

            {(currentWaitTime === maxWaitTime) ?
                <p>Highest Wait Time so far</p>
                :
                (currentWaitTime === minWaitTime) ?
                    <p>lowest Wait Time so far</p>
                    :
                    <p>{differance} minutes lower than max</p>}

            <p>Rating: ⭐⭐⭐⭐⭐</p>

        </div>
    )
}

export default AttractionInfoPageComp