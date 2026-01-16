function Home() {

    const searchPark = async (event) => {
        alert("Hello World!");
    }

    return (
    <div className="Home">
        {/*<form onSubmit={searchPark} className="search-form">*/}
        {/*    <label>Select A Park</label>*/}
        {/*    <select name="park" id="park">*/}
        {/*        <option value="default">Park...</option>*/}
        {/*    </select>*/}
        {/*</form>*/}
        {/*<h2>Hello World</h2>*/}

        <div className="Park-grid">
            {parks.map((park) => (
                <ParkCard park={park} key={park.id} />
            ))}

        </div>
    </div>
    )
}

export default Home;