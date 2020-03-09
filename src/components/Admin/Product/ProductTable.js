import React from "react" ;
import { Pagination } from 'rsuite';
import './producttable-css.scss' ;
import {Link} from "react-router-dom" ;
import HOST_URL from '../../../config' ;
import axios from 'axios' ;
import { Modal } from 'rsuite';
import {connect} from 'react-redux' ;
import DeleteProductModal from './DeleteProductModal' ;
class ProductTable extends React.Component {

  state ={

    product_filter : {
          page : 1 ,
          search  : "" ,
          section : "" ,
          categorie : "" ,
          subcategorie : "" ,
          product_range : {start :"",end:""} ,
          date_range : {start:null,end:null},

    },

    products :{
          count : null ,
          next : null ,
          previous : null ,
          results : []
    } ,
    formFilter:{
      search:'',
      section : '',
    },
    sections : [] ,
    modalIsVisible : false ,
    deletedProductIdx : null ,
    activePage: 1 ,
  }
  componentDidMount(){
    // this.load_products(null)
    axios.get(HOST_URL+'/api/section/').then(res=>{
      this.setState({sections:res.data})
    })
    axios.get(HOST_URL+'/api/product/').then(res=>{
      this.setState({products:res.data})
    })
  }
  // load_products = (product_filter)=>{
  //   if( product_filter == null ){
  //     product_filter = this.state.product_filter
  //   }
  //   // let url = this.get_query_url(this.state.product_filter)
  //
  //
  // }
  // handleSelect = (eventKey) =>{
  // let product_filter = this.state.product_filter
  // product_filter.page = eventKey ;
  // this.setState({
  //   product_filter: product_filter,
  // });
  // // this.load_products(product_filter) ;
  // }
  handleSelect = (activePage)=>{
    let query_url = this.generate_query_url(this.state.formFilter)
    let url = HOST_URL+'/api/product/'+query_url+'&page='+activePage ;
    axios.get(url).then(res=>{
      this.setState({products:res.data})
    })
    this.setState({activePage:activePage})
  }
  generate_query_url = (newFormFilter)=>{
      console.log(newFormFilter);
    let url = '?search='+newFormFilter.search+'&sections='+newFormFilter.section;
    return url ;
  }
  handleFilterChange = (e,field)=>{
    let newFormFilter = null ;
    if(field == 'section'){
      let section = e.target.value ;
      newFormFilter = {...this.state.formFilter,section:section} ;
      this.setState({formFilter:newFormFilter})
    }else{
      let value = e.target.value ;
      newFormFilter = {...this.state.formFilter,search:value} ;
      this.setState({formFilter:newFormFilter}) ;
    }
    let query_url = this.generate_query_url(newFormFilter) ;
    axios.get(HOST_URL+'/api/product/'+query_url).then(res=>{
      this.setState({products:res.data}) ;
    })

  }
  // get_query_url = (product_filter)=>{
  //   let query_url = HOST_URL+'/api/product/?'
  //   let fields = ['page','search','section','categorie','subcategorie']
  //   fields.map((field)=>{
  //     query_url += field+'='+product_filter[field]+'&' ;
  //     // if (idx != (fields.length()-1)){
  //     //   url+= '&'
  //     // }
  //   })
  //   query_url += 'pagination_start='+product_filter.product_range.start+'&'
  //   query_url += 'pagination_end='+product_filter.product_range.end+'&'
  //   query_url += 'start_date='+this.props.date_range.start+'&'
  //   query_url += 'end_date='+this.props.date_range.end
  //   return query_url
  // }
  // filter_products = (product_filter)=>{
  //   let query_url = this.get_query_url(product_filter)
  //   axios.get(query_url).then(res=>{
  //       this.setState({products:res.data})
  //   })
  // }
  // handle_product_filter_change = (e,field)=>{
  //   let value = e.target.value;
  //   let product_filter = this.state.product_filter ;
  //   product_filter[field] = value ;
  //   product_filter['page'] = 1 ;
  //   this.filter_products(product_filter) ;
  //   this.setState({product_filter:product_filter}) ;
  // }

