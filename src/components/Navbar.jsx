import { Link } from 'react-router-dom';
// import '../styles/NavBar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-link">
        {/* <img src={homeIcon} alt="Home" className="navbar-icon" /> */}
        <h1>Navbar</h1>
      </Link>
    </nav>
  );
};

export default Navbar;