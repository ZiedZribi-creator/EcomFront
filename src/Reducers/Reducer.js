const initialState = {
      admin_authenticated : false ,
      date_range : {start:null,end:null},
      cart_count : 0 ,
}

const Reducer = (state=initialState,action)=>{
  let newState = Object.assign({},state) ;
  switch (action.type) {
    case 'set_cart_count':
      newState.cart_count = action.cart_count ;
      return newState ;
      break;
      case 'decrease_cart_count':
        newState.cart_count -= action.value ;
        return newState ;
        break;
    case 'increase_cart_count':
      if(action.value != null){
        newState.cart_count += action.value ;
      }else {
        newState.cart_count += 1 ;
      }
      return newState ;
      break;
    case 'admin_login':
      newState.admin_authenticated = true
      return newState ;
      break;
    case 'admin_logout':
      newState.admin_authenticated = false
      localStorage.clear()
      return newState ;
      break;
    case 'set_date_range':
      newState.date_range.start = action.date_range[0] ;
      newState.date_range.end = action.date_range[1] ;
      return newState ;
      break;
    default:
    return newState ;
  }
}

export default Reducer
