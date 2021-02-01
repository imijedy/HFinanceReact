import React from 'react';
import {Modal,Button,Badge} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './style.css';


class CustomDeleteModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
    }
    handleClose = () => {
        this.setState({
            show: false
        });
    };
    handleShow = () => {
        this.setState({
            show: true
        });
    };
    handleDelete = () =>{
        this.props.handleFunction(this.props.dataId);
    };
    calculateTypeString = (type) =>{
        switch(type) {
            case "costType":
                return "Költség kategória";
                break;
            case "cost":
                return "Költség";
                break;
            case "income":
                return "Bevétel";
                break;
            default:
                return "";
        }
    };


    render() {
        return (
            <>
            <Badge pill className="deleteButton" onClick={this.handleShow}><FontAwesomeIcon icon={faTrash} /></Badge>

            <Modal centered show={this.state.show} onHide={this.handleClose} className="pageModal">
                <Modal.Header>
                    <Modal.Title>{this.calculateTypeString(this.props.type)} törlése</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Biztosan törölni szeretné? (Nem visszavonható)
                </Modal.Body>
                <Modal.Footer>
                    <Button className="cancelButton" onClick={this.handleClose}>
                        Mégse
                    </Button>
                    <Button className="modalDeleteButton" onClick={this.handleDelete}>
                        Biztosan törlöm
                    </Button>
                </Modal.Footer>
            </Modal>
            </>
        );
    }
}

export default CustomDeleteModal;