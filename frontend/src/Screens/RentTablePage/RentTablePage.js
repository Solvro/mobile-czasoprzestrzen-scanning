import React, { Component } from 'react';
import SearchContainer from '../../Components/SearchContainer/SearchContainer';
import Table from '../../Components/Table/RentsTable';
import Layout from '../../Components/Layout/Layout';

class Rents extends Component {
  render() {
    return (
      <Layout layoutDivide={"282"}>
        <SearchContainer placeholder={"Wyszukaj po nazwie ..."}/>
        <Table />
      </Layout>
    );
  }
}

export default Rents;