import {useState} from "react";
import {Link} from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import "../css/Navbar.css"

function Navbar() {

    const[searchQuery,setSearchQuery] = useState("")


    return (
        <nav className="NavBar">
            <div className="NavTitle">Wait Time</div>
            <div className="NavInteractions">
                <form className="NavForm">
                    <button type="submit" className="NavSearch-Button">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    <input
                        type='text'
                        placeholder='Search Ride...'
                        className='SearchBar'
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                    />
                </form>

                <div className="NavLinks">
                    <Link className="Link" to="/">Home</Link>
                    <Link className="Link" to="/AboutUs">About Us</Link>
                    <Link className="Link" to="/Login">Login</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;