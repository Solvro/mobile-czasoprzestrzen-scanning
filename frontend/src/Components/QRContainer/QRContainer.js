import React from 'react';
import Layout from '../../Components/Layout/Layout';

const QRCode = require('qrcode.react');

class QRContainer extends React.Component {

    render() {
        var qrValue = "rent:" + this.props.rentID;
        console.log("QR" + qrValue)
        return (
            <Layout layoutDivide={'444'}>
                <div className="HpQrcode" style={{ padding: '2em' }}>
                    <QRCode value={qrValue} renderAs={'canvas'} level={'H'} size={120} /></div>
            </Layout>
        )
    };

}


export default (QRContainer);