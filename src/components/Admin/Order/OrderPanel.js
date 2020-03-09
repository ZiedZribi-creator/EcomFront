import React from 'react'
import OrdersTable from './OrdersTable' ;
import OrderDetail from './OrderDetail' ;
import './orderpanel-css.scss' ;
import {Route,Switch} from "react-router-dom" ;

class OrderPanel extends React.Component {
  render(){
    return(
      <div class="order-panel">
      <div class="basic-admin-dash basic-admin-container">
              <h2>Orders</h2>
      </div>
      <div class="order-table-section">
          <Switch>
             <Route path="/dz-admin/:slug/orders/" exact  component={OrdersTable} />
             <Route path="/dz-admin/:slug/orders/:id/"  component={OrderDetail} />
          </Switch>
      </div>
      </div>
    )
  }
}
export default OrderPanel ;
