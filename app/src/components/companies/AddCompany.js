import React, { Component } from "react";

class AddCompany extends Component {
  constructor(){
    super();
    this.state = {
      newCompany:{}
    }
  }

  handleSubmit(e){
    this.setState({newCompany:{
      name: this.refs.name.value,
      CompanyAdmin: {name:this.refs.adminName.value, email:this.refs.adminEmail.value},
      id: this.refs.name.value
    }}, function(){
      //console.log(this.state.newCompany);
      this.props.addCompany(this.state.newCompany)
    })    
    e.preventDefault();
  }
  
  render() {    
    return (
    <div className="AddCompany">
        <h3>Add Company</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>Company Name</label><br />
            <input type= "text" ref="name"/>
          </div>
          <p><strong>Admin Info:</strong></p>
          <div>
            <label>Name</label><br />
            <input type= "text" ref="adminName"/>
          </div>
          <div>
            <label>Email</label><br />
            <input type= "text" ref="adminEmail"/>
          </div>
          <input type="submit" value="submit"/>            
        </form>
    </div>
    )
  }
}

export default AddCompany;
