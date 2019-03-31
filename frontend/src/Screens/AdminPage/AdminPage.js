import React, { Component } from 'react';
import Layout from '../../Components/Layout/Layout';
import Toolbar from '../../Components/Toolbar/Toolbar';

class Account extends Component {
  render() {
    return (
      <div className="container">
        <Toolbar/>
        <Layout layoutDivide={"282"}>
            Tutaj będzie można zmienić hasło wylogować się i akceptować nowych klientów.
        </Layout>
      </div>
    );
  }
}

export default Account;