import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../images/logo 1.png';
import './header.css';

export const Header = () => (
  <header>
    <nav className="navContainer">
      <img src={Logo} alt=" author" width={500} height={500} />
      <ul className="navContainer__listStyles">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/">Agents</Link>
        </li>
        <li>
          <Link to="/">Tenants</Link>
        </li>
        <li>
          <Link to="/">Contact Us</Link>
        </li>
      </ul>
    </nav>
  </header>
);
