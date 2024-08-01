import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-link navbar-icon">
          Home
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/add-post" className="navbar-link">
          Add Post
        </Link>
        <Link to="/update-post/:postId" className="navbar-link">
          Update Post
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
