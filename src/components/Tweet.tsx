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
  const [bookmark, setBookmark] = useState(false)
  const handleBookmark = () =>{
    setBookmark(true)
  }
  return (
    <section className="tweet">
      <div className="tweet__header">
        <div className="tweet__header-left">
          {/* <img src="/login.png" alt="" /> */}
          <h3 className="tweet__username">{username}</h3>
          <div className="tweet__detail">
            <span><img src="/language.svg" alt="" /> 프로젝트</span>
            <span><img src="/supervised_user_circle.svg" alt="" />3명</span>
            <span><img src="/event_available.svg" alt="" />~12월 11일</span>
          </div>
        </div>
        {user?.uid === userId ? <button className="userModal-btn" onClick={handleUserModal}><img src="/more_horiz.svg" alt="" /></button> : <button className="team-btn">신청하기</button>}
        {userModal ? <div className="tweet__userModal">
          <button><img src="/edit.svg" alt="" />edit</button>
          <button onClick={handleDelete}><img src="/delete.svg" alt="" />delete</button>
        </div> : null}
      </div>
      <hr />
    <div className="tweet__middle">
      <div className="tweet__content">{tweet}</div>
      {photo ? (
          <img rel="preload" src={photo} />
          ) : null}

    </div>
    <div className="tweet__bottom">
      <ul className="tweet__user-type">
        <li>프론트엔드</li>
      </ul>
      <div className="tweet__bottom-left">
        <div className="tweet__skill">
          <ul className="tweet__skill-list">
            <li>React</li>
            <li>TypeScript</li>
          </ul>
        </div>
        <button onClick={handleBookmark}>
        {
          bookmark ? <img className="bookmarks" src="/bookmarked.svg" alt="" /> : <img className="bookmarks" src="/bookmark_border.svg" alt="" />
        }
        </button>
      </div>
    </div>
    </section>
  );
}