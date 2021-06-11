import React from 'react';
import { List, Icon } from "antd";

export default function ListRegisters(props) {
    const { registers } = props;
    
    return (
        <div className="list-registers">
            <div className="list-registers__header">
                <h1>Lista de Registros</h1>
            </div>
            <div className="list-registers__list">
                <List
                    className="registers"
                    itemLayout="horizontal"
                    dataSource={registers}
                    renderItem={register => (
                        <List.Item>
                            <Icon type="snippets"/>
                            <List.Item.Meta 
                                avatar={<Icon type="shop"/>}
                                title={register.product === null ? register.productName : `${register.product.name} | ${register.product.description} | STOCK: ${register.stock}`}
                                description={`${register.user.name} ${register.user.lastname}`}
                            />
                            <div>
                                <p>{register.action.name}</p>
                                <p>{register.date}</p>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    )
}

