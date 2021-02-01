import React from 'react';
import {Row,Col,Badge} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign,faHandHoldingUsd} from '@fortawesome/free-solid-svg-icons';
import './style.css';

export const StatementWidget = (props) => {
    return (
        <Col className="col-2 widgetBackground">
            <Row className="justify-content-between align-items-center">
                <Col className="col-auto"><Badge pill className={props.type === "cost" ? "widgetButtonCost" : "widgetButtonIncome"}><FontAwesomeIcon icon={props.icon} /></Badge></Col>
                <Col className="col-auto"><b className={props.type === "cost" ? "widgetAmountTextCost" : "widgetAmountTextIncome"}>{new Intl.NumberFormat("hu-HU", {style: "currency",currency: "HUF",minimumFractionDigits: 0,maximumFractionDigits: 0}).format(props.amount)}</b></Col>
            </Row>
            <Row className="text-left mt-1">
                <Col><b className="widgetTitleText">{props.title}</b></Col>
            </Row>
        </Col>
    )
};

export default StatementWidget;

