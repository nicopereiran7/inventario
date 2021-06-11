import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import "./LayoutBasic.scss";

export default function LayoutBasic(props) {
    const { routes } = props;
    const { Content, Footer } = Layout;
    return (
        <Layout>
            <h2>Menu Side...</h2>
            <Layout>
                <Content>
                    <LoadRoutes routes={routes} />
                </Content>
                <Footer>
                    Nicolas Pereira
                </Footer>
            </Layout>
        </Layout>
    );
}

//cargar rutas por props relacionadas con las paginas basicass
function LoadRoutes(props) {
    const { routes } = props;
    return (
        <Switch>
            {routes.map((route, index) => (
                <Route 
                    key={index}
                    path={route.path}
                    component={route.component}
                    exact={route.exact}
                />
            ))}
        </Switch>
    );
}