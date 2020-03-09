import React from 'react'
import axios from 'axios' ;
import HOST_URL from '../../../config' ;
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './settingpanel-css.scss' ;
class SettingPanel extends React.Component {
  state = {
    social_media_form : {
      facebook : '',
      instagram : '',
      youtube : '',
    },
    reset_password_form : {
      old_password : '',
      new_password : '',
    },
    reset_password_form_invalid : false,
  }
  componentDidMount(){
    axios.get(HOST_URL+'/api/sm/get_first/').then(res=>{
      if(!res.data.hasOwnProperty('res')){
          this.setState({social_media_form:res.data})
      }
    })
  }
  socialMediaValidationSchema = Yup.object().shape({
    facebook : Yup.string().required() ,
    instagram : Yup.string().required() ,
    youtube : Yup.string().required() ,
  })
  ResetPasswordValidationSchema = Yup.object().shape({
    old_password : Yup.string().required() ,
    new_password : Yup.string().required() ,
  })
  handleSocialMedialSubmit = (data)=>{
    let url = HOST_URL+'/api/sm/create_or_update/'
    axios.put(url,data).then(res=>{
      this.setState({social_media_form:res.data})
    })
  }
  handleResetPasswordChange = (e,field)=>{
    let reset_password_form = this.state.reset_password_form ;
    reset_password_form[field] = e.target.value ;
    this.setState({reset_password_form:reset_password_form}) ;
    this.setState({reset_password_form_invalid:false})
  }
  handleResetPasswordSubmit = (data,{resetForm,setSubmitting})=>{
    let url = HOST_URL+'/api/adminprofile/'+localStorage.getItem('slug')+'/set_password/'
    axios.put(url,data).then(res=>{
      if(res.data.response == 'invalid password'){
        this.setState({reset_password_form_invalid:true})
      }
      this.setState({    reset_password_form : {
            old_password : '',
            new_password : '',
          },})
      setSubmitting(false)
      })

  }
  render(){
    return(
      <div class="setting-panel">
      <div class="basic-admin-dash basic-admin-container">
              <h2>Setting</h2>
      </div>
      <div class="setting-section">
          <div class="social-medial-section">
            <h3>Social Media</h3>
            <Formik
            enableReinitialize
          onSubmit={this.handleSocialMedialSubmit}
          initialValues={this.state.social_media_form}
          validationSchema={this.socialMediaValidationSchema}
           >
          {({errors,isSubmitting,touched}) => (
            <Form style={{width:'100%',fontSize:'15px'}}>
            <div class='form-group'>
              <label htmlFor='client_name' >Facebook</label>
              <div>
              <Field class={errors.facebook && touched.facebook ? 'form-control  is-invalid' : 'form-control'} rowspan='5' name="facebook" id="facebook" placeholder="facebook"  />
              <div class="invalid-feedback">
              {errors.facebook && touched.facebook ? <p>{errors.facebook}</p> : null }
              </div>
             </div>
             </div>
            <div class='form-group '>
              <label htmlFor='instagram' >Instagram</label>
              <div>
              <Field class={errors.instagram && touched.instagram ? 'form-control  is-invalid' : 'form-control' }  name="instagram" id="instagram" placeholder="instagram" />
              <div class="invalid-feedback">
                  {errors.instagram && touched.instagram ? <p>{errors.instagram}</p> : null }
              </div>
              </div>
             </div>
             <div class='form-group '>
               <label htmlFor='instagram' >Youtube</label>
               <div>
               <Field class={errors.youtube && touched.youtube ? 'form-control  is-invalid' : 'form-control' }  name="youtube" id="youtube" placeholder="youtube" />
               <div class="invalid-feedback">
                   {errors.youtube && touched.youtube ? <p>{errors.youtube}</p> : null }
               </div>
               </div>
              </div>
              <center><button type='submit' class='btn btn-primary' >
                Submit
              </button></center>
              </Form>
             )}
           </Formik>
          </div>
          <div class="reset-password">
            <h3>Reset Password</h3>
          {this.state.reset_password_form_invalid ?
            <div class="alert alert-danger" style={{fontSize:'18px'}} role="alert">
               invalid password
            </div> : null }
            <Formik
            enableReinitialize
          onSubmit={this.handleResetPasswordSubmit}
          initialValues={this.state.reset_password_form}
          validationSchema={this.ResetPasswordValidationSchema}
           >
          {({errors,isSubmitting,touched}) => (
            <Form style={{width:'100%',fontSize:'15px'}}>
            <div class='form-group'>
              <label htmlFor='client_name' >old password</label>
              <div>
              <Field type='password' value={this.state.reset_password_form['old_password']} class={errors.old_password && touched.old_password ? 'form-control  is-invalid' : 'form-control'} rowspan='5' onChange={(e)=>{this.handleResetPasswordChange(e,'old_password')}} name="old_password" id="old_password" placeholder="old password" />
              <div class="invalid-feedback">
              {errors.old_password && touched.old_password ? <p>{errors.old_password}</p> : null }
              </div>
             </div>
             </div>
            <div class='form-group '>
              <label htmlFor='content' >new password</label>
              <div>
              <Field type='password' value={this.state.reset_password_form['new_password']} class={errors.new_password && touched.new_password ? 'form-control  is-invalid' : 'form-control' } onChange={(e)=>{this.handleResetPasswordChange(e,'new_password')}}  name="new_password" id="new_password" placeholder="new password" />
              <div class="invalid-feedback">
                  {errors.new_password && touched.new_password ? <p>{errors.new_password}</p> : null }
              </div>
              </div>
             </div>
              <center><button type='submit' disabled={isSubmitting}  class='btn btn-primary' >
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
export default SettingPanel
