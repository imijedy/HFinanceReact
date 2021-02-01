import React from 'react';
import { Container } from 'react-bootstrap';
import {PageContainer} from '../PageContainer/';
import './style.css';

class ContentContainer extends React.Component {
    render() {
        return (
            <Container fluid className="px-0">
                <PageContainer />
            </Container>
        );
    }
}

export {ContentContainer};