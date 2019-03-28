import React, { Component } from 'react';
import Layout from '../../Components/Layout/Layout';
import Button from '../../Components/Button/AddButton';
import SearchContainer from '../../Components/SearchContainer/SearchContainer';
import Table from '../../Components/Table/ClientsWaitingForApprovalTable';
import Form from '../../Components/Form/Form';

class Account extends Component {
  render() {

    const button = <Button link={'/home'} text={"Zmień hasło"}></Button>;

    const left = <div className='Table'> 
          <SearchContainer placeholder={"Wyszukaj po nazwie ..."}/>
          <Table /></div>;

    const right = <div className='Form'>
          {/* <Form button={button}>
          </Form> */}
    </div>

    return (

      <Layout layoutDivide={"16131"} leftChildren={left} rightChildren={right}>
       
      </Layout>
      
    );
  }
}

export default Account;