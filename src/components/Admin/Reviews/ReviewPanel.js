import React from 'react'
import ReviewDetail from './ReviewDetail' ;
import ReviewTable from './ReviewTable' ;
import './reviewpanel-css.scss' ;
import {Route,Switch} from "react-router-dom" ;

class ReviewPanel extends React.Component {
  render(){
    return(
      <div class="review-panel">
      <div class="basic-admin-dash basic-admin-container">
              <h2>Reviews</h2>
      </div>
      <div class="review-table-section">
          <Switch>
             <Route path="/dz-admin/:slug/reviews/" exact  component={ReviewTable} />
             <Route path="/dz-admin/:slug/reviews/:id/update/"  render={()=>(<ReviewDetail form_type='update' />)} />
             <Route path="/dz-admin/:slug/reviews/new/"  render={()=>(<ReviewDetail form_type='create' />)} />
          </Switch>
      </div>
      </div>
    )
  }
}
export default ReviewPanel ;
