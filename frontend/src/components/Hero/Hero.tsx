import React from 'react';
import {Link} from 'react-router-dom';
import {Header} from '../Header/Header';
import './hero.css';

export const Hero = () => {
  return (
    <main className="main__heroContainer">
      <div className="div__heroContainer">
        <Header />
        <div className="heroContainer">
          <div className="heroContainer__firstItem">
            <h1>We will find you a perfect home</h1>
            <p>
              <span>We will match the best property for you </span>
              <span>
                <Link to="/">How it Works?</Link>
              </span>
            </p>
          </div>
          <div className="heroContainer__secondItem bg-white">
            <h2>What is your budget?</h2>
            <p>We will match the right property for you</p>
            <select name="value" id="">
              <option value="45000">45000</option>
              <option value="60000">60000</option>
              <option value="80000">80000</option>
              <option value="120000">120000</option>
              <option value="150000">150000</option>
              <option value="200000">200000</option>
            </select>
            <button>Get Started</button>
          </div>
        </div>
        <section>
          <article>
            <h3>Anywhere</h3>
            <p>We have covered 520+ cities around the world</p>
          </article>
          <article>
            <h3>99% Accurate</h3>
            <p>We have covered 520+ cities around the world</p>
          </article>
          <article>
            <h3>24/7 Support</h3>
            <p>We have covered 520+ cities around the world</p>
          </article>
          <article>
            <button>Our Story</button>
          </article>
        </section>
      </div>
    </main>
  );
};
