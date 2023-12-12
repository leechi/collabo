import {KeyboardEvent, ChangeEvent} from "react"
import { useState } from "react";
import useModal from "../useModal";
import { atom, useAtom } from "jotai";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const skillAtom = atom<string[]>([])


const ProfileModal = () => {
  const [skill, setSkill] = useAtom(skillAtom);
  const [inputSkill, setInputSkill] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [position, setPosition] = useState('')
  const [githubLink, setGithubLink] = useState('')
  const [mbti, setMbti] = useState('')

  const {modalBubbling} = useModal()
  
  const onSkillChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setInputSkill(e.target.value)
  }

  const onStatusMessageChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setStatusMessage(e.target.value)
  }

  const onPositionChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setPosition(e.target.value)
  }

  const onGithubLinkChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setGithubLink(e.target.value)
  }

  const onMbtiChange = (e: ChangeEvent<HTMLInputElement>) =>{
    setMbti(e.target.value)
  }

  const addSkill = (e: KeyboardEvent<HTMLInputElement>) =>{
    if (e.key === 'Enter' && inputSkill.trim() !== '') {
      setSkill([...skill, inputSkill.trim()]);
      setInputSkill('');
    }
  }
  const removeSkill = (index: number) => {
    setSkill(skill.filter((_, i) => i !== index));
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    // 엔터 키 입력 시 수행할 작업
  }
};

  const onSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{

    e.preventDefault();
    const user = auth.currentUser
    if(!user) return;
    try{
      const doc = await addDoc(collection(db, "tweets"), {
        
      })
      if(file){
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          photo: url
        })
      }
      
    }catch(e){
      console.log(e);
    }
  }

  return (
    <section className="post-modal-bg" onClick={modalBubbling}>
            <form onSubmit={onSubmit} onKeyDown={onKeyDown} className="profile-form">
                <div className="profile-top">
                  <h1>Edit Profile</h1>
                  <button type="submit">Save</button>
                </div>
                <img className="background-img" src="" alt="" />
                <img className="profile-img" src="" alt="" />
                <span className="profile-name">leechi</span>
                <input type="text" placeholder="상태메시지" value={statusMessage} onChange={onStatusMessageChange} />
                <input type="text" placeholder="대표 포지션" value={position} onChange={onPositionChange} />
                <input type="text" placeholder="깃허브 링크" value={githubLink} onChange={onGithubLinkChange} />
                <input type="text" placeholder="MBTI" value={mbti} onChange={onMbtiChange} />
             
                        <div className="profile__skill">
                            <input onChange={onSkillChange} value={inputSkill} onKeyUp={addSkill} type="text" placeholder="자신있는 기술 스택을 작성해주세요 :) " />
                            <div className="skill-list">
                                {skill.map((skillItem, idx)=>(
                                    <span onClick={()=> removeSkill(idx)} className="skill-item" key={idx}>{skillItem}</span>
                                    ))}
                            </div>
                        </div>
            </form>
        </section>
  )
}

export default ProfileModal
