import React from 'react' ;
import LandingPage from './LandingPage/LandingPage' ;
import {Route,Switch} from 'react-router-dom' ;
import Navbar from './Navbar/Navbar' ;
import Contact from './Contact/Contact' ;
import ProductDetail from './Product/ProductDetail/ProductDetail' ;
import ProductList from './Product/ProductList/ProductList' ;
import CartSteps from './Cart/CartSteps' ;
import IngredientList from './Ingredients/IngredientList' ;
import {connect} from 'react-redux' ;
import axios from 'axios' ;
import HOST_URL from '../../config' ;

class ClientRouting extends React.Component {
  componentDidMount(){
    let cart_id = localStorage.getItem('cart_id')
    if(cart_id != null ){
      axios.get(HOST_URL+'/api/cart/'+localStorage.getItem('cart_id')+'/count/').then(res=>{
        this.props.set_cart_count(res.data.cart_count)
      })
    }else{
      this.props.set_cart_count(0)
    }
  }
  render(){
    let pathname = this.props.location.pathname
    console.log(pathname);
    if (pathname == '/'){
      if(localStorage.getItem('is_admin') && localStorage.getItem('token')){
          this.props.history.push('/dz-admin/'+localStorage.getItem('slug')+'/')
      }
    }

    return(
      <div>
          <Navbar/>
          <Switch>
            <Route path='/' exact  component={LandingPage} />
            <Route path='/products/' exact component={ProductList} />
            <Route path='/ingredients/' exact component={IngredientList} />
            <Route path='/products/:slug/' component={ProductDetail} />
            <Route path='/cart/' component={CartSteps} />
          </Switch>
         <Contact/>
     </div>
    )
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    'set_cart_count' : (cart_count)=>dispatch({type:'set_cart_count',cart_count:cart_count})
  }
}
export default connect(null,mapDispatchToProps)(ClientRouting) ;
// {pathname == '/' ?
//    <ProductDetail/> :
//
//      <Route path='/products/' exact component={ProductDetail} />
//
// }
