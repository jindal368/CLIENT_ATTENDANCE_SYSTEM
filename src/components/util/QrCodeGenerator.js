import React from 'react'
import QRCode from 'qrcode.react'
export default function QrCodeGenerator({props}) {
    return (
        <div>
            <QRCode
             value="https://conference368.herokuapp.com"
            />
        </div>
    )
}
