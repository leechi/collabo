export default function Notification() {
  return (
    <>
      <h1>Notification</h1>
      <section className="notification">
        <div className="notification-user">
          <img className="notification-img" src="" alt="" />
          <div className="notification-info">
            <span className="notification-name">name</span>
            <span className="notification-desc">신청하기는 할건데 이게 맞나 싶네요 이렇게 100자를 만드는데 시간을 소요하고 있는데 이게 맞나요 이게 맞을까요? 대표사진 추가하기 이것도ㅇㅇㅇ </span>
            <span className="notification-contact">010-1111-1111</span>
          </div>
        </div>
        <div className="notification-user">
          <img className="notification-img" src="" alt="" />
          <div className="notification-info">
            <span className="notification-name">name</span>
            <span className="notification-desc">신청합니다</span>
            <span className="notification-contact">010-1111-1111</span>
          </div>
        </div>
        <div className="notification-user">
          <img className="notification-img" src="" alt="" />
          <div className="notification-info">
            <span className="notification-name">name</span>
            <span className="notification-desc"></span>
            <span className="notification-contact">010-1111-1111</span>
          </div>
        </div>
      </section>
    </>
  )
}