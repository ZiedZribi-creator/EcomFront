import React from 'react' ;
import HOST_URL from '../../../config' ;
import './upsell-css.scss' ;
class UpSell extends React.Component{
  render(){
    return(
      <div class="upsell-container">

            <img src={HOST_URL+'/media/purchase-confirmed.png'} />
      </div>
    )
  }
}
export default UpSell ;
// <div class="product-upsell-container">
//    <div class="product-upsell-title">
//         <h3>Pour vous seulement on a vous propose un produit qui ce match avec votre panier</h3>
//    </div>
//    <div class="product-upsell-card">
//        <div class="product-upsell-image"><img src={'https://mawlety.com/modules/homeslider/images/bf999cf52f0741d1dd241125a1ccf2b013a2bac8_savoirnoir4.jpg'} /></div>
//        <div class="product-upsell-description">
//           <h3>Savon Noir pour les cheveux seche</h3>
//           <p>hey babe what you doing what you want baby girl what you doing
//           hey babe what you doing what you want baby girl what you doing
//           hey babe what you doing what you want baby girl what you doing
//           hey babe what you doing what you want baby girl what you doing
//           hey babe what you doing what you want baby girl what you doing </p>
//           <h4>19.99DT</h4>
//           <button>ajouter a votre ordre et confirmer</button>
//        </div>
//    </div>
// </div>
