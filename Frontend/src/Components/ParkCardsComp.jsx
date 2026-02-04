import "../css/ParkCard.css"
import {Link} from "react-router";

function ParkCardsComp({park}) {

    return (
        <Link className="link" to={`AttractionSelectionPage/${park.name}`}>
            <div className="ParkCard">
                <div className="Park-poster">

                    <img src={park.url} alt={park.name}  />

                </div>
                <div className="Park-info">
                    <h3>{park.name}</h3>
                    <p>{park.location}</p>
                </div>
            </div>
        </Link>

    )
}

export default ParkCardsComp