import React from 'react';
import { List, Icon } from "antd";

export default function ListUsers(props) {
    const { users } = props;
    return (
        <div className="list-users">
            <h1>Lista de Usuarios</h1>
            <List
                className="users"
                itemLayout="horizontal"
                dataSource={users}
                renderItem={user => (
                    <List.Item>
                        <Icon type="user"/>
                        <List.Item.Meta 
                            avatar={<Icon type="user"/>}
                            title={`${user.name} ${user.lastname}`}
                            description={`${user.email}`}
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}
