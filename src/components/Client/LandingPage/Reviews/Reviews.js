import React from 'react' ;
import './reviews-css.scss' ;
import HOST_URL from '../../../../config' ;

class Reviews extends React.Component {
  state = {
    reviews : ['simo babe what you doing what do you want bay girl what you doinghey babe what you doing what do you want bay girl what you doinghey babe what you doing what do you want bay girl what you doing',
              'abd babe what you doing what do you want bay girl what you doinghey babe what you doing what do you want bay girl what you doinghey babe what you doing what do you want bay girl what you doing',
              'pvd babe what you doing what do you want bay girl what you doinghey babe what you doing what do you want bay girl what you doinghey babe what you doing what do you want bay girl what you doing',]
              ,
    rv_idx : 0 ,
  }
  componentDidMount(){
    setInterval(()=>{
      let rv_idx = this.state.rv_idx
      if (rv_idx == (this.state.reviews.length-1)){
        rv_idx = -1  ;
      }
      this.setState({rv_idx : rv_idx + 1})
    },1500)
  }
  render(){
    let rv_idx = this.state.rv_idx
    return(
      <div class="reviews-container">
          <div class='reviews-title' ><h2><span>Les avis de nos clients</span></h2></div>
          <div class="reviews-slider-container">
            <img src={HOST_URL+'/media/BANNER.jpg'} />
                <ul>
                    {this.state.reviews.map((review,idx)=>{
                      return(
                        <li style={{opacity:idx == rv_idx ? '0.8' : '0'}}>
                        <p>{'"'+review+'"'}</p>
                        <h4>Patrick bet david</h4>
                        </li>
                      )
                    })}
                </ul>
          </div>

      </div>
    )
  }
}
export default Reviews ;
