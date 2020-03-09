import React from 'react' ;
import './carttable-css.scss' ;
import HOST_URL from '../../../config' ;
class CartTable extends React.Component {
  state  = {
    step_idx : 0 ,
  }

  calcTotalPrice = ()=>{
      let total_price = 0 ;
      this.props.products.map(client_product=>{
        total_price += client_product.product.price * client_product.qty ;
      })
      return total_price ;
  }

  render(){
    let step_idx = this.state.step_idx ;
    return(
      <div  class='cart-container'>
          <div class="cart-table">
              <table class="table table-bordered">
                <thead >
                  <tr>
                    <th scope="col">image</th>
                    <th scope="col">title</th>
                    <th scope="col">qty</th>
                    <th scope="col">price</th>
                    <th scope="col">delete</th>
                  </tr>
                </thead>
            <tbody>
              {this.props.products.map((client_product,idx)=>(
                <tr>
                  <td><img src={HOST_URL+client_product.product.primary_img.img_url} /></td>
                  <td><p>{client_product.product.title}</p></td>
                  <td><input class="form-control" type='number' value={client_product.qty} onChange={(e)=>{this.props.handleQtyChange(e,idx)}} /></td>
                  <td><p>{client_product.product.price}</p></td>
                  <td><button onClick={()=>{this.props.deleteProduct(idx)}}>X</button></td>
                </tr>
              )
            )
          }
            <tr>
                  <td colspan="2" ><p>total price</p></td>
                  <td colspan="3" ><p>{this.calcTotalPrice()+'DT'}</p></td>
            </tr>
            </tbody>
          </table>
              </div>
      </div>
    )
  }
}

export default CartTable  ;
