import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';
const Header = () => {
    const [user, loading, error] = useAuthState(auth);
    const menuOptions = <>
        <li className="mx-2 font-semibold"><NavLink to="/home">Home</NavLink></li>
        {user && <li className="mx-2 font-semibold"><NavLink to="/inventory">Inventory</NavLink></li>}
    </>;
    const location = useLocation();
    console.log();

    const logout = () => {
        signOut(auth);
        localStorage.removeItem('accessToken');
    }

    return (
        <div className="navbar bg-base-100 lg:px-6 my-4">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuOptions}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-4xl font-['Acme']">OutShade</Link>
            </div>
            <div className="navbar-center hidden lg:flex ">
                <ul className="menu menu-horizontal p-0">
                    {menuOptions}
                </ul>
            </div>
            <div className="navbar-end">
                {user ?

                    <div class="dropdown dropdown-end">
                        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                            <div class="w-10 rounded-full">
                                <img src="https://placeimg.com/80/80/people" />
                            </div>
                        </label>
                        <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <a class="justify-between">
                                    Profile
                                    <span class="badge">New</span>
                                </a>
                            </li>
                            <li><a>{user?.displayName}</a></li>
                            <li className="mt-2"><button onClick={logout} className="btn btn-outline btn-primary">Logout</button></li>
                        </ul>
                    </div>

                    : <Link to="/login" className="btn btn-outline btn-primary">Login</Link>}


            </div>
        </div>
    );
};

export default Header;