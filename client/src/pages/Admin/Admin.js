import React, { useEffect, useState } from 'react';
import { Statistic, Row, Col, notification, Icon } from "antd";
import { getUsersApi } from "../../api/user";
import { getProductsApi } from "../../api/product";
import { getRegistersApi } from "../../api/register";
import { getActionsApi } from "../../api/action";
import { getAccessTokenApi } from "../../api/auth";

import "./Admin.scss";

export default function Admin() {
    const [usersCount, setUsersCount] = useState(null);
    const [productCount, setProductCount] = useState(null);
    const [registerCount, setRegisterCount] = useState(null);
    const [actionCount, setActionCount] = useState(null);

    useEffect(() => {
        const token = getAccessTokenApi();
        getUsersApi(token)
            .then(response => {
                setUsersCount(response.users.length);
            })
            .catch(err => {
                notification["error"]({
                    message: err.message
                })  
            })
    }, [])

    useEffect(() => {
        const token = getAccessTokenApi();
        getProductsApi(token)
            .then(response => {
                setProductCount(response.products.length);
            })
            .catch(err => {
                notification["error"]({
                    message: err.message
                })
            })
    }, [])

    useEffect(() => {
        const token = getAccessTokenApi();
        getRegistersApi(token)
            .then(response => {
                setRegisterCount(response.registers.length);
            })
            .catch(err => {
                notification["error"]({
                    message: err.message
                })
            })
    }, []);

    useEffect(() => {
        const token = getAccessTokenApi();
        getActionsApi(token)
            .then(response => {
                setActionCount(response.actions.length);
            })
    }, [])

    return (
        <div className="admin">
            <div className="admin__welcome">
                <h1>Bienvenido al Inventario</h1>
            </div>
            <Row gutter={16}>
                <Col span={12}>
                    <Statistic 
                        prefix={<Icon type="usergroup-delete" style={{ color: "blue" }}/>}
                        title="Usuarios Registrados" 
                        value={usersCount} 
                    />
                </Col>
                <Col span={12}>
                    <Statistic 
                        prefix={<Icon type="shop" style={{ color: "coral" }}/>}
                        title="Productos Registrados" 
                        value={productCount}
                    />
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Statistic 
                        prefix={<Icon type="snippets" style={{ color: "greenyellow" }}/>}
                        title="Numero de Registros" 
                        value={registerCount} 
                    />
                </Col>
                <Col span={12}>
                    <Statistic 
                        prefix={<Icon type="edit" style={{ color: "indigo" }}/>}
                        title="Numero de Acciones" 
                        value={actionCount}
                    />
                </Col>
            </Row>
        </div>
    )
}