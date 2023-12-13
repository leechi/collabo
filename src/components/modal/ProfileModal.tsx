import {KeyboardEvent, ChangeEvent, useEffect} from "react"
import { useState } from "react";
import useModal from "../useModal";
import { atom, useAtom } from "jotai";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const skillAtom = atom<string[]>([])


const ProfileModal = () => {
  const [skill, setSkill] = useAtom(skillAtom);
  const [file, setFile] = useState<File | null>(null);
  const [inputSkill, setInputSkill] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [position, setPosition] = useState('')
  const [githubLink, setGithubLink] = useState('')
  const [mbti, setMbti] = useState('')
  const [avatar, setAvatar] = useState<string>('')
const user = auth.currentUser;
  const {modalBubbling, setProfileModal} = useModal()
  

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
        const preview = URL.createObjectURL(files[0])
        setFile(files[0]);
        setAvatar(preview)
    }
  };

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

const fetchUpdate = async () =>{
  if(user){

  
  const docRef = doc(db, "users", user?.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    const data = docSnap.data()
      setStatusMessage(data.statusMessage);
      setGithubLink(data.githubLink);
      setPosition(data.position);
      setMbti(data.mbti);
      setSkill(data.skill);
      setAvatar(data.avatar)
  } else {
    console.log("No such document!");
  }
  }
  }
  useEffect(()=>{
    fetchUpdate();
  },[])

  const onSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const user = auth.currentUser
    if(!user) return;
    try{
        let avatarUrl = "";
        if(file){
            const locationRef = ref(storage, `avatars/${user?.uid}`);
            const result = await uploadBytes(locationRef, file);
            avatarUrl = await getDownloadURL(result.ref);
            await updateProfile(user, {
                photoURL: avatarUrl
            })
        }
        const docRef = doc(db, "users", user.uid);
        await setDoc(docRef, {
            skill,statusMessage,mbti, githubLink, position,
            userId: user.uid,
            username: user.displayName || "Anonymous",
            avatar: avatarUrl
        }, { merge: true });
        setProfileModal(false)
    }catch(e){
        console.log(e)
    }
}


  return (
    <section className="post-modal-bg" onClick={modalBubbling}>
            <form onSubmit={onSubmit} onKeyDown={onKeyDown} className="profile-form">
                <div className="profile-top">
                  <h1>Edit Profile</h1>
                  <button type="submit">Save</button>
                </div>
        
                <div className="profile-info">
                  <label htmlFor="avatar" className="profile-img"><img className="avartar-img" src={avatar?.length > 0 ? avatar : "/avartar-img.svg"} alt="" /></label>
                  <input id="avatar" onChange={onFileChange} type="file" accept="image/*"/>
                  <span className="profile-name">leechi</span>
                </div>
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
