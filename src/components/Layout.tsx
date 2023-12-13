import { auth } from "../firebase";
import { Link, useNavigate, Outlet } from "react-router-dom";
import useModal from "./useModal";
import PostModal from "./modal/PostModal";
import UpdateModal from "./modal/UpdateModal";
import ProfileModal from "./modal/ProfileModal";
import ApplicationModal from "./modal/ApplicationModal";

export default function Layout() {
  const user = auth.currentUser;
  console.log(user?.uid)
  const navigate = useNavigate();
  const onLogOut = async () => {
    const ok = confirm("Are you sure you want to log out?");
    if (ok) {
      await auth.signOut();
      navigate("/login");
    }
  };
  const {profileModal, handlePostModal, postModal, updateModal,applicationModal} = useModal()
  
  return (
    <>
    {profileModal === true ? <ProfileModal/> : null}
    {applicationModal === true ?<ApplicationModal/> :null}
    {updateModal === true ? <UpdateModal/>: null}
    {postModal ? <PostModal/> : null}
    <div className="wrapper-menu">
      <div className="nav-box"></div>
      <ul className="nav">
        <div className="nav-top">
          <li>
            <Link to='/'>
              <h1>Collabo</h1>
            </Link>
          </li>
          <li>
            <div className="search-bar">
            <label htmlFor="search"><img src="search.svg" alt="" /></label>
            <input type="text" id="search" placeholder="search" />
            </div>
          </li>
          <li className="nav__menu-item">
            <Link to='/'>
              <img src="home.svg" alt="" />
              <span>Home</span>
            </Link>
          </li>
          <li className="nav__menu-item">
            <Link to='/bookmarks'>
              <img src="bookmark.svg" alt="" />
              <span>Bookmarks</span>
            </Link>
          </li>
          <li className="nav__menu-item">
            <Link to={`/profile/${user?.uid}`}>
              <img src="profile.svg" alt="" />
              <span>Profile</span>
            </Link>
          </li>
          <li className="nav__menu-item">
            <Link to='/team'>
              <img src="notifications.svg" alt="" />
              <span>Notification</span>
            </Link>
          </li>
          <button className="post-btn" onClick={handlePostModal}>Post</button>
          </div>
          <div className="nav-bottom">
            <hr />
            <li onClick={onLogOut} className="nav__menu-item">
              <img src="logout.svg" alt="" />
              <span>Logout</span>
            </li>
        </div>
      </ul>
      <div className="middle">
        <Outlet />
      </div>
      <div className="search-box"></div>
      <section className="search">
        
      </section>
    </div>
    </>
  );
}
