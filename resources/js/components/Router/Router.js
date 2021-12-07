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
import { AdminForm } from '../AdminForm/AdminForm';
import { Favorites } from '../../layouts/Favorites/Favorites';
import style from './Router.module.scss';
import {useSelector} from "react-redux";
import {selectStatus} from "../../store/courseList/selectors";
import {STATUSES} from "../../utils/statuses/statuses";

export const Router = () => {
    const status = useSelector(selectStatus);
    return (
        <HashRouter>
            <div className={style.bg}>
                <div className={(status == STATUSES.SUCCESS) ? style.application : style.applicationNoCourses}>
                    <Header/>
                    <Switch>
                        <Route exact={true} path="/" component={Home}/>
                        <Route exact={true} path="/courses" component={Catalog}/>
                        <Route exact={true} path="/course/:courseId?" component={CourseCard}/>
                        <Route exact={true} path="/admin" component={AdminPanel}/>
                        <Route exact={true} path="/admin/add_course" component={AdminForm}/>
                        <Route exact={true} path="/admin/edit_course/:courseId" component={AdminForm}/>
                        <Route exact={true} path="/signIn" component={LoginPage}/>
                        <Route exact={true} path="/signUp" component={RegistrationPage}/>
                        <Route exact={true} path="/favorites" component={Favorites}/>
                    </Switch>
                    <Footer/>
                </div>
            </div>
        </HashRouter>
    );
};
