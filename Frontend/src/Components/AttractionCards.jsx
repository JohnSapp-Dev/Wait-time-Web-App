import "../css/Cards.css"
import {Link} from "react-router";

function AttractionCards({Attraction}) {

    const isOpen = Attraction.data[0]?.isOpen;

    return (
        <Link className="link" to={`Park/${Attraction.name}`}>
            <div className="Card">
                <div className="poster">
                    <img src={Attraction.url} alt={Attraction.name}  />
                </div>
                <div className="info">
                    <h3>{Attraction.name}</h3>

                    {isOpen ? (<p>Status: Open</p>) : (<p>Status: Closed</p>)}

                    <p>Wait time: {Attraction.data[0].waitTime}</p>
                </div>
            </div>
        </Link>
    )
}

export default AttractionCards