import { auth, db, storage } from "../firebase";
import { useState, useEffect } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import useModal from "../components/useModal";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { ITweet } from "../components/Timeline";
import Tweet from "../components/Tweet";


export default function Profile() {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const {handleProfile}= useModal()
  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!user) return;
    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `avatars/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      setAvatar(avatarUrl);
      await updateProfile(user, {
        photoURL: avatarUrl,
      });
    }
  };
  const fetchTweets = async () => {
    const tweetQuery = query(
      collection(db, "tweets"),
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc"),
      limit(25)
    );
    const snapshot = await getDocs(tweetQuery);
    const tweets = snapshot.docs.map((doc) => {
      const { tweet, createdAt, userId, username, photo } = doc.data();
      return {
        tweet,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
      };
    });
    setTweets(tweets);
  };
  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <>
    <section className="profile">
      <div className="profile-top">
        {avatar ? (
          <img className="user-profile-img" src={avatar} />
        ) : (
          <svg
            className="user-profile-img"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
          </svg>
        )}
      {/* TODO : 모달창에 넣어야함 */}
      {/* <input
        onChange={onAvatarChange}
        id="avatar"
        type="file"
        accept="image/*"
      /> */}
      <div className="user-info">
          <span className="user-name">{user?.displayName ?? "Anonymous"}</span>
          <p className="user-intro">함께 좋은 경험해요!</p>
          
            <div className="user-detail">
              <div>
                <label htmlFor="type"><img src="/contacts.svg" alt="" /></label>
                <span className="user-type" id="type">FrontEnd</span>
              </div>
              <div>
                <label htmlFor="type">MBTI</label>
                <span className="user-mbti">ENFJ</span>
              </div>
            </div>
            <div className="user-contact">
              <button className="github-link">GitHub</button>
              <button className="user-btn" onClick={handleProfile}><img src="/edit.svg" alt="" /></button>
            </div>
      </div>
      </div>
      <ul className="user-skills">
        <li>React</li>
        <li>TypeScript</li>
                <li>React</li>
        <li>TypeScript</li>
                <li>React</li>
        <li>TypeScript</li>
                <li>React</li>
        <li>TypeScript</li>
                <li>React</li>
        <li>TypeScript</li>

                <li>React</li>
        <li>TypeScript</li>
      </ul>
    </section>
          <section>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </section>
      </>
  );
}