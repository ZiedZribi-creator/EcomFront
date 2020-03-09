import React from 'react' ;


class IngredientSidebar extends React.Compoenent{
    state = {
       categories : [
         {name:'hey babe',subcategories:[
           {name:'what you doing'}
         ]},
         {name:'hey babe',subcategories:[
           {name:'what you doing'}
         ]},
         {name:'hey babe',subcategories:[
           {name:'what you doing'}
         ]},
         {name:'hey babe',subcategories:[
           {name:'what you doing'}
         ]},
       ],
       ingredient_filter :{cat:null,subcat:null},
       ingredient_filter_name :{cat:'',subcat:''},
    }
    handleFilterChange = (cat_idx,subcat_idx)=>{
      let state = this.state ;
      let ingredient_filter = this.state.ingrendient_filter ;
      if (subcat_idx != null){
        if(ingredient_filter.cat == cat_idx && ingrendient_filter.subcat == subcat_idx){
          state.ingredient_filter = {cat:cat_idx,subcat:null}
          state.ingrendient_filter_name = {cat:this.state.categories[cat_idx].name,subcat:''}
        }else{
          state.ingredient_filter = {cat:cat_idx,subcat:subcat_idx}
          state.ingrendient_filter_name = {cat:this.state.categories[cat_idx].name,subcat:this.state.categories[cat_idx].subcategories[subcat_idx].name}
        }
      }else if (cat_idx != null){
        if(ingredient_filter.cat == cat_idx && ingrendient_filter.subcat == subcat_idx){
          state.ingredient_filter = {cat:null,subcat:null}
          state.ingrendient_filter_name = {cat:'',subcat:''}
        }else{
          state.ingredient_filter = {cat:cat_idx,subcat:null}
          state.ingrendient_filter_name = {cat:this.state.categories[cat_idx].name,subcat:''}
        }
      }
      this.setState({state:state})
      this.props.filterIngredient(state.ingredient_filter_name)
    }
    // if(product_filter.sec == sec_idx && product_filter.cat == cat_idx && product_filter.subcat == subcat_idx){
    //    console.log('hey babe');
    //    state.product_filter = {sec:sec_idx,cat:cat_idx,subcat:null}
    //    state.product_filter_name = {sec:sections[sec_idx].name,cat:sections[sec_idx].categories[cat_idx].name,subcat:''}
    // }
    // else{
    //   state.product_filter = {sec:sec_idx,cat:cat_idx,subcat:subcat_idx}
    //   state.product_filter_name = {sec:sections[sec_idx].name,cat:sections[sec_idx].categories[cat_idx].name,subcat:sections[sec_idx].categories[cat_idx].subcategories[subcat_idx].name}
    // }
    render(){
      return(
          <div class='ingredient-sidebar-categories'>
          <ul>
            {this.state.categories.map((cat,idx_cat)=>(
              <li>
                 <div class='categorie-header'>
                     <div class="checkbox">
                          <input type="checkbox" id={"checkbox_cat"+idx_cat} checked={this.state.ingredient_filter.cat== idx_cat ? true : false} onChange={()=>{this.handleFilterChange(idx_cat)}}   />
                          <label for={"checkbox_cat"+idx_cat} >{cat.name}</label>
                     </div>                    <div>

                        {!cat.sublistIsvisible ?
                          <i class="fas fa-angle-down" onClick={()=>{this.toogleSublist('categories',idx_cat)}} ></i>
                         : <i class="fas fa-angle-up" onClick={()=>{this.toogleSublist('categories',idx_cat)}} ></i>}
                     </div>
                </div>
                  <ul style={{display:sec.sublistIsvisible ? 'block':'none'}}>
                    {cat.categories.map((subcat,idx_subcat)=>(
                        <li>
                          <div class='subcat-header'>
                              <div class="checkbox">
                                 <input type="checkbox" id={"checkbox_subcat"+idx_cat+idx_subcat} checked={this.state.ingredient_filter.cat == idx_cat && this.state.ingredient_filter.subcat == idx_subcat ? true : false} onChange={()=>{this.handleFilterChange(idx_cat,idx_subcat)}} />
                                 <label for={"checkbox_subcat"+idx_cat+idx_subcat} >{subcat.name}</label>
                              </div>
                        ingredient
                              {!cat.sublistIsvisible ?
                                <i class="fas fa-angle-down" onClick={()=>{this.toogleSublist('categories',idx_sec,idx_cat)}} ></i>
                               : <i class="fas fa-angle-up" onClick={()=>{this.toogleSublist('categories',idx_sec,idx_cat)}} ></i> }
                            </div>
                          </li>
                      ))}
                 </ul>
              </li>
            )
          }
            </ul>

          </div>

}
export IngredientSidebar ;
