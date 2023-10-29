import './Notification.css';

function Notification(props) {
  return (
    <p className={
      `notification
      ${ props.notification.isGood ? "notification_good" : ""}
      ${ props.notification.isActive ? "notification_active" : ""}`
    }>{ props.notification.text }</p>
  )
}

export default Notification;