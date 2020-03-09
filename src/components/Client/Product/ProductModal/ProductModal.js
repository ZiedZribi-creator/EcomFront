import React from 'react' ;
// import Modal from 'react-awesome-modal';
import { Modal } from 'rsuite';
import './productmodal-css.scss' ;
import {withRouter} from 'react-router-dom' ;

class ProductModal extends React.Component {
  close = ()=>{
    this.props.close() ;
    this.props.history.push('/cart/') ;
  }

  render(){
    let product = this.props.products ;
    return(
      <div style={{backgroundColor:'grey'}}>
      <Modal style={{backgroundColor:'grey'}} size={this.props.size} show={this.props.visible} onHide={this.props.close}>
            <Modal.Header>
              <Modal.Title>
                <div class="success-msg">
                    <i class="fas fa-check-circle"></i>
                    <p >your product is added to your cart successfully</p>
                </div>
              </Modal.Title>

            </Modal.Header>
            <Modal.Body>

               <div class='product-modal'>
                  <div class='product-modal-image'>
                     <img src='https://mawlety.com/modules/homeslider/images/bf999cf52f0741d1dd241125a1ccf2b013a2bac8_savoirnoir4.jpg'/>
                  </div>
                  <div class='product-modal-description'>
                      <h4 class='title'>Savon noir pour vous</h4>
                      <p class='price'>21.00DT</p>
                      <div class="modal-btn-action">
                        <button class='modal-buy-btn' onClick={this.close} >
                          acheter
                        </button>
                        <p>ou</p>
                        <button class='modal-continue-btn' onClick={this.props.close} >
                          continuer mes achat
                        </button>
                    </div>
                  </div>
                </div>
            </Modal.Body>
          </Modal>
      </div>
    )
  }
}
export default withRouter(ProductModal) ;
