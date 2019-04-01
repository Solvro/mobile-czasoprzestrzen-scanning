import React, { Component } from 'react';
import Layout from '../../Components/Layout/Layout';
import Button from '../../Components/Button/Button';
import SearchContainer from '../../Components/SearchContainer/SearchContainer';
import Table from '../../Components/Table/ClientsWaitingForApprovalTable';
import './AdminPage.css';
import Toolbar from '../../Components/Toolbar/Toolbar';

class AdminPage extends Component {
  render() {

    const left = <div className='Table'> 
            <Toolbar/>
            <SearchContainer placeholder={"Wyszukaj po nazwie ..."} />
            <Table />
          </div>;

    const right = <div className='ButtonGroup'>
            <div className='inner'>
            <Button button={"verticalButton"} link={'/changePassword'} text={"Zmień hasło"}></Button>
            <Button button={"verticalButton"} link={'/createNewAccount'} text={"Stwórz nowe konto admina"}></Button>
            <Button button={"verticalButton"} link={'/login'} text={"Wyloguj"}></Button> 
            </div>
          </div>;

    return (


      <Layout layoutDivide={"84"} leftChildren={left} rightChildren={right}>
       
      </Layout>
      

    );
  }
}

export default AdminPage;