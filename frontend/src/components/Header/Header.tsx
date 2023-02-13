import React, {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import Logo from '../../public/images/logo 1.png';
import styles from './header.module.css';

export const Header = () => (
  <header>
    <nav className={styles.navContainer}>
      <Image src={Logo} alt="Picture of the author" width={500} height={500} />
      <ul className={styles.listStyles}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/">Agents</Link>
        </li>
        <li>
          <Link href="/">Tenants</Link>
        </li>
        <li>
          <Link href="/">Contact Us</Link>
        </li>
      </ul>
    </nav>
  </header>
);
