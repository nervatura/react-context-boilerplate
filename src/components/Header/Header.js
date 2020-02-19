import React from 'react';
import { Link } from 'wouter';
import { ReactLogo } from 'components/Icons';
import './style.scss';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <ReactLogo color="#61DAFB" className="App-logo" />
        <div className="nav-bar">
          <Link className="router-link" to="/">
            Home
          </Link>
          <Link className="router-link" to="/features">
            Features
          </Link>
        </div>
      </header>
    );
  }
}

export default Header;
