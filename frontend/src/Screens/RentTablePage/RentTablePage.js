import React, { Component } from 'react';
import SearchContainer from '../../Components/SearchContainer/SearchContainer';
import Table from '../../Components/Table/RentsTable';
import Layout from '../../Components/Layout/Layout';
import Toolbar from '../../Components/Toolbar/Toolbar';

class Rents extends Component {
  render() {
    return (
      <div className="container">
            <Toolbar/>
      <Layout layoutDivide={"282"}>
        <SearchContainer placeholder={"Wyszukaj po nazwie ..."}/>
        <Table />
      </Layout>
      </div>
    );
  }
}

export default Rents;