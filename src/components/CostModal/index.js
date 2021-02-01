import React from 'react';
import PropTypes from 'prop-types';
import {Modal,Button,Form,Badge} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faPen } from '@fortawesome/free-solid-svg-icons';
import './style.css';

class CostModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();
    }
    initState = () =>{
        if(Object.keys(this.props.actualRow).length !== 0) {
            const months = ["január","február","március","április","május","június","július","augusztus","szeptember","október","november","december"];
            const paymentPeriodDateMonthNumber = months.map((month, key) => this.props.actualRow.paymentPeriod.includes(month) ? key : "").filter((x) => x !== "");
            const paymentPeriodNewString = this.props.actualRow.paymentPeriod.replace(months[paymentPeriodDateMonthNumber], Number(paymentPeriodDateMonthNumber)+1);
            const paymentPeriod = new Date(paymentPeriodNewString);
            const paymentDeadline = (this.props.actualRow.paymentDeadline !== "" && this.props.actualRow.paymentDeadline !== null) ? new Date(this.props.actualRow.paymentDeadline) : "";
            const paymentTime = (this.props.actualRow.paymentTime !== "" && this.props.actualRow.paymentTime !== null) ? new Date(this.props.actualRow.paymentTime) : "";

            return {
                show: false,
                costType: (this.props.actualRow.costType !== undefined && this.props.actualRow.costType !== null) ? this.props.actualRow.costType : {},
                paymentMethod: (this.props.actualRow.paymentMethod === "") ? "None" : this.props.actualRow.paymentMethod,
                paymentPeriod: (paymentPeriod.getFullYear() + "-" + ("0" + (paymentPeriod.getMonth() + 1)).slice(-2)),
                paymentDeadline: (paymentDeadline !== "") ? (paymentDeadline.getFullYear() + "-" + ("0" + (paymentDeadline.getMonth() + 1)).slice(-2) + "-" + ("0" + paymentDeadline.getDate()).slice(-2)) : "",
                paymentTime: (paymentTime !== "") ? (paymentTime.getFullYear() + "-" + ("0" + (paymentTime.getMonth() + 1)).slice(-2) + "-" + ("0" + paymentTime.getDate()).slice(-2)) : "",
                amount: this.props.actualRow.amount.slice(0,-3).replace( /\s/g, ''),
                paid: (this.props.actualRow.paid !== "Tartozás"),
            };
        }else{
            return {
                show:false,
                costType:this.props.data.find((x) => x.id === 1),
                paymentMethod: "None",
                paymentPeriod: "",
                paymentDeadline: "",
                paymentTime:"",
                amount:0,
                paid:false,
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
        if(this.state.paymentPeriod === ""){
            this.props.createNotification("danger", "Hiba", <div>A tárgyidőszak nem lehet üres!</div>);
        }else if(this.state.amount === 0){
            this.props.createNotification("danger", "Hiba", <div>Az összeg mező nem lehet üres!</div>);
        }else{
            let postableObject = {
                costType: this.state.costType,
                paymentMethod: this.state.paymentMethod,
                paymentPeriod: new Date(this.state.paymentPeriod),
                paymentDeadline: this.state.paymentDeadline,
                paymentTime: this.state.paymentTime,
                amount: parseFloat(this.state.amount),
                paid: this.state.paid
            };
            if(Object.keys(this.props.actualRow).length !== 0){
                postableObject["id"] = Number(this.props.actualRow.id);
            }

            this.props.handleFunction(postableObject);
            this.handleClose();
        }
    };
    handleCostTypeChange = (event) =>{
        if(Object.keys(this.props.actualRow).length === 0){
            this.setState({
                costType: this.props.data.find((x) => x.id === Number(event.target.value))
            });
        }
    };
    handlePaymentMethodChange = (event) =>{
        if(event.target.value !== "None"){
            this.setState({
                paymentMethod: event.target.value,
                paid: true
            });
        }else{
            this.setState({
                paymentMethod: event.target.value,
                paid: false
            });
        }
    };
    handlePaymentPeriodChange = (event) =>{
        this.setState({
            paymentPeriod: event.target.value
        });
    };
    handlePaymentDeadlineChange = (event) =>{
        this.setState({
            paymentDeadline: event.target.value
        });
    };
    handlePaymentTimeChange = (event) =>{
        this.setState({
            paymentTime: event.target.value
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
                        <Form.Group controlId="costTypeSelect">
                            <Form.Label>Kategória (Kötelező)</Form.Label>
                            <Form.Control disabled={(Object.keys(this.props.actualRow).length !== 0)} onChange={this.handleCostTypeChange} size="sm" as="select" value={(this.state.costType !== undefined) ? this.state.costType.id : ""}>
                                {(this.props.data !== null && this.props.data !== undefined) ? this.props.data.map((item) => <option value={item.id} key={item.id}>{item.name}</option>) : <div></div>}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="paymentMethodSelect">
                            <Form.Label>Befizetés módja (Kötelező)</Form.Label>
                            <Form.Control onChange={this.handlePaymentMethodChange} size="sm" as="select" value={this.state.paymentMethod}>
                                <option value="None">Még nem lett kifizetve</option>
                                <option value="Készpénz">Készpénz</option>
                                <option value="Utalás">Utalás</option>
                                <option value="Alkalmazás">Alkalmazás</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="paymentPeriodSelect">
                            <Form.Label>Tárgyidőszak (Kötelező)</Form.Label>
                            <Form.Control onChange={this.handlePaymentPeriodChange} size="sm" type="month" value={this.state.paymentPeriod} />
                        </Form.Group>
                        <Form.Group controlId="paymentDeadlineSelect">
                            <Form.Label>Fizetési határidő</Form.Label>
                            <Form.Control onChange={this.handlePaymentDeadlineChange} size="sm" type="date" value={this.state.paymentDeadline} />
                        </Form.Group>
                        <Form.Group controlId="paymentTimeSelect">
                            <Form.Label>Befizetés időpontja</Form.Label>
                            <Form.Control disabled={!(this.state.paid)} onChange={this.handlePaymentTimeChange} size="sm" type="date" value={this.state.paymentTime} />
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

CostModal.propTypes = {
    modalType: PropTypes.string.isRequired,
    modalFunctionType: PropTypes.string.isRequired,
    data: PropTypes.array,
    handleFunction: PropTypes.func.isRequired,
    createNotification: PropTypes.func.isRequired,
    actualRow: PropTypes.object
};

CostModal.defaultProps = {
    data: [],
    actualRow: {}
};

export default CostModal;