import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react"
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

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
      //setError
      
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Log into Collabo</h1>
        <input type="text" name="name" placeholder="Name" value={name} required onChange={onChange}/>
        <input type="text"name="email" placeholder="Email" value={email} required onChange={onChange}/>
        <input type="password" name="password" placeholder="Password" value={password} required onChange={onChange}/>
        <input type="submit" value={isLoading ? "Loading..." :"회원가입"} />
      </form>
      {error !== "" ? <div>{error}</div> :null}
    </div>
  )
}