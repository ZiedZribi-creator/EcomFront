import React from 'react' ;
import { Pagination } from 'rsuite';
import './ordertable-css.scss' ;
import {Link} from "react-router-dom" ;
import axios from 'axios' ;
import HOST_URL from '../../../config' ;
class OrdersTable extends React.Component {
  state ={
    activePage : 1 ,
    order_filter : {
        email : "",
        client_name:"",
        phone_number:"",
        status:"",
    },
    orders : {
      results : [],
    },


  }
componentDidMount(){
  axios.get(HOST_URL+'/api/order/').then(res=>{
    this.setState({orders:res.data})
  })
}
  handleSelect = (eventKey) =>{
  this.setState({
    activePage: eventKey
  });
}
  show_order = (id)=>{
      this.props.history.push('/dz-admin/:slug/orders/'+id+'/') ;
  }
  get_query_url = (order_filter)=>{
    let fields = ['email','client_name','phone_number','status']
    let url = '?'
    fields.map((field,idx)=>{
      url+=field+'='+order_filter[field]+'&'
    })
    url += 'page='+this.state.activePage
    return url ;
  }
  handle_order_filter_change = (e,field)=>{
    let value = e.target.value ;
    let order_filter = this.state.order_filter ;
    order_filter[field] = value ;
    this.setState({order_filter:order_filter}) ;
    let url = HOST_URL+'/api/order/'+this.get_query_url(order_filter)
    axios.get(url).then(res=>{
      this.setState({orders:res.data})
    })
  }
  render(){
    return(
      <div class="order-table">
      <div class="order-filter">
            <div class="form-group email-filter">
                <label htmlFor="order-email">email</label>
                <input id="order-email" class="form-control" placeholder="email" onChange={(e)=>{this.handle_order_filter_change(e,"email")}}  />
            </div>
            <div class="form-group client-name-filter">
                <label htmlFor="client-name">client name</label>
                <input id="client-name" class="form-control" placeholder="client name" onChange={(e)=>{this.handle_order_filter_change(e,"client_name")}}  />
            </div>
            <div class="form-group phone-number-filter">
                <label htmlFor="phone_number">phone number</label>
                <input id="phone_number" class="form-control" placeholder="phone number" onChange={(e)=>{this.handle_order_filter_change(e,"phone_number")}}  />
            </div>
            <div class="form-group status-filter">
                <label htmlFor="status">status</label>
                <select class="form-control" id="status" onChange={(e)=>{this.handle_order_filter_change(e,"status")}}>
                    <option></option>
                    <option>Runing</option>
                    <option>shipped</option>
                </select>
            </div>
      </div>
          <table class="table basic-admin-table ">
            <thead >
              <tr>
                <th scope="col">created_on</th>
                <th scope="col">email</th>
                <th scope="col">client name</th>
                <th scope="col">phone</th>
                <th scope="col">total</th>
                <th scope="col">status</th>
                <th scope="col">detail</th>
              </tr>
            </thead>
            <tbody  >
                {this.state.orders.results.map(order=>{
                  return(
                    <tr>
                      <td>{order.created_on}</td>
                      <td>{order.guest_user_form.email}</td>
                      <td>{order.guest_user_form.name}</td>
                      <td>{order.guest_user_form.phone}</td>
                      <td>{order.cart.total} dt</td>
                      <td><span style={{backgroundColor:order.status == 'shipped' ? 'green':'red' ,color:'white',padding:'3px 6px',borderRadius:'25px'}} >{order.status}</span></td>
                      <td><button class='order-btn' onClick={()=>{this.show_order(order.id)}} ><i class="far fa-eye"></i></button></td>
                    </tr>
                  )
                })
                }
            </tbody>
          </table>
        {(this.state.orders.length / 20) > 1 ?
          <Pagination
               prev
               last
               next
               first
               size="md"
               pages={this.state.orders.count/10}
               activePage={this.state.activePage}
               onSelect={this.handleSelect}
             /> : null}
          </div>
    )
  }
}
export default OrdersTable ;
