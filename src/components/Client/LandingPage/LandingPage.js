import React from 'react' ;
// import Navbar from './Navbar/Navbar' ;
import Carousel from './Carousel/Carousel' ;
import ProductSlider from './ProductSlider/ProductSlider' ;
import Reviews from './Reviews/Reviews' ;
import Partners from './Partners/Partners' ;
// import Contact from './Contact/Contact' ;
class LandingPage extends React.Component {
  render(){
    return(
      <div>

        <Carousel />
        <ProductSlider/>
        <Reviews/>
        <Partners/>

      </div>
    )
  }
}
export default LandingPage ;
