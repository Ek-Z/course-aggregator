import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Header } from '../../layouts/Header/Header';
import { Catalog } from '../../layouts/Catalog/Catalog';
import { AdminPanel } from '../../layouts/AdminPanel/AdminPanel';
import {LoginPage} from "../../layouts/LoginPage/LoginPage";
import {RegistrationPage} from "../../layouts/RegistrationPage/RegistrationPage";

export const Router = () => {
    return (
        <HashRouter>
            <Header/>
            <Switch>
                <Route exact={true} path="/">
                </Route>
                <Route exact={true} path="/courses/:courseId?">
                    <Catalog/>
                </Route>
                <Route exact={true} path="/admin">
                    <AdminPanel/>
                </Route>
                <Route exact={true} path="/signIn">
                    <LoginPage/>
                </Route>
                <Route exact={true} path="/signUp">
                    <RegistrationPage/>
                </Route>
            </Switch>
        </HashRouter>
    );
};
