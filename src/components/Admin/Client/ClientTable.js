import React from 'react' ;
import "./clienttable-css.scss" ;
import { Pagination } from 'rsuite';

class ClientTable extends React.Component {
   state = {
     clients : [] ,
     client_filter : {
         ref:"",
         client_name:"",
         email :"",
    },
   }

   componentDidMount(){
     let clients = this.state.clients
     for(let i = 0 ; i < 10 ; i++){
       clients.push({
                     name:"abdallah",
                     email:"abdallah@gmail.com",
                     revenue:22.33,
                     joined_at:"12/01/2001",
                     ref:"154230",
                   })
     }
     this.setState({clients:clients})
   }
   handle_client_filter_change = (e,field)=>{
     let value = e.target.value ;
     let client_filter = this.state.client_filter ;
     client_filter[field] = value ;
     this.setState({client_filter:client_filter}) ;
   }
    render(){
        return(
          <div class="client-table">
          <div class="client-filter">
              <div class="form-group ref-filter">
                  <label htmlFor="client-ref">ref</label>
                  <input id="client-ref" class="form-control" placeholder="ref" onChange={(e)=>{this.handle_client_filter_change(e,"ref")}}  />
              </div>
              <div class="form-group client-name-filter">
                  <label htmlFor="client-name">client name</label>
                  <input id="client-name" class="form-control" placeholder="client name" onChange={(e)=>{this.handle_client_filter_change(e,"client_name")}}  />
              </div>
              <div class="form-group client-email-filter">
                  <label htmlFor="client-email">email</label>
                  <input id="client-email" class="form-control" placeholder="client name" onChange={(e)=>{this.handle_client_filter_change(e,"email")}}  />
              </div>
          </div>
                <table class="table basic-admin-table ">
                  <thead >
                    <tr>
                      <th scope="col">ref</th>
                      <th scope="col">joined_at</th>
                      <th scope="col">name</th>
                      <th scope="col">email</th>
                      <th scope="col">revenue</th>
                      <th scope="col">detail</th>
                    </tr>
                  </thead>
                  <tbody  >
                  {this.state.clients.map(client=>{
                    return(
                      <tr>
                        <td>{client.ref}</td>
                        <td>{client.joined_at}</td>
                        <td>{client.name}</td>
                        <td>{client.email}</td>
                        <td>{client.revenue} dt</td>
                        <td><button class='wishlist-btn' onClick={()=>{this.show_wishlist(54)}} ><i class="far fa-eye"></i></button></td>
                      </tr>
                    )
                  })
                  }
                  </tbody>
                </table>
                <Pagination
                     prev
                     last
                     next
                     first
                     size="md"
                     pages={10}
                     activePage={this.state.activePage}
                     onSelect={this.handleSelect}
                   />
                </div>
        )
    }
}

export default ClientTable
