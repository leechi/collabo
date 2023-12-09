import { useState } from "react";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";


export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
  const user = auth.currentUser;
  const [userModal, setUserModal] = useState(false)
  const handleUserModal = () => {
      setUserModal(true)
  }
  const handleDelete = async () =>{
    const ok = confirm("Are you sure you want to delete this tweet?");
    if(!ok || user?.uid !== userId) return;
    try{
      await deleteDoc(doc(db, "tweets", id));
      if(photo){
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef)
      }
      
    }catch (e) {
      console.log(e);
    }finally{
      //
    }
  }
  
  return (
    <section className="tweet">
      <div className="tweet__header">
        <div className="tweet__header-left">
          <h3 className="tweet__username">{username}</h3>
          <span>@leechi</span>
          <span>12월 9일</span>
        </div>
        {user?.uid === userId ? <button className="userModal-btn" onClick={handleUserModal}><img src="/more_horiz.svg" alt="" /></button> : null}
        {userModal ? <div className="tweet__userModal">
          <button><img src="/edit.svg" alt="" />edit</button>
          <button onClick={handleDelete}><img src="/delete.svg" alt="" />delete</button>
        </div> : null}
      </div>
      
    <div className="tweet__middle">
      <div className="tweet__content">{tweet}</div>
      {photo ? (
          <img rel="preload" src={photo} />
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
        <button><img src="/message.svg" alt="" /> 6</button>
        <button><img src="/favorite_border.svg" alt="" /> 12</button>
      </div>
        <img src="/bookmark_border.svg" alt="" />
    </div>
    </section>
  );
}