import React from 'react'
import './productlist-css.scss'
import { Pagination } from 'rsuite';
import ProductModal from '../ProductModal/ProductModal' ;
import {connect} from 'react-redux' ;
import axios from 'axios' ;
import ProductSidebar from './ProductSidebar' ;
import HOST_URL from '../../../../config' ;
class ProductList extends React.Component {
  state = {
    products_res : {
        results : [

        ]
    },
    formFilter  : {
      search : '',
      sec:'',cat:'',subcat:'',
    },
    sections:[

    ],
    modalIsVisible : false ,
    modalSize : 'sm',
    activePage  : 1 ,
  }
  componentDidMount(){
    axios.get(HOST_URL+'/api/product/').then(res=>{
      this.setState({products_res:res.data}) ;
    })
    axios.get(HOST_URL+'/api/section/').then(res=>{
      this.setState({sections:res.data}) ;
    })
  }
  handlePaginationSelect = (activePage)=>{
    let query_url = this.generate_query_url(this.state.formFilter)
    let url = HOST_URL+'/api/product/'+query_url+'&page='+activePage ;
    axios.get(url).then(res=>{
      this.setState({products_res:res.data})
    })
    this.setState({activePage:activePage})
  }
  addToCart = (idx,type)=>{
    let cart_id = localStorage.getItem('cart_id') ;
    let product_slug = this.state.products_res.results[idx].slug ;
    let data = {product_slug:product_slug} ;
    if (!cart_id){
      axios.put(HOST_URL+'/api/cart/custom_creation/',data).then(res=>{
        localStorage.setItem('cart_id',res.data.cart_id)
        this.props.increase_cart_count()
        if(type != 'buy'){
          this.setState({modalIsVisible:true})
        }else {
          this.props.history.push('/cart/')
        }
      })
    }else{
      axios.put(HOST_URL+'/api/cart/'+cart_id+'/add_product/',data).then(res=>{
        this.props.increase_cart_count()
        if(type != 'buy'){
          this.setState({modalIsVisible:true})
        }else {
          this.props.history.push('/cart/')
        }
      })
    }
    // here an api call for adding a product to the cart
  }
  closeModal = ()=>{
    this.setState({modalIsVisible:!this.state.modalIsVisible})
  }
  generate_query_url = (newFormFilter)=>{
      console.log(newFormFilter);
    let url = '?search='+newFormFilter.search;
    let filters = ['sec','cat','subcat']
    filters.map(filter=>{
        url += '&'+filter+'='+newFormFilter[filter]
    })
    url += '&page='+this.state.activePage ;
    return url ;
  }
  handleFilterChange = (sec_cat_subcat,e)=>{
    let newFormFilter = null ;
    if(sec_cat_subcat != null){
      newFormFilter = {...this.state.formFilter,...sec_cat_subcat} ;
      this.setState({formFilter:newFormFilter})
    }else{
      let value = e.target.value ;
      newFormFilter = {...this.state.formFilter,search:value} ;
      this.setState({formFilter:newFormFilter}) ;
    }
    let query_url = this.generate_query_url(newFormFilter) ;
    axios.get(HOST_URL+'/api/product/'+query_url).then(res=>{
      console.log(res.data);
      this.setState({products_res:res.data}) ;
    })

  }

// filterProduct  = (product_filter)=>{
//   let url = HOST_URL+'/api/product/?'
//   let filters = ['sec','cat','subcat']
//   filters.map(filter=>{
//     url += filter+'='+product_filter[filter]
//     if(filter != 'subcategorie__name'){
//           url += '&'
//     }
//   })
//   axios.get(url).then(res=>{
//
//   })
// }
  render(){
    return(
      <div class="product-list">
             <div class="filter-panel">
                  <ProductSidebar filterProduct ={this.handleFilterChange}/>
             </div>
             <div class="product-list-container">

             <ProductModal size={this.state.modalSize} visible={this.state.modalIsVisible}  close={this.closeModal} />

             <div class='product-search'>
             <input  onChange={(e)=>{this.handleFilterChange(null,e)}} placeholder='cherche votre produit' value={this.state.formFilter.search} />
                  <select class="form-control" >
                        {this.state.sections.map((section)=>{
                          return(
                            <option>{section.name}</option>
                          )
                        })}
                  </select>
             </div>
             <div class="all-products" >
                        {this.state.products_res.results.map((product,idx)=>(
                          <div class="item">
                             <div class="item-image">
                                <img src={HOST_URL+product.primary_img.img_url}/>
                             </div>
                             <div class="item-description">
                                 <p class='title'>{product.title}</p>
                                 <p class='price'>{product.price}DT</p>
                                 <button class="buy" onClick={()=>{this.addToCart(idx,'buy')}}>acheter</button>
                                 <button class="cart" onClick={()=>{this.addToCart(idx)}}>ajouter au panier</button>
                             </div>
                          </div>
                        ))}
              </div>
            <div class='product-pagination'>
            {this.state.products_res.count >= 1 ?
              <Pagination
                 prev
                 last
                 next
                 first
                 size="md"
                 pages={this.state.products_res.count / 1}
                 activePage={this.state.activePage}
                 onSelect={this.handlePaginationSelect}
               /> : null }
            </div>
             </div>

      </div>
    )
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    'increase_cart_count': (nb)=>dispatch({type:'increase_cart_count'})
  }
}
export default connect(null,mapDispatchToProps)(ProductList) ;
// <h4>Categories</h4>
// {this.state.formFilter.sections.map((section,idx)=>{
//   return(
//     <div class="checkbox">
//         <input type="checkbox" id={"checkbox_"+idx} checked={section.checked} onChange={()=>{this.handleFilterChange(idx)}} />
//         <label for={"checkbox_"+idx}>{section.name} ({section.count})</label>
//    </div>
//   )
// })}
