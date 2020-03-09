import React from 'react' ;
import HOST_URL from '../../../config' ;
import './ingrendientlist-css.scss' ;
import IngredientSidebar from './IngredientSidebar' ;
class IngredientList extends React.Component{
  state = {
    ingrendient_features : [
      {img:'huileminerales.png',title:'hey babe'},
      {img:'sansderiveepatrole.png',title:'hey babe'},
      {img:'sansparaben.png',title:'hey babe'},
      {img:'sanspht.png',title:'hey babe'},
    ],
    ingrendient_list : [
      {img:'k',title:''}
    ],
    ingredient_cat_list :[
      {name:'huile vegetale',isSubcatVisible:true,subcat_list:[
                        {name:"huile d'argan"},
                      ]},
    {name:'huile essentielle',isSubcatVisible:true,subcat_list:[
                      {name:'H E tea tree'},
                      {name:'H E de romarin'},
                      {name:'H E de lavande'},
                      {name:'H E de geranium'},
                    ]},
    {name:'extrait de plante',isSubcatVisible:true,subcat_list:[
                      {name:'Extrait dhibiscus'},
                      {name:'Extrait dhibiscus'},
                      {name:'Extrait dhibiscus'},
                      {name:'Extrait dhibiscus'},
                    ]},
    ]

  }
  filterIngredient =(cat_subcat)=>{
      console.log(cat_subcat);
  }
  render(){
    return(
      <div class='ingredient-container'>
          <div class="ingredient-landing-page-section">
                <img src={HOST_URL+'/media/cosmet.jpg'}/>
                <h5>Ce que nous trouverez pas dans nos produit</h5>
                <div class="ingredient-features">
                    <p>hey babe what you doing what you want babe girl xhat you doing hey babe what you hey babe what you doing what you want babe girl xhat you doing hey babe what you hey babe what you doing what you want babe girl xhat you doing hey babe what you doing what you want babe girl xhat you doing hey babe what you doing what you want babe girl xhat you doing </p>
                    <ul>
                      {this.state.ingrendient_features.map(feature=>{
                        return(
                          <li><img src={HOST_URL+'/media/'+feature.img} /><p>{feature.title}</p></li>
                        )
                      })
                      }
                    </ul>
                </div>
          </div>
          <div class="ingrendient-list-section">
                <div class="ingredient-sidebar">
                    <IngredientSidebar filterIngrendient={this.filterIngredient} />
                </div>
                <div class="ingrendient-list">
                  <h5>Les huile vegetales</h5>

                </div>
          </div>
      </div>
    )
  }
}
export default IngredientList ;
