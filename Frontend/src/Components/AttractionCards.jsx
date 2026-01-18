import "../css/AttractionCards.css"
import {Link} from "react-router";

function AttractionCards({Attraction}) {

    const isOpen = Attraction.data[0]?.isOpen;

    return (
        // <Link className="link" to={`Park/${Attraction.name}`}>
        //     <div className="Card">
        //         <div className="poster">
        //             {/*<img src={Attraction.url} alt={Attraction.name}  />*/}
        //             <h1 className="capitalize">{Attraction.name}</h1>
        //         </div>
        //         <div className="info">
        //             {/*<h3>{Attraction.name}</h3>*/}
        //
        //             {isOpen ? (<p>Status: Open</p>) : (<p>Status: Closed</p>)}
        //
        //             <p>Wait time: {Attraction.data[0].waitTime}</p>
        //         </div>
        //     </div>
        // </Link>

        <Link className="link" to={`Park/${Attraction.name}`}>
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

export default AttractionCards