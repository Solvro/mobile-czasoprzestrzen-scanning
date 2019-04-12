import React from 'react';
import Button from '../../Components/Button/Button';
import Layout from '../../Components/Layout/Layout';

const QRCode = require('qrcode.react');

class QRContainer extends React.Component{
    constructor(props) {
        super(props);    
    }

    download() {
        
    }
    render() {
        var qrValue = "rent:"+this.props.rentID;
        const rightChildren = <div>
            <QRCode value={qrValue} />
            <Button text={"Pobierz QR"} link={"/home"}></Button></div>;
    return (
        <Layout layoutDivide={'282'}>
        <Layout layoutDivide={'66'}
            rightChildren = {rightChildren}
        ></Layout>
         </Layout>
    )};
    
}


export default (QRContainer);