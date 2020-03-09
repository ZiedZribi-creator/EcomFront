import React from 'react' ;
import {Route,Switch} from 'react-router-dom' ;
import ProductTable from './ProductTable' ;
import ProductForm from "./ProductForm" ;
import "./productpanel-css.scss" ;


class ProductPanel extends React.Component {
  render(){
    return(
      <div class="product-panel">
          <div class="basic-admin-dash basic-admin-container">
              <h2>Products</h2>
          </div>
          <div class="product-table-section basic-admin-container">
            <Switch>
                <Route path="/dz-admin/:slug/products/" exact component={ProductTable} />
                <Route path="/dz-admin/:slug/products/:product_slug/edit/"  render={()=>(<ProductForm mode='update' />)} />
                <Route path="/dz-admin/:slug/products/new/"  render={()=>(<ProductForm mode='create' />)} />
            </Switch>
          </div>
      </div>
    )
  }
}
export default ProductPanel ;
