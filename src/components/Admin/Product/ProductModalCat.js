import React from "react" ;
import Modal from 'react-awesome-modal';
import HOST_URL from '../../../config' ;
import axios from 'axios' ;

class ProductModalCat extends React.Component {
  state = {
     form : {
         new_field : '',
         current_field : '',
         new_subfied : '',
         tracked : true,
     },
     existing_field_list : {
       list : []
     },
     subfield_list : {
      section : 'categorie',
      categorie : 'subcategorie',
      list : []
   }
  }
componentDidMount(){
this.load_existing_field_list()
}
load_existing_field_list = ()=>{
  let url = HOST_URL+'/api/'+this.props.field+'/'
  axios.get(url).then(res=>{
    if(res.data.length > 0){
      let state = this.state ;
      state.form.current_field = res.data[0].name ;
      state.existing_field_list = res.data ;
      // console.log(res.data.);
      this.setState({existing_field_list:{...this.state.existing_field_list,list:res.data}})
      this.load_existing_field_detail(this.get_subfield_id_by_name(res.data[0].name,res.data))
    }
  })
}
load_existing_field_detail = (id)=>{
  let url = HOST_URL+'/api/'+this.props.field+'/'+id+'/'
  axios.get(url).then(res=>{
    this.setState({subfield_list:{...this.state.subfield_list,list:res.data[this.state.subfield_list[this.props.field]+'s']}})
  })
}
get_subfield_id_by_name = (name)=>{
  for (let i= 0 ; i<this.state.existing_field_list.list.length;i++){
    if(this.state.existing_field_list.list[i].name == name){
      return this.state.existing_field_list.list[i].id
      break ;
    }
}
}
handleFormChange = (e,field)=>{
    let value = e.target.value ;
    let form = this.state.form ;
    form[field] = value ;
    this.setState({form:form}) ;
    if(field == "current_field"){
      this.load_existing_field_detail(this.get_subfield_id_by_name(value)) ;
    }

  }

addField = (field,field_list)=>{
    let new_field = this.state.form[field] ;
    if (new_field != ''){
      let state = this.state ;
      state.form[field] = '' ;
      let url = HOST_URL+'/api/'+this.props.field+'/'
      if(field == 'new_subfield'){
        let current_field = this.state.form.current_field;
        url = HOST_URL+'/api/'+this.props.field+'/'+this.get_subfield_id_by_name(current_field)+'/add_'+this.state.subfield_list[this.props.field]+'/'
        axios.put(url,{name:new_field}).then((res)=>{
          state[field_list].list = [res.data,...state[field_list].list]
          this.setState({state:state})
        })
      } else{
        axios.post(url,{name:new_field}).then((res)=>{
          // this.props.update_field_list(this.props.field,res.data)
            state[field_list].list = [res.data,...state[field_list].list] ;
            state.form.current_field = res.data.name ;
            this.setState({state:state})
            this.load_existing_field_detail(this.get_subfield_id_by_name(res.data.name))
        })
      }



    }
  }
deleteField = (idx,field_list)=>{
    // let new_field_list = this.state[field_list] ;
    let state = this.state ;
    let field_id = state[field_list].list[idx].id
    let url = HOST_URL+'/api/'+state[field_list][this.props.field]+'/'+field_id+'/'
    axios.delete(url).then(res=>{
      state[field_list].list.splice(idx,1);
      this.setState({state:state});
    })

  }
  render(){
    // if(this.props.field_value && this.state.form.tracked && this.props.field_value != this.state.form.current_field){
    //   this.setState({form:{...this.state.form,current_field:this.props.field_value,tracked:false}})
    //   this.load_existing_field_detail(this.get_subfield_id_by_name(this.props.field_value))
    // }
    return(
      <Modal
          style={{width:'900px',height:'100px'}}
          width="500"
          height="80%"
          visible={this.props.visible}
          effect="fadeInUp"
          onClickAway={() => this.props.closeModal(this.props.field)}
      >
          <div style={{padding:'10px',position:"relative",height:'100%'}}>
            <div class="form-group">
             <div style={{display:'flex',flexDirection:'column',width:"420px"}}>
              <label>New {this.props.field}</label>
              <input class='form-control' placeholder={"New "+this.props.field} onChange={(e)=>{this.handleFormChange(e,'new_field')}} value={this.state.form.new_field}/>
            </div>
            <div style={{alignSelf:'flex-end'}}>
                <button style={{backgroundColor:'grey',color:'white',width:'40px',height:'40px'}} onClick={()=>{this.addField('new_field','existing_field_list')}} >+</button>
            </div>
            </div>

            <div class="form-group">
            <div class="select-form" style={{width:'100%'}} >
               <label htmlFor='subfield' >Sub Categorie</label>
                    <select id='subfield' as="select" name="subcategorie" class="custom-select" onChange={(e)=>{this.handleFormChange(e,'current_field')}} value={this.state.form.current_field}>
                        {this.state.existing_field_list.list.map((existing_field)=>{
                          return(
                              <option value={existing_field.name} >{existing_field.name}</option>
                          )
                        })

                        }
                    </select>
               </div>
            </div>

            <div class="form-group">
             <div style={{display:'flex',flexDirection:'column',width:"420px"}}>
                  <label>New {this.props.field == "section" ? 'Categorie' : 'SubCategorie'}</label>
                  <input class='form-control' placeholder={"Add a to this "+this.props.field} onChange={(e)=>{this.handleFormChange(e,'new_subfield')}} value={this.state.form.new_subfield} />
             </div>
             <div style={{alignSelf:'flex-end'}}>
                  <button style={{backgroundColor:'grey',color:'white',width:'40px',height:'40px'}} onClick={()=>{this.addField('new_subfield','subfield_list')}}>+</button>
             </div>
            </div>
            <div class="list-group" style={{maxHeight:'60%',overflowY:'scroll'}}>
                {this.state.subfield_list.list.map((subfield,idx)=>{
                  return(
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                    {subfield.name} <button onClick={()=>{this.deleteField(idx,'subfield_list')}}>x</button>
                    </li>
                  )
                })
                }
            </div>
          </div>
       </Modal>
    )
  }
}

export default ProductModalCat
