import React from 'react';
import './section.css';
import Images from '../../images/unsplash_oGmf8o53LeE.png';
import Image1 from '../../images/unsplash_2d4lAQAlbDA.png';
import Image2 from '../../images/unsplash_Eh_It1hg4Hs.png';
import Image3 from '../../images/unsplash_KQgrVfR3r74.png';
import Image4 from '../../images/unsplash_T6d96Qrb5MY.png';
import Image5 from '../../images/unsplash_uDtC-1NLEzU.png';
import Image6 from '../../images/unsplash_UV81E0oXXWQ.png';

export const Section = () => {
  const properties = [
    {
      id: 1,
      name: '2578 Folsom street, san francisco, CA, 94110',
      description: 'Private Room',
      price: '$1200/month',
      image: Image1,
    },
    {
      id: 2,
      name: '2578 Folsom street, san francisco, CA, 94110',
      description: 'Private Room',
      price: '$1200/month',
      image: Image2,
    },
    {
      id: 3,
      name: '2578 Folsom street, san francisco, CA, 94110',
      description: 'Private Room',
      price: '$1200/month',
      image: Image3,
    },
    {
      id: 4,
      name: '2578 Folsom street, san francisco, CA, 94110',
      description: 'Private Room',
      price: '$1200/month',
      image: Image4,
    },
    {
      id: 5,
      name: '2578 Folsom street, san francisco, CA, 94110',
      description: 'Private Room',
      price: '$1200/month',
      image: Image5,
    },
    {
      id: 6,
      name: '2578 Folsom street, san francisco, CA, 94110',
      description: 'Private Room',
      price: '$1200/month',
      image: Image6,
    },
  ];

  return (
    <main className="section_container">
      <section className="section_container__section_container__first">
        <h1>Minimum cost of living takes care of everything</h1>
        <article className="section_container__section___articleFirstcontainer">
          <img src={Images} alt="low-cost-home" />
          <article>
            <div className="text-center">
              <div>
                <i className="fa-solid fa-dollar-sign"></i>
              </div>
              <h2>Pay as Little as possible!</h2>
            </div>
            <div>
              <div>
                <i className="fa-solid fa-building"></i>
              </div>
              <h2>Enjoy wisdom of community!</h2>
            </div>
            <div>
              <div>
                <i className="fa-regular fa-layer-group"></i>
              </div>
              <h2>Let's somebody else take care of Landlord!</h2>
            </div>
            <div>
              <div>
                <i className="fa-sharp fa-solid fa-tree"></i>
              </div>
              <h2>Enjoy peaceful Environment!</h2>
            </div>
            <div>
              <div>
                <i className="fa-solid fa-lock"></i>
              </div>
              <h2>Stay Safe! Save Money!</h2>
            </div>
            <div>
              <div>
                <i className="fa-solid fa-moon"></i>
              </div>
              <h2>Pay for what you use !</h2>
            </div>
          </article>
        </article>
      </section>
      <section className="section_container__section_container__Second">
        <article className="section_container__section___articleSecondcontainer">
          <div className="section_container__section___articleSecondcontainer__div">
            <h2>List all properties</h2>
            <button>View all property</button>
          </div>
          <div
            className="
              section_container__section___articleSecondcontainer__div__Second
            ">
            {properties.map(item => (
              <div
                key={item.id}
                className="section_container__section__article__itemContainer">
                <img src={item.image} alt={item.name} />
                <h2 className="section_container__stylingDetails">
                  {item.name}
                </h2>
                <p className="section_container__stylingDetails">
                  {item.description}
                </p>
                <h2 className="section_container__stylingDetailsPrice">
                  {item.price}
                </h2>
                <div className="section_container__bookmarkContainer">
                  <div>
                    <p>
                      <i className="fa-solid fa-car"></i>
                      <span>4</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      <i className="fa-regular fa-bookmark"></i>
                      <span>2</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      <i className="fa-regular fa-hashtag"></i>
                      <span>2</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
};
