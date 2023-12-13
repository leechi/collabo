import { useState } from "react";
import { ITweet } from "./Timeline";
import { auth, db, storage } from "../firebase";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import useModal from "./useModal";
import { Link } from "react-router-dom";

export default function Tweet({ username, photo, tweet, userId, id,positions, skill, number, type, date }: ITweet) {
  const user = auth.currentUser;
  const [userModal, setUserModal] = useState(false)
  const {handleUpdate, handleApplicationModal}= useModal()
const handleUserModal = () => {
    setUserModal(true);
}
console.log(userModal)
  

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
  const handleBookmark = async() =>{
    setBookmark(!bookmark)
    await addDoc(collection(db, "bookmarks"), {
      postId: id,
      userId: user?.uid ,
      createAt:new Date()
      //TODO : get을 받아온다. 이미 데이터를 또 불러온다. 이 함수 안에서 그러면 받아온 값을 보고 delete도 하게 만든다.
    })

  }

  
  return (
    <>
    <section className="tweet" onClick={(e)=>{console.log(e.target)}}>
      
      <div className="tweet__header">
        <div className="tweet__header-left">
          {/* <img src="/login.png" alt="" /> */}
          <Link to={`/profile/${userId}`}>
          <h3 className="tweet__username">{username}</h3>
          </Link>
          <div className="tweet__detail">
            <span><img src="/language.svg" alt="" /> {type}</span>
            <span><img src="/supervised_user_circle.svg" alt="" />{number}명</span>
            <span><img src="/event_available.svg" alt="" />~{date}</span>
          </div>
        </div>
        {user?.uid === userId ? <button className="userModal-btn"  onClick={handleUserModal}><img src="/more_horiz.svg" alt="" /></button> : <button className="team-btn" onClick={handleApplicationModal}>신청하기</button>}
        {userModal ? <div className="tweet__userModal">
          <button onClick={()=>{handleUpdate(id); setUserModal(false)}}><img src="/edit.svg" alt="" />edit</button>
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
        {
          positions?.map((position, idx)=>(
            <li key={idx}>{position}</li>
          ))
        }
      </ul>
      <div className="tweet__bottom-left">
        <div className="tweet__skill">
          <ul className="tweet__skill-list">
            {
              skill?.map((skillItem, idx)=>(
                <li key={idx}>{skillItem}</li>
              ))
            }
            
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
    </>
  );
}