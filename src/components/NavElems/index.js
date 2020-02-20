import React from "react";


export function Navbar({ children }) {
    return (
        <nav className="navbar navbar-light navbar-expand-md cust-nav justify-content-between">
            {children}
        </nav>
    );
}

export function NavListRight({ children }) {
    return (
        <div className="navbar-collapse collapse dual-nav w-50 order-1 order-md-2">
            <ul className="nav navbar-nav ml-auto welcome-message"> {children}</ul>
        </div>

    );
}

export function NavListCenter({ children }) {
    return (
        <div className="navbar-collapse collapse dual-nav w-100 order-2 order-md-1">
            <ul className="nav navbar-nav mx-auto "> {children}</ul>
        </div>

    );
}

export function NavListItem({ children }) {
    return (
        <li className="nav-item">{children}</li>
    )

}

export function List({ children }) {
    return (
        <div className="w-100">
            <ul className="nav navbar-nav mx-auto ">{children}</ul>
        </div>
    );
}

export function ListItem({ children }) {
    return <li className="list-group-item">{children}</li>;
}

export function TinyNav() {
    return <div className="navbar tiny-nav"></div>;
}

export function BottomNav({ children }) {
    return (
        <nav className="nav navbar bottom-nav justify-content-between">
            {children}
        </nav>


    );
}