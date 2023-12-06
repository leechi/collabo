import { GithubAuthProvider, signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function GithubButton(){
    const navigate = useNavigate();
    const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
    return (
        
        <div>
            <button className="sns-login" onClick={onClick}>
                <img src="/github-logo.svg" alt="" />
            </button>
        </div>
    )
}