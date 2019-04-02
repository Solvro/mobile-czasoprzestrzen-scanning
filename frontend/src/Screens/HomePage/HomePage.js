import React, { Component } from 'react';
import SearchContainer from '../../Components/SearchContainer/SearchContainerWithSelect';
import Table from '../../Components/Table/HomeTable';
import Layout from '../../Components/Layout/Layout';
import Toolbar from '../../Components/Toolbar/Toolbar';
import Button from '../../Components/Button/AddButton';
import InfoDisplay from '../../Components/Displays/InfoDisplay';
import {getUserName } from '../../services/userService';
class HomePage extends Component {

  state = {
    loginInfo: false,
    username: "?"
  }
  

  componentWillMount(){
    
    this.getName();
    this.setState({ loginInfo: true });

  }

  getName = async () => {
    const token = await localStorage.getItem('token');
    const user = await getUserName(token);
    this.setState({ username: user });
    console.log("USER " + user);
  }

  render() {
    return (
      <div className="container">
            <Toolbar/>
      <Layout layoutDivide={"282"}>
                <SearchContainer placeholder={"Wyszukaj po nazwie ..."} />
                <Table />
                <div className='AddButtonPosition'><Button text={"Dodaj"} link={"/adds"} /></div>
      </Layout>
      {this.state.loginInfo && <InfoDisplay
        removeInfo={id => {this.setState({loginInfo: false})}}
        info={[{message: 'Zalogowałeś się jako ' + this.state.username, id: 100}]}
        />}
      </div>
    );
  }
}

export default HomePage;