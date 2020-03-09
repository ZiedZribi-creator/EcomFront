import React from 'react' ;
import { Pagination } from 'rsuite';
import './wishlisttable-css.scss' ;
import {Link} from "react-router-dom" ;

class WishlistsTable extends React.Component {
  state ={
    activePage : 1 ,
    wishlist_filter : {
        ref : "",
        client_name:"",
        status:"",
    }
  }
  handleSelect = (eventKey) =>{
  this.setState({
    activePage: eventKey
  });
}
  show_wishlist = (id)=>{
      this.props.history.push('/dz-admin/:slug/wishlists/'+id+'/') ;
  }
  handle_wishlist_filter_change = (e,field)=>{
    let value = e.target.value ;
    let order_filter = this.state.order_filter ;
    order_filter[field] = value ;
    this.setState({order_filter:order_filter}) ;
  }

  render(){
    return(
      <div class="wishlist-table">
      <div class="wishlist-filter">
            <div class="form-group ref-filter">
                <label htmlFor="order-ref">ref</label>
                <input id="order-ref" class="form-control" placeholder="ref" onChange={(e)=>{this.handle_wishlist_filter_change(e,'ref')}}  />
            </div>
            <div class="form-group client-name-filter">
                <label htmlFor="client-name">client name</label>
                <input id="client-name" class="form-control" placeholder="client name" onChange={(e)=>{this.handle_wishlist_filter_change(e,'client_name')}}  />
            </div>
            <div class="form-group status-filter">
                <label htmlFor="status">status</label>
                <select class="form-control" id="status" onChange={(e)=>{this.handle_wishlist_filter_change(e,'status')}}>
                    <option>running</option>
                    <option>shipped</option>
                </select>
            </div>
      </div>
          <table class="table basic-admin-table ">
            <thead >
              <tr>
                <th scope="col">ref</th>
                <th scope="col">last update</th>
                <th scope="col">client</th>
                <th scope="col">cost</th>
                <th scope="col">detail</th>
              </tr>
            </thead>
            <tbody  >
                <tr>
                  <td>112548</td>
                  <td>12/01/2020</td>
                  <td>abdallah_chamakh</td>
                  <td>2222.36 dt</td>
                  <td><button class='wishlist-btn' onClick={()=>{this.show_wishlist(54)}} ><i class="far fa-eye"></i></button></td>
                </tr>
                <tr>
                  <td>986547</td>
                  <td>13/01/2020</td>
                  <td>abdallah_chamakh</td>
                  <td>5689.36 dt</td>
                  <td><button class='wishlist-btn' ><i class="far fa-eye"></i></button></td>
                </tr>
                <tr>
                  <td>986547</td>
                  <td>13/01/2020</td>
                  <td>abdallah_chamakh</td>
                  <td>5689.36 dt</td>
                  <td><button class='wishlist-btn' ><i class="far fa-eye"></i></button></td>
                </tr>
                <tr>
                  <td>986547</td>
                  <td>13/01/2020</td>
                  <td>abdallah_chamakh</td>
                  <td>5689.36 dt</td>
                  <td><button class='wishlist-btn' ><i class="far fa-eye"></i></button></td>
                </tr>
                <tr>
                  <td>986547</td>
                  <td>13/01/2020</td>
                  <td>abdallah_chamakh</td>
                  <td>5689.36 dt</td>
                  <td><button class='wishlist-btn' ><i class="far fa-eye"></i></button></td>
                </tr>
                <tr>
                  <td>986547</td>
                  <td>13/01/2020</td>
                  <td>abdallah_chamakh</td>
                  <td>5689.36 dt</td>
                  <td><button class='wishlist-btn' ><i class="far fa-eye"></i></button></td>
                </tr>
            </tbody>
          </table>
          <Pagination
               prev
               last
               next
               first
               size="md"
               pages={10}
               activePage={this.state.activePage}
               onSelect={this.handleSelect}
             />
          </div>
    )
  }
}
export default WishlistsTable ;
