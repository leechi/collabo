import {   collection,limit, onSnapshot, orderBy, query, } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Tweet from "./Tweet";
import { Unsubscribe } from "firebase/auth";

export interface ITweet {
  id: string;
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
  positions: string[];
  skill: string[];
  number:string;
  date:string;
  type:string;

}

export default function Timeline() {
  const [tweets, setTweet] = useState<ITweet[]>([]);
   useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        limit(25)
      );
      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          const { tweet, createdAt, userId, username, photo, positions, skill, number, type, date } = doc.data();
          return {
            tweet,
            createdAt,
            userId,
            username,
            photo,
            id: doc.id,
            positions, skill, number, type, date
          };
        });
        setTweet(tweets);
      });
    };
    fetchTweets();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  return (
    <div>
      {
      tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
        ))
      }
    </div>
  );
}