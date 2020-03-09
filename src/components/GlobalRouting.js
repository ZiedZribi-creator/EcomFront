import React from 'react' ;
import AdminRouting from './Admin/AdminRouting';
import ClientRouting from './Client/ClientRouting' ;
import {withRouter,Route,Switch} from 'react-router-dom'
import {connect} from 'react-redux' ;
class GlobalRouting extends React.Component {
  render(){
    // if (localStorage.getItem('is_admin') && localStorage.getItem('token') && this.props.location.pathname == '/'){
    //   this.props.history.push('/dz-admin/ll/')
    // }
    let token = localStorage.getItem('token')
    let is_admin = localStorage.getItem('is_admin')
    if ((token && is_admin) && this.props.admin_authenticated == false){
      this.props.admin_login()
    }
    return(
        <div style={{height:"100%",fontSize:'62.5%'}}>
        <Switch>

           <Route path='/dz-admin/' component={AdminRouting}  />
           <Route path='/'  component={ClientRouting}  />
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
const mapDispatchToProps = (dispatch)=>{
  return {
    'admin_login' : () => dispatch({type:'admin_login'})  ,
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(GlobalRouting)) ;
