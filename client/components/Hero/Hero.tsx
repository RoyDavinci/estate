import React from 'react';
import {Header} from '../Header/Header';
import styles from './hero.module.css';
import Map from '../../public/images/Rectangle 1.png';
import Image from 'next/image';

export const Hero = () => {
  return (
    <div className={styles.hero__Container}>
      <Header />
      <section className={styles.section_Container}>
        <h1>The most affortable place to stay in Lagos</h1>
        <div className={styles.divContainer}>
          <Image src={Map} alt="Lagos Map" />
          <div>
            <form action="">
              <select name="type" id="">
                <option value="All">All type</option>
              </select>
              <select name="neighbourhood" id="">
                <option value="neighbourhoods">Neighbourhood</option>
              </select>
              <button type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
