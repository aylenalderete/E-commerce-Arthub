import React from 'react';
import Slider from 'infinite-react-carousel';

import art from '../../fakeList'



export default function Carrousel() {

        const settings =  {
            arrows: false,
            arrowsBlock: false,
            autoplay: true,
            autoplaySpeed: 3500,
            autoplayScroll: 1,
            overScan: 1,
            slidesPerRow: 3,
            duration: 400,
            initialSlide: 1,
          };

          return (
            <div>
              <Slider { ...settings }>
                <div>
                  <img src={art[0].pic} alt=""/>
                </div>
                <div>
                <img src={art[1].pic} alt=""/>  
                </div>
                <div>
                <img src={art[2].pic} alt=""/>
                  
                </div>
                <div>
                <img src={art[3].pic} alt=""/>
                  
                </div>
                <div>
                <img src={art[4].pic} alt=""/>
                  
                </div>
                <div>
                <img src={art[0].pic} alt=""/>
                  
                </div>
                <div>
                <img src={art[1].pic} alt=""/>

                </div>
                <div>
                <img src={art[2].pic} alt=""/>

                </div>
                <div>
                <img src={art[3].pic} alt=""/>

                </div>
              </Slider>
            </div>
          );
          
}