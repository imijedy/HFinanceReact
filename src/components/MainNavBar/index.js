import React from 'react';
import { Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row,Col } from 'react-bootstrap';
import { faList,faDollarSign,faHandHoldingUsd,faChartArea } from '@fortawesome/free-solid-svg-icons'
import './style.css';

class MainNavBar extends React.Component {
    calculateActiveNavItem = (id) => {
        const currentPath = "/" + id;
        return (window.location.pathname === currentPath) ? "nav-item active" : "nav-item";
    };
    render() {
        return (
            <Navbar collapseOnSelect expand="md">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <ul className="sideNavbarNav">
                        <a className="sidebar-brand" href="/">
                            Hajós Pénzügyek
                        </a>
                        <div className="sidebar-heading">
                            Főmenü
                        </div>
                        <li className={this.calculateActiveNavItem("costtypes")}>
                            <Row>
                                <a className="nav-link" href="/costtypes">
                                    <Col className="col-1">
                                        <i>
                                            <FontAwesomeIcon icon={faList} />
                                        </i>
                                    </Col>
                                    <Col className="col-11">
                                        <span>Költség kategóriák</span>
                                    </Col>
                                </a>
                            </Row>
                        </li>
                        <li className={this.calculateActiveNavItem("costs")}>
                            <Row>
                                <a className="nav-link" href="/costs">
                                    <Col className="col-1">
                                        <i>
                                            <FontAwesomeIcon icon={faDollarSign} />
                                        </i>
                                    </Col>
                                    <Col className="col-11">
                                        <span>Költségek</span>
                                    </Col>
                                </a>
                            </Row>
                        </li>
                        <li className={this.calculateActiveNavItem("income")}>
                            <Row>
                                <a className="nav-link" href="/income">
                                    <Col className="col-1">
                                        <i>
                                            <FontAwesomeIcon icon={faHandHoldingUsd} />
                                        </i>
                                    </Col>
                                    <Col className="col-11">
                                        <span>Bevételek</span>
                                    </Col>
                                </a>
                            </Row>
                        </li>
                        <li className={this.calculateActiveNavItem("")}>
                            <Row>
                                <a className="nav-link" href="/">
                                    <Col className="col-1">
                                        <i>
                                            <FontAwesomeIcon icon={faChartArea} />
                                        </i>
                                    </Col>
                                    <Col className="col-11">
                                        <span>Összegzés</span>
                                    </Col>
                                </a>
                            </Row>
                        </li>
                    </ul>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default MainNavBar;