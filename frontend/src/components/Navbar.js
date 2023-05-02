import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import logo from '../TheTab_KGrgb_300ppi.png'; // Import your logo image here
import githubLogo from '../ghlogo.png'; // Import the GitHub logo here

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  // Function to extract the username from the email
  const getUsername = (email) => {
    return email.split('@')[0];
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <div className="logo-container">
            <img src={logo} alt="Your Institution Logo" className="institution-logo" />
            <h1><strong>LIFT LOG</strong></h1>
            <span className="logo-caption">Let's break some records today!</span> {/* Added caption */}
          </div>
        </Link>
        <nav>
          {user && (
            <div>
              <span>
                Welcome back <strong>{getUsername(user.email)}</strong>! It's grind time baby!
              </span>
              <button onClick={handleClick}>Log Out</button>
            </div>
          )}
          {!user && (
            <div>
              <a href="https://github.com/NrgNinja/HealthFitnessApp" target="_blank" rel="noopener noreferrer">
                <img src={githubLogo} alt="GitHub" className="github-logo" />
              </a>
              <Link to="/login" className="auth-link">
                LOGIN
              </Link>
              <Link to="/signup" className="auth-link">
                SIGNUP
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

