import React from 'react' ;
import './navbar-css.scss' ;
import { DateRangePicker } from 'rsuite';
import {connect} from 'react-redux' ;
import {withRouter} from 'react-router-dom' ;
class Navbar extends React.Component {
  state = {
    dropdowns :{
      'account' : false ,
      'notification' : false ,
      'message':false,

}}

 componentWillMount(){
     document.addEventListener('mousedown',this.handleClick,false) ;
 }
 componentWillUnmount(){
     document.removeEventListener('mousedown',this.handleClick,false)
 }
 handleClick = (e,dropdownElement,dropdownTrigger)=>{
   let dropdowns = [
        {
          Element : this.accountDropdown,
          Trigger : this.accountTrigger,
        },
        {
          Element : this.messageDropdown,
          Trigger : this.messageTrigger,
        },
        {
          Element : this.notificationDropdown,
          Trigger : this.notificationTrigger,
        }
   ]
   dropdowns.map(dropdown=>{
     let dropdown_state = dropdown.Element.style.display
     if((dropdown.Element == e.target || dropdown.Element.contains(e.target)) && (!dropdown_state || dropdown_state == 'block')){
       dropdown.Element.style.display = 'block' ;
       return ;
     }else if(dropdown.Trigger == e.target || dropdown.Trigger.contains(e.target)) {
       if(!dropdown_state || dropdown_state == 'none'){
         dropdown.Element.style.display = 'block' ;
       }else{
         dropdown.Element.style.display = 'none' ;
       }
       return ;
     }else{
       dropdown.Element.style.display = 'none' ;
     }

   })
   // let dropdown_state = this.account_dropdown.style.display
   // if((this.account_dropdown == e.target || this.account_dropdown.contains(e.target)) && (!dropdown_state || dropdown_state == 'block')){
   //   this.account_dropdown.styldropdown.Triggerock' ;
   //   return ;
   // }else if(this.account_trigger == e.target || this.account_trigger.contains(e.target)) {
   //   if(!dropdown_state || dropdown_state == 'none'){
   //      this.account_dropdown.style.display = 'block' ;
   //   }else{
   //     this.account_dropdown.style.display = 'none' ;
   //   }
   //   return ;
   // }
   // this.account_dropdown.style.display = 'none' ;
 }

  // showDropdown = (e,dropdown)=>{
  //
  // if(!dropdown.style.display || dropdown.style.display == 'block' ){
  //   dropdown.style.display = 'none' ;
  // }else if(dropdown.style.display == 'none'){
  //   dropdown.style.display = 'block' ;
  // }
  // }
  admin_logout = ()=>{
    this.props.admin_logout()
    this.props.history.push('/dz-admin/login')
  }
  render(){
    return(
      <div class='admin-panel-nav'>
      <nav>
      <ul class="date-range-picker">
          <li><DateRangePicker onOk={(dates)=>{this.props.set_date_range(dates)}}/></li>
      </ul>
           <ul class='navigation'>
              <li>
                <div ref={(elemt)=>this.messageTrigger=elemt} style={{display:'flex',alignItems:'center',height:'100%'}}>
                 <i class="material-icons" >messenger</i>
                </div>

                <ul class='message-dropdown' ref={(elemt)=>this.messageDropdown=elemt} >
                    <div class="arrow"></div>
                    <li>account</li>
                    <li>settings</li>
                    <li>logout</li>
                  </ul>
              </li>

              <li>
              <div ref={(elemt=>this.notificationTrigger=elemt)} style={{display:'flex',alignItems:'center',height:'100%'}}>
                    <i class="fas fa-bell"></i>
              </div>
              <ul class='notification-dropdown' ref={(elemt=>this.notificationDropdown=elemt)} >
                  <div class="arrow"></div>
                  <li>account</li>
                  <li>settings</li>
                  <li>logout</li>
              </ul>
              </li>
                <li>
                <div ref={el=>this.accountTrigger=el} style={{display:'flex',alignItems:'center',width:'190px',height:'100%'}} >
                    <img src="https://abdallahchamakh.com/media/me_robot.jpg"/>
                    <p>abdallah chamakh </p><i class="fas fa-angle-down"></i>
                </div>
                <ul class='account-dropdown' ref={(elemt)=>this.accountDropdown=elemt} >
                    <div class="arrow"></div>

                    <li>account</li>
                    <li>settings</li>
                    <li onClick={this.admin_logout}>logout</li>



                </ul>
                </li>

           </ul>

      </nav>

      </div>
    )
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    'set_date_range':(date_range)=>dispatch({type:'set_date_range',date_range:date_range}) ,
    'admin_logout' : ()=>dispatch({type:'admin_logout'}),
  }
}
export default withRouter(connect(null,mapDispatchToProps)(Navbar)) ;
// <ul class='dropdown'>
//     <li>reset image</li>
//     <li>reset username</li>
//     <li>reset password</li>
//     <li>billing</li>
// </ul>
