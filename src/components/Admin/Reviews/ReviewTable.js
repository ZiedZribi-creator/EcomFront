import React from 'react' ;
import axios from 'axios' ;
import HOST_URL from '../../../config' ;
import './reviewtable-css.scss' ;
import { Pagination } from 'rsuite';
import DeleteReviewModal from './DeleteReviewModal' ;

class ReviewTable extends React.Component{
  state = {
    reviews :{
      results : [],
    },
    formFilter : {
      client_name:'',
      content:'',
    },
    isModalVisible : false ,
    deletedReviewIdx : null ,
  }
  componentDidMount(){
    let url = HOST_URL+'/api/review/'
    axios.get(url).then(res=>{
      this.setState({reviews:res.data})
    })
  }
generate_filter_query = (formFilter)=>{
  let fields = ['client_name','content']
  let url = '?'+'client_name='+formFilter['client_name']+'&content='+formFilter['content']
  return url
}
handle_review_filter_change = (e,field)=>{
  let value = e.target.value
  let formFilter = this.state.formFilter
  formFilter[field] = value
  this.setState({formFilter:formFilter})
  let url = HOST_URL+'/api/review/'+this.generate_filter_query(formFilter)
  axios.get(url).then(res=>{
    console.log(res.data);
    this.setState({reviews:res.data})
  })
}
show_review = (id)=>{
  this.props.history.push('/dz-admin/'+localStorage.getItem('slug')+'/reviews/'+id+'/update/')
}
newReview = ()=>{
  this.props.history.push('/dz-admin/'+localStorage.getItem('slug')+'/reviews/new/')
}
toogleModal = (idx)=>{
  this.setState({isModalVisible:!this.state.isModalVisible})
  if(!this.state.isModalVisible == true){
    this.setState({deletedReviewIdx:idx})
  }
}
deleteReview = ()=>{
  let reviews = this.state.reviews
  let review_idx = this.state.deletedReviewIdx
  let review_id = reviews[review_idx].id
  let url = HOST_URL+'/api/review/'+review_id+'/'
  axios.delete(url).then(res=>{
    reviews.splice(this.state.deletedReviewIdx,1)
    this.setState({reviews:reviews})
    this.toogleModal()
  })

}
  render(){
    let formFilter = this.state.formFilter
    return(
      <div class="review-table">
      <div class="new-review-section">
        <button onClick={this.newReview}>New Review</button>
      </div>
      <div class="review-filter">
            <div class="form-group client-name-filter">
                <label htmlFor="client-name">client name</label>
                <input id="client-name" class="form-control" placeholder="client name" value={formFilter['client_name']} onChange={(e)=>{this.handle_review_filter_change(e,"client_name")}}  />
            </div>
            <div class="form-group content-filter">
                <label htmlFor="content">content</label>
                <input id="content" class="form-control" placeholder="content" value={formFilter['content']} onChange={(e)=>{this.handle_review_filter_change(e,"content")}}  />
            </div>
      </div>
      <DeleteReviewModal  visible={this.state.isModalVisible} close={this.toogleModal} deleteReview={this.deleteReview} />
          <table class="table basic-admin-table ">
            <thead >
              <tr>
                <th scope="col">client name</th>
                <th scope="col">content</th>
                <th scope="col">detail</th>
                <th scope="col">delete</th>
              </tr>
            </thead>
            <tbody  >
                {this.state.reviews.results.map((review,idx)=>{
                  return(
                    <tr>
                      <td>{review.client_name}</td>
                      <td>{review.content}</td>
                      <td><button class='order-btn' onClick={()=>{this.show_review(review.id)}} ><i class="far fa-eye"></i></button></td>
                      <td><button class='order-btn' onClick={()=>{this.toogleModal(idx)}} >X</button></td>
                    </tr>
                  )
                })
                }
            </tbody>
          </table>
        {(this.state.reviews.results.length / 20) > 1 ?
          <Pagination
               prev
               last
               next
               first
               size="md"
               pages={this.state.orders.count/10}
               activePage={this.state.activePage}
               onSelect={this.handleSelect}
             /> : null}
          </div>

    )
  }
}
export default ReviewTable
