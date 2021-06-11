import React, { useState } from 'react';
import { Form, Icon, Input, Row, Col, Button, notification } from "antd";
import { getAccessTokenApi } from "../../../../api/auth";
import { createCategoryApi } from "../../../../api/user";

export default function AddCategoriesForm(props) {
    const { setIsVisibleModal, setReloadCategories } = props;
    const [categoryData, setCategoryData] = useState({});
    const addCategory = (event) => {
        event.preventDefault();

        if(!categoryData.name) {
            notification["error"]({
                message: "El nombre es Obligatorio"
            })
        }else {
            const token = getAccessTokenApi();
            createCategoryApi(token, categoryData).then(response => {
                if(response.message) {
                    notification["error"]({
                        message: response.message
                    })
                }else {
                    notification["success"]({
                        message: "Categoria Creada"
                    })
                    setIsVisibleModal(false);
                    setReloadCategories(true);
                    setCategoryData({});
                }
            }).catch(err => {
                notification["error"]({
                    message: err.message
                })
            });
        }
        
    }

    return (
        <div>
            <AddForm addCategory={addCategory} categoryData={categoryData} setCategoryData={setCategoryData} />
        </div>
    )
}

function AddForm(props) {
    const { addCategory, categoryData, setCategoryData } = props;
    return (
        <Form className="add-form" onSubmit={addCategory}>
            <Row gutter={24}>
                <Col span={24}> 
                    <Form.Item>
                        <Input 
                            prefix={<Icon type="shop"/>}
                            placeholder="Nombre de la Categoria"
                            value={categoryData.name}
                            onChange={e => setCategoryData({ ...categoryData, name: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Crear Categoria
                </Button>
            </Form.Item>
        </Form>
    );
}
