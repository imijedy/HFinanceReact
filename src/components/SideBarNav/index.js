import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import {MainNavBar} from '../../components/';
import './style.css';

class SideBarNav extends React.Component {
    render() {
        return <Container fluid className="px-0 d-flex"><Row className="no-gutters"><Col><MainNavBar/></Col></Row></Container>;
    }
}

export default SideBarNav;