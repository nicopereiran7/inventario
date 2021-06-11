import React from 'react';
import { List } from "antd";

import "./ListActions.scss";

export default function ListActions(props) {
    const { actions } = props;

    return (
        <div className="list-actions">
            <h1>Lista de Acciones</h1>
            <Actions actions={actions} />
        </div>
    )
}

function Actions(props) {
    const { actions } = props;
    return (
        <List 
            size="small"
            bordered
            dataSource={actions}
            renderItem={item => <List.Item>{item.name}</List.Item>}
        />
    );
}
