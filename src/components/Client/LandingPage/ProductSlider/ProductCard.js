import React from 'react' ;
import './productcard-css.scss' ;
import {withRouter} from 'react-router-dom' ;
import HOST_URL from '../../../../config' ;
class ProductCard extends React.Component {
  showProduct = ()=>{
    this.props.history.push('/products/savon-noir/')
  }

  render(){
    let product = this.props.product ;
    return(
    <div class='product-card' >
      <div class="product-card-img">
        <img src={HOST_URL+product.primary_img.img_url}/>
      </div>
      <div class="product-card-description">
          <p class='product-card-description-title' onClick={this.showProduct} >{product.title}</p>
          <p class='product-card-description-price'>{product.price}DT</p>
          <button onClick={()=>{this.props.increase_cart_count(); this.props.toogle_modal(product.idx)}}>add to card</button>
      </div>
    </div>
    )
  }

}
export default withRouter(ProductCard) ;
