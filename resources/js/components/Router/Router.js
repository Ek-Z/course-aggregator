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
import style from './Router.module.scss';
import { AddCourse } from '../AddCourse/AddCourse';

export const Router = () => {
    return (
        <HashRouter>
            <div className={style.bg}>
                <div className={style.application}>
                    <Header/>
                    <Switch>
                        <Route exact={true} path="/" component={Home}/>
                        <Route exact={true} path="/courses" component={Catalog}/>
                        <Route exact={true} path="/course/:courseId?" component={CourseCard}/>
                        <Route exact={true} path="/admin" component={AdminPanel}/>
                        <Route exact={true} path="/admin/addCourse" component={AddCourse}/>
                        <Route exact={true} path="/signIn" component={LoginPage}/>
                        <Route exact={true} path="/signUp" component={RegistrationPage}/>
                    </Switch>
                    <Footer/>
                </div>
            </div>
        </HashRouter>
    );
};
