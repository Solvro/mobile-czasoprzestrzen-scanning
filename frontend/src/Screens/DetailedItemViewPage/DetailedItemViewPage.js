import React, { Component } from 'react';
import Layout from '../../Components/Layout/Layout';
import Button from '../../Components/Button/Button';
import InputField from '../../Components/Input/InputField';
import Toolbar from '../../Components/Toolbar/Toolbar';
import Form from '../../Components/Form/Form';
import ErrorDisplay from '../../Components/Displays/ErrorDisplay';
import InputAdornment from '@material-ui/core/InputAdornment';
import TypeSelect from '../../Components/Selects/Select';
import { getItemViewFromId, getItemTypesList, editItemData } from '../../services/itemsService';
import * as jsPDF from 'jspdf';

const QRCode = require('qrcode.react');
class NewAccountPage extends Component {
    constructor(props) {
        super(props);
        this.itemID = this.props.location.ID;
        this.state = {
            itemName: '',
            itemDescription: '',
            itemRentTime: '',
            itemType: 0,
            isLoading: true,
            form: '',
            formError: false,
            errorMessage: '',
            item: '1',
            isMobile: false
        }
    }

    updateDimensions() {
        if (window.innerWidth < 700)
            this.setState({ isMobile: true });
        else
            this.setState({ isMobile: false });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    async componentDidMount() {
        this.updateDimensions()
        window.addEventListener("resize", this.updateDimensions.bind(this));
        const itemTypes = await getItemTypesList()


        const res = await getItemViewFromId(this.props.location.ID)

        this.setState({
            itemName: res.name,
            itemDescription: res.description,
            itemRentTime: res.max_rent_time,
            itemType: res.type.id,
            // item: res.type,
            itemTypesList: itemTypes
        });

        this.createForm(res);

        this.setState({
            isLoading: false,

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

    handleSelectChange = event => {
        console.log(event.target.value);
        this.setState({ itemType: +event.target.value });
    };

    tryToEditItem = async e => {
        e.preventDefault();
        const { itemName, itemType, itemDescription, itemRentTime } = this.state;
        if (itemName === '' || itemType === 0 || itemRentTime === '') {
            this.setState({ formError: true });
            this.setState({ errorMessage: "Żadne pole nie może być puste" });
        }
        else {
            const editItem = await editItemData(this.itemID, itemName, itemType, itemDescription, itemRentTime);
            if (editItem) {
                this.props.history.push('/home')
            } else {
                this.setState({ formError: true });
                this.setState({ errorMessage: "Coś poszło nie tak" });
            }
        }

    }

    createForm = (res) => {
        const newTo = {
            pathname: "/detailedItem",
            ID: this.itemID
        };
        const qrMessage = "rent:" + this.itemID;
        const button = <div><Button link={'/home'} text={"Anuluj"} mobile={this.state.isMobile}></Button>
            <Button link={'/home'} onClick={this.tryToEditItem} text={"Zatwierdź"} mobile={this.state.isMobile}></Button>
            <Button text={"Pobierz QR"} link={newTo} onClick={this.print} mobile={this.state.isMobile} ></Button></div>

        const header = <div className='headText'>Edycja sprzętu</div>;


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

            <TypeSelect value={this.state.item} onChange={this.handleSelectChange} itemTypes={this.state.itemTypesList}></TypeSelect>

            <InputField defaultValue={this.state.itemRentTime} label={"Maksymalny czas wypożyczenia"}
                rows={"1"} onChange={this.handleItemRentTime}
                inputprops={{ endAdornment: <InputAdornment position="end" >dni</InputAdornment> }}>
            </InputField>

            <Layout layoutDivide={'444'}>
                <div className="HpQrcode" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <QRCode value={qrMessage} renderAs={'canvas'} level={'H'} size={120} /></div>
            </Layout>


        </Form>);

        this.setState({ form: form });
    }

    print = () => {
        const canvas = document.querySelector('.HpQrcode > canvas');
        let pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 15, 40, 30, 30);
        pdf.save("QR" + this.itemID + this.state.itemName);
    };


    render() {
        const { isMobile } = this.state;
        const layoutMode = isMobile ? "1101" : "363";
        return (
            <div className="container">
                <Toolbar />
                <Layout layoutDivide={layoutMode}>
                    {!this.state.isLoading ? this.state.form : null}
                </Layout>

                {this.state.formError &&
                    <ErrorDisplay
                        removeError={id => { this.setState({ formError: false }) }}
                        errors={[{ message: this.state.errorMessage, id: 100 }]}
                    />}
            </div>
        );
    }
}

export default NewAccountPage;