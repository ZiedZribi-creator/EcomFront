import React from 'react' ;
import HOST_URL from '../../../../config' ;
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './partners-css.scss' ;

class Partners extends React.Component {
  state = {
    partners : [
          'essentielWEB.png',
          'CK-PARA-WEB.png',
          'fleur-de-murguet-web-logo.png',
          'lavenderweb.png',
          'mayer.png',
          'mio-para.png',
          'silhouette-diet-web-logo.png',
          'viabioweb.png',
          'zenpara.png'
    ]
  }
  render(){
    const settings = {
    dots: true,
    infinite: true,
    autoplay : true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3
  };
    return(
   <div>
   <div class="partners-container">
      <div class='partners-title' ><h2><span>Nos partenariats</span></h2></div>
        <div class="partners-slide">
            <Slider {...settings}>
            {this.state.partners.map((partner)=>{
              return(
                <img src={HOST_URL+'/media/'+partner} />
              )
            })}
            </Slider>
       </div>
       <div class="blogs-container">
            <div class="blog-item" >
                <img src={HOST_URL+'/media/pqpasseraunaturel.jpg'} />
            </div>
            <div class="blog-item" >
                <img src={HOST_URL+'/media/nosingredients.jpg'} />
            </div>
       </div>
      </div>
      </div>
    )
  }
}
export default Partners ;
