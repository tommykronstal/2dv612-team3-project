import React, { Component } from "react";

class CompanyItem extends Component {
  
  deleteCompany(){
    console.log("delete")
  }
  
  render() {
    return <li className="Company">{this.props.company.Name} {this.props.company.Admin.Name} {this.props.company.Admin.Email} <a href="#" onClick={this.deleteCompany.bind(this)}>X</a> </li>;
  }
}

export default CompanyItem;
