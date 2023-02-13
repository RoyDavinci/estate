/* eslint-disable import/extensions */
import React from 'react';
import {Header} from '../Header/Header';
import Map from '../../images/Rectangle 1.png';
import './hero.css';

export const Hero = () => (
  <div className="hero__Container">
    <Header />
    <section className="hero__Container__section_Container">
      <h1>The most affortable place to stay in Lagos</h1>
      <div className="hero__Container__divContainer">
        <img src={Map} alt="Lagos Map" />
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
