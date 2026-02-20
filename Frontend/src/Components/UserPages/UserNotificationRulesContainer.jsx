import "../../css/NotificationRulesContainer.css"
import NotificationRules from "./NotificationRules";

function UserNotificationRulesContainer() {


    return (
        <div className="NotificationRulesContainer">
            <NotificationRules key={'rules'}/>
            <button>Create</button>
        </div>
    )
}

export default UserNotificationRulesContainer;