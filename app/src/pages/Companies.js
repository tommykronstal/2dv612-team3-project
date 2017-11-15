import React, {Component} from 'react'
import {connect} from 'react-redux'

import CompaniesList from '../components/companies/CompaniesList'
import AddCompany from '../components/companies/AddCompany'

import {Link} from 'react-router-dom'
import CenteredForm from '../components/CenteredForm'
import Title from '../components/Title'
import Input from '../components/Input'
import Button from '../components/Button'

import Text from '../components/Text'

class Companies extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      // <CenteredForm onSubmit={() => this.handleLogin()}>
      <div>
        <CompaniesList />
        <br />
        <Link to="/admin/companies/create">
          <Text>Add company</Text>
        </Link>
      </div>  
    )
  }
}

export default Companies