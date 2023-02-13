import {Link} from 'react-router-dom';
import React from 'react';
import './footer.css';

export const Footer = () => (
  <footer>
    <main className="mainFooterContainer">
      <div className="mainFooterContainer__redBorder"></div>
      <section className="mainFooterContainer__footerSectionContainer">
        <article className="mainFooterContainer__footerArticleContainer">
          <div>
            <h1>Logo</h1>
          </div>
          <div>
            <p>
              <i className="fa-solid fa-location-dot"></i> 345 Faulconer Drive,
              Suite 4 • Charlottesville, CA, 12345
            </p>
            <p className="mainFooterContainer__footerPara">
              <span>
                <i className="fa-solid fa-phone"></i> (123) 456-7890
              </span>
              <span>
                <i className="fa-solid fa-fax"></i>(123) 456-7890
              </span>
            </p>
            <p className="mainFooterContainer__footerSocialMedia">
              Social Media <i className="fa-brands fa-facebook-f"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-linkedin"></i>
              <i className="fa-brands fa-youtube"></i>
              <i className="fa-brands fa-google-plus-g"></i>
              <i className="fa-brands fa-pinterest"></i>
            </p>
          </div>
        </article>
        <article className="mainFooterContainer__footerSecondArticleContainer">
          <ul>
            <li>
              <Link to="/">ABOUT US</Link>
            </li>
            <li>
              <Link to="/">CONTACT US</Link>
            </li>
            <li>
              <Link to="/">HELP</Link>
            </li>
            <li>
              <Link to="/">PRIVACY POLICY</Link>
            </li>
            <li>
              <Link to="/">DISCLAIMER</Link>
            </li>
          </ul>
          <p>Copyright © 2020 Minimumlivingcost. All rights reserved</p>
        </article>
      </section>
    </main>
  </footer>
);
