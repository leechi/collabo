import { useState } from "react"
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import GithubButton from "../components/github-btn";


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
    <div className="wrapper">
      <div className="login">
        <form className="login__form" onSubmit={onSubmit}>
          <h1>Login</h1>
          <input type="text"name="email" placeholder="Email" value={email} required onChange={onChange}/>
          <input type="password" name="password" placeholder="Password" value={password} required onChange={onChange}/>
          <input className="login__btn" type="submit" value={isLoading ? "Loading..." :"로그인"} />
        <GithubButton/>
        <section>
          Don't have an account? <Link to="/create-account">Create one &rarr;</Link>
        </section>
        </form>
        {error !== "" ? <div>{error}</div> :null}
      </div>
      <img className="login__img" src="/login.png" alt="" />
    </div>
  )
}