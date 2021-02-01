import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Table} from 'react-bootstrap';
import './style.css';

function CrudTable(props) {
    const data = props.data;
    const headers = props.headers;

    return (
        <Table striped={props.isStripped} borderless hover size="sm">
            <thead>
                <tr>
                    {headers.map((header,i) => <th key={i}>{header["header"]}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.map((row) =>(
                    <tr className={props.calculateRowClassNames(row)} key={row.id}>
                        {data[0] && headers.map((header, i) => (
                            header.hasOwnProperty('accessor') ? <td key={i}>{header.visualChange(header["accessor"].split('.').reduce((o,i)=>o[i], row))}</td> : <td key={i}>{header.visualChange(row)}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

CrudTable.propTypes = {
    data: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired,
    isStripped: PropTypes.bool,
    calculateRowClassNames: PropTypes.func
};

CrudTable.defaultProps = {
    isStripped: false,
    calculateRowClassNames: () => ("")
};

export default CrudTable;