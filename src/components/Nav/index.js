import React, { Component } from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Navbar, NavListRight, NavListItem, NavListCenter, TinyNav, BottomNav, List } from "../NavElems"
import Skyline from './char_sky.png';
import Logo from './CityLogo.jpg';

class NavBar extends Component {



    render() {

        return (
            <div>
                <Navbar>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="navbar-collapse collapse dual-nav w-50 order-0">
                        {/*<Link to={"/"} href="/" className="navbar-brand cust-text d-block order-0 order-md-1 ">RARR</Link>*/}
                        <img id="navIcon" src={`./` + Logo} alt="chartlotte logo"></img>

                    </div>

                    <NavListCenter>
                        <h3 className="welcome-message">RA<span className="gray-font">RR</span> <div className="welcome-small">risk assessment <span className="gray-font">risk reduction</span></div></h3>
                    </NavListCenter>

                    <NavListRight>
                        <NavListItem>
                            <img id="skylineImg" src={`./` + Skyline} alt="chartlotte skyline"></img>
                        </NavListItem>
                    </NavListRight>
                </Navbar>
                <TinyNav />
                <BottomNav>
                    <div>
                        <span>map</span><span> performance</span>
                    </div>
                </BottomNav>
            </div>
        );

    }
};

export default NavBar;