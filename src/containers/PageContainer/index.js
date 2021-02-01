import React from 'react';
import {Row,Col} from 'react-bootstrap';
import Routes from '../App/routes';
import './style.css';

class PageContainer extends React.Component {
    render() {
        return (
            <Row className="no-gutters pageContent">
                <Col>
                    <Routes />
                </Col>
            </Row>
        );
    }
}

export {PageContainer};