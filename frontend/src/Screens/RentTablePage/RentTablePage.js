import React, { Component } from 'react';
import SearchContainer from '../../Components/SearchContainer/SearchContainer';
import Table from '../../Components/Table/RentsTable';
import Layout from '../../Components/Layout/Layout';
import Toolbar from '../../Components/Toolbar/Toolbar';
import {getRentsList} from '../../services/rentService';


class Rents extends Component {

  constructor(props){
    super(props);
    this.state = {
      rentListTable: '',
      isLoading: true,
      infoMessage: '',
      errorMsg: ''
    }
  }

  async componentDidMount(){
    await getRentsList().then((res)=>{
      this.setState({isLoading: false});
      this.createTable(res);
    })    
  }

  createTable(res){
    var rows = [];
    for (var i = 0; i<res.length; i++){
      rows.push([res[i].id,
        res[i].equipment_data.name,
        res[i].client_data.username,
        res[i].rental_date,
        res[i].expected_return,
        res[i].actual_return,
        res[i].client_data.address.city + " " + res[i].client_data.address.street])
    }
    var table = <Table contains = {rows} />;
    this.setState({ rentListTable: table});
  }

  render() {
    return (
      <div className="container">
            <Toolbar/>
      <Layout layoutDivide={"282"}>
        <SearchContainer placeholder={"Wyszukaj po nazwie ..."}/>
        
        {!this.state.isLoading ? this.state.rentListTable : null}
      </Layout>
      </div>
    );
  }
}

export default Rents;