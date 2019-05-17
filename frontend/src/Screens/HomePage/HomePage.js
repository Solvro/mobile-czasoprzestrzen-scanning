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
      addButton: ""
    };
  }

  async filterTableContent() {
    await getItemsList().then(res => {
      var filteredRes = res;
      if (
        this.state.lastTypeFilter !== undefined &&
        this.state.lastTypeFilter !== "0" &&
        this.state.lastTypeFilter !== 0
      ) {
        filteredRes = this.filterByTypeNameContains(
          res,
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
    });
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

  // componentWillMount() {
  //   this.getName();
  // }

  async componentDidMount() {
    this.updateDimensions();
    await getItemTypesList().then(res => {
      res.unshift({id: "0",type_name:"-"})
      this.setState({ typesList: res });
    });
    if (this.state.isLoading === true) this.getName();
    await getItemsList().then(res => {
      this.setState({ isLoading: false });
      this.createTable(res);
    });
    
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  updateDimensions() {
    var addBtn = ''
    if(window.innerWidth < 1400) {
      addBtn = <div className="AddButtonPosition">
      <Button text={""} link={"/adds"} button={"smallAddButton"} />
    </div>
    
    } else {
      addBtn = <div className="AddButtonPosition">
      <Button text={"Dodaj"} link={"/adds"} />
    </div>
    }
    this.setState({addButton: addBtn});
  }

  updateData = async () => {
    await getItemsList().then(res => {
      this.setState({ isLoading: false });
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
      <Link to={newTo}>
        <IconButton aria-label="Approve" onClick={() => console.log(id)}>
          <Icon>edit</Icon>{" "}
        </IconButton>
      </Link>
    );
  }
  createButtonRemove(id) {
    return (
      <IconButton aria-label="Delete" onClick={() => this.handleDialogOpen(id)}>
        <DeleteIcon />
      </IconButton>
    );
  }

  createButtonReturn(id) {
    return (
      <IconButton
        aria-label="Delete"
        onClick={() => this.handleReturnDialogOpen(id)}
      >
        <Icon> close</Icon>{" "}
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
        available = <Icon>done</Icon>;
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
      this.setState({ lastNameFilter: value });
    else 
      this.setState({ lastTypeFilter: value });

    this.filterTableContent();
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
