import React from "react";
import { Container, Col, Row } from 'react-bootstrap';
import {SideBarNav} from "../../components/";
import {ContentContainer} from "../ContentContainer/";
import './style.css';

const ApplicationLayout = () =>(
    <div className="App">
        <Container fluid className="px-0">
            <Row className="no-gutters">
                <Col className="col-12 col-md-2" id="sidebar-wrapper">
                    <SideBarNav />
                </Col>
                <Col className="col-12 col-md-10" id="page-content-wrapper">
                    <ContentContainer />
                </Col>
            </Row>
        </Container>
    </div>
);


export default ApplicationLayout;