import {KeyboardEvent,} from "react"
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import useModal from "../useModal";
import { atom, useAtom } from "jotai";

const tweetAtom = atom<string>("")
const numberAtom = atom<string>("")
const dateAtom = atom<string>("")
const skillAtom = atom<string[]>([])
const typeAtom = atom<string>("")
const positionsAtom = atom<string[]>([])
const imgAtom = atom<string>("")


export default function PostModal(){
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useAtom(tweetAtom);
  const [file, setFile] = useState<File | null>(null);
  const [number, setNumber] = useAtom(numberAtom);
  const [date, setDate] = useAtom(dateAtom);
  const [type, setType] = useAtom(typeAtom);
  const [skill, setSkill] = useAtom(skillAtom);
  const [positions, setPositions] = useAtom(positionsAtom);
  const [inputSkill, setInputSkill] = useState('')
  const [imgSrc, setImgSrc] = useAtom(imgAtom)

  const {modalBubbling, setPostModal} = useModal()
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
        const preview = URL.createObjectURL(files[0])
        setFile(files[0]);
        setImgSrc(preview)
        console.log(typeof(preview))
    }
  };

  const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setNumber(e.target.value)
  }

  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const inputDate = e.target.value
    setDate(inputDate)
  }

  const selectType = (type:string) =>{
    if(type === "프로젝트") setType("프로젝트")
    else setType("스터디")
  }
  
  const selectPosition = (position:string) =>{
    const isSelected = positions.includes(position)

    if(isSelected){
        const updatedPositions = positions.filter((pos) => pos !== position);
        setPositions(updatedPositions);
    }else{
        setPositions((prevPositions) => [...prevPositions, position]);
    }
    
  }
  const onSkillChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setInputSkill(e.target.value)
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
    if(!user || isLoading || tweet === "" || tweet.length > 180) return;
    try{
      setLoading(true)
      setPostModal(false);
      const doc = await addDoc(collection(db, "tweets"), {
        tweet,
        number,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
        date,
        type,
        positions,
        skill
      })
      if(file){
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          photo: url
        })
      }
      setTweet("");
      setFile(null);
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
      
    }
  }

    return (
        <section className="post-modal-bg" onClick={modalBubbling}>
            <form onSubmit={onSubmit} onKeyDown={onKeyDown} className="post-tweet-form">
                    <textarea maxLength={180} onChange={onChange} value={tweet} rows={5} placeholder="어떤 팀원을 모집하시나요?">
                    </textarea>
                    <span className="tweet-length">{tweet.length} / 180</span>
                    <div className="post__bottom">
                        <label htmlFor="photo"><img className="post__photo" src={imgSrc.length > 0 ?imgSrc : '/post-basic.svg'} alt="" /></label>
                        <input type="file" id="photo" onChange={onFileChange} accept="image/*" />
                        
                    </div>
                        <div className="post__info">
                            <div className="post__first">
                                <div className="post__number">
                                    <label htmlFor="">인원수</label>
                                    <input type="number"  placeholder="팀원 수" onChange={onNumberChange}/>
                                </div>
                                <div className="post__date">
                                    <label htmlFor="">모집마감일</label>
                                    <input onChange={onDateChange} type="date" />
                                </div>
                            </div>
                            <div className="post__second">
                                <div className="post__type">
                                    <label htmlFor="">타입</label>
                                    <div>
                                        <span className={`'' ${type==="프로젝트" ? 'select-btn':''}`} onClick={()=> selectType("프로젝트")}>프로젝트</span>
                                        <span className={`'' ${type==="스터디" ? 'select-btn':''}`} onClick={()=> selectType("스터디")}>스터디</span>
                                    </div>
                                </div>
                                <div className="post__position">
                                    <label htmlFor="">모집포지션</label>
                                    <div className="position-btn">
                                        <span onClick={()=>selectPosition("프론트엔드")}  className={`'' ${positions.includes("프론트엔드") ? 'select-btn':''}`}>프론트엔드</span>
                                        <span onClick={()=>selectPosition("백엔드")}  className={`'' ${positions.includes("백엔드") ? 'select-btn':''}`}>백엔드</span>
                                        <span onClick={()=>selectPosition("기획자")}  className={`'' ${positions.includes("기획자") ? 'select-btn':''}`}>기획자</span>
                                        <span onClick={()=>selectPosition("디자이너")}  className={`'' ${positions.includes("디자이너") ? 'select-btn':''}`}>디자이너</span>
                                        <span onClick={()=>selectPosition("IOS")}  className={`'' ${positions.includes("IOS") ? 'select-btn':''}`}>IOS</span>
                                        <span onClick={()=>selectPosition("안드로이드")}  className={`'' ${positions.includes("안드로이드") ? 'select-btn':''}`}>안드로이드</span>
                                    </div>
                                </div>
                            </div>
                        <div className="post__skill">
                            <label htmlFor="">기술 스택</label>
                            <input onChange={onSkillChange} value={inputSkill} onKeyUp={addSkill} type="text" placeholder="원하는 기술 스택을 작성해주세요 :) " />
                            <div className="skill-list">
                                {skill.map((skillItem, idx)=>(
                                    <span onClick={()=> removeSkill(idx)} className="skill-item" key={idx}>{skillItem}</span>
                                    ))}
                            </div>
                        </div>
                    </div>
                <input className="post__btn" type="submit" value={isLoading ? "Posting..." : "Post"} />
            </form>
        </section>
    )
}   