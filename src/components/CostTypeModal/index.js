import React from 'react';
import PropTypes from 'prop-types';
import {Modal,Button,Form,Badge} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faPen } from '@fortawesome/free-solid-svg-icons';
import './style.css';

class CostTypeModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initState();
    }
    initState = () =>{
        return {
            show: false,
            inputCategoryName: (Object.keys(this.props.actualRow).length !== 0) ? this.props.actualRow.name : "",
            inputCategoryMainCategory: {
                id: (Object.keys(this.props.actualRow).length !== 0) ? this.props.actualRow.category.id : 1,
                name: (Object.keys(this.props.actualRow).length !== 0) ? this.props.actualRow.category.name : "REZSI"
            }
        };
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
        if(this.state.inputCategoryName === ""){
            this.props.createNotification("danger", "Hiba", <div>A név mező nem lehet üres!</div>);
        }else{
            let postableObject;
            if(Object.keys(this.props.actualRow).length !== 0){
                postableObject = {
                    id: this.props.actualRow.id,
                    category: this.state.inputCategoryMainCategory,
                    name: this.state.inputCategoryName
                };
            }else{
                postableObject = {
                    category: this.state.inputCategoryMainCategory,
                    name: this.state.inputCategoryName
                };
            }

            this.props.handleFunction(postableObject);
            this.handleClose();
        }
    };
    handleMainCategoryChange = (event) =>{
        let object = {
            id: event.target.value,
            name: event.target.options[event.target.selectedIndex].text
        };
        this.setState({
            inputCategoryMainCategory: object
        });
    };
    handleCategoryName = (event) =>{
        this.setState({
            inputCategoryName: event.target.value
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
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Név (Kötelező)</Form.Label>
                            <Form.Control value={this.state.inputCategoryName} onChange={this.handleCategoryName} size="sm" type="text" placeholder="Név" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Főkategória (Kötelező)</Form.Label>
                            <Form.Control onChange={this.handleMainCategoryChange} size="sm" as="select" value={this.state.inputCategoryMainCategory.id}>
                                {this.props.data.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}
                            </Form.Control>
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

CostTypeModal.propTypes = {
    modalType: PropTypes.string.isRequired,
    modalFunctionType: PropTypes.string.isRequired,
    data: PropTypes.array,
    handleFunction: PropTypes.func.isRequired,
    createNotification: PropTypes.func.isRequired,
    actualRow: PropTypes.object
};

CostTypeModal.defaultProps = {
    data:[],
    actualRow: {}
};

export default CostTypeModal;