import React from "react" ;
import { Formik, Form, Field } from 'formik' ;
import * as Yup from 'yup' ;
import "./productform-css.scss" ;
import {SketchPicker} from 'react-color';
import ProductModalCat from './ProductModalCat' ;
import ProductModalImage from './ProductModalImage' ;
import HOST_URL from '../../../config' ;
import axios from 'axios' ;
import {withRouter} from 'react-router-dom' ;

class ProductForm extends React.Component {
state = {
    form : {
      title : '',
      description : '' ,
      section : '' ,
      categorie : '' ,
      subcategorie:'' ,
      size : '',
      sizes : [] ,
      primary_img : {img_url :null,img_file:null} ,
      additional_imgs : [] ,
    },
    populated_form : {
      title : '',
      description : '' ,
      price  : 0 ,
      section : {id :null,name:null} ,
      categorie : {id :null,name:null} ,
      subcategorie: {id :null,name:null} ,
      primary_img : {img_url :null,img_file:null} ,
      additional_imgs : [] ,
      product_variant_list : [] ,
    },
    product_variant_form : {
      img:{img_url :null,img_file:null} ,
      size : "",
      color : "#195EA3",
      qty :0,
      price:0,
    },
    section_list:[],
    categorie_list : [],
    subcategorie_list : [],
    displayColorPicker: false,
    color: '#195EA3',
    modals : {section:false,categorie:false,subcategorie:false,pv_img:false}

  }
componentDidMount(){
  if(this.props.mode == 'update'){
  let url = HOST_URL+'/api/product/'+this.props.match.params.product_slug+'/'
  axios.get(url).then(res=>{
     // let populated_formik = {title:res.data['title'],'description':res.data['description']}
     // console.log('one of kind',populated_formik);
     // this.setState({populated_formik:populated_formik})
     let populated_form = res.data
     populated_form['additional_imgs'] = populated_form['add_imgs']
     delete populated_form['add_imgs']
     populated_form['product_variant_list'] = populated_form['product_variants']
     delete populated_form['product_variants']
     this.load_product_sec_cat_subcat(populated_form)
  })
}else{
  this.load_product_sec_cat_subcat(null)
}
}
load_product_sec_cat_subcat = (populated_form_)=>{
  axios.get(HOST_URL+'/api/section/').then(res=>{
    let state = this.state ;
    let section_list = res.data ;
    let populated_form = populated_form_ ? populated_form_ :this.state.populated_form ;
    console.log(populated_form);
    // if(section_list.length > 0){
    state.section_list = section_list  ;
    state.populated_form = populated_form
  if(populated_form['section'].name){
    let section_id = section_list.findIndex((sec)=>sec.name == populated_form['section'].name)
    if(this.props.mode == 'update'){
      state.categorie_list = section_list[section_id].categories;
      state.populated_form.section = section_list[section_id] ;
    }else{
      state.categorie_list = section_list[0].categories;
      state.populated_form.section = section_list[0] ;
    }
  if (populated_form['categorie'].name){
  if(this.props.mode == 'update'){
    let categorie_id = section_list[section_id].categories.findIndex((cat)=>cat.name == populated_form['categorie'].name)
  if(populated_form['subcategorie'].name){
    let subcategorie_id = section_list[section_id].categories[categorie_id].subcategories.findIndex((subcat)=>subcat.name == populated_form['subcategorie'].name)
    // if(section_list[section_id].categories.length > 0 && section_list[section_id].categories[categorie_id].length > 0 ){
      state.subcategorie_list = section_list[section_id].categories[categorie_id].subcategories;
      state.populated_form.categorie = section_list[section_id].categories[categorie_id] ;
      state.populated_form.subcategorie = section_list[section_id].categories[categorie_id].subcategories[subcategorie_id] ;
      console.log('sub id => ???',state.populated_form.subcategorie);
    // }
  }
  }else{
    if(section_list[0].categories.length > 0 && section_list[0].categories[0].length > 0 ){
      state.subcategorie_list = section_list[0].categories[0].subcategories;
      state.populated_form.categorie = section_list[0].categories[0] ;
      state.populated_form.subcategorie = section_list[0].categories[0].subcategories[0] ;
    }
  }
}
  }

  console.log('youyou baby => ',state.populated_form);
  // }
    this.setState({state:state})
  })
}
set_pv_img = (img)=>{
  let product_variant_form = this.state.product_variant_form ;
  product_variant_form.img = img;
  this.setState({product_variant_form:product_variant_form})
}
drop_pv_img = (idx)=>{
  this.setState({product_variant_form:{...this.state.product_variant_form,img:{img_url :null,img_file:null}}})
}
get_id_by_name = (list_type,name)=>{
  for(let i=0;  i < this.state[list_type].length ;i++){
    if(this.state[list_type][i].name == name ){
      return this.state[list_type][i].id ;
      break ;
    }
  }
}

load_section_detail = (e)=>{

  let id = this.get_id_by_name('section_list',e.target.value)
  let url = HOST_URL+'/api/section/'+id+'/'
  axios.get(url).then(res=>{
    let state = this.state ;
    let section = res.data ;
    console.log(res.data);
    state.populated_form.section = section ;
      if(section.categories.length > 0){
        state.populated_form.categorie = section.categories[0] ;
        state.categorie_list = section.categories  ;
        if(section.categories[0].subcategories.length > 0){
          state.populated_form.subcategorie = section.categories[0].subcategories[0] ;
          state.subcategorie_list = section.categories[0].subcategories
        }else{
          state.populated_form.categorie  = {id:null,name:null}
          state.subcategorie_list = [] ;
        }
      }else{
        state.categorie_list = []  ;
        state.subcategorie_list = [] ;
        state.populated_form.categorie  = {id:null,name:null}
        state.populated_form.subcategorie  = {id:null,name:null}
      }


this.setState({state:state})
  })
}
load_categorie_detail = (e)=>{

  let id = this.get_id_by_name('categorie_list',e.target.value)

  let url = HOST_URL+'/api/categorie/'+id+'/'
  axios.get(url).then(res=>{
    let state = this.state ;
    let categorie = res.data
    state.populated_form.categorie = categorie ;
    if(categorie.subcategories.length>0){
          state.subcategorie_list = categorie.subcategories
          state.populated_form.subcategorie = categorie.subcategories[0] ;
    }else{
         state.subcategorie_list = []
         state.populated_form.subcategorie  = {id:null,name:null}
    }
    this.setState({state:state})
  })
}
load_subcategorie = (e)=>{
  let id = this.get_id_by_name('subcategorie_list',e.target.value)
  let url = HOST_URL+'/api/subcategorie/'+id+'/'
  axios.get(url).then(res=>{
    let state = this.state ;
    state.populated_form.subcategorie = res.data ;
    this.setState({state:state})
  })
}
  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };
 handle_color = (color)=>{
   let form = this.state.product_variant_form ;
   form.color = color.hex ;
   this.setState({product_variant_form:form}) ;
 }
  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  openModal  = (field)=>{
    let modals = this.state.modals ;
    modals[field] = true ;
    this.setState({modals:modals}) ;
  }
  closeModal = (field)=>{
    let modals = this.state.modals ;
    modals[field] = false ;
    this.setState({modals:modals}) ;
  }
  validationSchema = Yup.object().shape({
    title : Yup.string().required() ,
    description : Yup.string().required() ,
  })
  handleSubmit = (data)=>{
    console.log('original data => ',data);
    let mode = this.props.mode
    let product_data = {...this.state.populated_form} // Object.assign({},this.state.populated_form) ;
    delete product_data['title']
    product_data['title'] = data['title']
    delete product_data['description']
    product_data['description'] = data['description']
    delete product_data['price']
    product_data['price'] = data['price']
    console.log('before =>',product_data);
    if(product_data.section.hasOwnProperty('categories')){ // delete the categories for the section field
      delete product_data.section.categories
    }
    if(product_data.section.hasOwnProperty('categories') && product_data.categories.hasOwnProperty('subcategories')){ // delete the subcategories for the categorie field
      delete product_data.categorie.subcategories
    }
    // console.log(instanceof(product_data.primary_img.img_file),'dd');
    if(typeof product_data.primary_img.img_file == 'string'){ // check if primary_img is worth updating
      product_data.primary_img.img_file = null
    }
    let new_additional_imgs = []
    for(let i=0 ;i < product_data.additional_imgs.length ; i++){ // clean the the additional_imgs by deleting those who are none file
          if(!product_data.additional_imgs[i].hasOwnProperty('id')){
            new_additional_imgs.push(product_data.additional_imgs[i].img_file)  // new images to create on the database
          }
    }
    product_data.additional_imgs = new_additional_imgs
    for(let i=0 ;i < product_data.product_variant_list.length ;i++){
      if(product_data.product_variant_list[i].img) {
      if(product_data.product_variant_list[i].img.hasOwnProperty('id')){
        product_data.product_variant_list[i].img = {...product_data.product_variant_list[i].img,img_id:product_data.product_variant_list[i].img.id}  // if the image already exist on the db we use his id to grab it
      }else{
        if(product_data.product_variant_list[i].img.img_file == product_data.primary_img.img_file){
            product_data.product_variant_list[i].img = {...product_data.product_variant_list[i].img,img_idx:-1} // idx => -1 mean it is the primary image
        }else{
          for(let idx = 0 ;idx < product_data.additional_imgs.length ;idx++ ){
            if(product_data.product_variant_list[i].img.img_file == product_data.additional_imgs[idx]){ // if the image id just uploaded we use the idx on his add_imgs list
              product_data.product_variant_list[i].img = {...product_data.product_variant_list[i].img,img_idx:idx}

            }
          }
        }
      }
    }
    }
    product_data['add_imgs'] = product_data['additional_imgs']
    delete product_data['additional_imgs']
    product_data['product_variants'] = product_data['product_variant_list']
    delete product_data['product_variant_list']
    let fields = ['title','description','price','add_imgs','product_variants','section','categorie','subcategorie','primary_img']
    let formData = new FormData()
    for (let i= 0 ; i<fields.length ;i++){
    if(fields[i] == 'primary_img'){
      if(product_data[fields[i]].img_file){
        console.log('one of kind',product_data[fields[i]].img_file)
        formData.append('primary_img',product_data[fields[i]].img_file)
      }
      }
    // else if(fields[i] == 'section')
    else if(fields[i] == 'product_variants'){
        product_data[fields[i]].map((pv,idx)=>{
          if(!pv.hasOwnProperty('id')){
              formData.append('pv_'+idx+'_size',pv.size)
              formData.append('pv_'+idx+'_price',pv.price)
              formData.append('pv_'+idx+'_qty',pv.qty)
              formData.append('pv_'+idx+'_color',pv.color)
              if(pv.img.hasOwnProperty('img_id')){
                formData.append('pv_'+idx+'_img_id',pv.img.img_id)
              }else if(pv.img.hasOwnProperty('img_idx')) {
                formData.append('pv_'+idx+'_img_idx',pv.img.img_idx)
              }
        }
        })
    }
    else if(fields[i] =='add_imgs'){
      product_data[fields[i]].map((add_img,idx)=>{
        formData.append('add_img_'+idx,add_img)

      })
    }
    else if(fields[i] == 'subcategorie' || fields[i] == 'categorie' || fields[i] == 'section'){
      formData.append(fields[i],product_data[fields[i]].name)
    }
   else{
        formData.append(fields[i],product_data[fields[i]])
      }
    }
    console.log('after babe => ',product_data);
     let config = { headers: { 'Content-Type': 'multipart/form-data' } }
    if(this.props.mode == 'update'){
      axios.put(HOST_URL+'/api/product/'+this.props.match.params.product_slug+'/custom_update/',formData,config).then(res=>{
          this.props.history.push('/dz-admin/'+localStorage.getItem('slug')+'/products/')
      })
    }else {
    axios.post(HOST_URL+'/api/product/custom_creation/',formData,config).then(res=>{
          this.props.history.push('/dz-admin/'+localStorage.getItem('slug')+'/products/')
          // console.log(res.data);
    })
  }
  }
  upload_image = ()=>{

        if(!this.state.populated_form.primary_img.img_url){
          this.primaryImage.click()
        }else {
           this.additionalImages.click()
        }


  }
  handlePrimaryImageUpload = (e)=>{
    // console.log(e.target.files[0]);
    let img_file = e.target.files[0]
    if (img_file){
    let img_url = URL.createObjectURL(img_file)
    let populated_form = this.state.populated_form ;
    populated_form.primary_img = {img_url:img_url,img_file:img_file}
    this.setState({populated_form:populated_form})

  }
  }
  handleAdditionalImagesUpload = (e)=>{
    let files = Array.from(e.target.files) ;
    let additional_imgs = []
    files.map((file)=>{
       let img_url = URL.createObjectURL(file) ;
       additional_imgs.unshift({img_url:img_url,img_file:file}) ;
    })
      let populated_form = this.state.populated_form
      populated_form.additional_imgs = [...populated_form.additional_imgs,...additional_imgs]
      this.setState({populated_form:populated_form})

  }
  delete_img = (idx)=>{
      let populated_form = this.state.populated_form ;
      if(idx != null){ // if the idx is not null so it's an add_imgs
        // check if the image that you wona delete is previewed on the img product variant form
        if(populated_form.additional_imgs[idx].img_file == this.state.product_variant_form.img.img_file){
          this.setState({product_variant_form:{...this.stateproduct_variant_form,img:{img_url:null,img_file:null}}})
        }
        // make an api call to delete this image because it's alreay stored on the db
        if(populated_form.additional_imgs[idx].hasOwnProperty('id')){
          let data ={add_img_id:populated_form.additional_imgs[idx].id}
          axios.put(HOST_URL+'/api/product/'+this.props.match.params.product_slug+'/drop_add_img/',data).then(res=>{
            populated_form.additional_imgs.splice(idx,1);
            this.setState({populated_form:populated_form})
          })
        }else{
          populated_form.additional_imgs.splice(idx,1);
        }
      }else{ // if the idx is null so it's a primary img
        // check if the image that you wona delete is previewed on the img product variant form
        if(populated_form.primary_img.img_file == this.state.product_variant_form.img.img_file){
          this.setState({product_variant_form:{...this.state.product_variant_form,img:{img_url:null,img_file:null}}})
        }
        // make an api call to delete this image because it's alreay stored on the db
        if(populated_form.primary_img.hasOwnProperty('id')){
          axios.put(HOST_URL+'/api/product/'+this.props.match.params.product_slug+'/drop_primary_img/').then(res=>{
            populated_form.primary_img = {img_url :null,img_file:null}
            populated_form.additional_imgs = []
            this.setState({populated_form:populated_form})
            this.deleteProductVariantImagePreview()
          })
        }else{
          populated_form.primary_img = {img_url :null,img_file:null}
          populated_form.additional_imgs = []
          this.deleteProductVariantImagePreview()
        }

      }
      this.setState({populated_form:populated_form})
  }
  handleProductVarianImageChange = (e)=>{
    let img_file = e.target.files[0]
    if(img_file){
        let img_url = URL.createObjectURL(img_file)
        let product_variant_form = this.state.product_variant_form ;
        product_variant_form.img = {img_url:img_url,img_file:img_file} ;
        this.setState({product_variant_form:product_variant_form}) ;
    }
  }
  handleProductVariantChange = (e,field)=>{
    let value = e.target.value ;
    let product_variant_form = this.state.product_variant_form
    product_variant_form[field] = value ;
    this.setState({product_variant_form:product_variant_form})
  }
  addProductVariant = ()=>{
    this.handleClose() //close the the color picker if the user leave it open
     let product_variant_form = Object.assign({},this.state.product_variant_form)
     let populated_form = Object.assign({},this.state.populated_form)
     let product_variant_list = this.state.product_variant_list
     populated_form.product_variant_list.unshift(product_variant_form)
     this.setState({populated_form:populated_form})
  }
  deleteProductVariant = (idx)=>{
      let populated_form = this.state.populated_form
      if(populated_form.product_variant_list[idx].hasOwnProperty('id')){ // delete the product variant from the database
        let url = HOST_URL+'/api/product/'+this.props.match.params.slug+'/drop_pv/'
        let data = {pv_id:populated_form.product_variant_list[idx].id}
        axios.put(url,data).then(res=>{
          populated_form.product_variant_list.splice(idx,1)
          this.setState({populated_form:populated_form})
        })
      }else{ // otherwise deleted from the client side
        populated_form.product_variant_list.splice(idx,1)
        this.setState({populated_form:populated_form})
      }
  }
  deleteProductVariantImagePreview = ()=>{
      let product_variant_form = this.state.product_variant_form
      product_variant_form.img = {img_url :null,img_file:null}
      this.setState({product_variant_form:product_variant_form})
  }

  render(){
    console.log('here baby',this.state.populated_form);
    return(
    <div class="product-form" >

    <div class="product-info">
    <h4>Add product</h4>
        <Formik
            onSubmit={this.handleSubmit}
            initialValues={this.state.populated_form}
            validationSchema={this.validationSchema}
            enableReinitialize
       >
      {({errors,isSubmitting,touched}) => (

<Form>
        <div class='form-group'>
          <label htmlFor='title' >Title</label>
          <div >
                <Field class='form-control' name="title" id="title" placeholder="title" />
                {errors.title && touched.title ? <p>{errors.title}</p> : null}
         </div>
         </div>
        <div class='form-group'>
          <label htmlFor='description' >Description</label>
          <div>
                <Field class='form-control' name="description"  as="textarea" rows="7" id="description" placeholder="description" />
                  {errors.description && touched.description ? <p>{errors.description}</p> : null }
          </div>
        </div>
        <div class='form-group'>
          <label htmlFor='price' >Price</label>
          <div>
                <Field class='form-control' name="price"  type='number' step='0.01' id="price" placeholder="price" />
                  {errors.price && touched.price ? <p>{errors.price}</p> : null }
          </div>
        </div>
        <div class="product-images">
             <div class="header">
                <h3>Images</h3>
                <button type='button' class="btn btn-link" onClick={this.upload_image}>upload</button>
             </div>
             <div class="dropezone">
              <input type='file' ref={(primaryImage)=>{this.primaryImage=primaryImage}} id='input'  style={{display:'none'}} onChange={this.handlePrimaryImageUpload}/>
              <input multiple="multiple" type='file' ref={(additionalImages)=>{this.additionalImages=additionalImages}} id='input'  style={{display:'none'}} onChange={this.handleAdditionalImagesUpload}/>
              {this.state.populated_form.primary_img && this.state.populated_form.primary_img.img_url ?
                <div class="preview-img">
                <div class="primary-img">
                    <button type='button' onClick={()=>{this.delete_img(null)}} >x</button>
                    <img src={this.state.populated_form.primary_img.img_url.includes('media') ? HOST_URL+this.state.populated_form.primary_img.img_url : this.state.populated_form.primary_img.img_url} />
                </div>
                <div class="additional-img">
                  {this.state.populated_form.additional_imgs.map((img,idx)=>{
                      return(
                          img.primary != true ?
                            <div class='add-img'>
                                <button type='button' onClick={()=>{this.delete_img(idx)}} >x</button>
                                <img src={img.img_url.includes('media') ? HOST_URL+img.img_url : img.img_url}  />
                            </div> : null
                      )
                  })
                  }
                </div></div>:
                <i class="fas fa-cloud-upload-alt"></i>


              }
             </div>
        </div>
      <div class="product-cat" style={{width:'100%'}}>
      <div style={{display:'flex',flexDirection:'column',width:'100%'}}>
        <div class="form-group" style={{width:'100%'}}>
        <div class="select-form" >
           <label htmlFor='description'>Section</label>
                <Field as="select" name="section" class="custom-select" onChange={this.load_section_detail} value={this.state.populated_form.section.name} >
                     {this.state.section_list.map(section=>{
                       return(
                         <option value={section.name}>{section.name}</option>
                       )
                     })}
                </Field>
           </div>
           <div class="select-btn" style={{display:'none'}}><button type='button' onClick={()=>{this.openModal('section')}} >+</button></div>
           <ProductModalCat visible={this.state.modals['section']} field='section' closeModal={this.closeModal}  />
        </div>
        <div class="form-group" style={{display:'none'}}>
          <div class="select-form" >
           <label htmlFor='categorie' >Categorie</label>
                <Field as="select" id='categorie' name="categorie" class="custom-select" value={this.state.populated_form.categorie.name} onChange={this.load_categorie_detail}  >
                {this.state.categorie_list.map(categorie=>{
                  return(
                    <option value={categorie.name}>{categorie.name}</option>
                  )
                })}
                </Field>
           </div>
           <div class="select-btn"><button type='button' onClick={()=>{this.openModal('categorie')}} >+</button></div>
           <ProductModalCat visible={this.state.modals['categorie']} field='categorie' field_value={this.state.populated_form.categorie.name} closeModal={this.closeModal} update_field_list={this.update_field_list_from_modal} />
        </div>
        <div class="form-group" style={{justifyContent:'flex-start',display:'none'}}>
        <div class='select-form'  >
           <label htmlFor='subcategorie' >Sub Categorie</label>
                <Field as="select" id='subcategorie' name="subcategorie" class="custom-select" value={this.state.populated_form.subcategorie.name}  onChange={this.load_subcategorie_detail} >
                {this.state.subcategorie_list.map(subcategorie=>{
                  return(
                    <option value={subcategorie.name}>{subcategorie.name}</option>
                  )
                })}
                </Field>
           </div>
        </div>
        </div>
        </div>

        <div class="product-variant" style={{display:'none'}}>
        <div class="product-variant-header">
            <h3>Product variants</h3>
        </div>
          <div class="product-variant-image">
              { this.state.product_variant_form.img.img_url ?
                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <button type="button" class='delete-product-variant-preview-image' onClick={this.deleteProductVariantImagePreview}>x</button>
                <img src={this.state.product_variant_form.img.img_url.includes('media') ? HOST_URL+this.state.product_variant_form.img.img_url : this.state.product_variant_form.img.img_url} />
                </div>
                :<div class="product-variant-image-preview">
                      <i class="far fa-file-image"></i>
                </div>
              }

              <button type='button' style={{width:'100px'}} onClick={()=>{this.openModal('pv_img')}} class="btn btn-warning">choose</button>
              <ProductModalImage visible={this.state.modals['pv_img']} field='pv_img'  closeModal={this.closeModal} add_imgs={this.state.populated_form.additional_imgs} primary_img={this.state.populated_form.primary_img} set_pv_img={this.set_pv_img} drop_pv_img={this.drop_pv_img} pv_img={this.state.product_variant_form.img} />
          </div>
           <div class="product-variant-form">
             <div class="product-variant-form-size">
                  <label htmlFor="size">Size</label>
                  <input id="size" class="form-control" placeholder="size" onChange={(e)=>{this.handleProductVariantChange(e,"size")}} />
             </div>
             <div class="product-variant-form-price">
                  <label htmlFor="size">Price</label>
                  <input type='number' step="0.01" class="form-control" placeholder="price" onChange={(e)=>{this.handleProductVariantChange(e,"price")}} />
             </div>
             <div class="product-variant-form-qty">
                  <label htmlFor="size">Qty</label>
                  <input type='number' class="form-control" placeholder="qty" onChange={(e)=>{this.handleProductVariantChange(e,"qty")}} />
             </div>
             <div class="product-variant-form-color">
             <button type='button' class="btn" style={{backgroundColor:this.state.product_variant_form.color,color:'white'}} onClick={this.handleClick}>{this.state.displayColorPicker ? 'OK' : 'choose a color'}</button>
             { this.state.displayColorPicker ? <div style={{position:"absolute",zIndex:"2",right:"240px"}}>
               <SketchPicker color={this.state.product_variant_form.color} onChange={this.handle_color} />
             </div> : null }
             </div>
             <button type='button' class="btn btn-primary" onClick={this.addProductVariant}>+</button>
            </div>
            <div class="product-variant-table">
                  {this.state.populated_form.product_variant_list.length > 0 ?
                    <table class="table basic-admin-table ">
                      <thead >
                        <tr>
                          <th scope="col">image</th>
                          <th scope="col">size</th>
                          <th scope="col">color</th>
                          <th scope="col">price</th>
                          <th scope="col">qty</th>
                          <th scope="col">delete</th>
                        </tr>
                      </thead>
                      <tbody  >
                      { this.state.populated_form.product_variant_list.map((variant,idx)=>{
                        return(
                          <tr>
                           <td>{variant.img && variant.img.img_url ? <img src={variant.img.img_url.includes('media') ? HOST_URL+variant.img.img_url : variant.img.img_url }/> : <pre>{console.log('other : ',variant.img)}</pre>}

                           </td>
                            <td>{variant.size}</td>
                            <td><div style={{backgroundColor:variant.color,width:"30px",height:"15px"}}></div></td>
                            <td>{variant.price} dt</td>
                            <td>{variant.qty} {idx}</td>
                            <td><button type='button' class="order-btn" onClick={()=>{this.deleteProductVariant(idx)}}>x</button></td>
                          </tr>
                        )
                      })
                      }
                      </tbody>
                    </table>
                  :null}
            </div>
        </div>

        <center><button type='submit'  class='btn btn-primary' >Submit</button></center>
      </Form>
      )}
    </Formik>
  </div>
        </div>
    )
  }
}
export default withRouter(ProductForm) ;
