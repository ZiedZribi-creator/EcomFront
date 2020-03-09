import React from 'react' ;
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './guestuserform-css.scss' ;

class GuestUserForm extends React.Component{
  state = {
    guest_user_form : {
      name  : '',
      email : '',
      phone : '',
      address : '',
    },
    set_guest_user_form :false ,
  }

  handleSubmit = (data)=>{
    console.log(data);
    this.props.moveStep(1)
  }
  validationSchema = Yup.object().shape({
       name : Yup.string().required() ,
       email : Yup.string().email().required() ,
       phone : Yup.string().required() ,
       address : Yup.string().required() ,
  })
  handleChange = (e,field)=>{
    let value =  e.target.value
    let guest_user_form = this.state.guest_user_form ;
    guest_user_form[field] = value ;
    this.props.loadGuestUserFormChange(value,field) ;
    this.setState({guest_user_form:guest_user_form}) ;
  }
  render(){
// console.log(this.props.guest_user_form);
if(!this.state.set_guest_user_form){
  this.setState({guest_user_form:this.props.guest_user_form})
  this.setState({set_guest_user_form:true})
}



    return(
  <Formik
    enableReinitialize
    onSubmit={this.handleSubmit}
    initialValues={this.props.guest_user_form}
    validationSchema={this.validationSchema}>
    {({errors,isSubmitting,touched}) => (
      <div class="guest-user-form-container">
           <div class='guest-user-form'>
           <div class='form-group'>
             <label htmlFor='name' >name</label>
               <div>
                <Field class={errors.name && touched.name ? 'form-control  is-invalid' : 'form-control' } name="name" id="name" placeholder="Name" onChange={(e)=>{this.handleChange(e,'name');}} />
                <div class="invalid-feedback">
                     {errors.name && touched.name ? <p>{errors.name}</p> : null }
                </div>
               </div>
            </div>
            <div class='form-group'>
                 <label htmlFor='email' >Email</label>
               <div>
                 <Field class={errors.email && touched.email ? 'form-control  is-invalid' : 'form-control' } name="email" id="email" placeholder="Email" onChange={(e)=>{this.handleChange(e,'email')}} />
                 <div class="invalid-feedback">
                    {errors.email && touched.email ? <p>{errors.email}</p> : null }
                 </div>
              </div>
            </div>
            <div class='form-group'>
                 <label htmlFor='phone' >Phone</label>
               <div>
                 <Field class={errors.phone && touched.phone ? 'form-control  is-invalid' : 'form-control' } name="phone" id="phone" placeholder="Phone" onChange={(e)=>{this.handleChange(e,'phone')}}  />
                 <div class="invalid-feedback">
                    {errors.phone && touched.phone ? <p>{errors.phone}</p> : null }
                 </div>
              </div>
            </div>
            <div class='form-group'>
                 <label htmlFor='phone' >Address</label>b
               <div>
                 <Field class={errors.address && touched.address ? 'form-control  is-invalid' : 'form-control' } name="address" id="address" placeholder="address" onChange={(e)=>{this.handleChange(e,'address')}} />
                 <div class="invalid-feedback">
                    {errors.address && touched.address ? <p>{errors.address}</p> : null}
                 </div>
              </div>
            </div>
           </div>
           <div class="cart-step-action">
               <button type='button' class='cart-backward-btn' onClick={()=>{this.props.moveStep(-1)}}>back</button>
               <button type='submit' class='cart-forward-btn' onClick={this.handleSubmit} >entrer votre votre informatdion</button>
           </div>
      </div>
    )}
    </Formik>
    )
  }
}
export default GuestUserForm ;
