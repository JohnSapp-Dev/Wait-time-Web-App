import '../../css/NotificationRules.css'

function NotificationRules() {

    return (
        <div className="NotificationRules">
            <p>Ride Name</p>
            <p>Rule</p>
            <p>Expiration date</p>
            <button className="button update">Update</button>
            <button className="button cancel">Cancel</button>
        </div>
    )
}

export default NotificationRules;