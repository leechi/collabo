import { auth, storage } from "../firebase";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import useModal from "../components/useModal";

export default function Profile() {
  const user = auth.currentUser;
  const [avatar, setAvatar] = useState(user?.photoURL);
  const {handleProfile}= useModal()
  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!user) return;
    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `avatars/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const avatarUrl = await getDownloadURL(result.ref);
      setAvatar(avatarUrl);
      await updateProfile(user, {
        photoURL: avatarUrl,
      });
    }
  };
  return (
    <section className="profile">
      <img  className="user-background-img" src="/login.png" alt="" />
        {avatar ? (
          <img className="user-profile-img" src={avatar} />
        ) : (
          <svg
            className="user-profile-img"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
          </svg>
        )}
      {/* TODO : 모달창에 넣어야함 */}
      <input
        onChange={onAvatarChange}
        id="avatar"
        type="file"
        accept="image/*"
      />
      <div className="user-contact">
        <button className="user-btn" onClick={handleProfile}><img src="/edit.svg" alt="" /></button>
        <button className="github-link">GitHub</button>
      </div>

      <div className="user-info">
      <span className="user-name">{user?.displayName ?? "Anonymous"}</span>
      <p className="user-intro">함께 좋은 경험해요!</p>
      <div className="user-detail">
        <div>
          <label htmlFor="type"><img src="/contacts.svg" alt="" /></label>
          <span className="user-type" id="type">FrontEnd</span>
        </div>
        <div>
          <label htmlFor="type">MBTI</label>
          <span className="user-mbti">ENFJ</span>
        </div>
      </div>
      <ul className="user-skills">
        <li>React</li>
        <li>TypeScript</li>
      </ul>
      </div>
    </section>
  );
}