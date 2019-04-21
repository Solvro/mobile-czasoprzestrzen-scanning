import React, { Component } from 'react';
import SearchContainer from '../../Components/SearchContainer/SearchContainer';
import Table from '../../Components/Table/RentsTable';
import Layout from '../../Components/Layout/Layout';
import Toolbar from '../../Components/Toolbar/Toolbar';
import {getFinishedRentsList, getOngoingRentsList} from '../../services/rentService';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from "@material-ui/core/styles";
import "./RentTablePage.css"

class Rents extends Component {

  constructor(props){
    super(props);
    this.state = {
      rentListTable: '',
      isLoading: true,
      infoMessage: '',
      errorMsg: '',
      value: 0
    }
  }

  async componentDidMount(){
    await getOngoingRentsList().then((res)=>{
      this.setState({isLoading: false});
      this.createOngoingTable(res);
    })    
  }

  handleChange = (event, value) => {
    this.setState({ value });
    setTimeout(this.reloadTable, 0);
  };

  reloadTable = async () => {
    if(this.state.value===0){
      await getOngoingRentsList().then((res)=>{
        this.setState({isLoading: false});
        this.createOngoingTable(res);
      })
    } else{
      await getFinishedRentsList().then((res)=>{
        this.setState({isLoading: false});
        this.createFinishedTable(res);
      })
    }
    this.forceUpdate();
  }

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  createOngoingTable(res){
    var rows = [];
    var equipmentName;
    var username;
    var city;
    var street;
    
    for (var i = 0; i<res.length; i++){
      equipmentName = res[i].equipment_data === null ? '-' : res[i].equipment_data.name 
      if (res[i].client_data!==null){
        username = res[i].client_data.username;
        city = res[i].client_data.address.city;
        street = res[i].client_data.address.street;
      } else {
        username = '-';
        city = '-';
        street = '';
      }
      
      rows.push([res[i].id,
        equipmentName,
        username,
        res[i].rental_date,
        res[i].expected_return,
        res[i].actual_return,
        city + " " + street
      ])
    }
    var header = [
      "Nr",
      "Nazwa",
      "Wypożyczający",
      "Data Wypożyczenia",
      "Spodziewana data zwrotu",
      "Gdzie"
    ];
    var table = <Table header = {header} rows = {rows} />;
    this.setState({ rentListTable: table});
  }

  createFinishedTable(res){
    var rows = [];
    var equipmentName;
    var username;
    var city;
    var street;
    
    for (var i = 0; i<res.length; i++){
      equipmentName = res[i].equipment_data === null ? '-' : res[i].equipment_data.name 
      if (res[i].client_data!==null){
        username = res[i].client_data.username;
        city = res[i].client_data.address.city;
        street = res[i].client_data.address.street;
      } else {
        username = '-';
        city = '-';
        street = '';
      }
      
      rows.push([res[i].id,
        equipmentName,
        username,
        res[i].rental_date,
        res[i].expected_return,
        res[i].actual_return,
        city + " " + street
      ])
    }
    var header = [
      "Nr",
      "Nazwa",
      "Wypożyczający",
      "Data Wypożyczenia",
      "Spodziewana data zwrotu",
      "Data zwrotu",
      "Gdzie"
    ];
    var table = <Table header = {header} rows = {rows} />;
    this.setState({ rentListTable: table});
  }
  

  render() {
    return (
      <div className="container">
            <Toolbar/>
      <Layout layoutDivide={"282"}>
        <div className="subBar-parent">
          <div className="subBar-child1"><SearchContainer placeholder={"Wyszukaj po nazwie ..."}/></div>
          <div className="subBar-child2">
            <AppBar position="static" color="primary" >
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="default"
                variant="fullWidth"
              >
                <Tab label="bieżące" />
                <Tab label="zakończone" />
              </Tabs>
            </AppBar>
          </div>
        </div>

        {!this.state.isLoading ? this.state.rentListTable : null}

      </Layout>
      </div>
    );
  }

}

export default withStyles({ withTheme: true })(Rents);
