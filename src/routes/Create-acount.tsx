import { useState } from "react"

export default function CreateAccount() {
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
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // create an account
      // set the name of the user.
      // redirect to the home page
    } catch (e) {
      // setError
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Log into Collabo</h1>
        <input type="text" name="Name" placeholder="name" value={name} required onChange={onChange}/>
        <input type="text"name="email" placeholder="Email" value={email} required onChange={onChange}/>
        <input type="password" name="password" placeholder="Password" value={password} required onChange={onChange}/>
        <input type="submit" value={isLoading ? "Loading..." :"회원가입"} />
      </form>
      {error !== "" ? <div>{error}</div> :null}
    </div>
  )
}