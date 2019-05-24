import React, { Component } from 'react';
import SearchContainer from '../../Components/SearchContainer/SearchContainer';
import Table from '../../Components/Table/ClientTable';
import Layout from '../../Components/Layout/Layout';
import Toolbar from '../../Components/Toolbar/Toolbar';
import {getClientsList, deleteClient} from '../../services/clientService';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import InfoDisplay from '../../Components/Displays/InfoDisplay';
import ErrorDisplay from '../../Components/Displays/ErrorDisplay';
import Dialog from '../../Components/Dialog/Dialog';
import Tooltip from "../../Components/Tooltip/Tooltip";
//import MessageIcon from '@material-ui/icons/Message';
import BussinesInfoDialog from '../../Components/Dialog/BussinessInfoDisplayDialog';

class Clients extends Component {

  constructor(props){
    super(props);
    this.state = {
      clientListTable: '',
      isLoading: true,
      infoMessage: '',
      errorMsg: '',
      dialogOpen: false,
      clientsList: ''
    }
  }

  async componentDidMount(){
    await getClientsList().then((res)=>{
      this.setState({
        isLoading: false,
        clientsList: res
      });
      this.createTable(this.state.clientsList);
    })    
  }

  filterTableContentByNameContains(nameFragment){
      var res = this.state.clientsList
      var filteredRes = Object.keys(res).filter(function(params) {
        return res[params]
          .username
          .toLowerCase()
          .includes(nameFragment.toLowerCase())
      }).map(function(i){
        return res[i];
      })
      this.createTable(filteredRes)
    
  }

  createTable(res){
    var rows = [];
    for (var i = 0; i<res.length; i++){

      rows.push([
        res[i].id,
        res[i].username,
        res[i].first_name + " " + res[i].last_name, 
        res[i].email, res[i].phone,
        this.createBussinessButton(res[i].business_data),
  //      this.createMessageButton(res[i].id), 
        this.createRemoveButton(res[i].id)
      ])
    }
    var table = <Table contains = {rows} />;
    this.setState({ clientListTable: table});
  }

  // createMessageButton(id) {
  //   return <IconButton aria-label="Message" onClick={() => alert("tutaj trzeb zrobić formularz z wiadomoscia")}> <MessageIcon /></IconButton>;
  // }
 
  createBussinessButton(business_data) {

    if (business_data == null) 
      return <Icon color="disabled">clear</Icon>
    else 
      return <IconButton aria-label="IconButton" onClick={() => this.handleBussinesInfoDialogOpen(business_data)}>
        <Tooltip title="Sprawdź szczegóły firmy">
          <Icon color="primary">done</Icon>
        </Tooltip>
       </IconButton>;
  }

  createRemoveButton(id) {
    return (
      <Tooltip title="Kliknij, aby usunąć przedmiot">
        <IconButton aria-label="Delete" onClick={() => this.handleDialogOpen(id)}> 
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    )
  }

  handleBussinesInfoDialogOpen(bussinessData){
    this.setState({ 
      bussinesInfoDialogOpen: true,
      clickedBussinessInfo: bussinessData 
    });
  }
  handleBussinesInfoDialogClose = () => {
    this.setState({ 
      bussinesInfoDialogOpen: false
    });
  }

  handleDialogOpen(id){
    this.setState({ 
      dialogOpen: true,
      clickedItemId: id 
    });
  }


  handleDialogCloseRefuse = () => {
    this.setState({ dialogOpen: false });
  };

  handleDialogCloseAgree = () => {
    this.setState({ dialogOpen: false });
    this.tryToDeleteClient(this.state.clickedItemId);
  };

  tryToDeleteClient = async (id) => {
    try{
      const response = await deleteClient(id);

      if(response===204)
        this.setState({infoMessage: 'Pomyslnie usunięto klienta numer ' + id })
      else if ( response === 403)
        throw new Error("Nie masz uprawnień do wykonania tej akcji");
      else
        throw new Error("Coś poszło nie tak");
    }catch(error){
      this.setState({errorMsg: error.message})
    }
    this.updateData();
  }

  updateData = async () => {
    await getClientsList()
      .then((res) => this.createTable(res));
    this.forceUpdate();
  }

  handleChange = (e) => {
    var res = this.filterTableContentByNameContains(e.target.value)
    console.log(res)
  }

  handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault()
    }
  }

  render() {
    return (
      <div className="container">
            <Toolbar/>
      <Layout layoutDivide={"282"}>
          <SearchContainer placeholder={"Wyszukaj po nazwie ..."} onChange={this.handleChange} rows={"1"} onKeyDown={this.handleKeyDown}/>
          {!this.state.isLoading ? this.state.clientListTable : null}
      </Layout>
      <Dialog 
        dialogOpen={this.state.dialogOpen} 
        handleCloseRefuse={this.handleDialogCloseRefuse} 
        handleCloseAgree={this.handleDialogCloseAgree}
        message={"Czy na pewno chcesz usunąć tego klienta?"}>
      </Dialog>

      {this.state.clickedBussinessInfo &&
      <BussinesInfoDialog
        dialogOpen={this.state.bussinesInfoDialogOpen}
        message={"Szczegoly firmy"}
        handleClose = {this.handleBussinesInfoDialogClose}
        bussinessData={this.state.clickedBussinessInfo}>
      </BussinesInfoDialog>}

      {this.state.infoMessage && 
        <InfoDisplay
          removeInfo={id => { this.setState({ infoMessage: false }) }}
          info={[{ message: this.state.infoMessage, id: 100 }]}
        />}
      {this.state.errorMsg &&
        <ErrorDisplay
            removeError={id => {this.setState({errorMsg: false})}}
            errors={[{message: this.state.errorMsg, id: 100}]}
        />}

      </div>
    );
  }
}

export default Clients;