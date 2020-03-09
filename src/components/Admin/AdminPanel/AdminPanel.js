import React from 'react' ;
import SideBar from './SideBar' ;
import {Route,Switch} from 'react-router-dom' ;
import Dashboard from '../Dashboard/Dashboard' ;
import ProductPanel from '../Product/ProductPanel' ;
import OrderPanel from '../Order/OrderPanel' ;
import WishlistPanel from '../Wishlist/WishlistPanel' ;
import ClientPanel from '../Client/ClientPanel' ;
import ReviewPanel from '../Reviews/ReviewPanel' ;
import SettingPanel from '../Setting/SettingPanel' ;
import axios from 'axios' ;
import HOST_URL from '../../../config' ;
import './adminpanel-css.scss' ;
import Navbar from '../Navbar/Navbar' ;
import {Link} from 'react-router-dom' ;


class AdminPanel extends React.Component {
  state = {
     admin_info : {
       username : '',
       image : '',
     },
     sidebar_partially_opened : false ,
  }
  toogleSideBarPartially = (sidebar)=>{
console.log('toogle babe');
    if(!this.state.sidebar_partially_opened == true){
      sidebar.style.width = '60px'
      this.AdminPanelContent.style.marginLeft = '60px'
      this.AdminPanelContent.style.width = '100%'
    }else {
      sidebar.style.width = '15%'
      this.AdminPanelContent.style.marginLeft = '15%'
      this.AdminPanelContent.style.width = '85%'
    }
this.setState({sidebar_partially_opened : !this.state.sidebar_partially_opened})
  }
  componentDidMount(){
    let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('token')}}
    axios.get(HOST_URL+'/api/adminprofile/'+this.props.match.params.slug+'/',config).then(res=>{
      console.log(res.data);
         this.setState({admin_info:res.data})
    })
  }
  render(){
    let admin_info = this.state.admin_info
    return(
         <div class='admin-panel'>
            <div class='sidebar'>
            <SideBar partially_opened={this.state.sidebar_partially_opened} toogleSideBarPartially={this.toogleSideBarPartially} username={admin_info.username} image={admin_info.image} />

            </div>
            <div ref={el=>this.AdminPanelContent=el} class='admin-panel-dynamic-content' >

              <Navbar />
                <Switch>
                    <Route path='/dz-admin/:slug/' exact component={Dashboard} />
                    <Route path='/dz-admin/:slug/products/' component={ProductPanel} />
                    <Route path='/dz-admin/:slug/orders/' component={OrderPanel} />
                    <Route path='/dz-admin/:slug/wishlists/' component={WishlistPanel} />
                    <Route path='/dz-admin/:slug/clients/' component={ClientPanel} />
                    <Route path='/dz-admin/:slug/reviews/' component={ReviewPanel} />
                    <Route path='/dz-admin/:slug/settings/' component={SettingPanel} />
              </Switch>
              <div></div>
         </div>
         </div>
    )
  }
}
export default AdminPanel ;
