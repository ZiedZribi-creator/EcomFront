import React from 'react' ;
import './contact-css.scss' ;

class Contact extends React.Component {
  render(){
    return(
      <div >
          <hr class="line-separator"/>
        <div class="contact-container">
          <div class='store-info'>
              <h4>informatios sur votre boutique</h4>
              <ul>
                <li><i class="material-icons">location_on</i> 8 tozeur street,Menzah 5,Tunis</li>
                <li><i class='fas fa-phone-alt'></i>(+216) 58671414</li>
                <li><i class="material-icons">mail_outline</i> hello@awlety.com</li>
              </ul>
          </div>
          <div class='site-map'>
              <h4>site map</h4>
              <ul>
                    <li>Acceuil</li>
                    <li>Diagnostic</li>
                    <li>Nos Produits</li>
                    <li>Nos Ingredients</li>
                    <li>Nos évenements</li>
                    <li>Nou trouver</li>
                    <li>A propos</li>
                    <li>Contact</li>
              </ul>
          </div>
          <div class='social-media-contact'>
              <h4>suivez-nous sur Facebook</h4>
              <div></div>
              <ul class="middle-navbar-social-media">
                  <li><i class="fab fa-facebook-f"></i></li>
                  <li><i class="fab fa-youtube"></i></li>
                  <li><i class="fab fa-instagram"></i></li>
              </ul>
          </div>

          </div>
          <hr class="line-separator"/>
      </div>
    )
  }
}
export default Contact
