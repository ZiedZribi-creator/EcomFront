import React from 'react' ;
import './productdetail-css.scss' ;
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class ProductDetail extends React.Component {
  state = {
      product : {
        primary_img :'https://mawlety.com/modules/homeslider/images/bf999cf52f0741d1dd241125a1ccf2b013a2bac8_savoirnoir4.jpg',
        add_imgs : [
          'https://mawlety.com/modules/homeslider/images/bf999cf52f0741d1dd241125a1ccf2b013a2bac8_savoirnoir4.jpg',
          'https://mawlety.com/modules/homeslider/images/87c04adc9358936a289661024741d3c95976121f_arganslide4.jpg',
          'https://mawlety.com/modules/homeslider/images/f3406cfd35e859145e1e7b2e3cfb89413f0d14f5_test-6.jpg',
            'https://mawlety.com/modules/homeslider/images/f3406cfd35e859145e1e7b2e3cfb89413f0d14f5_test-6.jpg',
              'https://mawlety.com/modules/homeslider/images/f3406cfd35e859145e1e7b2e3cfb89413f0d14f5_test-6.jpg',
        ],
        title : "huile d'argan pour les cheveux seche",
        description : "huile d'arg anh uile d'arga nhu ile d'arganhuile d'arganhuile d'arganhuile d'argan huile d'arga nhuile d'argan huile d'ar ganhu ile d'arganh uile d'arg anhuile d'arganhuile d'arga nhuile d'arga nhuile d'argan huile d'arga nhu ile d'arg an",
        price : '49.00DT'
      }
  }
  render(){
    let product = this.state.product ;
    const settings = {
      arrow:true ,
      dots: false,
      infinite: true,
      autoplay : true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 2,
      responsive: [
          { breakpoint: 1000, settings: {
            dots: false,
            infinite: true,
            autoplay : true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 2
          }
        },
        { breakpoint: 800, settings: {
          dots: false,
          infinite: true,
          autoplay : true,
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      { breakpoint: 600, settings: {
        dots: false,
        infinite: true,
        autoplay : false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    ]
    }
    return(
      <div style={{width:'100%'}}>
             <div class="product-detail-container">
             <h4 class='product-title-up'>{product.title}</h4>
                  <div class="product-image">
                  <div class="product-primary-img">
                    <img src={product.primary_img} />
                  </div>
                  <div class="product-add-imgs">
                   <Slider {...settings} >
                      {product.add_imgs.map(img=>(
                          <div class='add-img-item'><img src={img} /></div>
                      ))}
                    </Slider>
                  </div>
                  </div>
                  <div class="product-info">
                  <h4 class='product-info-title'>{product.title}</h4>
                  <p class='product-info-description'>{product.description}</p>
                  <h4 class='product-info-price'>{product.price}</h4>
                  <div class="buy-action">
                      <button class='buy-btn'>Acheter</button>
                      <span>ou</span>
                      <button class='cart-btn'>ajouter aux panier</button>
                  </div>
                  </div>

             </div>
      </div>
    )
  }
}
export default ProductDetail;
