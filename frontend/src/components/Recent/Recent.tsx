import React from 'react';
import './recent.css';
import {data} from '../../helpers/index';

export const Recent = () => {
  return (
    <main className="recent__mainContainer">
      <div>
        <section>
          <p>Top Selling</p>
          <h1>Recently Sold Houses</h1>
          <div className="recent__divContainer">
            <div className="recent__itemContainer">
              {data.map((item, index) => {
                return (
                  <article key={index}>
                    <img src={item.image} alt="" />
                    <div className="justify-between">
                      <p>{item.name}</p>
                      <p>{item.price}</p>
                    </div>
                    <div>
                      <i className="fa-solid fa-location-arrow"></i>
                      <p>{item.place}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
