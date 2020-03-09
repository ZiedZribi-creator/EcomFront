import React from 'react' ;
import './carousel-css.scss' ;

class Carousel extends React.Component {
   state = {
     images : [
       'https://scontent.ftun2-1.fna.fbcdn.net/v/t1.15752-9/82929889_203373240701483_7608580684222824448_n.jpg?_nc_cat=104&_nc_ohc=8Tgy_rsvSgMAX_eaIq4&_nc_ht=scontent.ftun2-1.fna&oh=8cf320da7213eac011e615319a6b5c84&oe=5EBEFF00',
       'https://mawlety.com/modules/homeslider/images/87c04adc9358936a289661024741d3c95976121f_arganslide4.jpg',
       'https://mawlety.com/modules/homeslider/images/f3406cfd35e859145e1e7b2e3cfb89413f0d14f5_test-6.jpg',
     ],
     image_idx : 0,
     image_set : false ,
   }
   // nextSlide = ()=>{
   //    let slidesTrack  = document.querySelector('.slides-track')
   //    let currentSlide = document.querySelector('.current')
   //    let nextSlide = currentSlide.nextElementSibling
   //    let img_idx = this.state.image_idx ;
   //    if(img_idx == (this.state.images.length-1)){
   //      img_idx = -1 ;
   //    }
   //    if(!nextSlide){
   //      console.log('img_idx ',img_idx);
   //      let style = (img_idx+1)*100+'%'
   //      slidesTrack.innerHTML += '<li style=left:'+style+' ><img src='+this.state.images[img_idx+1]+' /></li>'
   //      let allSlides = Array.from(slidesTrack.children)
   //      nextSlide = allSlides[allSlides.length-1]
   //      console.log(nextSlide);
   //    }
   //    let amountToMove = nextSlide.style.left
   //    console.log(amountToMove);
   //    currentSlide.style.transform = `translateX(-${amountToMove})` ;
   //    nextSlide.style.transform = `translateX(-${amountToMove})` ;
   //    nextSlide.classList.add('current') ;
   //    currentSlide.classList.remove('current') ;
   //    this.setState({image_idx:img_idx+1})
   // }
componentDidMount(){
  setInterval(()=>{
    this.moveSlide('next') ;
  }, 2000);
}
moveSlide = (action)=>{
  let img_idx = this.state.image_idx
  if (img_idx == 2 && action == 'next'){
    img_idx = -1
  }else if (img_idx == 0 && action == 'back'){
    img_idx = 3
  }
  if(action == 'next'){
    this.setState({image_idx : img_idx + 1})
  }else if(action == 'back') {
    this.setState({image_idx : img_idx - 1})
  }
}
  render(){

    console.log('update');
    let img_idx = this.state.image_idx ;
    return(
        <div class="carousel-container">
      <div class="slides"  >
          <div ref={el=>this.slide=el}>
          <ul class='slides-track'>
            {this.state.images.map((img,idx)=>{
                return(

                  <li style={{opacity:img_idx == idx ?'1' : '0'}} class={idx == 0 ?"current":''}><img  src={this.state.images[idx]} /></li>

                )
            })
            }
          </ul>
          </div>
                <div class="slide-control">
                    <button onClick={()=>{this.moveSlide('back')}}>previous</button>
                    <button onClick={()=>{this.moveSlide('next')}}>next</button>
                  </div>

            </div>

        </div>
    )
  }
}
export default Carousel ;
