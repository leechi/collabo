import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react"
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import GithubButton from "../components/Github-btn";



export default function CreateAccount() {
  const navigate = useNavigate()
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if(isLoading || name === "" || email === "" || password === "") return;
    try {
      setLoading(true)
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      console.log(credentials.user)
      await updateProfile(credentials.user, {
        displayName:name,
      });
      navigate("/")
    } catch (e) {
      if(e instanceof FirebaseError){
        setError(e.message)
      }
      
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="join-bg">
      <div className="join-box">
      <form className="join" onSubmit={onSubmit}>
        <h1>Collabo</h1>
        <p className="join-intro">팀을 찾기 가장 쉬운길 <span>Collabo</span></p>
        <input type="text" name="name" placeholder="Name" value={name} required onChange={onChange}/>
        <input type="text"name="email" placeholder="Email" value={email} required onChange={onChange}/>
        <input type="password" name="password" placeholder="Password" value={password} required onChange={onChange}/>
        <input className="join-btn" type="submit" value={isLoading ? "Loading..." :"회원가입"} />
      </form>
      {error !== "" ? <div>{error}</div> :null}
      
      <div className="login__or">
          <span>OR</span>
          <hr className="or" />
        </div>
      <div className="login__sns-box">
       <GithubButton/>
      </div>
      <section>  
       Already have an account? <Link to="/login">Log in &rarr;</Link>
      </section>
      </div>
    </div>
  )
}