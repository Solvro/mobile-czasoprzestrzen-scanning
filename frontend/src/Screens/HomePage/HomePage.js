import React, { Component } from 'react';
import SearchContainer from '../../Components/SearchContainer/SearchContainerWithSelect';
import Table from '../../Components/Table/HomeTable';
import Layout from '../../Components/Layout/Layout';

import Button from '../../Components/Button/AddButton';

class HomePage extends Component {
  render() {
    return (
      <Layout layoutDivide={"282"}>
                <SearchContainer placeholder={"Wyszukaj po nazwie ..."} />
                <Table />
                <div className='AddButtonPosition'><Button text={"Dodaj"} link={"/adds"} /></div>
      </Layout>
    );
  }
}

export default HomePage;