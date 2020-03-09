import React from "react" ;
import { Modal } from 'rsuite';


class DeleteReviewModal extends React.Component {
  render(){
    return(
      <Modal size='xs' show={this.props.visible} onHide={this.props.close}>
            <Modal.Header>
              <Modal.Title>
                <h3>Hey babe what doing !!</h3>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <div class='product-modal'>
                  <h5> Are you sure you want to delete this review</h5>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={this.props.deleteReview}  style={{marginLeft:'20px',padding:'10px',backgroundColor:'blue',color:'white'}}>yes baby</button>
                <button onClick={this.props.close}  style={{marginLeft:'20px',padding:'10px',backgroundColor:'green',color:'white'}}>no baby</button>
            </Modal.Footer>
          </Modal>
    )
  }
}
export default DeleteReviewModal ;
