import React, { Component } from "react";
import SearchContainer from "../../Components/SearchContainer/SearchContainer";
import Table from "../../Components/Table/RentsTable";
import Layout from "../../Components/Layout/Layout";
import Toolbar from "../../Components/Toolbar/Toolbar";
import {
  getFinishedRentsList,
  getOngoingRentsList
} from "../../services/rentService";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";

var styles = {
  subBarChild1: {
    float: "left",
    marginRight: "5px",
    position: "relative",
    width: "49%"
  },
  subBarChild2: {
    float: "right",
    position: "relative",
    width: "49%",
    fontSize: "20px",
    marginBottom: "1em",
    // paddingTop: "1.1em"
  },
  subBarParent: {
    marginTop: "6em",
    width: "100%"
  },
  SearchContent: {
    marginTop: "0em",
    fontSize: "20px",
    marginBottom: "1em",
    padding: "1em"
  }
};

class Rents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rentListTable: "",
      isLoading: true,
      infoMessage: "",
      errorMsg: "",
      buttonClicked: 0,
      lastNameFilter: ""
    };
  }

  async componentDidMount() {
    await getOngoingRentsList().then(res => {
      this.setState({ isLoading: false });
      this.createOngoingTable(res);
    });
  }

  handleButtonChange = (event, value) => {
    this.setState({ buttonClicked: value });
    setTimeout(this.reloadTable, 0);
  };

  handleFilterChange = e => {
    this.setState({ lastNameFilter: e.target.value });
    // this.reloadTable
    setTimeout(this.reloadTable, 0);
  };

  handleKeyDown = e => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };


  reloadTable = async () => {
    var filteredRes
    if (this.state.buttonClicked === 0) {
      await getOngoingRentsList().then(res => {
        this.setState({ isLoading: false });
        filteredRes = this.filterByNameContains(res, this.state.lastNameFilter)
        this.createOngoingTable(filteredRes);
      });
    } else {
      await getFinishedRentsList().then(res => {
        this.setState({ isLoading: false });
        filteredRes = this.filterByNameContains(res, this.state.lastNameFilter)
        this.createFinishedTable(filteredRes);
      });
    }
    this.forceUpdate();
  };

  filterByNameContains = (res, lastNameFilter) => {
    return Object.keys(res).filter(function(params){
      return res[params].equipment_data!==null
    }).filter(function(params) {
      return res[params]
        .equipment_data
        .name
        .toLowerCase()
        .includes(lastNameFilter.toLowerCase())
    }).map(function(i){
      return res[i];
    })
  }

  createOngoingTable(res) {
    var rows = [];
    var equipmentName;
    var username;

    for (var i = 0; i < res.length; i++) {
      equipmentName =
        res[i].equipment_data === null ? "-" : res[i].equipment_data.name;
      if (res[i].client_data !== null) {
        username = res[i].client_data.username;
        
      } else {
        username = "-";
      }

      rows.push([
        res[i].id,
        equipmentName,
        username,
        res[i].rental_date,
        res[i].expected_return,
        res[i].actual_return
      ]);
    }
    var header = [
      "Nr",
      "Nazwa",
      "Wypożyczający",
      "Data Wypożyczenia",
      "Spodziewana data zwrotu"
    ];
    var table = <Table header={header} rows={rows} />;
    this.setState({ rentListTable: table });
  }

  createFinishedTable(res) {
    var rows = [];
    var equipmentName;
    var username;

    for (var i = 0; i < res.length; i++) {
      equipmentName =
        res[i].equipment_data === null ? "-" : res[i].equipment_data.name;
      if (res[i].client_data !== null) {
        username = res[i].client_data.username;
       
      } else {
        username = "-";
      }

      rows.push([
        res[i].id,
        equipmentName,
        username,
        res[i].rental_date,
        res[i].expected_return,
        res[i].actual_return
      ]);
    }
    var header = [
      "Nr",
      "Nazwa",
      "Wypożyczający",
      "Data Wypożyczenia",
      "Spodziewana data zwrotu",
      "Data zwrotu"
    ];
    var table = <Table header={header} rows={rows} />;
    this.setState({ rentListTable: table });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="container">
        <Toolbar />
        <Layout layoutDivide={"282"}>
          <div className={classes.subBarParent}>
            <div className={classes.subBarChild1}>
              <SearchContainer
                onChange={this.handleFilterChange} 
                onKeyDown={this.handleKeyDown}
                className={classes.SearchContent}
                placeholder={"Wyszukaj po nazwie ..."}
              />
            </div>
            <div className={classes.subBarChild2}>
              <AppBar position="static" color="primary">
                <Tabs
                  value={this.state.buttonClicked}
                  onChange={this.handleButtonChange}
                  indicatorColor="secondary"
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

export default withStyles(styles)(Rents);