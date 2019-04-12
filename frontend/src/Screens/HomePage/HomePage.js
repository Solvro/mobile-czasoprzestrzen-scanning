import React, { Component } from 'react';
import SearchContainer from '../../Components/SearchContainer/SearchContainerWithSelect';
import Table from '../../Components/Table/HomeTable';
import Layout from '../../Components/Layout/Layout';
import Toolbar from '../../Components/Toolbar/Toolbar';
import Button from '../../Components/Button/AddButton';
import InfoDisplay from '../../Components/Displays/InfoDisplay';
import {getUserName } from '../../services/userService';
import Icon from '@material-ui/core/Icon';
import {getItemsList,getItemTypesList} from '../../services/itemsService';
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
      typesList: []
    }
  }

  componentWillMount(){
    
    this.getName();

  }

  async componentDidMount() {
   
    await getItemTypesList()
    .then((res) => {
      var itemTypes = []
      for(var i = 0; i < res.length; i++){
          itemTypes[i] = res[i].type_name
      }
      console.log(itemTypes)
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
    return <IconButton aria-label="Delete" onClick={() => console.log(id)}> <DeleteIcon /></IconButton>;
  }

  createTable = (res) => {
    var rows = [];
    var available = <Icon>clear</Icon>;
    var ID = 0;
    for (var i = 0; i < res.length; i++) {
      if (res[i].available === true) {
        available = <Icon>done</Icon>
      }
      ID = res[i].id;
      rows.push([ID, res[i].name, this.state.typesList[res[i].type - 1],available,this.createButtonRemove(ID), this.createButtonEdit(ID)]);

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
      this.setState({ loginInfo: true });
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
      {this.state.loginInfo && <InfoDisplay
        removeInfo={id => {this.setState({loginInfo: false})}}
        info={[{message: 'Zalogowałeś się jako ' + this.state.username, id: 101}]}
        />}
      </div>
    );
  }
}

export default HomePage;