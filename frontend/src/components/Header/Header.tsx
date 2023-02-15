import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../images/logo 1.png';
import './header.css';

export const Header = () => {
  return (
    <header className="headerContainer">
      <nav>
        <div>
          <img src={Logo} alt="" />
        </div>
        <ul>
          <li>
            <Link to="/"> Browse Homes</Link>
          </li>
          <li>
            <Link to="/">Sell your Homes</Link>
          </li>
          <li>
            <div>
              <input type="search" placeholder="search property" />
              <i className="fa fa-magnifying-glass"></i>
            </div>
          </li>
          <li></li>
        </ul>
      </nav>
    </header>
  );
};
