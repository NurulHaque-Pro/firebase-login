import React from 'react';
import NavHeader from '../components/NavHeader';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <NavHeader></NavHeader>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;