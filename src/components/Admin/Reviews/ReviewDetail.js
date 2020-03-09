import React from 'react' ;
import HOST_URL from '../../../config' ;
import axios from 'axios' ;
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {withRouter} from 'react-router-dom' ;

class ReviewDetail extends React.Component{

   state = {
     form : {
       client_name : '',
       content : '',
     }
   }
   componentDidMount(){
     if(this.props.form_type == 'update'){
       let review_id = this.props.match.params.id
       let url = HOST_URL+'/api/review/'+review_id+'/'
       axios.get(url).then(res=>{
         this.setState({form:res.data})
       })
     }
   }
   validationSchema = Yup.object().shape({
     client_name : Yup.string().required() ,
     content : Yup.string().required() ,
   })
   handleSubmit = (data)=>{
     let form_type = this.props.form_type
     let url = HOST_URL+'/api/review/'
     let review_id = this.props.match.params.id
     console.log(form_type);
     if(form_type == 'update'){
       axios.put(url+review_id+'/',data).then(res=>{
         this.props.history.push('/dz-admin/'+localStorage.getItem('slug')+'/reviews/')
       })
     }else{
       axios.post(url,data).then(res=>{
         this.props.history.push('/dz-admin/'+localStorage.getItem('slug')+'/reviews/')
       })
     }
   }
    render(){
      return(
        <Formik
        enableReinitialize
      onSubmit={this.handleSubmit}
      initialValues={this.state.form}
      validationSchema={this.validationSchema}
       >
      {({errors,isSubmitting,touched}) => (
        <Form style={{width:'100%',fontSize:'15px'}}>
        <div class='form-group'>
          <label htmlFor='client_name' >Client Name</label>
          <div>
          <Field class={errors.client_name && touched.client_name ? 'form-control  is-invalid' : 'form-control'} rowspan='5' name="client_name" id="client_name" placeholder="client name" />
          <div class="invalid-feedback">
          {errors.client_name && touched.client_name ? <p>{errors.client_name}</p> : null }
          </div>
         </div>
         </div>
        <div class='form-group '>
          <label htmlFor='content' >Content</label>
          <div>
          <Field class={errors.content && touched.content ? 'form-control  is-invalid' : 'form-control' } as='textarea' name="content" id="content" placeholder="Content" />
          <div class="invalid-feedback">
              {errors.content && touched.content ? <p>{errors.content}</p> : null }
          </div>
          </div>
         </div>
          <center><button type='submit' disabled={isSubmitting} class='btn btn-primary' >
            Submit
          </button></center>
          </Form>


         )}
       </Formik>)
     }
}
export default withRouter(ReviewDetail) ;
