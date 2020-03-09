import React from 'react' ;
import './dashboard-css.scss' ;
import {Link} from 'react-router-dom' ;

class Dashboard extends React.Component {
  render(){
    return(
<div class='admin-dashboard'>

    <div class='summary basic-admin-container'>
    <div class="dash-bar">

            <i class="material-icons">&#xe871;</i>
            <h2>dashboard</h2>

     </div>
    </div>
    <div class='recent-info basic-admin-container'>
    <div class="metrics">
          <div class='s-item s-item--orders'>
          <i class="material-icons">shopping_cart </i>
          <div class="info">
               <span class='nb'>199</span>
               <span class='type'>orders</span>
          </div>
          </div>
          <div class='s-item s-item--money'>
          <i class="material-icons">money </i>
          <div class="info">
               <span class='nb'>66 DT</span>
               <span class='type'>revenue</span>
          </div>
          </div>

          <div class='s-item s-item--clients'>
          <i class="material-icons">people_alt</i>
          <div class="info">
               <span class='nb'>66</span>
               <span class='type'>clients</span>
          </div>
          </div>
          <div class='s-item s-item--visitors'>
            <i class="material-icons">people_alt</i>
            <div class="info">
               <span class='nb'>1003</span>
               <span class='type'>visitors</span>
            </div>
          </div>
          </div>
  <div class="table-data">
    <div class='orders'>
    <h2>Last orders</h2>
    <table class="table basic-admin-table">
    <thead class="" >
      <tr>
        <th scope="col">ref</th>
        <th scope="col">date</th>
        <th scope="col">cost</th>
        <th scope="col">detail</th>
      </tr>
    </thead>
    <tbody  >
        <tr>
          <td>112548</td>
          <td>12/01/2020</td>
          <td>2222.36 dt</td>
          <td><button class='order-btn' ><i class="far fa-eye"></i></button></td>
        </tr>
        <tr>
          <td>986547</td>
          <td>13/01/2020</td>
          <td>5689.36 dt</td>
          <td><button class='order-btn' ><i class="far fa-eye"></i></button></td>
        </tr>

    </tbody>
  </table>
  <div class="show-more-table"><Link to="orders/">Show more</Link></div>

          </div>
    <div class="popular-products">
    <h2>Popular products</h2>
          <table class="table basic-admin-table">
          <thead >
                  <tr>
                    <th scope="col">products</th>
                    <th scope="col">views</th>
                  </tr>
          </thead>
          <tbody>
              <tr>
                 <td><img src='https://abdallahchamakh.com/media/me_robot.jpg' alt='product img'/><p>Iphone x </p></td>
                 <td>2648</td>
              </tr>
              <tr>
                <td><img src='https://abdallahchamakh.com/media/me_robot.jpg' alt='product img'/><p>Iphone x </p></td>
                 <td>2648</td>
              </tr>
          </tbody>
        </table>
        <div class="show-more-table"><Link to="products/">Show more</Link></div>


          </div>
</div>
</div>
</div>

    )
  }
}
export default Dashboard
