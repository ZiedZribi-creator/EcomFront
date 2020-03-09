import React from 'react' ;
import ProductCard from './ProductCard' ;
import './productslider-css.scss' ;
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HOST_URL from '../../../../config' ;
import {connect} from 'react-redux' ;
import ProductModal from '../../Product/ProductModal/ProductModal' ;
import axios from 'axios' ;
class ProductSlider extends React.Component {
  state= {
    products: {
      results : [],
    }
  ,
    features : [
      {
        img : HOST_URL+'/media/BIRDS2.png',
        title :'Livraison',
        description : 'hey babe what you doing what do you want bay girl what you doing'
      },
      {
        img : HOST_URL+'/media/handshake.png',
        title :'Paiement',
        description : 'hey babe what you doing what do you want bay girl what you doing'
      },
      {
        img : HOST_URL+'/media/phone.png',
        title :'Service client',
        description : 'hey babe what you doing what do you want bay girl what you doing'
      },

    ],
    modalSize : 'sm',
    modalIsVisible : false ,

  }
  componentDidMount(){
    axios.get(HOST_URL+'/api/product/').then(res=>{
      this.setState({products:res.data}) ;
    })
  }
  toogleModal = (idx)=>{
    this.setState({modalIsVisible : !this.state.modalIsVisible})
    if(!this.state.modalIsVisible == true){
      let cart_id = localStorage.getItem('cart_id')
      let product_slug = this.state.products.results[idx].slug ;
      let data = {product_slug:product_slug}
      if (!cart_id){
        axios.put(HOST_URL+'/api/cart/custom_creation/',data).then(res=>{
          localStorage.setItem('cart_id',res.data.cart_id)
        })
      }else{
        axios.put(HOST_URL+'/api/cart/'+cart_id+'/add_product/',data).then(res=>{

        })
      }

    }
  }
  increase_cart_count = ()=>{
    this.props.increase_cart_count()
    // here an api call for to add the product to the cart
  }
  render(){
    const settings = {
      dots: true,
      infinite: true,
      autoplay : true,
      speed: 500,
      slidesToShow: this.state.products.count,
      slidesToScroll: this.state.products.count - 2 ,
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
        autoplay : true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    ]
  };
    return(
  <div class='our-products'>
    <div class='product-slider-title' ><h2><span>Nos produits</span></h2></div>
      <div class="product-slide-container">
      <ProductModal size={this.state.modalSize} visible={this.state.modalIsVisible}  close={this.toogleModal} />

          <Slider {...settings}>
          {this.state.products.results.map((p,idx)=>{
            return(
            <ProductCard product={{...p,idx:idx}} increase_cart_count={this.increase_cart_count} toogle_modal={this.toogleModal}  />
            )
          })}
          </Slider>
    </div>
    <div class="our-products-banner">
         <img src={HOST_URL+'/media/banner1.jpg'} />
    </div>
    <div class="our-products-features">
    {this.state.features.map(feature=>{
    return(
      <div class="feature-item">
      <img src={feature.img} />
      <div class="feature-item-description">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
        </div>
      </div>)
    })
    }


    </div>
</div>
    )
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    'increase_cart_count': (nb)=>dispatch({type:'increase_cart_count'})
  }
}
export default connect(null,mapDispatchToProps)(ProductSlider) ;
