import React from 'react';
import "./style.css"

function Layout(props) {
    return (
        <section className="layout">
            {props.children}
        </section>
    )
}

export default Layout;