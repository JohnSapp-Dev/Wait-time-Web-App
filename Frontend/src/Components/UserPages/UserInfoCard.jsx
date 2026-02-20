import "../../css/UserInfoCard.css"


function UserInfoCard(){


    return (

        <div className="UserInfoCard">
            <img className="profilePic" src='../../../public/ProfilePicture.png' alt='UserInfoCardImage'/>
            <p>User Name</p>
            <p>Favorite Park</p>
        </div>
    )

}

export default UserInfoCard;