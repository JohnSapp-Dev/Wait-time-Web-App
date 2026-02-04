import "../css/AttractionCards.css"
import {Link} from "react-router";

function AttractionCardsComp({Attraction}) {

    const isOpen = Attraction.data[0]?.isOpen;

    return (

        <Link className="link" to={`/AttractionInfo/${Attraction.id}`}>
            <div className="Card">
                <div className="name">
                    {/*<img src={Attraction.url} alt={Attraction.name}  />*/}
                    <h3 className="capitalize">{Attraction.name}</h3>
                </div>

                    {isOpen ? (
                        <div className="statusOpen">
                            <p>Open</p>
                        </div>
                    ) : (
                        <div className="statusClosed">
                            <p>Closed</p>
                        </div>
                    )}

                <div className="waitTime">
                    <h1>{Attraction.data[0].waitTime}</h1>
                </div>
            </div>
        </Link>
    )
}

export default AttractionCardsComp