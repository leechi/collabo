import { auth, db } from "../firebase";
import { useState, useEffect } from "react";
import useModal from "../components/useModal";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { ITweet } from "../components/Timeline";
import Tweet from "../components/Tweet";
export interface User {
    skill: string[];
    statusMessage: string;
    mbti: string;
    githubLink: string;
    position: string;
    userId: string;
    username: string;
    avatar?: string;
}

export default function Profile() {
  const user = auth.currentUser;
  const [avatar] = useState(user?.photoURL);
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [users, setUsers] = useState<User[]>([])
  const {handleProfile}= useModal()
  const fetchTweets = async () => {
    const tweetQuery = query(
      collection(db, "tweets"),
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc"),
      limit(25)
    );
    const snapshot = await getDocs(tweetQuery);
    const tweets = snapshot.docs.map((doc) => {
      const { tweet, createdAt, userId, username, photo, skill, positions, number, date, type } = doc.data();
      return {
        tweet,
        createdAt,
        userId,
        username,
        photo,
        id: doc.id,
        skill, positions, number, date, type
      };
    });
    setTweets(tweets);
  };
  const fetchUsers = () => {
  const tweetQuery = query(
    collection(db,"users"),
    where("userId", "==", user?.uid)
  );
  const unsubscribe = onSnapshot(tweetQuery, (snapshot) => {
    const users = snapshot.docs.map((doc)=>{
      const{skill,statusMessage,mbti, githubLink, position, userId, username, avatar} = doc.data();
      return{
        skill,statusMessage,mbti, githubLink, position, userId, username, avatar
      }
    })
    setUsers(users);
  });

  // cleanup function
  return () => {
    unsubscribe();
  }
}
console.log(users)
  useEffect(() => {
    fetchTweets();
    fetchUsers();
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
      <div className="user-info">
          <span className="user-name">{user?.displayName ?? "Anonymous"}</span>
          <p className="user-intro">{users[0]?.statusMessage}</p>
          
            <div className="user-detail">
              <div>
                <label htmlFor="type"><img src="/contacts.svg" alt="" /></label>
                <span className="user-type" id="type">{users[0]?.position}</span>
              </div>
              <div>
                <label htmlFor="type">MBTI</label>
                <span className="user-mbti">{users[0]?.mbti}</span>
              </div>
            </div>
            <div className="user-contact">
              <a href={users[0]?.githubLink} target="_blank"><button className="github-link">GitHub</button></a>
              <button className="user-btn" onClick={handleProfile}><img src="/edit.svg" alt="" /></button>
            </div>
      </div>
      </div>
      <ul className="user-skills">
        {users[0]?.skill?.map((skillItem, idx)=>(
        <li key={idx}>{skillItem}</li>
        ))}
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