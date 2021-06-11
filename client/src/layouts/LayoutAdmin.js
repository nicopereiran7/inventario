import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import useAuth from "../hooks/useAuth";
import MenuTop from "../components/Admin/MenuTop";
import MenuSider from "../components/Admin/MenuSider";
import AdminSignIn from "../pages/Admin/SignIn";
import { getAccessTokenApi } from "../api/auth";
import jwt from "jwt-decode";

import "./LayoutAdmin.scss";

export default function LayoutAdmin(props) {
    const { routes } = props;
    const { Header, Content, Footer } = Layout;
    const { user, isLoading } = useAuth();

    if(!user && !isLoading) {
        return (
            <>
                <Route path="/admin/login" component={AdminSignIn} />
                <Redirect to="/admin/login"/>
            </>
        )
    }

    if(user && !isLoading) {
        const token = getAccessTokenApi();
        const {  nombre, apellido } = jwt(token);
        
        return (
            <Layout>
                <MenuSider />
                <Layout className="layout-admin" style={{marginLeft: "200px"}}>
                    <Header className="layout-admin__header">
                        <MenuTop />
                    </Header>
                    <Content className="layout-admin__content">
                        <LoadRoutes routes={routes} />
                    </Content>
                    <Footer className="layout-admin__footer">{`${nombre} ${apellido}`}</Footer>
                </Layout>
            </Layout>
        );
    }

    return null;
}

function LoadRoutes(props) {
    const { routes } = props;

    return (
        <Switch>
            {routes.map((route, index) => (
                <Route 
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                />
            ))}
        </Switch>
    );
}