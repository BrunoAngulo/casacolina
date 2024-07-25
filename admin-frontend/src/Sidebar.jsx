import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Dashboard</h2>
            <ul>
                <li><Link to="/dashboard/categories">Categories</Link></li>
                {/* Otros enlaces para otras secciones */}
                {/* <li><Link to="/dashboard/orders">Orders</Link></li> */}
                {/* <li><Link to="/dashboard/accounts">Accounts</Link></li> */}
                {/* <li><Link to="/dashboard/dishes">Dishes</Link></li> */}
            </ul>
        </div>
    );
};

export default Sidebar;
