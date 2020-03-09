import React from "react" ;
import {Switch,Route} from "react-router-dom" ;
import WishlistDetail from "./WishlistDetail" ;
import WishlistsTable from "./WishlistsTable" ;
import "./wishlistpanel-css.scss" ;

class WishlistPanel extends React.Component {
  render(){
    return(
      <div class="wishlist-panel">
        <div class="basic-admin-dash basic-admin-container">
                 <h2>Wishlists</h2>
         </div>
         <div class="wishlist-table-section basic-admin-container" >
        <Switch>
                <Route path="/dz-admin/:slug/wishlists/" exact component ={WishlistsTable} />
                <Route path="/dz-admin/:slug/wishlists/:id/" component ={WishlistDetail} />
         </Switch>
        </div>
      </div>
    )
  }
}
export default WishlistPanel ;
// <Route path="/dz-admin/:slug/whilists/:id/" component ={WishlistDetail} />
