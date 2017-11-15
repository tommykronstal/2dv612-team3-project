import React, { Component } from "react";
import { connect } from "react-redux";

import CompaniesList from "../components/companies/CompaniesList";
import AddCompany from "../components/companies/AddCompany";

import CenteredForm from "../components/CenteredForm";
import Title from "../components/Title";
import Input from "../components/Input";
import Button from "../components/Button";

class CreateCompany extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <AddCompany />;
  }
}

export default CreateCompany;
