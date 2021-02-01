import React from 'react';
import PropTypes from 'prop-types';
import {Modal,Button,Form,Badge} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faPen } from '@fortawesome/free-solid-svg-icons';
import './style.css';

class IncomeModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();
    }
    initState = () =>{
        if(Object.keys(this.props.actualRow).length !== 0) {
            const date = (this.props.actualRow.date !== "" && this.props.actualRow.date !== null) ? new Date(this.props.actualRow.date) : "";

            return {
                show: false,
                information: this.props.actualRow.information,
                date: (date !== "") ? (date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2)) : "",
                amount: this.props.actualRow.amount.slice(0,-3).replace( /\s/g, '')
            };
        }else{
            return {
                show:false,
                information:"",
                date: "",
                amount:0
            };
        }
    };

    handleClose = () => {
        this.setState({
            show: false
        });
        this.setState(this.initState());
    };
    handleShow = () => {
        this.setState(this.initState());
        this.setState({
            show: true
        });

    };

    handleAdd = () =>{
        if(this.state.date === ""){
            this.props.createNotification("danger", "Hiba", <div>A dátum mező nem lehet üres!</div>);
        }else if(this.state.amount === 0){
            this.props.createNotification("danger", "Hiba", <div>Az összeg mező nem lehet üres!</div>);
        }else{
            let postableObject = {
                information: this.state.information,
                date: this.state.date,
                amount: parseFloat(this.state.amount)
            };
            if(Object.keys(this.props.actualRow).length !== 0){
                postableObject["id"] = Number(this.props.actualRow.id);
            }

            this.props.handleFunction(postableObject);
            this.handleClose();
        }
    };
    handleInformationChange = (event) =>{
        this.setState({
            information: event.target.value
        });
    };
    handleDateChange = (event) =>{
        this.setState({
            date: event.target.value
        });
    };
    handleAmountChange = (event) =>{
        this.setState({
            amount: event.target.value
        });
    };

    render() {
        return (
            <>
            {(this.props.modalFunctionType === "add") ? <Badge pill className="modalAddButton" onClick={this.handleShow}><FontAwesomeIcon icon={faPlus} /></Badge> : <Badge pill className="editButton" onClick={this.handleShow}><FontAwesomeIcon icon={faPen} /></Badge>}

            <Modal centered show={this.state.show} onHide={this.handleClose} className="pageModal">
                <Modal.Header>
                    {(this.props.modalFunctionType === "add") ? <Modal.Title>Kategória hozzáadása</Modal.Title> : <Modal.Title>Kategória szerkesztése</Modal.Title>}
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="informationInput">
                            <Form.Label>Információ</Form.Label>
                            <Form.Control value={this.state.information} onChange={this.handleInformationChange} size="sm" type="text" placeholder="Információ" />
                        </Form.Group>
                        <Form.Group controlId="dateSelect">
                            <Form.Label>Dátum (Kötelező)</Form.Label>
                            <Form.Control onChange={this.handleDateChange} size="sm" type="date" value={this.state.date} />
                        </Form.Group>
                        <Form.Group controlId="amountInput">
                            <Form.Label>Összeg (Kötelező)</Form.Label>
                            <Form.Control onChange={this.handleAmountChange} size="sm" type="number" value={this.state.amount} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="cancelButton" onClick={this.handleClose}>
                        Mégse
                    </Button>
                    <Button className="addButton" onClick={this.handleAdd}>
                        {(this.props.modalFunctionType === "add") ? "Hozzáadás" : "Módosítás"}
                    </Button>
                </Modal.Footer>
            </Modal>
            </>
        );
    }
}

IncomeModal.propTypes = {
    modalType: PropTypes.string.isRequired,
    modalFunctionType: PropTypes.string.isRequired,
    data: PropTypes.array,
    handleFunction: PropTypes.func.isRequired,
    createNotification: PropTypes.func.isRequired,
    actualRow: PropTypes.object
};

IncomeModal.defaultProps = {
    data:[],
    actualRow: {}
};

export default IncomeModal;