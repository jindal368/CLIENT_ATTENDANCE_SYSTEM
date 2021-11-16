import React ,{useEffect}from 'react'
import QRCode from 'qrcode.react'
import {useSelector , useDispatch} from 'react-redux'
import {updateStudent , getStudentData , resetStudent} from '../../actions/attendance'
import { Button } from '@material-ui/core';
import { updateStudentData } from '../../api';
export default function QrCodeGenerator({value}) {
    const userType = useSelector((state)=> state.auth);
    const dispatch = useDispatch();
    const data = {
        _id : value,
        data : userType?.authData?.result
    }
  
    return (
        <div>
            <QRCode
             value={value}
             renderAs="svg"
            fgColor="#333"
            bgColor="#fff"
            key={`key-${value}`}
            />
            <Button onClick={() => dispatch(updateStudent(data))} style={{color: 'pink'}} >Update data</Button>
        </div>
    )
}
