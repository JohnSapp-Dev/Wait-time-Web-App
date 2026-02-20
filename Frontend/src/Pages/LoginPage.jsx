import UserInfoCard from '../Components/UserPages/UserInfoCard.jsx'
import UserNotificationRulesContainer from "../Components/UserPages/UserNotificationRulesContainer.jsx";
import "../css/loginpage.css"

function LoginPage({}) {


    return (
        <div className="MainContainer">
            <UserInfoCard key={'infoPage'}/>
            <UserNotificationRulesContainer key={'notificationRules'}/>
        </div>


    )
}

export default LoginPage