import React from 'react';
import Button from '../../Components/Button/Button';
import Layout from '../../Components/Layout/Layout';

const QRCode = require('qrcode.react');

class QRContainer extends React.Component{
    constructor(props) {
        super(props);    
    }

    download(el) {
        const canvas = document.querySelector('.HpQrcode > canvas');
        var image = canvas.toDataURL("image/jpg");
        el.href = image;
    }
    render() {
        var qrValue = "rent:"+this.props.rentID;
        const rightChildren = <div>
            <div style={{display: "none"}} className="HpQrcode">
            <QRCode value={qrValue} renderAs={'canvas'} level={'H'} /></div>
            <Button text={"Pobierz QR"} link={"/home"} onClick={() => this.download(this)}></Button></div>;
    return (
        <Layout layoutDivide={'282'}>
        <Layout layoutDivide={'66'}
            rightChildren = {rightChildren}
        ></Layout>
         </Layout>
    )};
    
}


export default (QRContainer);