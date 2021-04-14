import logo from './logo.svg';
import './Header.css';
import {Link} from 'react-router-dom';

function Header() {
  return (
    <div className="header">
        <Link to="/" className="brand">
            <img src="" className="header-logo" alt="logo" />
            <div className="header-title">Adopte un Guide</div>
        </Link>
        <div className="right-elements">
          <div className="search-bar">
            <input placeholder="Rechercher" />
          </div>
          <div className="user-settings">
            <div className="user-info">
              <span className="user-name">
                  Prénom NOM
              </span>
              <img src={logo} className="circle" />
            </div>
            <div class="user-options">
              <div>Paramètres</div>
              <div className="mail-box">Messagerie</div>
              <div>Déconnexion</div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Header;