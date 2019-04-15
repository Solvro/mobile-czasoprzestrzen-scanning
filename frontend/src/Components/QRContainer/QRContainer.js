import React from 'react';
import Layout from '../../Components/Layout/Layout';
import * as jsPDF from 'jspdf';
import { renderToString } from "react-dom/server";
const QRCode = require('qrcode.react');

class QRContainer extends React.Component {

//  print = () => {
//      console.log("PRINT")
//     // const canvas = document.querySelector('.HpQrcode > canvas');
//     // let pdf = new jsPDF('p', 'mm', 'a4');
//     // pdf.addImage(canvas.toDataURL('image/png'), 'PNG');
//     // pdf.save("QR");
// };
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