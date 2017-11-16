import React, { Component } from "react";
import {connect} from 'react-redux'

import {tryAddCompany} from '../actions/tryAddCompany'

import Button from "../components/common/Button";
import Content from "../components/common/Content";
import Title from "../components/common/Title";
import Input from "../components/common/Input";

function mapStateToProps({loading}) {
  return {loading}
}

function mapDispatchToProps(dispatch) {
  return {
    tryAddCompany: companyDetails => dispatch(tryAddCompany(companyDetails)),
  }
}

class AddCompany extends Component {

  defaultState = {
    name: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }

  constructor(props) {
    super(props)
    this.state = {...this.defaultState}
  }

  updateField = target => event => {
    this.setState({[target]: event.target.value.trim()})
  }

  createCompany = event => {
    event.preventDefault()
    this.props.tryAddCompany(this.state)
    this.setState({...this.defaultState});
  }


  render() {

    console.log('ewjofewjgfoiwejfweoiwej')

    const { name, firstName, lastName, email, password } = this.state

    return (
      <div>
        <Content>
          <form onSubmit={e => this.createCompany(e)}>
            <Title>Add a New Company</Title>
            <Input
              value={name}
              name="company"
              label="Company name"
              onChange={this.updateField('name')}
            />
            <Input
              value={firstName}
              type="text"
              name="firstName"
              label="Administrators First Name"
              onChange={this.updateField('firstName')}
            />
            <Input
              value={lastName}
              type="text"
              name="lastName"
              label="Administrators Last Name"
              onChange={this.updateField('lastName')}
            />
            <Input
              value={email}
              type="email"
              name="email"
              label="Administrators E-Mail"
              onChange={this.updateField('email')}
            />
            <Input
              value={password}
              type="password"
              name="password"
              label="Password"
              onChange={this.updateField('password')}
            />
            <Button primary loading={this.props.loading.isLoading}>
              Add
            </Button>
          </form>
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
