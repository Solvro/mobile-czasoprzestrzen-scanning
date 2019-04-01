import React, { Component } from 'react';
import Layout from '../../Components/Layout/Layout';
<<<<<<< HEAD
import Button from '../../Components/Button/Button';
import SearchContainer from '../../Components/SearchContainer/SearchContainer';
import Table from '../../Components/Table/ClientsWaitingForApprovalTable';
import './AdminPage.css';
import Toolbar from '../../Components/Toolbar/Toolbar';

=======
import Button from '../../Components/Button/AdminButton';
import SearchContainer from '../../Components/SearchContainer/SearchContainer';
import Table from '../../Components/Table/ClientsWaitingForApprovalTable';

import './AdminPage.css';

>>>>>>> 2d5b37307c79251507c26bc4be17c5dd5d0b9f1a
class AdminPage extends Component {
  render() {

    const left = <div className='Table'> 
<<<<<<< HEAD
            <Toolbar/>
=======
>>>>>>> 2d5b37307c79251507c26bc4be17c5dd5d0b9f1a
            <SearchContainer placeholder={"Wyszukaj po nazwie ..."} />
            <Table />
          </div>;

    const right = <div className='ButtonGroup'>
<<<<<<< HEAD
            <div className='inner'>
            <Button button={"verticalButton"} link={'/changePassword'} text={"Zmień hasło"}></Button>
            <Button button={"verticalButton"} link={'/createNewAccount'} text={"Stwórz nowe konto admina"}></Button>
            <Button button={"verticalButton"} link={'/login'} text={"Wyloguj"}></Button> 
            </div>
=======
            <Button link={'/home'} text={"Zmień hasło"}></Button>
            <Button link={'/createNewAccount'} text={"Stwórz nowe konto admina"}></Button>
            <Button link={'/login'} text={"Wyloguj"}></Button> 
>>>>>>> 2d5b37307c79251507c26bc4be17c5dd5d0b9f1a
          </div>;

    return (

<<<<<<< HEAD

=======
>>>>>>> 2d5b37307c79251507c26bc4be17c5dd5d0b9f1a
      <Layout layoutDivide={"84"} leftChildren={left} rightChildren={right}>
       
      </Layout>
      
<<<<<<< HEAD

=======
>>>>>>> 2d5b37307c79251507c26bc4be17c5dd5d0b9f1a
    );
  }
}

export default AdminPage;