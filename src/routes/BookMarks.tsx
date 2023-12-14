import { useEffect, useState } from "react";
import { ITweet } from "../components/Timeline";
import Tweet from "../components/Tweet";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";


export default function Profile() {
  const fetchTweets = async () => {
    const tweetQuery = query(
      collection(db, "tweets"),
      // where("userId", "==", 북마크 아이디),
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
  useEffect(()=>{
    fetchTweets
  })

  const [tweets, setTweets] = useState<ITweet[]>([]);
  return (
    <>
      <h1>BookMarks</h1>
      <section>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </section>
    </>
  )
}