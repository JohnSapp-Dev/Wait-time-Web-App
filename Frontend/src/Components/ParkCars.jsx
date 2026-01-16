import "../css/ParkCard.css"



function ParkCars({park}) {


    return (
        <div className="ParkCard">
            <div className="Park-poster">

                <img src={park.url} alt={park.name}  />

                {/*<div className="park-overlay">*/}
                {/*    <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>🤍</button>*/}
                {/*</div>*/}

            </div>
            <div className="Park-info">
                <h3>{park.name}</h3>
                <p>{park.location}</p>
            </div>
        </div>
    )
}

export default ParkCars