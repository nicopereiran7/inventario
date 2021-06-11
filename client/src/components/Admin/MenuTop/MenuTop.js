import React, { useState, useEffect } from 'react';
import { Button, Icon } from "antd";
import logo from "../../../assets/img/logo.png";
import { logOut, getAccessTokenApi } from "../../../api/auth";
import jwt from "jwt-decode"

import "./MenuTop.scss";

export default function MenuTop() {
    const [user, setUser] = useState("");
    
    useEffect(() => {
        const token = getAccessTokenApi();
        const { nombre, apellido } = jwt(token);
        setUser(`${nombre} ${apellido}`); 
    }, [])

    const logoutUser = () => {
        logOut();
        window.location.reload();
    }
    return (
        <div className="menu-top">
            <h2>Inventario</h2>   
            <div className="menu-top__left">
                <img className="menu-top__left-logo" src={logo} alt="Nicolas Pereira"/>
            </div>
            <div className="menu-top__right">
                <Button type="link" onClick={logoutUser}>
                    <Icon type="user" />{user}
                </Button>
                <Button type="link" onClick={logoutUser}>
                    <Icon type="poweroff" />
                </Button>
            </div>
        </div>
    )
}
