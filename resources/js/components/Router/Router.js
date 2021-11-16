import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Header } from '../../layouts/Header/Header';
import { Catalog } from '../../layouts/Catalog/Catalog';
import { AdminPanel } from '../../layouts/AdminPanel/AdminPanel';
import { LoginPage } from '../../layouts/LoginPage/LoginPage';
import { RegistrationPage } from '../../layouts/RegistrationPage/RegistrationPage';
import { CourseCard } from '../CourseCard/CourseCard';
import { Home } from '../../layouts/Home/Home';
import { Footer } from '../../layouts/Footer/Footer';

export const Router = () => {
    return (
        <HashRouter>
            <Header/>
            <Switch>
                <Route exact={true} path="/" component={Home}>
                </Route>
                <Route exact={true} path="/courses">
                    <Catalog/>
                </Route>
                <Route exact={true} path="/course/:courseId?">
                    <CourseCard/>
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
            <Footer/>
        </HashRouter>
    );
};
