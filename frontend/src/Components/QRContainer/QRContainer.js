import React from 'react';
import QRCode from 'react-qr-code';
import Button from '../../Components/Button/Button';
import Layout from '../../Components/Layout/Layout';


class QRContainer extends React.Component{
    constructor(props) {
        super(props);    
    }

    download() {
        
    }
    render() {
        var qrValue = "rent:"+this.props.rentID;
        const leftChildren = <QRCode value={qrValue} size={256} />;
        const rightChildren = <Button text={"Pobierz QR"} link={"/home"}></Button>
    return (
        <Layout layoutDivide={'282'}>
        <Layout layoutDivide={'66'}
            rightChildren = {rightChildren}
            leftChildren = {leftChildren}
        ></Layout>
         </Layout>
    )};
    
}


export default (QRContainer);