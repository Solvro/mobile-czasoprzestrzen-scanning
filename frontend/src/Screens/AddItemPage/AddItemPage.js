import React, { Component } from 'react';
import Form from '../../Components/Form/Form';
import Layout from '../../Components/Layout/Layout';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '../../Components/Button/AddButton';
import TypeSelect from '../../Components/Selects/Select';
import InputField from '../../Components/Input/InputField';
import Toolbar from '../../Components/Toolbar/Toolbar';
import ErrorDisplay from '../../Components/Displays/ErrorDisplay';
import {addNewItemToItemList, getItemTypesList} from '../../services/itemsService';

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
      itemTypesList: []
    }
  }
  
  async componentDidMount() {
    await getItemTypesList()
    .then((res) => {
      this.setState({isLoading : false});
      console.log(res);
      var itemTypes = []
      for(var i = 0; i < res.length; i++){
          itemTypes[i] = res[i].type_name
      }
      console.log("ITEM"+itemTypes);
      this.setState({itemTypesList : itemTypes});
    })
  }

  handleItemName = event => {
    this.setState({ itemName: event.target.value });
    
  }

  handleItemDecription = event => {
    this.setState({ itemDecription: event.target.value });
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
    this.setState({ itemType: +event.target.value + 1 }, ()=> console.log("Item"+(this.state.itemType)));
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

    const button = <Button link={'/home'} text={"Dodaj"} onClick={this.tryToAddItem}></Button>;
    const header = <div class='headText'>Dodaj nową rzecz do magazynu</div>;

    return (
      <div className="container">
            <Toolbar/>
      <Layout layoutDivide={"363"}>
        <Form header={header} button={button}>

          <InputField placeholder={"Nazwa"} rows={"1"} label={"Nazwa urządzenia"} onChange={this.handleItemName}>
          </InputField>

          <TypeSelect value={this.state.item} onChange={this.handleSelectChange} itemTypes={this.state.itemTypesList}></TypeSelect>

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
      </div>
    );
  }
}

export default AddItem;