import React from 'react' ;
import CartTable from './CartTable' ;
import GuestUserForm from './GuestUserForm' ;
import UpSell from './UpSell' ;
import './cartsteps-css.scss' ;
import HOST_URL from '../../../config' ;
import axios from 'axios' ;
import {connect} from 'react-redux' ;

class CartSteps extends React.Component{
  state ={
    guest_user_form : {
      name  : '',
      email : '',
      phone : '',
      address : '',
    },
    steps : [
         'commander',
         'entrer votre information',
         'confirm',
    ],
    cart : {
      products : [],

    },
    step_idx : 0 ,
  }

  componentDidMount(){
    axios.get(HOST_URL+'/api/cart/'+localStorage.getItem('cart_id')+'/').then(res=>{
      this.setState({cart:res.data})
    })
  }
  moveStep = (nb)=>{

      let step_idx = this.state.step_idx ;
      if(step_idx == 2 && nb!= -1 ){
        // get the cart_id
        let cart_id = localStorage.getItem('cart_id')
        // get the guestuserform
        let guestuserform = this.state.guest_user_form
        // an api call to submit the order
        let data = {cart_id:cart_id,guestuserform:guestuserform}
        console.log(data);
        axios.post(HOST_URL+'/api/order/',data).then(res=>{
          localStorage.clear()
          this.props.set_cart_count(0)
          this.props.history.push('/')
        })
        // go to the product list page
      }else{
        this.setState({step_idx:step_idx+nb}) ;
        window.scrollTo(0,0) ;
      }



  }
  loadGuestUserFormChange = (value,field)=>{
    let guest_user_form = this.state.guest_user_form ;
    guest_user_form[field] = value ;
    this.setState({guest_user_form:guest_user_form}) ;
  }
  deleteProduct = (idx)=>{
      let products = this.state.cart.products ;
      let url  = HOST_URL+'/api/cart/'+localStorage.getItem('cart_id')+'/drop_product/' ;
      let data = {'client_product_id':products[idx].id}
      axios.put(url,data).then(res=>{
        this.props.decrease_cart_count(products[idx].qty)
        products.splice(idx,1) ;
        this.setState({products:products}) ;
      })
      // here an api call to delete the product from the cart
  }
  handleQtyChange = (e,idx)=>{
      if(e.target.value >= 1){
        let value = e.target.value ;
        let products = this.state.cart.products ;
        let old_qty = products[idx].qty ;
        products[idx].qty = e.target.value ;
        let url = HOST_URL+'/api/cart/'+localStorage.getItem('cart_id')+'/set_product_qty/'
        let data = {client_product_id:products[idx].id,qty:value}
        axios.put(url,data).then(res=>{
          let diff = value - old_qty;
          if(diff > 0){
            this.props.increase_cart_count(diff) ;
          }else{
            this.props.decrease_cart_count(-diff)
          }
          this.setState({products:products})
        })
          // here an api call to delete the product from the cart

      }
  }
  render(){
    // let guestUserformBtn = document.querySelector('.guest-user-form-btn')
    // console.log(guestUserformBtn);
    // console.log(this.state.guest_user_form);
    let step_idx = this.state.step_idx ;
    return(
      <div class="cart-steps-container">
         <div class='step-progress'>
            {this.state.steps.map((step,idx)=>(
              <div class='step-item' style={{backgroundColor:step_idx == idx ? '#148F77' :null,color:step_idx == idx ? 'white' : null}}><p>{step}</p></div>
            ))
            }
         </div>
         <div class="cart-content">
         {step_idx == 0 ?
            <CartTable products={this.state.cart.products} deleteProduct={this.deleteProduct} handleQtyChange={this.handleQtyChange}/>:
            step_idx == 1 ?
            <GuestUserForm moveStep={this.moveStep} loadGuestUserFormChange={this.loadGuestUserFormChange}  guest_user_form={this.state.guest_user_form} step_idx={this.state.step_idx}/>
            :<UpSell/>
         }

         </div>
         {this.state.cart.products.length >  0 ?
           <div class="cart-step-action" style={{display:step_idx == 1 ? 'none' : 'flex' }}>
           {step_idx > 0 ?
              <button class='cart-backward-btn' onClick={()=>{this.moveStep(-1)}}>back</button> : null
           }
           <button class='cart-forward-btn' onClick={()=>{this.moveStep(1)}}>{this.state.steps[step_idx]}</button>
         </div> : null}
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    'decrease_cart_count' : (value)=>dispatch({type:'decrease_cart_count',value:value}) ,
    'increase_cart_count' : (value)=>dispatch({type:'increase_cart_count',value:value}),
    'set_cart_count': (cart_count)=>dispatch({type:'set_cart_count',cart_count:cart_count})
    // 'set_cart_count4': (cart_count)=>dispatch({type:'set_cart_count',cart_count:cart_count})
  }
}
// const mapStateToProps = (state)=>{
//   return{
//       cart_count : state.cart_count ,
//   }
// }
export default connect(null,mapDispatchToProps)(CartSteps) ;
