import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import {Row,Col,Card,Form, InputGroup} from 'react-bootstrap';
import {CustomModal,HelpPopup,CrudTable,CrudTableSearch,CrudTablePagination} from '../../components/';
import './style.css';

function Crud(props){
    const [query, setQuery] = useState("");
    const [searchColumns, setSearchColumns] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [possibleItemsNumberPerPage, setPossibleItemsNumberPerPage] = useState([5,10,15,30,45,60,75,90,100]);

    /*Keresés*/
    const search = (rows) => {
        if(searchColumns.length !== 0){
            return rows.filter((row) => searchColumns.some((column) => column.split('.').reduce((o,i)=>o[i], row).toString().toLowerCase().indexOf(query.toLowerCase()) > -1));
        }else{
            return rows;
        }
    };
    /*Pagination*/
    const calculateCurrentTableItems = (data) => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return data.slice(indexOfFirstItem, indexOfLastItem);
    };
    const handleSelectItemPerPage = (event) => {
        setItemsPerPage(parseInt(event.target.value));
    };
    /*MapData*/
    const calculateDataText = (data) =>{
        const newData = data.map((row) => {
            return {
                ...row
            }
        });
        const iterateInObject = (obj) => {
            Object.keys(obj).forEach((key) => {
                if (typeof obj[key] === 'object' && obj[key] !== null && obj[key] !== undefined) {
                    return iterateInObject(obj[key]);
                }
                props.crudTableHeaders.map((header) => {
                    if(header.hasOwnProperty("accessor")){
                        if(obj.hasOwnProperty(header.accessor) && header.accessor === key){
                            obj[header.accessor] = header.textChange(obj[header.accessor]);
                        }
                    }
                    return null;
                });
            });
        };
        newData.map((row) => {
            return iterateInObject(row);
        });
        return newData;
    };

    return (
        <Card className="pageContentCard">
            <Card.Header className="pageContentCardHeader">
                <Row className="align-items-center">
                    <Col className="col-auto mt-2"><CustomModal modalFunctionType="add" modalType={props.modalType} data={props.customModalData} handleFunction={props.handleModalAddFunction} /></Col>
                    <Col className="col-auto mt-2">
                        <InputGroup className="tableSearchInputGroup">
                            <Row className="align-items-center no-gutters">
                                <Col className="col-auto mr-2">
                                    <Form.Control as="select" value={itemsPerPage} size="sm" onChange={handleSelectItemPerPage}>
                                        {possibleItemsNumberPerPage.map((item) => <option value={item} key={item}>{item}</option>)}
                                    </Form.Control>
                                </Col>
                                <Col className="col-auto">
                                    <span>találat oldalanként</span>
                                </Col>
                            </Row>
                        </InputGroup>
                    </Col>
                    <Col className="col-auto mt-2">
                        <CrudTableSearch query={query} setQuery={setQuery} searchColumns={searchColumns} setSearchColumns={setSearchColumns} headers={props.crudTableHeaders} />
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col>
                        <CrudTable data={calculateCurrentTableItems(search(calculateDataText(props.crudTableData)))} headers={props.crudTableHeaders} isStripped={props.isStripped} calculateRowClassNames={props.calculateTableRowClassNamesFunction} />
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col className="col-auto">
                        <HelpPopup content={props.pageHelpText} placement="right" />
                    </Col>
                    <Col className="col-auto" ><CrudTablePagination setItemsPerPage={setItemsPerPage} itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} dataLength={search(calculateDataText(props.crudTableData)).length} /></Col>
                </Row>
            </Card.Body>
        </Card>
    );
}
Crud.propTypes = {
    crudTableData: PropTypes.array.isRequired,
    customModalData: PropTypes.array,
    crudTableHeaders: PropTypes.array.isRequired,
    modalType: PropTypes.string.isRequired,
    handleModalAddFunction: PropTypes.func.isRequired,
    isStripped: PropTypes.bool,
    pageHelpText: PropTypes.element,
    calculateTableRowClassNamesFunction: PropTypes.func
};

Crud.defaultProps = {
    customModalData: [],
    isStripped: false,
    pageHelpText: <div></div>,
    calculateTableRowClassNamesFunction: () => ("")
};

export default Crud;