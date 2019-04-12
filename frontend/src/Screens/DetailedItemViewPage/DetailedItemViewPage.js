import React, { Component } from 'react';
import Layout from '../../Components/Layout/Layout';
import Button from '../../Components/Button/Button';
import InputField from '../../Components/Input/InputField';
import Toolbar from '../../Components/Toolbar/Toolbar';
import Form from '../../Components/Form/Form';
import ErrorDisplay from '../../Components/Displays/ErrorDisplay';
import InputAdornment from '@material-ui/core/InputAdornment';
import QRContainer from '../../Components/QRContainer/QRContainer';
import { getItemViewFromId, getItemTypesList, editItemData } from '../../services/itemsService';

class NewAccountPage extends Component {
    constructor(props) {
        super(props);
        this.itemID = this.props.location.ID;
        this.state = {
            itemName: '',
            itemDescription: '',
            itemRentTime: '',
            itemType: 1,
            isLoading: true,
            form: '',
            formError: false,
            errorMessage: ''
        }
    }

    async componentDidMount() {

        const itemTypes = await getItemTypesList()
            .then((res) => {
                const itemTypes = []
                for (var i = 0; i < res.length; i++) {
                    itemTypes[i] = res[i].type_name
                }
                console.log(itemTypes)
                return itemTypes;
            })
        console.log("ID" + this.itemID);
        const res = await getItemViewFromId(this.props.location.ID)

        console.log("RES" + res.name);
        this.setState({ itemName: res.name,
            itemDescription: res.description,
            itemRentTime: res.max_rent_time });
        this.createForm(res);

        this.setState({ 
            isLoading: false,
            typesList: itemTypes 
        });

    }

    handleChangeItemName = event => {
        this.setState({ itemName: event.target.value });
    }

    handleChangeItemDescpition = event => {
        this.setState({ itemDescription: event.target.value });
    }

    handleChangeRentTime = event => {
        this.setState({ itemRentTime: event.target.value });
    }

    tryToEditItem = async e => {
        e.preventDefault();
        const { itemName, itemType, itemDescription,itemRentTime } = this.state;
        if(itemName=== '' || itemType === 0 || itemRentTime===''){
          this.setState({ formError:  true});
          this.setState({ errorMessage:  "Żadne pole nie może być puste"});
        }
        else{
          const editItem = await editItemData(this.itemID,itemName,itemType,itemDescription,itemRentTime);
            if (editItem) {
                this.props.history.push('/home')
            } else {
              this.setState({ formError:  true});
              this.setState({ errorMessage:  "Coś poszło nie tak"});
            } 
        }
        
      }

    createForm = (res) => {
        const button = <div><Button link={'/home'} text={"Anuluj"}></Button>
            <Button link={'/home'} onClick={this.tryToEditItem} text={"Zatwierdź"}></Button></div>;
        const header = <div class='headText'>Edycja sprzętu</div>;
        
        
        console.log("NAME"+this.state.itemName)
        var form = (<Form header={header} button={button}>

            <InputField defaultValue={this.state.itemName}
                rows={"1"}
                label={"Nazwa"}
                onChange={this.handleChangeItemName}>
            </InputField>

            <InputField defaultValue={this.state.itemDescription}
                label={"Opis"}
                rows={"4"}
                onChange={this.handleChangeItemDescpition}>
            </InputField>

            <InputField defaultValue={this.state.itemRentTime} label={"Maksymalny czas wypożyczenia"}
                rows={"1"} onChange={this.handleItemRentTime}
                inputprops={{ endAdornment: <InputAdornment position="end" >dni</InputAdornment> }}>
            </InputField>

            <QRContainer rentID={this.props.location.ID}></QRContainer>
        </Form>);

        this.setState({ form: form });
    }

    render() {
        return (
            <div className="container">
                <Toolbar />
                <Layout layoutDivide={"363"}>
                    {!this.state.isLoading ? this.state.form : null}
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

export default NewAccountPage;