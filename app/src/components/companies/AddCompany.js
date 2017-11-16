import React, { Component } from "react";
import {connect} from 'react-redux'

import {updateCompanyName} from '../../actions/addCompany'

import { action } from "@storybook/addon-actions";


import Button from "../Button";
import Section from "../Section";
import Loading from "../Loading";
import Header from "../Header";
import CenteredForm from "../CenteredForm";
import Content from "../Content";
import Title from "../Title";
import Input from "../Input";
import StatusModal from "../StatusModal";


function mapStateToProps({addCompany}) {
  return addCompany
}

function mapDispatchToProps(dispatch) {
  return {
    updateCompanyName: companyName => dispatch(updateCompanyName(companyName)),
  }
}

class AddCompany extends Component {
  render() {
    const {companyName} = this.props
    return (
      
      <div>
        <Content>
          <Title>Add a New Company</Title>
          <Input
            value={companyName}
            name="company"
            label="Company name"
            onChange={e => updateCompanyName(e.target.value)}
          />
          <Input
            type="email"
            name="email"
            label="Administrators E-Mail"
            onChange={action("changed")}
          />
          <Input
            type="password"
            name="password"
            label="Password"
            onChange={action("changed")}
          />
          <Button primary onClick={action("clicked")}>
            Add
          </Button>
        </Content>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCompany);

// handleSubmit(e) {
//   this.setState(
//     {
//       newCompany: {
//         name: this.refs.name.value,
//         CompanyAdmin: {
//           name: this.refs.adminName.value,
//           email: this.refs.adminEmail.value
//         },
//         id: this.refs.name.value
//       }
//     },
//     function() {
//       //console.log(this.state.newCompany);
//       this.props.addCompany(this.state.newCompany);
//     }
//   );
//   e.preventDefault();
// }