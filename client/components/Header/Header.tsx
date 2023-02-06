import React from 'react';
import Image from 'next/image';
import Logo from '../../public/images/logo 1.png';
import styles from './header.module.css';
import Link from 'next/link';
import {useState} from 'react';
import {useRouter} from 'next/router';

export const Header = () => {
  return (
    <header>
      <nav className={styles.navContainer}>
        <Image
          src={Logo}
          alt="Picture of the author"
          width={500}
          height={500}
        />
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
};
