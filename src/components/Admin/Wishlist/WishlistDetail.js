import React from 'react' ;
import "./wishlistdetail-css.scss" ;


class WishlistDetail extends React.Component {
    state = {
      client_info : {name:"abdallahchamakh"}
    }
    render(){
      let client_info = this.state.client_info ;
      return(
          <div class="wishlist-detail">
          <div class="wishlist-user-info">
              <p><span class="key">clientname </span><span class="value">{client_info.name}</span></p>
          </div>
          <div class="wishlist-product-list">
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
                <tr>
                  <td><img src="https://abdallahchamakh.com/media/me_robot.jpg"/></td>
                  <td>iphone x</td>
                  <td>5</td>
                  <td>2222.36 dt</td>
                </tr>
                <tr>
                  <td><img src="https://abdallahchamakh.com/media/me_robot.jpg"/></td>
                  <td>iphone x</td>
                  <td>5</td>
                  <td>2222.36 dt</td>
                </tr>
                <tr>
                  <td><img src="https://abdallahchamakh.com/media/me_robot.jpg"/></td>
                  <td>iphone x</td>
                  <td>5</td>
                  <td>2222.36 dt</td>
                </tr>
                <tr>
                  <td><img src="https://abdallahchamakh.com/media/me_robot.jpg"/></td>
                  <td>iphone x</td>
                  <td>5</td>
                  <td>2222.36 dt</td>
                </tr>
            </tbody>
          </table>

          </div>
          </div>
      )
    }
}
export default WishlistDetail ;
