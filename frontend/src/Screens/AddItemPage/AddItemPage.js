import React, { Component } from 'react';
import theme, {spacing} from '../../theme';
import AddForm from '../../Components/Form/Form';
import Layout from '../../Components/Layout/Layout';

const header = <div class='headText'>Dodaj nową rzecz do magazynu</div>;
class Account extends Component {

   
  render() {
    return (
      <Layout>
        <AddForm header={header} ></AddForm>
      </Layout>
    );
  }
}

export default Account;