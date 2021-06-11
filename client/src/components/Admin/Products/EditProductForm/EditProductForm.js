import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Select, Icon, Row, Col, Button, notification } from "antd";
import { getAccessTokenApi } from "../../../../api/auth";
import { updateProductApi } from "../../../../api/product";
import { createRegisterApi } from "../../../../api/register";
import jwt from "jwt-decode";

export default function EditProductForm(props) {
    const { product, category, setIsVisibleModal, setReloadProducts } = props;
    const { Option } = Select;
    const [productData, setProductData] = useState({});

    const [register, setRegister] = useState({});

    useEffect(() => {
        setProductData({
            name: product.name,
            description: product.description,
            cantidad: product.cantidad,
            category: product.category._id
        })
    }, [product])
    
    const updateProduct = e => {
        e.preventDefault();
        const token = getAccessTokenApi();
        const productUpdate = productData;

        if(!productUpdate.name || !productUpdate.description ) {
            notification["error"]({
                message: "El nombre y la descripcion son obligatoiros"
            })
            return;
        }else {
            updateProductApi(token, productUpdate, product._id).then(result => {
                notification["success"]({
                    message: "Producto Actualizado Correctamente"
                })
                const { id } = jwt(token);
                register.user = id;
                register.product =  product._id;
                register.action = "6082126389859d35c4480916";
                register.stock = productUpdate.cantidad;
                createRegisterApi(token, register);
                setIsVisibleModal(false);
                setReloadProducts(true);
            });
        }
    }
    
    return (
        <div>
            <Form className="form-edit" onSubmit={updateProduct}>
                <Row gutter={24}>
                    <Col span={24}>
                        <Form.Item>
                            <Input 
                                prefix={<Icon type="shop"/>}
                                placeholder="Nombre Producto"
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
                                prefix={<Icon type="shop"/>}
                                placeholder="Descripcion Producto"
                                value={productData.description}
                                onChange={e => setProductData({ ...productData, description: e.target.value })}
                            />
                        </Form.Item>
                    </Col> 
                </Row>
                <Row gutter={24}>
                    <Col span={24}>
                        <Form.Item>
                            <InputNumber
                                prefix={<Icon type="stock"/>}
                                value={productData.cantidad}
                                onChange={e => setProductData({ ...productData, cantidad: e })}
                                
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24}>
                        <Form.Item>
                            <Select
                                onChange={e => setProductData({ ...productData, category: e })}
                                value={productData.category}
                            >
                                {category.map(item => (
                                    <Option 
                                        key={item._id} 
                                        value={item._id}
                                    >
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>  
                </Row>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="btn-submit">
                        Actualizar Producto
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
