import { auth } from "../firebase";
import { Link, useNavigate, Outlet } from "react-router-dom";
import useModal from "./useModal";
import PostModal from "./modal/PostModal";


export default function Layout() {
  const navigate = useNavigate();
  const onLogOut = async () => {
    const ok = confirm("Are you sure you want to log out?");
    if (ok) {
      await auth.signOut();
      navigate("/login");
    }
  };
  const {handlePostModal, postModal} = useModal()

  return (
    <>
    {postModal ? <PostModal/> : null}
    <div className="wrapper-menu">
      
      <ul className="nav">
        <li>
          <Link to='/'>
            <h1>Collabo</h1>
          </Link>
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
          <Link to='/profile'>
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
        <hr />
        <li className="nav__menu-item">
          <Link to="/setting">
          <img src="/settings.svg" alt="" />
          <span>Setting</span>
          </Link>
        </li>
        <li onClick={onLogOut} className="nav__menu-item">
          <img src="logout.svg" alt="" />
          <span>Logout</span>
        </li>
      </ul>
      <div className="middle">
        
        <Outlet />
      </div>
      <section className="search">
        <div className="search-bar">
          <label htmlFor="search"><img src="search.svg" alt="" /></label>
          <input type="text" id="search" placeholder="search" />
        </div>
      </section>
    </div>
    </>
  );
}
