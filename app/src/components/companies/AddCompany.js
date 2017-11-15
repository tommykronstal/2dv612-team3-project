import React, { Component } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import centered from "@storybook/addon-centered";
import backgrounds from "@storybook/addon-backgrounds";
import { injectGlobal } from "styled-components";

import Button from "../Button";
import Section from "../Section";
import Loading from "../Loading";
import Header from "../Header";
import CenteredForm from "../CenteredForm";
import Content from "../Content";
import Title from "../Title";
import Input from "../Input";
import StatusModal from "../StatusModal";

class AddCompany extends Component {
  constructor() {
    super();
    this.state = {
      newCompany: {}
    };
  }

  handleSubmit(e) {
    this.setState(
      {
        newCompany: {
          name: this.refs.name.value,
          CompanyAdmin: {
            name: this.refs.adminName.value,
            email: this.refs.adminEmail.value
          },
          id: this.refs.name.value
        }
      },
      function() {
        //console.log(this.state.newCompany);
        this.props.addCompany(this.state.newCompany);
      }
    );
    e.preventDefault();
  }

  // action(bla) {
  //   console.log(bla);
  // }

  render() {
    return (
      // <div className="AddCompany">
      //     <h3>Add Company</h3>
      //     <form onSubmit={this.handleSubmit.bind(this)}>
      //       <div>
      //         <label>Company Name</label><br />
      //         <input type= "text" ref="name"/>
      //       </div>
      //       <p><strong>Admin Info:</strong></p>
      //       <div>
      //         <label>Name</label><br />
      //         <input type= "text" ref="adminName"/>
      //       </div>
      //       <div>
      //         <label>Email</label><br />
      //         <input type= "text" ref="adminEmail"/>
      //       </div>
      //       <input type="submit" value="submit"/>
      //     </form>
      // </div>
      <div>
        <Content>
          <Title>Add a New Company</Title>
          <Input
            name="company"
            label="Company name"
            onChange={action("changed")}
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

export default AddCompany;
