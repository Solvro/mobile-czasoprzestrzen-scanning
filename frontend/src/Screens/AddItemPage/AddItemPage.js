import React, { Component } from 'react';
import Form from '../../Components/Form/Form';
import Layout from '../../Components/Layout/Layout';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '../../Components/Button/AddButton';
import InputField from '../../Components/Input/InputField';
import Toolbar from '../../Components/Toolbar/Toolbar';
import ErrorDisplay from '../../Components/Displays/ErrorDisplay';
import {addNewItemToItemList, getItemTypesList} from '../../services/itemsService';
import {userSuperAdmin} from '../../services/userService';
import Select from '../../Components/Selects/Select';
import TextButton from '@material-ui/core/Button';
import {addNewItemType} from "../../services/itemsService";
import Dialog from '../../Components/Dialog/InputDialog';

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: '',
      itemType: 0,
      itemDecription: '',
      itemRentTime: '',
      formError: false,
      errorMessage: '',
      item: '',
      isLoading: true,
      itemTypesList: [],
      isSuperAdmin: false,
      typeName: '',
      dialogOpen: false,
      isMobile: false
    }
  }
  updateDimensions() {
    if(window.innerWidth < 700)
      this.setState({isMobile: true});
    else
      this.setState({isMobile: false});
  }
    
  async componentDidMount() {
    updateDimensions()
    window.addEventListener("resize", this.updateDimensions.bind(this));
    await userSuperAdmin()
    .then((isSuperAdmin) => { 
      this.setState({isSuperAdmin: isSuperAdmin}); 
    })
    await getItemTypesList()
    .then((res) => {
      
      this.setState({itemTypesList : res});
    })
  }
  componentWillUnmount(){
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  updateData = async () => {
    await getItemTypesList()
    .then((res) => {
      
      this.setState({itemTypesList : res});
      console.log(res);
    })
    
    this.forceUpdate();
    
  }

  handleItemName = event => {
    this.setState({ itemName: event.target.value });
    
  }

  handleItemDecription = event => {
    this.setState({ itemDecription: event.target.value });
  }


handleDialogOpen = () => {
  this.setState({ dialogOpen: true });
};

handleDialogCloseRefuse = () => {
  this.setState({ dialogOpen: false });
};

async handleDialogCloseAgree () {
  this.setState({ dialogOpen: false });
  await addNewItemType(this.state.typeName);
  this.updateData();
};

handleChangeType = event => {
  this.setState({ typeName: event.target.value });
}


  handleItemRentTime = event => {
    var itemTime = event.target.value
    if(!isNaN(itemTime)){
      this.setState({ itemRentTime:  itemTime});
    }
    else{
      this.setState({ formError:  true});
      this.setState({ errorMessage:  "Nieprawidłowa liczba dni."});
    }
    
  }

  handleSelectChange = event => {
    this.setState({ itemType: +event.target.value });
  };

  tryToAddItem = async e => {
    e.preventDefault();
    const { itemName, itemType, itemDecription,itemRentTime } = this.state;
    if(itemName=== '' || itemType === 0 || itemRentTime===''){
      this.setState({ formError:  true});
      this.setState({ errorMessage:  "Żadne pole nie może być puste"});
    }
    else{
      const addItem = await addNewItemToItemList(itemName,itemType,itemDecription,itemRentTime);
        if (addItem) {
            this.props.history.push('/home')
        } else {
          this.setState({ formError:  true});
          this.setState({ errorMessage:  "Coś poszło nie tak"});
        } 
    }  
  }



  render() {
    const { isMobile } = this.state;
    const button = <Button link={'/home'} text={"Dodaj"} onClick={this.tryToAddItem} mobile={isMobile}></Button>;
    const header = <div className='headText'>Dodaj nową rzecz do magazynu</div>;
    const layoutMode = isMobile ? "1101" : "363";

    return (
      <div className="container">
            <Toolbar/>
      <Layout layoutDivide={layoutMode}>
        <Form header={header} button={button}>

          <InputField placeholder={"Nazwa"} rows={"1"} label={"Nazwa urządzenia"} onChange={this.handleItemName}>
          </InputField>

          <div>
          <Select value={this.state.item} onChange={this.handleSelectChange} itemTypes={this.state.itemTypesList}>
          </Select> 
          {this.state.isSuperAdmin ? <TextButton fullWidth onClick={this.handleDialogOpen} >Dodaj nowy typ + </TextButton> : null }
          </div>

          <InputField placeholder={"Opis"} rows={"4"} label={"Opis"} onChange={this.handleItemDecription}>
          </InputField>

          <InputField placeholder={"Czas wypożyczenia"} label={"Maksymalny czas wypożyczenia"} rows={"1"} onChange={this.handleItemRentTime}
              inputprops={{endAdornment: <InputAdornment position="end" >dni</InputAdornment>}}>
          </InputField>
 
        </Form>
      </Layout>
      {this.state.formError &&
                <ErrorDisplay
                    removeError={id => {this.setState({formError: false})}}
                    errors={[{message: this.state.errorMessage, id: 100}]}
                    />}
      <Dialog dialogOpen={this.state.dialogOpen} handleCloseRefuse={this.handleDialogCloseRefuse} 
      handleCloseAgree={() =>  {this.handleDialogCloseAgree()}} handleChangeType={this.handleChangeType}>
      </Dialog>
      </div>
    );
  }
}

export default AddItem;