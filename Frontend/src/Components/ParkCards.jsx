import "../css/Cards.css"
import {Link} from "react-router";

function ParkCards({park}) {

    return (
        <Link className="link" to={`Park/${park.name}`}>
            <div className="Card">
                <div className="poster">

                    <img src={park.url} alt={park.name}  />

                    {/*<div className="park-overlay">*/}
                    {/*    <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>🤍</button>*/}
                    {/*</div>*/}

                </div>
                <div className="info">
                    <h3>{park.name}</h3>
                    <p>{park.location}</p>
                </div>
            </div>
        </Link>

    )
}

export default ParkCards