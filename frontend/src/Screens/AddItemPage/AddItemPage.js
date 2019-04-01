import React, { Component } from 'react';
import Form from '../../Components/Form/Form';
import Layout from '../../Components/Layout/Layout';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '../../Components/Button/AddButton';
import TypeSelect from '../../Components/Selects/Select';
import InputField from '../../Components/Input/InputField';
import Toolbar from '../../Components/Toolbar/Toolbar';


class AddItem extends Component {

   
  render() {

    const button = <Button link={'/home'} text={"Dodaj"}></Button>;
    const header = <div class='headText'>Dodaj nową rzecz do magazynu</div>;

    return (
      <div className="container">
            <Toolbar/>
      <Layout layoutDivide={"363"}>
        <Form header={header} button={button}>

          <InputField placeholder={"Nazwa"} rows={"1"} label={"Nazwa urządzenia"}>
          </InputField>

          <TypeSelect ></TypeSelect>

          <InputField placeholder={"Opis"} rows={"4"} label={"Opis"}>
          </InputField>

          <InputField placeholder={"Czas wypożyczenia"} label={"Maksymalny czas wypożyczenia"} 
              inputprops={{endAdornment: <InputAdornment position="end" rows={"1"}>dni</InputAdornment>}}>
          </InputField>
 
        </Form>
      </Layout>
      </div>
    );
  }
}

export default AddItem;