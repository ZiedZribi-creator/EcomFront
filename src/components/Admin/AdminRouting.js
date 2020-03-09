import React from 'react' ;
import Login from './Authentication/Login';
import AdminPanel from './AdminPanel/AdminPanel'
import {Route,Switch} from 'react-router-dom'
import {connect} from 'react-redux' ;


class AdminRouting extends React.Component {
  render(){
    let pathname = this.props.location.pathname
    let token = localStorage.getItem('token')
    let is_admin = localStorage.getItem('is_admin')
    let slug = localStorage.getItem('slug')
    if (pathname== '/dz-admin/'){
      if ((token && is_admin) || this.props.admin_authenticated){
        this.props.history.push('/dz-admin/'+slug+'/')
      }else {
        this.props.history.push('/dz-admin/login/')
      }
    }
    // if (localStorage.getItem('token') && this.props.location.pathname == '/dz-admin/' ) {
    //   this.props.history.push('/dz-admin/'+localStorage.getItem('slug')+'/')
    // }
    //
    // if (localStorage.getItem('token') && this.props.admin_authenticated == false ) {
    //    this.props.admin_login()
    // }

    return(
        <div >
        <Switch>
          <Route path='/dz-admin/login' exact component={Login}  />
          <Route path='/dz-admin/:slug/'  component={AdminPanel}  />
        </Switch>
        </div>
    )
  }
}
const mapStateToProps = (state)=>{
  return {
    admin_authenticated : state.admin_authenticated  ,
  }
}
// const mapDispatchToProps = (dispatch)=>{
//   return {
//     'admin_login' : () => dispatch({type:'admin_login'})  ,
//   }
// }
export default connect(mapStateToProps,null)(AdminRouting) ;
