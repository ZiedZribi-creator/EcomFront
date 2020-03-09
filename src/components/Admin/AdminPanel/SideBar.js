import React from 'react' ;
import './sidebar-css.scss' ;
import HOST_URL from '../../../config' ;
import {Link} from 'react-router-dom' ;

class SideBar extends React.Component {
  // state = {
  //   partially_opened: false ,
  // }
  // toogleSideBarPartially = ()=>{
  //   this.setState({partially_opened:true})
  //   this.adminSidebar.style.width = '60px' ;
  // }
  render(){
    return(
      <div class='admin-sidebar' ref={el=>this.adminSidebar=el} >
      <div class='admin-logo'>
            {!this.props.partially_opened ? <h3>dolzay</h3> : <i class='fas fa-arrow-right' onClick={()=>{this.props.toogleSideBarPartially(this.adminSidebar)}}></i>}
            {!this.props.partially_opened ? <i class='fas fa-arrow-left' onClick={()=>{this.props.toogleSideBarPartially(this.adminSidebar)}}></i> : null }
      </div>
      <div class='admin-sidebar-nav'>
       <ul>
             <li>
             <Link to='/dz-admin/:slug/'    style={{textDecoration:'none'}}>
                <div class='item' >
                    <i class="material-icons">list_alt</i>
                    {!this.props.partially_opened ?<span>dashboard</span> : null}
                </div>
             </Link>
             </li>
             <li>
             <Link to='/dz-admin/:slug/products/'  style={{textDecoration:'none'}}>
                <div class='item'>
                   <i class="material-icons">reorder</i>
                   {!this.props.partially_opened ?<span>products</span> : null}
                </div>
             </Link>
             </li>
             <li>
             <Link to='/dz-admin/:slug/orders/'  style={{textDecoration:'none'}}>
                <div class='item'>
                   <i class="material-icons">shopping_cart</i>
                   {!this.props.partially_opened ?<span>orders</span> : null}
                </div>
             </Link>
             </li>
             <li>
            <Link to='/dz-admin/:slug/reviews/'  style={{textDecoration:'none'}}>
               <div class='item'>
                 <i class="fas fa-heart"></i>
                 {!this.props.partially_opened ?<span>reviews</span> : null}
                </div>
             </Link>
             </li>
             <li style={{display:'none'}}>
            <Link to='/dz-admin/:slug/wishlists/'  style={{textDecoration:'none'}}>
               <div class='item'>
                 <i class="fas fa-heart"></i>
                 {!this.props.partially_opened ?<span>wishlists</span> : null}
                </div>
             </Link>
             </li>
             <li style={{display:'none'}}>
             <Link to='/dz-admin/:slug/clients/'  style={{textDecoration:'none'}}>
                <div class='item'>
                   <i class="material-icons">people</i>
                   {!this.props.partially_opened ?<span>clients</span> : null}
                </div>
             </Link>
             </li>
             <li>
             <Link to='/dz-admin/:slug/settings/'  style={{textDecoration:'none'}}>
                 <div class='item'>
                    <i class="material-icons">account_circle</i>
                    {!this.props.partially_opened ?<span>settings</span> : null}
                  </div>
             </Link>
             </li>
       </ul>
       </div>

      </div>
    )
  }
}
export default SideBar ;
