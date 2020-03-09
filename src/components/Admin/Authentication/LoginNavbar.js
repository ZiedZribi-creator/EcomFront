import React from 'react' ;
import './loginnavbar-css.scss' ;
import {Link} from 'react-router-dom' ;
class LoginNavbar extends React.Component {
  render(){
    return(
      <nav class='login-navbar'>
      <div class="logo"><h2>Dolzay</h2></div>
        <ul>
            <li><Link  style={{textDecoration:'none'}} class='nav-item' to='/'>My Store</Link></li>
            <li><Link  style={{textDecoration:'none'}} class='nav-item' to='/admin/help/'>need Help</Link></li>
        </ul>
      </nav>
    )
  }
}
export default LoginNavbar ;
