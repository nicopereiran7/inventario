import React, { useState } from 'react';
import { createProductApi } from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";
import { Form, Icon, Input, InputNumber, Select, Row, Col, Button, notification } from "antd";
import { createRegisterApi } from "../../../../api/register";
import jwt from "jwt-decode";

import "./AddProductForm.scss";

export default function AddProductForm(props) {
    const { setIsVisibleModal, setReloadProducts, categories } = props;
    const [productData, setProductData] = useState({});   
    const [register, setRegister] = useState({});

    const addProduct = event => {
        event.preventDefault();
        
        if(!productData.name || !productData.description || !productData.cantidad) {
            notification["error"]({
                message: "Todos los campos son obligatorios"
            })
        }else {
            const token = getAccessTokenApi();
            
            createProductApi(token, productData)
                .then(response => {
                    notification["success"]({
                        message: "Producto Creado"
                    })
                    const { id } = jwt(token);
                    register.user = id;
                    register.product = response.product._id;
                    register.productName = response.product.name;
                    register.action = "6082128989859d35c4480919";
                    register.stock = response.product.cantidad;   
                    createRegisterApi(token, register);
                    setIsVisibleModal(false);
                    setReloadProducts(true);
                    setProductData({});
                })
                .catch(err => {
                    notification["error"]({
                        message: err.message
                    })
                });
        }
    }

    return (
        <div className="add-product-form">
            <AddForm productData={productData} setProductData={setProductData} addProduct={addProduct} categories={categories}/>
        </div>
    )

}

function AddForm(props) {
    const { productData, setProductData, addProduct, categories } = props;
    const { Option } = Select;

    return (
        <Form className="form-add" onSubmit={addProduct}>
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item>
                        <Input 
                            prefix={<Icon type="shop"/>}
                            placeholder="Nombre del Producto"
                            value={productData.name}
                            onChange={e => setProductData({ ...productData, name: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item>
                        <Input 
                            prefix={<Icon type="snippets"/>}
                            placeholder="Descripcion del Producto"
                            value={productData.description}
                            onChange={e => setProductData({ ...productData, description: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={6}>
                    <Form.Item>
                        <InputNumber 
                            prefix={<Icon type="snippets"/>}
                            placeholder="Stock"
                            value={productData.cantidad}
                            onChange={e => setProductData({ ...productData, cantidad: e })}
                        />
                    </Form.Item>
                </Col>
                <Col span={18}>
                    <Form.Item>
                        <Select
                            placeholder="Selecciona Categoria"
                            onChange={e => setProductData({ ...productData, category: e })}
                            value={productData.category}
                        >
                            {categories.map(item => (
                                <Option key={item._id} value={item._id}>{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Crear Producto
                </Button>
            </Form.Item>
        </Form>
    );
}
