import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Popover, OverlayTrigger, Badge} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import './style.css';

function HelpPopup(props) {
    const popover = (
        <Popover id="popover-basic">
            {props.title ? <Popover.Title as="h3">{props.title}</Popover.Title> : <div></div>}
            <Popover.Content>
                {props.content}
            </Popover.Content>
        </Popover>
    );
    return (
        <OverlayTrigger trigger="click" placement={props.placement} overlay={popover}>
            <Badge pill className="helpPopupButton"><FontAwesomeIcon icon={faQuestion} /></Badge>
        </OverlayTrigger>
    );
}
HelpPopup.propTypes = {
    title: PropTypes.string,
    content: PropTypes.element,
    placement: PropTypes.string
};

HelpPopup.defaultProps = {
    title: "",
    content: <div></div>,
    placement: "top"
};

export default HelpPopup;