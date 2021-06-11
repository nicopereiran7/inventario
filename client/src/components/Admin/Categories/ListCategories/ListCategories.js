import React, { useState } from 'react';
import AddCategoriesForm from "../AddCategoriesForm";
import Modal from "../../../../components/Modal";
import { List, Icon, Button } from "antd";

import "./ListCategories.scss";

export default function ListCategories(props) {
    const { categories, setReloadCategories } = props;
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const addCategorieModal = () => {
        setIsVisibleModal(true);
        setModalTitle("Añadir Nueva Categoria");
        setModalContent(<AddCategoriesForm setIsVisibleModal={setIsVisibleModal} setReloadCategories={setReloadCategories} />);
    }

    return (
        <div className="list-categories">
            <div className="list-categories__header">
                <h1>Lista de Categorias</h1>
                <Button type="primary" className="btn" onClick={addCategorieModal}>
                    Nueva Categoria
                </Button>
            </div>
            <List
                className="categories"
                itemLayout="horizontal"
                dataSource={categories}
                renderItem={category => (
                    <List.Item>
                        <Icon type="tags"/>
                        <List.Item.Meta 
                            avatar={<Icon type="tags"/>}
                            title={`${category.name}`}
                        />
                    </List.Item>
                )}
            />
            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>   
        </div>
    )
}
