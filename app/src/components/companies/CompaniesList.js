import React, { Component } from "react";
import { connect } from 'react-redux';

import CompanyListItem from "./CompanyListItem";

function mapStateToProps ({companies}) {
  return {companies}
}

class CompaniesList extends Component {
  render() {
    let companyItems;
    if (this.props.companies) {
      companyItems = this.props.companies.map(company => {
        return <CompanyListItem key={company.Name} company={company} />;
      });
    }
    return <div className="Companies">{companyItems}</div>;
  }
}

export default connect(mapStateToProps)(CompaniesList);

// Should be moved to container