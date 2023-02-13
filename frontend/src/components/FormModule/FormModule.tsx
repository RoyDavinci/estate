import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import FirstImage from '../../public/images/unsplash1.png';
import SecondImage from '../../public/images/Image2.png';
import ThirdImage from '../../public/images/unsplash.png';
import FourthImage from '../../public/images/unsplash2.png';
import formModuleStyles from './formModule.module.css';
import {data} from '../../helpers/index';

export const FormModule = () => {
  const [detail, setDetail] = useState<number>(0);

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (detail === data.length - 1) {
        setDetail(0);
      } else {
        setDetail(prev => prev + 1);
      }
    }, 2000);

    return () => {
      clearInterval(myInterval);
    };
  }, [detail]);

  return (
    <main className={formModuleStyles.container}>
      <section className={formModuleStyles.sectionContiner}>
        <article className={formModuleStyles.grid}>
          <div>
            <img src={FirstImage} alt="" />
            <img src={SecondImage} alt="secondimage" />
          </div>
          <div>
            <img src={ThirdImage} alt="thirdimage" />
            <img src={FourthImage} alt="fourthimage" />
          </div>
        </article>
        <article>
          <h3 style={{fontSize: '40px'}}>
            Flexibility and options to suit your lifestyle.
          </h3>
          <p style={{fontFamily: 'Inter sans-serif'}}>
            You need it? We got it. We make finding your next home easy,
            comfortable, and simple. From our happiness guarantee to our
            selective roommate finder option. We provide you the flexibility
            that you most desire.
          </p>
          <div className={formModuleStyles.link}>
            <Link to="/">Search Rooms</Link>
          </div>
        </article>
      </section>
      <section className={formModuleStyles.secondSection}>
        <article style={{background: 'rgba(244, 81, 30, 0.07)'}}>
          <div className={formModuleStyles.divSecondSection}>
            <p
              style={{lineHeight: '1.8rem'}}
              className={formModuleStyles.paraContainer}>
              {data[detail].text}
            </p>
            <div
              style={{display: 'flex'}}
              className={formModuleStyles.divContainer}>
              <img
                src={data[detail].userImg}
                alt="user"
                className={formModuleStyles.userImg}
              />
              <div>
                <p style={{fontWeight: '700', color: '#F4511E'}}>
                  {data[detail].name}
                </p>
                <p>{data[detail].role}</p>
              </div>
            </div>
          </div>
        </article>
        <img
          src={data[detail].image}
          alt=""
          className={formModuleStyles.imageContainer}
        />
      </section>
    </main>
  );
};
