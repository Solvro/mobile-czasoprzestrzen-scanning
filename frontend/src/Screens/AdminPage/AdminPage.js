import React, { Component } from 'react';
import Layout from '../../Components/Layout/Layout';
import Button from '../../Components/Button/Button';
import SearchContainer from '../../Components/SearchContainer/SearchContainer';
import Table from '../../Components/Table/ClientsWaitingForApprovalTable';
import './AdminPage.css';
import Toolbar from '../../Components/Toolbar/Toolbar';
import { getUnacceptedClientsList, approveUnacceptedClient, removeUnacceptedClient } from '../../services/unacceptedClientService';
import DeleteIcon from '@material-ui/icons/Delete';
import ApproveIcon from '@material-ui/icons/Done';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ErrorDisplay from '../../Components/Displays/ErrorDisplay';
import InfoDisplay from '../../Components/Displays/InfoDisplay';
class AdminPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      unacceptClientTable: '',
      loginError: false,
      errorMessage: '',
      infoDisplay: false,
      infoMessage: '',
      data: '',
      isLoading: true
    };
  }


  async componentDidMount() {
    await getUnacceptedClientsList()
    .then((res) => {
      this.setState({isLoading : false});
      this.createTable(res);
      
    })
  }

  updateData = async () => {
    await getUnacceptedClientsList()
      .then((res) => this.createTable(res));
    this.forceUpdate();
  }

  approveClient = async (id) => {
    var res = await approveUnacceptedClient(id);
    if (res) {
      this.setState({ infoDisplay: true });
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
      this.setState({ infoDisplay: true });
      this.setState({ infoMessage: 'Klient usunięty' });
    }
    else {
      this.setState({ loginError: true });
      this.setState({ errorMessage: 'Coś poszło nie tak' });
    }
    this.updateData();
  }

  createButtonAccept(id) {
    return <IconButton aria-label="Approve" onClick={() => this.approveClient(id)}><ApproveIcon /> </IconButton>;
  }
  createButtonRemove(id) {
    return <IconButton aria-label="Delete" onClick={() => this.removeClient(id)}> <DeleteIcon /></IconButton>;
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
      rows.push([ID, res[i].first_name + ' ' + res[i].last_name, res[i].email, '999999999',
        business, this.createButtonAccept(ID), this.createButtonRemove(ID)]);

    }
    var table = <Table contains={rows} />;
    this.setState({ unacceptClientTable: table });
  }

  render() {

    const left = <div className='Table'>

      <Toolbar />
      <SearchContainer placeholder={"Wyszukaj po nazwie ..."} />
      {!this.state.isLoading ? this.state.unacceptClientTable : null}
    </div>;

    const right = <div className='ButtonGroup'>

            <div className='inner'>
            <Button button={"verticalButton"} link={'/changePassword'} text={"Zmień hasło"}></Button>
            <Button button={"verticalButton"} link={'/createNewAccount'} text={"Stwórz nowe konto admina"}></Button>
            <Button button={"verticalButton"} link={'/login'} onClick={()=>localStorage.clear()} text={"Wyloguj"}></Button> 
            </div>

          </div>;


    return (
      <div>
        <Layout layoutDivide={"84"} leftChildren={left} rightChildren={right}>

        </Layout>
        {this.state.loginError &&
          <ErrorDisplay
            removeError={id => { this.setState({ loginError: false }) }}
            errors={[{ message: this.state.errorMessage, id: 100 }]}
          />}
        {this.state.infoDisplay &&
          <InfoDisplay
            removeInfo={id => { this.setState({ infoDisplay: false }) }}
            info={[{ message: this.state.infoMessage, id: 100 }]}
          />}
      </div>

    );
  }
}

export default AdminPage;