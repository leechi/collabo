import { useState } from "react"
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Log into Collabo</h1>
        <input type="text"name="email" placeholder="Email" value={email} required onChange={onChange}/>
        <input type="password" name="password" placeholder="Password" value={password} required onChange={onChange}/>
        <input type="submit" value={isLoading ? "Loading..." :"로그인"} />
      </form>
      {error !== "" ? <div>{error}</div> :null}
      <section>
        Don't have an account? <Link to="/create-account">Create one &rarr;</Link>
      </section>
    </div>
  )
}