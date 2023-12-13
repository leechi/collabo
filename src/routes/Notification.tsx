export default function Notification() {
  return (
    <>
      <h1>Notification</h1>
      <section className="notification">
        <div className="notification-user">
          <img className="notification-img" src="https://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg" alt="" />
          <div className="notification-info">
            <span className="notification-name">멍멍이</span>
            <span className="notification-desc">왈왈왈!</span>
            <div className="notification-info-bottom">
              <span className="notification-contact">010-1111-1111</span>
              <span className="notification-time">7시간전</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}