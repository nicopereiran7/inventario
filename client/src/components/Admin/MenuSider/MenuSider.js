import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";

import "./MenuSider.scss";

function MenuSider(props) {
    const { menuCollapsed, location } = props;
    const { Sider } = Layout;

    return (
        <Sider className="menu-sider" collapsed={menuCollapsed}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
                <Menu.Item key="/admin">
                    <Link to={"/admin"}>
                        <Icon type="home"/>
                        <span className="nav-text">Home</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/admin/registros">
                    <Link to={"/admin/registros"}>
                        <Icon type="form"/>
                        <span className="nav-text">Registros</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/admin/usuarios">
                    <Link to={"/admin/usuarios"}>
                        <Icon type="user"/>
                        <span className="nav-text">Usuarios</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/admin/productos">
                    <Link to={"/admin/productos"}>
                        <Icon type="shop"/>
                        <span className="nav-text">Productos</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/admin/categorias">
                    <Link to={"/admin/categorias"}>
                        <Icon type="tags"/>
                        <span className="nav-text">Categorias</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/admin/acciones">
                    <Link to={"/admin/acciones"}>
                        <Icon type="edit"/>
                        <span className="nav-text">Acciones</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default withRouter(MenuSider);