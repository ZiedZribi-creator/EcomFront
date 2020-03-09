import React from 'react' ;
import axios from "axios" ;
import {Link} from "react-router-dom" ;
import "./orderdetail-css.scss" ;
import HOST_URL from '../../../config' ;

class OrderDetail extends React.Component {
  state = {
    order : {
        cart : {
          products: [] ,
        },
        guest_user_form : {
          name : '',
          email : '',
          address : '',
          phone : '',
        },
        status : '',
    }
  }
  componentDidMount(){
    axios.get(HOST_URL+'/api/order/'+this.props.match.params.id+'/').then(res=>{
      this.setState({order:res.data})
    })
  }
  handleStatusChange = (e)=>{
    let url = HOST_URL+'/api/order/'+this.props.match.params.id+'/set_status/'
    let value = e.target.value ;
    let data = {'status':value}
    axios.put(url,data).then(res=>{
        this.setState({order:{...this.state.order,status:value}})
    })

  }
  render(){
    let guest_user_form = this.state.order.guest_user_form ;
    return(
      <div class="order-detail">
            <div class="order-detail-info">
            <div class="order-user-info">
                <p><span class="key">name </span><span class="value">{guest_user_form.name}</span></p>
                <p><span class="key">email </span><span class="value">{guest_user_form.email}</span></p>
                <p><span class="key">address </span><span class="value">{guest_user_form.address}</span></p>
                <p><span class="key">phone </span><span class="value">{guest_user_form.phone}</span></p>
            </div>
            <label htmlFor='order-status' style={{fontSize:'20px'}}>status</label>
            <select class="custom-select" id="order-status" value={this.state.order.status} onChange={this.handleStatusChange} >
                <option value="running">Running</option>
                <option value="shipped">Shipped</option>
            </select>

            </div>
            <div class="order-product-list">
              <h3>Products</h3>
            <table class="table basic-admin-table ">
              <thead >
                <tr>
                  <th scope="col">image</th>
                  <th scope="col">title</th>
                  <th scope="col">qty</th>
                  <th scope="col">cost</th>
                </tr>
              </thead>
              <tbody  >
                  {this.state.order.cart.products.map(client_product=>{
                      return(
                        <tr>
                          <td><img src={HOST_URL+client_product.product.primary_img.img_url} /></td>
                          <td>{client_product.product.title}</td>
                          <td>{client_product.qty}</td>
                          <td>{client_product.product.price}</td>
                        </tr>
                      )
                 })
                 }
                 <tr>
                     <td colspan='2'> total order price</td>
                     <td colspan='2'>{this.state.order.cart.total}DT</td>
                 </tr>
              </tbody>
            </table>

            </div>
      </div>
    )
  }
}
export default OrderDetail ;
