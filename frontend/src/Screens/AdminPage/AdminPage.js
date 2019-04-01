import React, { Component } from 'react';
import Layout from '../../Components/Layout/Layout';
import Button from '../../Components/Button/AdminButton';
import SearchContainer from '../../Components/SearchContainer/SearchContainer';
import Table from '../../Components/Table/ClientsWaitingForApprovalTable';

import './AdminPage.css';

class AdminPage extends Component {
  render() {

    const left = <div className='Table'> 
            <SearchContainer placeholder={"Wyszukaj po nazwie ..."} />
            <Table />
          </div>;

    const right = <div className='ButtonGroup'>
            <Button link={'/changePassword'} text={"Zmień hasło"}></Button>
            <Button link={'/createNewAccount'} text={"Stwórz nowe konto admina"}></Button>
            <Button link={'/login'} text={"Wyloguj"}></Button> 
          </div>;

    return (

      <Layout layoutDivide={"84"} leftChildren={left} rightChildren={right}>
       
      </Layout>
      
    );
  }
}

export default AdminPage;