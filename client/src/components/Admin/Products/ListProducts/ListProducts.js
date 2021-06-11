import React, { useEffect, useState } from 'react';
import { List, Icon, Button, Modal as ModalAntd, notification, Input } from "antd";
import Modal from "../../../../components/Modal";
import EditProductForm from "../../../../components/Admin/Products/EditProductForm";
import AddProductForm from "../../../../components/Admin/Products/AddProductForm";
import { getAccessTokenApi } from "../../../../api/auth";
import { deleteProductApi } from "../../../../api/product";

import "./ListProducts.scss";

export default function Products(props) {
    const { products, category, setReloadProducts } = props;
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const { confirm } = ModalAntd;
    const { Search } = Input;
    const [search, setSearch] = useState("");
    const [searchProducts, setSearchProducts] = useState([]);
    
    const editProduct = (product) => {
        setIsVisibleModal(true);
        setModalTitle(`Editar ${product.name}`);
        setModalContent(<EditProductForm product={product} category={category} setIsVisibleModal={setIsVisibleModal} setReloadProducts={setReloadProducts} />);
    }

    const showDeleteConfirm = (product) => {
        const token = getAccessTokenApi();
        confirm({
            title: "Eliminando Producto",
            content: `¿Estas seguro que quieres eliminar ${product.name}?`,
            okText: "Eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk() {
                deleteProductApi(token, product._id)
                    .then(response => {
                        notification["success"]({
                            message: response.message
                        })
                        setReloadProducts(true);
                    })
                    .catch(err => {
                        notification["error"]({
                            message: err.message
                        })
                    })
            }
        })
    }

    const addProductModal = () => {
        setIsVisibleModal(true);
        setModalTitle("Crear Nuevo Producto");
        setModalContent(<AddProductForm setIsVisibleModal={setIsVisibleModal} setReloadProducts={setReloadProducts} categories={category} />);
    }

    useEffect(() => {
        if(search) {
            const results = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
            setSearchProducts(results);
        }
    }, [search]);

    return (
        <div className="list-products">
            <div className="list-products__header">
                <h1>Lista de Productos</h1>
                <div className="btns">
                    <Search 
                        placeholder="Buscar Producto"
                        enterButton="Search"
                        onChange={value => setSearch(value.target.value)}
                    />
                    <Button type="primary" className="btn" onClick={addProductModal}>
                        Nuevo Producto
                    </Button>
                </div>
            </div>
            <div className="list-products__list">
                {search ? (
                    <List
                        className="products"
                        itemLayout="horizontal"
                        dataSource={searchProducts}
                        renderItem={product => (
                            <List.Item 
                                actions={[
                                    <Button 
                                        type="primary"
                                        onClick={() => editProduct(product)}
                                    >
                                        <Icon type="edit"/>
                                    </Button>,
                                    <Button 
                                    type="danger"
                                    onClick={() => showDeleteConfirm(product)}
                                >
                                    <Icon type="delete"/>
                                </Button>
                                ]}
                            >
                                <Icon type="shop"/>
                                <List.Item.Meta 
                                    avatar={<Icon type="shop"/>}
                                    title={`${product.name}`}
                                    description={`${product.description}`}
                                />
                                <div>
                                    <p>{product.cantidad !== 0 ? `Stock: ${product.cantidad}` : `Sin Stock`}</p>
                                    <p>{`Categoria: ${product.category.name}`}</p>
                                </div>    
                            </List.Item>
                        )}
                    >    
                    </List>
                    ) : (
                        <List
                            className="products"
                            itemLayout="horizontal"
                            dataSource={products}
                            renderItem={product => (
                                <List.Item
                                    actions={[
                                        <Button 
                                            type="primary"
                                            onClick={() => editProduct(product)}
                                        >
                                            <Icon type="edit"/>
                                        </Button>,
                                        <Button 
                                        type="danger"
                                        onClick={() => showDeleteConfirm(product)}
                                    >
                                        <Icon type="delete"/>
                                    </Button>
                                    ]}
                                >
                                    <Icon type="shop"/>
                                    <List.Item.Meta 
                                        avatar={<Icon type="shop"/>}
                                        title={`${product.name}`}
                                        description={`${product.description}`}
                                    />
                                    <div>
                                        <p>{product.cantidad !== 0 ? `Stock: ${product.cantidad}` : `Sin Stock`}</p>
                                        <p>{`Categoria: ${product.category.name}`}</p>
                                    </div>
                                </List.Item>
                        )}
                    />)
                }
                
                <Modal
                    title={modalTitle}
                    isVisible={isVisibleModal}
                    setIsVisible={setIsVisibleModal}
                >
                    {modalContent}
                </Modal>
            </div>
        </div>
    )
}
