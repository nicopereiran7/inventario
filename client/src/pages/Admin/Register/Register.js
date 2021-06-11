import React, { useState, useEffect } from 'react';
import ListRegisters from "../../../components/Admin/Register/ListRegisters";
import { getAccessTokenApi } from "../../../api/auth";
import { getRegistersApi } from "../../../api/register";

export default function Register() {
    const [registers, setRegisters] = useState([]);
    const [reloadRegisters, setReloadRegisters] = useState(false);
    const token = getAccessTokenApi();
    
    useEffect(() => {
        getRegistersApi(token).then(response => {
            setRegisters(response.registers);
        });
        setReloadRegisters(false);
    }, [token, reloadRegisters]);

    return (
        <div>
            <ListRegisters registers={registers} setReloadRegisters={setReloadRegisters} />
        </div>
    )
}
