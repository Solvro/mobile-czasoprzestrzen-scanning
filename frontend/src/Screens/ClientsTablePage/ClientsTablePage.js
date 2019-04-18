import React, { Component } from 'react';
import SearchContainer from '../../Components/SearchContainer/SearchContainer';
import Table from '../../Components/Table/ClientTable';
import Layout from '../../Components/Layout/Layout';
import Toolbar from '../../Components/Toolbar/Toolbar';
import {getClientsList} from '../../services/clientService';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import MessageIcon from '@material-ui/icons/Message';
import IconButton from '@material-ui/core/IconButton';

class Clients extends Component {

  constructor(props){
    super(props);
    this.state = {
      clientListTable: '',
      isLoading: true
    }
  }

  async componentDidMount(){
    await getClientsList().then((res)=>{
      this.setState({isLoading: false});
      this.createTable(res);
    })    
  }

  createTable(res){
    var rows = [];
    var businessIcon = <Icon>done</Icon>;
    for (var i = 0; i<res.length; i++){
      if (res[i].business_data == null) {
        businessIcon = <Icon>clear</Icon>
      }

      rows.push([res[i].id, res[i].first_name + " " + res[i].last_name, res[i].email, res[i].phone, businessIcon, this.createMessageButton(res[i].id), this.createRemoveButton(res[i].id)])
    }
    var table = <Table contains = {rows} />;
    this.setState({ clientListTable: table});
  }

  createMessageButton(id) {
    return <IconButton aria-label="Message" onClick={() => alert("tutaj trzeb zrobić formularz z wiadomoscia")}> <MessageIcon /></IconButton>;
  }

  createRemoveButton(id) {
    return <IconButton aria-label="Delete" onClick={() => alert("tutaj trzeb zrobić usuwanko :)")}> <DeleteIcon /></IconButton>;
  }

  render() {
    return (
      <div className="container">
            <Toolbar/>
      <Layout layoutDivide={"282"}>
          <SearchContainer placeholder={"Wyszukaj po nazwie ..."}/>
          {!this.state.isLoading ? this.state.clientListTable : null}
      </Layout>
      </div>
    );
  }
}

export default Clients;