import { ITweet } from "./timeline";

export default function Tweet({ username, photo, tweet }: ITweet) {
  return (
    <div>
      <div>
        <div>{username}</div>
        <div>{tweet}</div>
      </div>
      {photo ? (
        <div>
          <img src={photo} />
        </div>
      ) : null}
    </div>
  );
}