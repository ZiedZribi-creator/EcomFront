import React from 'react' ;
import axios from 'axios' ;
import './productsidebar-css.scss' ;

class ProductSidebar extends React.Component {
  state = {
    sections : [
      {name:'soins capillaire',checked:false,sublistIsvisible:true,categories :[
          {name:'cheveux secs/abimés',sublistIsvisible:false,checked:false,subcategories : [ {name:'shampoing',checked:false},{name:'Apres shampoing',checked:false},{name:'m avant shampoing',checked:false}]},
          {name:'cheveux gras peticule',sublistIsvisible:false,checked:false,subcategories : [ {name:'shampoing',checked:false},{name:'Apres shampoing',checked:false},{name:'m avant shampoing',checked:false}]},
          {name:'cheveux fragile cassant',sublistIsvisible:false,checked:false,subcategories : [ {name:'shampoing',checked:false},{name:'Apres shampoing',checked:false},{name:'m avant shampoing',checked:false}]},
      ]},
      {name:'soins de vasigae',checked:true,sublistIsvisible:true,categories :[
          {name:'cheveux secs/abimés',sublistIsvisible:false,checked:false,subcategories : [ {name:'shampoing',checked:false},{name:'Apres shampoing',checked:false},{name:'m avant shampoing',checked:false}]},
          {name:'cheveux secs/abimés',sublistIsvisible:false,checked:false,subcategories : [ {name:'shampoing',checked:false},{name:'Apres shampoing',checked:false},{name:'m avant shampoing',checked:false}]},
          {name:'cheveux secs/abimés',sublistIsvisible:false,checked:false,subcategories : [ {name:'shampoing',checked:false},{name:'Apres shampoing',checked:false},{name:'m avant shampoing',checked:false}]},
      ]},
    ],
    product_filter : {
      sec : null ,cat:null,subcat:null,
    },
    product_filter_name : {
      sec:'',cat:'',subcat:''
    },
    informarions :  [
      'Ingredient',
      'Livraison',
    ]


  }
  handleFilterChange = (sec_idx,cat_idx,subcat_idx)=>{
    let product_filter = this.state.product_filter
    let state = this.state ;
    let sections = this.state.sections
    if(subcat_idx != null){
        if(product_filter.sec == sec_idx && product_filter.cat == cat_idx && product_filter.subcat == subcat_idx){
           console.log('hey babe');
           state.product_filter = {sec:sec_idx,cat:cat_idx,subcat:null}
           state.product_filter_name = {sec:sections[sec_idx].name,cat:sections[sec_idx].categories[cat_idx].name,subcat:''}
        }
        else{
          state.product_filter = {sec:sec_idx,cat:cat_idx,subcat:subcat_idx}
          state.product_filter_name = {sec:sections[sec_idx].name,cat:sections[sec_idx].categories[cat_idx].name,subcat:sections[sec_idx].categories[cat_idx].subcategories[subcat_idx].name}
        }
    }else if(cat_idx != null){
      if(product_filter.sec == sec_idx && product_filter.cat == cat_idx){
         state.product_filter = {sec:sec_idx,cat:null,subcat:null}
         state.product_filter_name = {sec:sections[sec_idx].name,cat:'',subcat:''}
      }
      else{
        state.product_filter = {sec:sec_idx,cat:cat_idx,subcat:null}
        state.product_filter_name = {sec:sections[sec_idx].name,cat:sections[sec_idx].categories[cat_idx].name,subcat:''}
      }
    }else if(sec_idx != null){
      if(product_filter.sec == sec_idx && product_filter.cat == cat_idx){
        state.product_filter = {sec:null,cat:null,subcat:null}
        state.product_filter_name = {sec:'',cat:'',subcat:''}
      }
      else{
        state.product_filter = {sec:sec_idx,cat:null,subcat:null}
        state.product_filter_name = {sec:sections[sec_idx].name,cat:'',subcat:''}
      }
    }
    this.setState({state:state})
    this.props.filterProduct(state.product_filter_name)
  }
  toogleSublist = (field,sec_idx,cat_idx)=>{
    let sections = this.state.sections ;
    if (field == 'sections'){
      sections[sec_idx].sublistIsvisible = !sections[sec_idx].sublistIsvisible ;
    }else if(field == 'categories'){
      sections[sec_idx].categories[cat_idx].sublistIsvisible = !sections[sec_idx].categories[cat_idx].sublistIsvisible
    }
    this.setState({sections:sections})
  }
  // handleFilterChange = (sec_idx,cat_idx,subcat_idx)=>{
  //   console.log('sec_idx : ',sec_idx,'cat_idx : ',cat_idx,'subcat_idx : ',subcat_idx);
  //   let sections = this.state.sections  ;
  //   if(subcat_idx != null){
  //     console.log('subcat');
  //     let subcategories = sections[sec_idx].categories[cat_idx].subcategories
  //     for(let i=0;i < subcategories.length ;i++){
  //       if(i == subcat_idx){
  //         sections[sec_idx].categories[cat_idx].subcategories[subcat_idx].checked = !sections[sec_idx].categories[cat_idx].subcategories[subcat_idx].checked
  //       }else {
  //         sections[sec_idx].categories[cat_idx].subcategories[i].checked = false
  //       }
  //     }
  //   }else if(cat_idx != null){
  //     console.log('cat');
  //     let categories = sections[sec_idx].categories
  //     for(let i=0 ; i<categories.length ; i++){
  //       if(i == cat_idx){
  //         sections[sec_idx].categories[cat_idx].checked = !sections[sec_idx].categories[cat_idx].checked
  //       }else {
  //         sections[sec_idx].categories[i].checked = false
  //       }
  //     }
  //   }else {
  //       console.log('section');
  //     for(let i = 0 ;i<sections.length ;i++){
  //       if(i == sec_idx){
  //           sections[sec_idx].checked = !sections[sec_idx].checked
  //       }else{
  //           sections[i].checked = false
  //       }
  //     }
  //   }
  //   this.setState({sections:sections})
  // }
  render(){
    console.log(this.state.product_filter_name);
    return(
        <div class='product-sidebar'>
         <div class="product-sidebar-categories">
            <div class='header'><h5>Categorie</h5></div>
            <ul>
              {this.state.sections.map((sec,idx_sec)=>(
                <li>
                   <div class='section-header'>
                       <div class="checkbox">
                            <input type="checkbox" id={"checkbox_sec"+idx_sec} checked={this.state.product_filter.sec == idx_sec ? true : false} onChange={()=>{this.handleFilterChange(idx_sec)}}   />
                            <label for={"checkbox_sec"+idx_sec} >{sec.name}</label>
                       </div>
                       <div>

                          {!sec.sublistIsvisible ?
                            <i class="fas fa-angle-down" onClick={()=>{this.toogleSublist('sections',idx_sec)}} ></i>
                           : <i class="fas fa-angle-up" onClick={()=>{this.toogleSublist('sections',idx_sec)}} ></i>}
                       </div>
                  </div>
                  <ul style={{display:sec.sublistIsvisible ? 'block':'none'}}>
                      {sec.categories.map((cat,idx_cat)=>(
                          <li>
                            <div class='cat-header'>
                                <div class="checkbox">
                                   <input type="checkbox" id={"checkbox_cat"+idx_sec+idx_cat} checked={this.state.product_filter.sec == idx_sec && this.state.product_filter.cat == idx_cat ? true : false} onChange={()=>{this.handleFilterChange(idx_sec,idx_cat)}} />
                                   <label for={"checkbox_cat"+idx_sec+idx_cat} >{cat.name}</label>
                                </div>
                              <div>
                                {!cat.sublistIsvisible ?
                                  <i class="fas fa-angle-down" onClick={()=>{this.toogleSublist('categories',idx_sec,idx_cat)}} ></i>
                                 : <i class="fas fa-angle-up" onClick={()=>{this.toogleSublist('categories',idx_sec,idx_cat)}} ></i> }
                              </div>
                            </div>
                            <ul style={{display:cat.sublistIsvisible ? 'block':'none'}}>
                                {cat.subcategories.map((subcat,idx_subcat)=>(
                                  <li>
                                    <div class="checkbox">
                                      <input type="checkbox" id={"checkbox_subcat"+idx_sec+idx_cat+idx_subcat} checked={this.state.product_filter.sec == idx_sec && this.state.product_filter.cat == idx_cat && this.state.product_filter.subcat == idx_subcat ? true : false} onChange={()=>{this.handleFilterChange(idx_sec,idx_cat,idx_subcat)}} />
                                      <label for={"checkbox_subcat"+idx_sec+idx_cat+idx_subcat} >{subcat.name}</label>
                                    </div>
                                  </li>
                                ))}
                            </ul>
                          </li>
                        ))
                        }
                    </ul>
              </li>
            ))
              }
            </ul>
        </div>
        <div class="product-sidebar-informations">
           <div class='information-header'><h5>Infomation</h5></div>
           <ul>
             {this.state.informarions.map(info=>{
                  return(
                    <li>{info}</li>
                  )
             })
             }
           </ul>
       </div>
        </div>
    )
  }
}
export default ProductSidebar ;
