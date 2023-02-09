import Link from 'next/link';
import React from 'react';
import styles from './footer.module.css';

export const Footer = () => (
  <footer>
    <main className={styles.mainFooterContainer}>
      <div className={styles.redBorder}></div>
      <section className={styles.footerSectionContainer}>
        <article className={styles.footerArticleContainer}>
          <div>
            <h1>Logo</h1>
          </div>
          <div>
            <p>
              <i className="fa-solid fa-location-dot"></i> 345 Faulconer Drive,
              Suite 4 • Charlottesville, CA, 12345
            </p>
            <p className={styles.footerPara}>
              <span>
                <i className="fa-solid fa-phone"></i> (123) 456-7890
              </span>
              <span>
                <i className="fa-solid fa-fax"></i>(123) 456-7890
              </span>
            </p>
            <p className={styles.footerSocialMedia}>
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
        <article className={styles.footerSecondArticleContainer}>
          <ul>
            <li>
              <Link href="/">ABOUT US</Link>
            </li>
            <li>
              <Link href="/">CONTACT US</Link>
            </li>
            <li>
              <Link href="/">HELP</Link>
            </li>
            <li>
              <Link href="/">PRIVACY POLICY</Link>
            </li>
            <li>
              <Link href="/">DISCLAIMER</Link>
            </li>
          </ul>
          <p>Copyright © 2020 Minimumlivingcost. All rights reserved</p>
        </article>
      </section>
    </main>
  </footer>
);
