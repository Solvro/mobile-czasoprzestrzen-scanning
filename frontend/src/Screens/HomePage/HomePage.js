import React, { Component } from "react";
import SearchContainer from "../../Components/SearchContainer/SearchContainerWithSelect";
import Table from "../../Components/Table/HomeTable";
import Layout from "../../Components/Layout/Layout";
import Toolbar from "../../Components/Toolbar/Toolbar";
import Button from "../../Components/Button/AddButton";
import InfoDisplay from "../../Components/Displays/InfoDisplay";
import Dialog from "../../Components/Dialog/Dialog";
import { getUserName } from "../../services/userService";
import Icon from "@material-ui/core/Icon";
import {
  getItemsList,
  removeItemFromList,
  returnItem,
  getItemTypesList
} from "../../services/itemsService";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import Tooltip from "../../Components/Tooltip/Tooltip"



class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemListTable: "",
      loginInfo: false,
      username: "?",
      isLoading: true,
      dialogOpen: false,
      returnDialogOpen: false,
      clickedItemId: 0,
      messageInfo: "",
      lastNameFilter: "",
      lastTypeFilter: 0,
      returnItemID: 0,
      addButton: "",
      itemsList: ""
    };
  }

  filterTableContent() {
    
      var filteredRes = this.state.itemsList;
      if (
        this.state.lastTypeFilter !== undefined &&
        this.state.lastTypeFilter !== "0" &&
        this.state.lastTypeFilter !== 0
      ) {
        filteredRes = this.filterByTypeNameContains(
          filteredRes,
          this.state.lastTypeFilter
        );
      }
      if (this.state.lastNameFilter !== "") {
        filteredRes = this.filterByNameContains(
          filteredRes,
          this.state.lastNameFilter
        );
      }
      this.createTable(filteredRes);
  }

  filterByTypeNameContains = (res, lastTypeFilter) => {
    return Object.keys(res)
      .filter(function(params) {
        return res[params].type.id === parseInt(lastTypeFilter);
      })
      .map(function(i) {
        return res[i];
      });
  };

  filterByNameContains = (res, lastNameFilter) => {
    return Object.keys(res)
      .filter(function(params) {
        return res[params].name
          .toLowerCase()
          .includes(lastNameFilter.toLowerCase());
      })
      .map(function(i) {
        return res[i];
      });
  };

  async componentDidMount() {
    await getItemTypesList().then(res => {
      res.unshift({id: "0",type_name:"-"})
      this.setState({ typesList: res });
    });
    if (this.state.isLoading === true) this.getName();
    await getItemsList().then(res => {
      this.setState({ 
        isLoading: false,
        itemsList: res
      });
      this.createTable(res);
    });
    this.updateDimensions()
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount(){
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    var addBtn = ''
    if(window.innerWidth < 1400) {
      addBtn = <div className="AddButtonPosition">
      <Button text={""} link={"/adds"} button={"smallAddButton"} />
    </div>
    
    } else {
      addBtn = <Tooltip title="Kliknij, aby dodać nowy przedmiot">
        <div className="AddButtonPosition">
          <Button text={"Dodaj"} link={"/adds"} />
        </div>
      </Tooltip>
    }
    this.setState({addButton: addBtn});
  }

  updateData = async () => {
    await getItemsList().then(res => {
      this.setState({ 
        isLoading: false,
        itemsList: res
      });
      this.createTable(res);
    });
    this.forceUpdate();
  };

  //dialog on remove
  handleDialogOpen = id => {
    this.setState({ dialogOpen: true, clickedItemId: id });
  };

  handleDialogCloseRefuse = () => {
    this.setState({ dialogOpen: false });
  };

  handleDialogCloseAgree = async () => {
    this.setState({ dialogOpen: false });
    removeItemFromList(this.state.clickedItemId);
    this.setState({ loginInfo: true, messageInfo: "Usunięto " });
    // this.updateData();
    setTimeout(this.updateData, 2000);
  };

  //dialog on return
  handleReturnDialogOpen = id => {
    this.setState({ returnDialogOpen: true, returnItemID: id });
  };

  handleReturnDialogCloseRefuse = () => {
    this.setState({ returnDialogOpen: false });
  };

  handleReturnDialogCloseAgree = () => {
    this.setState({ returnDialogOpen: false });
    returnItem(this.state.returnItemID);
    this.setState({ loginInfo: true, messageInfo: "Zwrócono " });
    this.updateData();
  };

  createButtonEdit(id) {
    const newTo = {
      pathname: "/detailedItem",
      ID: id
    };
    return (
      <Tooltip title="Kliknij, aby rozpocząć edycję przedmiotu">
        <Link to={newTo}>
          <IconButton aria-label="Approve" onClick={() => console.log(id)}>
            <Icon>arrow_forward</Icon>{" "}
          </IconButton>
        </Link>
      </Tooltip>
    );
  }
  createButtonRemove(id) {
    return (
      <Tooltip title="Kliknij, aby usunąć przedmiot">
        <IconButton aria-label="Delete" onClick={() => this.handleDialogOpen(id)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    );
  }

  createButtonReturn(id) {
    return (
      <IconButton
        aria-label="Delete"
        onClick={() => this.handleReturnDialogOpen(id)}
      >
        <Tooltip title="Przedmiot niedostępny. Kliknij, aby zwrócić"><Icon>close</Icon></Tooltip>{" "}
      </IconButton>
    );
  }

  createTable = res => {
    var rows = [];

    var ID = 0;
    for (var i = 0; i < res.length; i++) {
      ID = res[i].id;
      var available = this.createButtonReturn(ID);
      if (res[i].available === true) {
        available = <Tooltip title="Przedmiot dostępny"><Icon>done</Icon></Tooltip>;
      }
      ID = res[i].id;
      rows.push([
        ID,
        res[i].name,
        res[i].type.type_name,
        available,
        this.createButtonRemove(ID),
        this.createButtonEdit(ID)
      ]);
    }
    var table = <Table contains={rows} />;
    this.setState({ itemListTable: table });
  };

  getName = async () => {
    const prevLocation = await localStorage.getItem("prev");
    if (prevLocation === "login") {
      const token = await localStorage.getItem("token");
      const user = await getUserName(token);
      this.setState({ username: user });
      await localStorage.setItem("prev", "null");
      this.setState({
        loginInfo: true,
        messageInfo: "Zalogowałeś się jako " + this.state.username
      });
    }
  };

  handleChange = (fieldToFilterOn, value) => {
    if (fieldToFilterOn === "name") 
      this.setState({ lastNameFilter: value }, () => this.filterTableContent());
    else 
      this.setState({ lastTypeFilter: value }, () => this.filterTableContent());
  };

  handleKeyDown = e => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  render() {
    return (
      <div className="container">
        <Toolbar />
        <Layout layoutDivide={"282"}>
          {!this.state.isLoading ? (
            <SearchContainer
              placeholder={"Wyszukaj po nazwie..."}
              onChange={this.handleChange.bind(this)}
              rows={"1"}
              onKeyDown={this.handleKeyDown}
              itemTypes={this.state.typesList}
            />
          ) : null}

          {!this.state.isLoading ? this.state.itemListTable : null}
          {this.state.addButton}
        </Layout>

        <Dialog
          dialogOpen={this.state.dialogOpen}
          handleCloseRefuse={this.handleDialogCloseRefuse}
          handleCloseAgree={this.handleDialogCloseAgree}
          message={"Czy na pewno chcesz usunąć rzecz z magazynu?"}
        />

        <Dialog
          dialogOpen={this.state.returnDialogOpen}
          handleCloseRefuse={this.handleReturnDialogCloseRefuse}
          handleCloseAgree={this.handleReturnDialogCloseAgree}
          message={"Czy na pewno chcesz zwrócić rzecz do magazynu?"}
        />

        {this.state.loginInfo && (
          <InfoDisplay
            removeInfo={id => {
              this.setState({ loginInfo: false });
            }}
            info={[{ message: this.state.messageInfo, id: 101 }]}
          />
        )}
      </div>
    );
  }
}

export default HomePage;
