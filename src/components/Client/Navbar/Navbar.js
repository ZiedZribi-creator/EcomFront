import React from 'react' ;
import './navbar-css.scss' ;
import {withRouter} from 'react-router-dom' ;
import {connect} from 'react-redux' ;
class Navbar extends React.Component {
  state ={
    form : {
      search : '',
    }
  }
  handleChange =(e)=>{
    this.setState({form:{search:e.target.value}})
  }
  goTo = (link)=>{
    this.props.history.push(link) ;
  }
  render(){
    return(
      <div class="navbar-container">
          <nav class="top-navbar">
             <ul class='top-navbar-left'>
                <li>
                    <i class='fas fa-phone-alt'></i>
                    <p>Rappellez nous sur </p>
                    <span>(+216) 58671414</span>
                </li>
             </ul>
             <ul class='top-navbar-right'>
                <li>
                  connection
                </li>
                <li>
                  <input placeholder='search here' value={this.state.form.search} onChange={this.handleChange} />
                </li>
             </ul>
          </nav>
          <nav class="middle-navbar">
              <ul class="middle-navbar-social-media">
                  <li><i class="fab fa-facebook-f"></i></li>
                  <li><i class="fab fa-youtube"></i></li>
                  <li><i class="fab fa-instagram"></i></li>
              </ul>
              <i class="middle-navbar-menu material-icons">menu</i>

              <div class="middle-navbar-logo" onClick={()=>{this.goTo('/')}}>
                  <img src='https://mawlety.com/img/mawlety-logo-1519235345.jpg' />
              </div>
              <div onClick={()=>{this.goTo('/cart/')}} class="middle-navbar-cart" >
                  <i class='fas fa-shopping-bag'></i>
                  <span class='cart-count'>{this.props.cart_count}</span>
              </div>

          </nav>
          <hr style={{padding:'0px 50px'}}/>
          <nav class="bottom-navbar">
              <ul>
                    <li onClick={()=>{this.goTo('/')}}>Acceuil</li>
                    <li>Diagnostic</li>
                    <li onClick={()=>{this.goTo('/products/')}}>Nos Produits</li>
                    <li onClick={()=>{this.goTo('/ingredients/')}}>Nos Ingredients</li>
                    <li>Nos évenements</li>
                    <li>Nou trouver</li>
                    <li>A propos</li>
                    <li>Contact</li>
              </ul>
          </nav>
      </div>
    )
  }
}
const mapStateToProps = (state)=>{
  return{
    cart_count : state.cart_count ,
  }
}
export default withRouter(connect(mapStateToProps)(Navbar)) ;
