import React from 'react';
import {Col,Row,Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faExclamationCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import './style.css';

function CustomNotification(props) {
    const typeClasses ={
        success: "notificationSuccessButton",
        warning: "notificationWarningButton",
        danger: "notificationDangerButton",
        info: "notificationInfoButton"
    };
    const typeIcons ={
        success: faCheckCircle,
        warning: faExclamationCircle,
        danger: faTimesCircle,
        info: faInfoCircle,
    };
    return (
        <Container className="notificationToastContainer">
            <Row className="notificationToastHeader align-items-center no-gutters mb-1">
                <Col className="col-auto mr-2"><FontAwesomeIcon className={typeClasses[props.notificationType]} icon={typeIcons[props.notificationType]} /></Col>
                <Col className="col-auto">
                    <b>{props.title}</b>
                </Col>
            </Row>
            <Row className="notificationToastContent">
                <Col className="ml-4">
                    {props.content}
                </Col>
            </Row>
        </Container>
    );
}

CustomNotification.propTypes = {
    notificationType: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.element.isRequired
};

export default CustomNotification;