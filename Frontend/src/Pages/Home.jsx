import "../css/CardGrid.css"
import ParkCards from '../Components/ParkCards.jsx'

function Home() {

    const searchPark = async (event) => {
        alert("Hello World!");
    }
    const parkCards = [
        {
            id:1,
            name: "Magic Kingdom",
            location: "Orlando,Fl",
            // url: "../assets/MK-white-text.png",
            url: '/MK-white-text.png',
        },{
            id:2,
            name: "EPCOT",
            location: "Orlando,Fl",
            url: "/EPCOT-white-text.png",
        },{
            id:3,
            name: "Hollywood Studios",
            location: "Orlando,Fl",
            url: "/HollywoodStudios-white-text.png",
        },{
            id:4,
            name: "Animal Kingdom",
            location: "Orlando,Fl",
            url: "/AnimalKingdom-white-text.png",
        }
    ]

    return (
    <div className="Home">

        <h1>Welcome to The Wait Time App</h1>
        <p>This Website is intended to give quick up-to-the-minute updates on Attraction wait times
        and Open status. This site will allow users to set notifications via text message when
            selected attractions open or close, allowing you to know exactly when your favorite
        ride reopens after a down time!</p>
        <p>Select a park below to see it's Attraction wait times and open status.</p>

        <div className="grid">

            {parkCards.map(
                (park) =>
                    (
                <ParkCards park={park} key={park.id} />
                 )
            )}

        </div>
    </div>
    )
}

export default Home;