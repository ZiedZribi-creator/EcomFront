import React from 'react' ;
import { Formik, Form, Field } from 'formik';
import LoginNavbar from './LoginNavbar' ;
import * as Yup from 'yup';
import axios from 'axios' ;
import {connect} from 'react-redux' ;
import './login-css.scss' ;
import HOST_URL from '../../../config' ;

class Login extends React.Component {
  state = {
    form : {email:'',password:''}
  }
  handleSubmit=(credentials,{setSubmitting, resetForm})=>{


    axios.post(HOST_URL+'/api/token/',credentials).then(res=>{
        localStorage.setItem('token',res.data.token)
        let config =  {headers: {Authorization : 'Bearer '+res.data.token}}
        axios.get(HOST_URL+'/api/adminprofile/get_info',config).then(res=>{
            let profile_slug = res.data.response.slug
            localStorage.setItem('slug',profile_slug)
            localStorage.setItem('is_admin',true)
            this.props.admin_login()
            this.props.history.push('/dz-admin/'+profile_slug+'/')

            // setSubmitting(false)
        })
    })


  }

  validationSchema = Yup.object().shape({
    email : Yup.string().email().required() ,
    password : Yup.string().min(8).required() ,
  })
  render(){
console.log(this.state.form);
    return(
<div>
<LoginNavbar/>
<div class='login-wrapper'>
<div class='login-card'>
<i class="fas fa-user-shield"></i>
    <Formik
  onSubmit={this.handleSubmit}
  initialValues={this.state.form}
  validationSchema={this.validationSchema}
   >
  {({errors,isSubmitting,touched}) => (
    <Form style={{width:'80%'}}>

    <div class='form-group'>
      <label htmlFor='email' >Email</label>
      <div>
      <Field class={errors.email && touched.email ? 'form-control  is-invalid' : 'form-control' } name="email" id="email" placeholder="Email" />
      <div class="invalid-feedback">
      {errors.email && touched.email ? <p>{errors.email}</p> : null }
      </div>
     </div>
     </div>
    <div class='form-group '>
      <label htmlFor='password' >Password</label>
      <div>
      <Field class={errors.password && touched.password ? 'form-control  is-invalid' : 'form-control' } name="password" type="password" id="password" placeholder="Password" />
      <div class="invalid-feedback">
          {errors.password && touched.password ? <p>{errors.password}</p> : null }
      </div>
      </div>
     </div>
      <center><button type='submit' disabled={isSubmitting} class='btn btn-primary' >
        Submit
      </button></center>
   </Form>


  )}
</Formik>

</div>
</div>
</div>
    )
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    'admin_login' : () => dispatch({type:'admin_login'})  ,
  }
}
export default connect(null,mapDispatchToProps)(Login) ;
