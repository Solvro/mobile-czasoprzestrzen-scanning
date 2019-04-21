import React, { Component } from 'react';
import SearchContainer from '../../Components/SearchContainer/SearchContainerWithSelect';
import Table from '../../Components/Table/HomeTable';
import Layout from '../../Components/Layout/Layout';
import Toolbar from '../../Components/Toolbar/Toolbar';
import Button from '../../Components/Button/AddButton';
import InfoDisplay from '../../Components/Displays/InfoDisplay';
import Dialog from '../../Components/Dialog/Dialog';
import {getUserName } from '../../services/userService';
import Icon from '@material-ui/core/Icon';
import {getItemsList,getItemTypesList,removeItemFromList, returnItem} from '../../services/itemsService';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import {Link} from 'react-router-dom';
class HomePage extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      itemListTable: '',
      loginInfo: false,
      username: "?",
      isLoading: true,
      typesList: [],
      dialogOpen: false,
      returnDialogOpen: false,
      clickedItemId: 0,
      messageInfo: '',
      returnItemID: 0
    }
  }

  componentWillMount(){ 
    this.getName();
  }

  updateData = async () => {
    await getItemsList()
    .then((res) => {
      this.setState({isLoading : false});
      this.createTable(res); 
      console.log(res);
    })
    this.forceUpdate();
  }

  //dialog on remove
  handleDialogOpen = (id) => {
    this.setState({ dialogOpen: true,
    clickedItemId: id });
  };

  handleDialogCloseRefuse = () => {
    this.setState({ dialogOpen: false });
  };

  handleDialogCloseAgree = () => {
    this.setState({ dialogOpen: false });
    removeItemFromList(this.state.clickedItemId);
    this.setState({ loginInfo: true, messageInfo: "Usunięto "});
    // this.updateData();
    setTimeout(this.updateData, 2000)
  };

  //dialog on return
  handleReturnDialogOpen = (id) => {
    console.log(id);
    this.setState({ returnDialogOpen: true, returnItemID: id});
  };

  handleReturnDialogCloseRefuse = () => {
    this.setState({ returnDialogOpen: false });
  };

  handleReturnDialogCloseAgree = () => {
    this.setState({ returnDialogOpen: false });
    returnItem(this.state.returnItemID);
    this.setState({ loginInfo: true, messageInfo: "Zwrócono "});
    this.updateData();
  };

  async componentDidMount() {
   
    await getItemTypesList()
    .then((res) => {
      var itemTypes = []
      for(var i = 0; i < res.length; i++){
          itemTypes[i] = res[i].type_name
      }
      this.setState({typesList : itemTypes});
    })
    await getItemsList()
    .then((res) => {
      this.setState({isLoading : false});
      this.createTable(res); 
    })
  }

  createButtonEdit(id) {
    const newTo = { 
      pathname: "/detailedItem", 
      ID: id 
    };
    return <Link to={newTo}><IconButton aria-label="Approve" onClick={() => console.log(id)}><Icon>arrow_forward</Icon> </IconButton></Link>;
  }
  createButtonRemove(id) {
    return <IconButton aria-label="Delete" onClick={() => this.handleDialogOpen(id) }> 
    <DeleteIcon /></IconButton>;
  }

  createButtonReturn(id) {
    return <IconButton aria-label="Delete" onClick={() => this.handleReturnDialogOpen(id) }> 
    <Icon> close</Icon> </IconButton>;
  }

  createTable = (res) => {
    var rows = [];
    
    var ID = 0;
    for (var i = 0; i < res.length; i++) {
      ID = res[i].id;
      var available = this.createButtonReturn(ID);
      if (res[i].available === true) {
        available = <Icon>done</Icon>
      }
      
      rows.push([i+1, res[i].name, res[i].type.type_name,available,this.createButtonRemove(ID), this.createButtonEdit(ID)]);

    }
    var table = <Table contains={rows} />;
    this.setState({ itemListTable: table });
  }

  getName = async () => {
    const prevLocation =  await localStorage.getItem('prev');
    if(prevLocation === 'login'){
      const token = await localStorage.getItem('token');
      const user = await getUserName(token);
      this.setState({ username: user });
      await localStorage.setItem('prev', 'null');
      this.setState({ loginInfo: true, messageInfo: "Zalogowałeś się jako " + this.state.username});
    }
  }

  render() {
    return (
      <div className="container">
            <Toolbar/>
      <Layout layoutDivide={"282"}>
                <SearchContainer placeholder={"Wyszukaj po nazwie ..."} />
                {!this.state.isLoading ? this.state.itemListTable : null}
                <div className='AddButtonPosition'><Button text={"Dodaj"} link={"/adds"} /></div>
      </Layout>

      <Dialog dialogOpen={this.state.dialogOpen} handleCloseRefuse={this.handleDialogCloseRefuse} 
      handleCloseAgree={this.handleDialogCloseAgree} message={"Czy na pewno chcesz usunąć rzecz z magazynu?"}>
      </Dialog>

      <Dialog dialogOpen={this.state.returnDialogOpen} handleCloseRefuse={this.handleReturnDialogCloseRefuse} 
      handleCloseAgree={this.handleReturnDialogCloseAgree} message={"Czy na pewno chcesz zwrócić rzecz do magazynu?"}>
      </Dialog>
      
      {this.state.loginInfo && <InfoDisplay
        removeInfo={id => {this.setState({loginInfo: false})}}
        info={[{message: this.state.messageInfo, id: 101}]}
        />}
      </div>
    );
  }
}

export default HomePage;