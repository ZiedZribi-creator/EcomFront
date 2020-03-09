import React from 'react' ;
import Modal from 'react-awesome-modal';
import HOST_URL from '../../../config' ;
import axios from 'axios' ;

class ProductModalImage extends React.Component {
  state = {
    images : [],
    selected_img_file : null ,
  }
  load_images = ()=>{
    let images = []
    if(this.props.primary_img && this.props.primary_img.img_url && this.state.images.length != (this.props.add_imgs.length + 1)){
      images = [this.props.primary_img,...this.props.add_imgs]
      for(let i=0 ;i<images.length ; i++){
        if(images[i].img_file == this.state.selected_img_file){
          images[i]['status'] = true
        }else{
          images[i]['status'] = false
        }
      }
      this.setState({images:images})
    }else if((!this.props.primary_img || !this.props.primary_img.img_url) && this.state.images.length > 0){
      this.setState({images:images})
    }

  }
  handleChange = (e,idx)=>{
    let images = this.state.images ;
    let selected_img_file = null ;
    for(let i=0 ;i < images.length ;i++){
      if(i == idx ){
        images[idx].status = images[idx].status ? false : true
      }else{
        images[i].status = false
      }
    }
    if(images[idx].status){
      this.props.set_pv_img(images[idx]) ;
      selected_img_file = images[idx].img_file ;
    }else{
      this.props.drop_pv_img() ;
      selected_img_file = null ;
    }
    let state = this.state
    state.images = images ;
    state.selected_img_file = selected_img_file ;
    this.setState({state:state})
    // checkboxes.map((checkbox,cb_idx)=>{
    //     if(cb_idx == idx){
    //       if(checkboxes[cb_idx].status){  // for toogling the check box
    //         checkboxes[cb_idx].status = false ;
    //         this.props.drop_pv_img() ;
    //       }else{
    //         checkboxes[cb_idx].status = true ;
    //       }
    //     }
    //     else{
    //       checkboxes[cb_idx].status = false ;
    //     }
    // })
    //
    // if(checked){
    //   this.props.set_pv_img(idx)
    // }else{
    //   this.props.drop_pv_img()
    // }
    // this.setState({checkboxes:checkboxes})
  }
  clear_status = ()=>{
    let state = this.state
    for(let i=0 ; i<state.images.length ; i++){
      state.images[i].status = false
    }
    state.selected_img_file = null
    this.setState({state:state})
  }
  render(){
    // if(this.props.primary_img.img_url && this.props.add_imgs.length + 1 != this.state.checkboxes.length  ){
    //   console.log('done done');
    //   this.load_checkboxes((this.props.add_imgs.length + 1) - this.state.checkboxes.length)
    // }
    // console.log("here : ",this.state.checkboxes.length);
    if(this.props.pv_img.img_file != this.state.selected_img_file && this.state.selected_img_file!=null ){
      this.clear_status()
    }
    this.load_images()
    return(
      <Modal
      style={{width:'900px',height:'100px'}}
      width="500"
      height="80%"
      visible={this.props.visible}
      effect="fadeInUp"
      onClickAway={() => this.props.closeModal(this.props.field)}
      >
     <div style={{display:'flex',flexWrap:'wrap',padding:'20px',justifyContent:'center'}}>
        {this.state.images.map((img,idx)=>{
          return(
              <div style={{display:'flex',flexDirection:'column',margin:'10px'}}>
                 <input type="checkbox" checked={img.status} onChange={(e)=>{this.handleChange(e,idx)}} />
                 <img src={img.img_url.includes('media') ? HOST_URL+img.img_url:img.img_url} />
             </div>
          )
        })
       }
      </div>
      </Modal>
    )
  }
}
export default ProductModalImage ;
// {this.props.primary_img.img_url ?
//   <div style={{display:'flex',flexWrap:'wrap',padding:'20px',justifyContent:'center'}}>
//         <div style={{display:'flex',flexDirection:'column',margin:'10px'}}>
//           <input type="checkbox" checked={this.props.primary_img.hasOwnProperty('status') ? this.props.primary_img.status : false } onChange={(e)=>{this.handleChange(e,0)}} />
//           <img src={this.props.primary_img.img_url} />
//       </div>
// <div style={{display:'flex',flexWrap:'wrap',padding:'20px',justifyContent:'center'}}>
//     {this.props.primary_img.img_url ?
//       <div style={{display:'flex',flexDirection:'column',margin:'10px'}}>
//         <input type="checkbox" checked={this.state.checkboxes.length > 0 ? this.state.checkboxes[0].status : false} onChange={(e)=>{this.handleChange(e,0)}} />
//         <img src={this.props.primary_img.img_url} />
//     </div> : null}
//   {this.state.checkboxes.slice(1,this.state.checkboxes.length).map((checkbox,idx)=>{
//     return(
//       this.props.add_imgs[idx] ?
//         <div style={{display:'flex',flexDirection:'column',margin:'10px'}}>
//           <input type="checkbox" checked={checkbox.status} onChange={(e)=>{this.handleChange(e,idx+1)}} />
//           <img src={this.props.add_imgs[idx].img_url} />
//       </div>:<h1>aaaaaa</h1>
//     )
//   })
//  }
// </div>
