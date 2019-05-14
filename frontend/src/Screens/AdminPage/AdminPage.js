import React, { Component } from 'react';
import Layout from '../../Components/Layout/Layout';
import Table from '../../Components/Table/ClientsWaitingForApprovalTable';
import AdminTable from '../../Components/Table/AllAdminTable'
import './AdminPage.css';
import Toolbar from '../../Components/Toolbar/Toolbar';
import { getUnacceptedClientsList, approveUnacceptedClient, removeUnacceptedClient } from '../../services/unacceptedClientService';
import DeleteIcon from '@material-ui/icons/Delete';
import ApproveIcon from '@material-ui/icons/Done';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ErrorDisplay from '../../Components/Displays/ErrorDisplay';
import InfoDisplay from '../../Components/Displays/InfoDisplay';
import {getSuperAdminList,getAdminList,removeAdmin} from '../../services/adminService';
import {userSuperAdmin} from '../../services/userService';
class AdminPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      unacceptClientTable: '',
      loginError: false,
      errorMessage: '',
      infoMessage: '',
      data: '',
      isLoading: true,
      adminTable: '',
      isSuperAdmin: false
    };
    this.state.infoMessage=this.props.location.infoMessage
  }


  async componentDidMount() {

    await userSuperAdmin()
    .then((isSuperAdmin) => { 
      this.setState({isSuperAdmin: isSuperAdmin}); 
    })

    await getUnacceptedClientsList()
    .then((res) => {
      this.setState({isLoading : false});
      this.createTable(res);
      
    })

    if(this.state.isSuperAdmin){
      const adminList = await getAdminList();
      const superAdminList = await getSuperAdminList();
      this.createAdminTable(adminList,superAdminList);
    }
  }

  updateData = async () => {
    await getUnacceptedClientsList()
      .then((res) => this.createTable(res));
    
    if(this.state.isSuperAdmin){
      const adminList = await getAdminList();
      const superAdminList = await getSuperAdminList();
      this.createAdminTable(adminList,superAdminList);
    }
    
    this.forceUpdate();
  }

  approveClient = async (id) => {
    var res = await approveUnacceptedClient(id);
    if (res) {
      this.setState({ infoMessage: 'Klient zaakceptowany' });
    }
    else {
      this.setState({ loginError: true });
      this.setState({ errorMessage: 'Coś poszło nie tak' });
    }
    this.updateData();
  }

  removeClient = async (id) => {
    var res = await removeUnacceptedClient(id);
    if (res) {
      this.setState({ infoMessage: 'Klient usunięty' });
    }
    else {
      this.setState({ errorMessage: 'Coś poszło nie tak' });
    }
    this.updateData();
  }

  removeAdmin = async (id) => {
    var res = await removeAdmin(id);
    if (res) {
      this.setState({ infoDisplay: true });
      this.setState({ infoMessage: 'Admin usunięty' });
    }
    else {
      this.setState({ loginError: true });
      this.setState({ errorMessage: 'Coś poszło nie tak' });
    }
    this.updateData();
  }

  createButtonAccept(id) {

    return <IconButton aria-label="Approve" disabled={!this.state.isSuperAdmin} onClick={() => this.approveClient(id)}>
    <ApproveIcon /> </IconButton>;
  }
  createButtonRemove(id) {
    return <IconButton aria-label="Delete" disabled={!this.state.isSuperAdmin} onClick={() => this.removeClient(id)}> 
    <DeleteIcon /></IconButton>;
  }
  createButtonRemoveAdmin(id) {
    return <IconButton aria-label="Delete" disabled={!this.state.isSuperAdmin} onClick={() => this.removeAdmin(id)}> 
    <DeleteIcon /></IconButton>;
  }

  createTable = (res) => {
    var rows = [];
    var business;
    var ID = 0;
    for (var i = 0; i < res.length; i++) {
      if (res[i].is_business === false) {
        business = <Icon>clear</Icon>
      } else
      business = <Icon>done</Icon>;
      ID = res[i].id
      rows.push([ID, res[i].first_name + ' ' + res[i].last_name, res[i].email, res[i].phone,
        business, this.createButtonAccept(ID), this.createButtonRemove(ID)]);

    }
    var table = <div><div>Admini</div><Table contains={rows} /></div>;
    this.setState({ unacceptClientTable: table });
  }

  createAdminTable = (adminList, superAdminList) => {
    var rows = [];
    var ID = 1;
    adminList.forEach((admin) => {
      // console.log(admin.name+" "+admin.id)
      rows.push([ID, admin.first_name + ' ' + admin.last_name,admin.username, admin.email, admin.phone,
        <Icon>close</Icon>, this.createButtonRemoveAdmin(admin.id)]);
        ID++;
    });
    superAdminList.forEach((admin) => {
      rows.push([ID, admin.first_name + ' ' + admin.last_name,admin.username, admin.email, admin.phone,
        <Icon>done</Icon>,]);
        ID++;
    });
    const table = <div><AdminTable contains={rows} /></div>;
    this.setState({ adminTable: table });
  }

  render() {
    return (
      <div>
        <Toolbar/>
        <Layout layoutDivide={"282"}>
        {!this.state.isLoading ? this.state.unacceptClientTable : null}
      
      {!this.state.isLoading && this.state.isSuperAdmin ? this.state.adminTable : null} 
        </Layout>
        {this.state.loginError &&
          <ErrorDisplay
            removeError={id => { this.setState({ loginError: false }) }}
            errors={[{ message: this.state.errorMessage, id: 100 }]}
          />}
        {this.state.infoMessage &&
          <InfoDisplay
            removeInfo={id => { this.setState({ infoMessage: false }) }}
            info={[{ message: this.state.infoMessage, id: 100 }]}
          />}
      </div>

    );
  }
}

export default AdminPage;