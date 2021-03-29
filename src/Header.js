import logo from './logo.svg';
import './Header.css';

function Header() {
  return (
    <div className="header">
        <div className="brand">
            <img src={logo} className="header-logo" alt="logo" />
            <div className="header-title">Adopte un Guide</div>
        </div>
        <div className="user-settings">
          <div className="user-info">
            <span className="user-name">
                Prénom NOM
            </span>
            <img src={logo} className="circle" />
          </div>
          <div class="user-options">
            <a href="#">Paramètres</a>
            <a href="#">Déconnexion</a>
          </div>
        </div>
    </div>
  );
}

export default Header;