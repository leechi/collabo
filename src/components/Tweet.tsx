import { ITweet } from "./timeline";

export default function Tweet({ username, photo, tweet }: ITweet) {
  return (
    <section className="tweet">
      <div className="tweet__header">
        <div className="tweet__header-left">
          <h3 className="tweet__username">{username}</h3>
          <span>@leechi</span>
          <span>12월 9일</span>
        </div>
        <button><img src="/more_horiz.svg" alt="" /></button>
      </div>
      
    <div className="tweet__middle">
      <div className="tweet__content">{tweet}</div>
      {photo ? (
          <img src={photo} />
          ) : null}
      <div className="tweet__skill">
        <ul className="tweet__skill-list">
          <li>React</li>
          <li>TypeScript</li>
          <li>React</li>
          <li>React</li>
          <li>React</li>
          <li>React</li>
          <li>React</li>
          <li>React</li>
        </ul>
      </div>
    </div>
    <div className="tweet__bottom">
      <div className="tweet__bottom-left">
        <button>message 6</button>
        <button>heart 12</button>
      </div>
        <button>bookmark</button>
    </div>
    </section>
  );
}