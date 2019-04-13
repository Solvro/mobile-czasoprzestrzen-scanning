import React from 'react';
import Layout from '../../Components/Layout/Layout';

const QRCode = require('qrcode.react');

class QRContainer extends React.Component {

    render() {
        var qrValue = "rent:" + this.props.rentID;
        return (
            <Layout layoutDivide={'444'}>
                <div className="HpQrcode" style={{ padding: '2em' }}>
                    <QRCode value={qrValue} renderAs={'svg'} level={'H'} size={120} /></div>
            </Layout>
        )
    };

}


export default (QRContainer);