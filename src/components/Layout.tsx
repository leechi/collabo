import { auth } from "../firebase";
import { Link, useNavigate, Outlet } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const onLogOut = async () => {
    const ok = confirm("Are you sure you want to log out?");
    if (ok) {
      await auth.signOut();
      navigate("/login");
    }
  };
  return (
    <div className="wrapper-menu">
      <ul className="nav">
        <Link to='/'>
          <li className="nav__menu-item">
            <img src="home.svg" alt="" />
            <span>Home</span>
          </li>
        </Link>
        <Link to='/bookmarks'>
          <li className="nav__menu-item">
            <img src="bookmark.svg" alt="" />
            <span>Bookmarks</span>
          </li>
        </Link>
        <Link to='profile'>
          <li className="nav__menu-item">
            <img src="profile.svg" alt="" />
            <span>Profile</span>
          </li>
        </Link>
        <Link to='team'>
          <li className="nav__menu-item">
            <img src="team.svg" alt="" />
            <span>Team</span>
          </li>
        </Link>
        <li onClick={onLogOut} className="nav__menu-item">
          <img src="logout.svg" alt="" />
          <span>Logout</span>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}