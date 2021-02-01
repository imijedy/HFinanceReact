import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {InputGroup, FormControl, Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './style.css';

function CrudTableSearch(props) {
    const columns = props.headers.filter((header) => header.hasOwnProperty("accessor")).map((header) => header.accessor);
    return (
        <InputGroup className="tableSearchInputGroup">
            <InputGroup.Prepend>
                <InputGroup.Text className="inputSearchIcon"><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl className="mr-2 inputSearch" value={props.query} onChange={(e) => props.setQuery(e.target.value)} size="sm" placeholder="Keresés" />
            {columns &&
            columns.map((column) => (
                <Form.Check key={column} checked={props.searchColumns.includes(column)} onChange={(e) => {const checked = props.searchColumns.includes(column); props.setSearchColumns((prev) => checked ? prev.filter((sc) => sc !== column) : [...prev, column]);}} inline label={props.headers.map((header) => header.accessor === column ? header.header : "").filter((i) => i !== "")} type="checkbox" />
            ))
            }
        </InputGroup>
    );
}

CrudTableSearch.propTypes = {
    query: PropTypes.string.isRequired,
    setQuery: PropTypes.func.isRequired,
    searchColumns: PropTypes.array.isRequired,
    setSearchColumns: PropTypes.func.isRequired,
    headers: PropTypes.array.isRequired
};

export default CrudTableSearch;