import React from 'react';
import PropTypes from 'prop-types';
import {Pagination,Row,Col} from 'react-bootstrap';
import './style.css';

function CrudTablePagination(props) {
    const handleClick = (event) =>{
        let listid = Number(event.target.id);
        props.setCurrentPage(listid);
    };
    let active = props.currentPage;
    let items = [];
    for (let number = 1; number <= Math.ceil(props.dataLength / props.itemsPerPage); number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} id={number} onClick={handleClick}>
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <div className="tableSearchInputGroup">
            <Row className="align-items-center no-gutters">
                <Col className="col-auto mr-2"><span>Oldalak: </span></Col>
                <Col className="col-auto">
                    <Pagination size="sm">
                        {items}
                    </Pagination>
                </Col>
            </Row>
        </div>
    );
}

CrudTablePagination.propTypes = {
    setItemsPerPage: PropTypes.func.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    dataLength: PropTypes.number.isRequired
};

export default CrudTablePagination;