  show_product = (slug)=>{
      this.props.history.push('/dz-admin/:slug/products/'+slug+'/edit/') ;
  }
  new_product = ()=>{
      this.props.history.push('/dz-admin/'+localStorage.getItem('slug')+'/products/new/') ;
  }
deleteProduct = ()=>{
  let products = this.state.products ;
  console.log(products.results,this.state.deletedProductIdx);
  let url = HOST_URL+'/api/product/'+products.results[this.state.deletedProductIdx].slug+'/'
  axios.delete(url).then(res=>{
    products.results.splice(this.state.deletedProductIdx,1) ;
    this.setState({products:products}) ;
    this.toogleModal()
  })

}
toogleModal = (idx)=>{
  if(idx != null){
    this.setState({deletedProductIdx:idx})
  }
  this.setState({modalIsVisible:!this.state.modalIsVisible})
}

  render(){
    console.log(this.state.deletedProductIdx);
    // console.log(this.props.date_range);
    // let new_date_range = this.props.date_range ;
    // let old_date_range = this.state.product_filter.date_range ;
    // if((new_date_range.start != old_date_range.end) || (new_date_range.end != old_date_range.end) ){
    //   let product_filter = this.state.product_filter ;
    //   console.log(new_date_range);
    //   product_filter.date_range = new_date_range ;
    //   this.setState({product_filter:product_filter}) ;
    //
    // }
    return(
        <div>
        <div class='new-product-btn'>
              <button onClick={this.new_product}    >New Product</button>
        </div>
        <div class='product-filter'>
            <div class="form-group search-filter">
                <label htmlFor='search'>Search</label>
                <input id='search' class="form-control" placeholder='search for your product here' onChange={(e)=>{this.handleFilterChange(e)}} value={this.state.formFilter.search} />
           </div>
            <div class="form-group section-filter">
                <label htmlFor="section">Section</label>
                <select class="form-control" id="section" onChange={(e)=>{this.handleFilterChange(e,'section')}} value={this.state.formFilter.section} >
                    <option value=''></option>
                    {this.state.sections.map(sec=>{
                      return(
                        <option value={sec.name}>{sec.name}</option>
                      )
                    })}
                </select>
            </div>
            <div class="form-group categorie-filter" style={{display:'none',width:'50%'}}>
                <label htmlFor="categorie">Categorie</label>
                <select class="form-control" id="Categorie" onChange={(e)=>{this.handle_product_filter_change(e,'categorie')}}>
                    <option value=''>_______</option>
                    <option>summer</option>
                    <option>winter</option>
                    <option>runing</option>
                </select>
            </div>
            <div class="form-group subcategorie-filter" style={{display:'none',width:'50%'}}>
                <label htmlFor="subcategorie">SubCategorie</label>
                <select class="form-control" id="subcategorie" onChange={(e)=>{this.handle_product_filter_change(e,'subcategorie')}}>
                    <option value=''>_______</option>
                    <option>t-shirt</option>
                    <option>short</option>
                    <option>hat</option>
                </select>
            </div>
        </div>
        <div class="product-table">
        <DeleteProductModal visible={this.state.modalIsVisible} close={this.toogleModal} deleteProduct={this.deleteProduct} />
            <table class="table basic-admin-table ">
              <thead >
                <tr>
                  <th scope="col">image</th>
                  <th scope="col">title</th>
                  <th scope="col">price</th>
                  <th scope="col">qty</th>
                  <th scope="col">last update</th>
                  <th scope="col">detail</th>
                  <th scope="col">delete</th>
                </tr>
              </thead>
              <tbody  >
              { this.state.products.results.map((product,idx)=>{
                return(
                  <tr>
                   <td>{product.primary_img ? <img src={HOST_URL+product.primary_img.img_url}/> : null}</td>
                    <td>{product.title}</td>
                    <td>{product.price} dt</td>
                    <td>{product.qty}</td>
                    <td>{product.last_update}</td>
                    <td><button class='order-btn' onClick={()=>{this.show_product(product.slug)}} ><i class="far fa-eye"></i></button></td>
                    <td><button class='delete-product-btn' style={{backgroundColor:'#34495E',color:'white',padding:'5px 10px',fontSize:'12px',borderRadius:'50%'}} onClick={()=>{this.toogleModal(idx)}}>X</button></td>
                  </tr>
                )
              })
              }
              </tbody>
            </table>
            {this.state.products.count && this.state.products.count != 1 ?
              <Pagination
                 prev
                 last
                 next
                 first
                 size="md"
                 pages={this.state.products.count/10}
                 activePage={this.state.activePage}
                 onSelect={this.handleSelect}
               /> : null }
            </div>
        </div>
    )
  }
}
const mapStateToProps = (state)=>{
    return {
      date_range  : state.date_range ,
    }
}
export default connect(mapStateToProps)(ProductTable) ;
