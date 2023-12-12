import { useState } from "react"
import useModal from "../useModal"
import { auth, db } from "../../firebase"
import { addDoc, collection } from "firebase/firestore"


const ApplicationModal = () => {
    const [message, setMessage] = useState<string>('')
    const [contact, setContact] = useState<string>('')
    const onMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>{
        setMessage(e.target.value)
    }
    const onContactChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setContact(e.target.value)
    }
    const{modalBubbling}= useModal()

    const onSubmit = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const user = auth.currentUser
        if(!user || message.length > 100 || contact.length > 50) return;
        try{
            await addDoc(collection(db, "notifications"), {
                message,
                contact,
                createdAt: Date.now(),
                username: user.displayName || "Anonymous",
                userId: user.uid,
            })
        }catch(e){
      console.log(e);
    }

    }
  return (
    <>
        <section className="post-modal-bg" onClick={modalBubbling}>
            <form onSubmit={onSubmit} className="application-modal">
              <div className="app-top">
                <label htmlFor="app-message">메시지</label>
                <textarea maxLength={100} onChange={onMessageChange} id="app-message" placeholder="신청 메시지를 작성해주세요 :)"></textarea>
                <span>{message.length}/ 100</span>
               </div>
               <div className="app-bottom">
                <label htmlFor="app-contact">연락 수단</label>
                <input onChange={onContactChange} id="app-contact" type="text" placeholder="연락처나 이메일 등 연락수단을 작성해주세요 :)" />
               </div> 
                <button className="app-btn">신청하기</button>
            </form>
        </section>
    </>
  )
}

export default ApplicationModal