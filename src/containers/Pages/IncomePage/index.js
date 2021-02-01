import React from 'react';
import { connect } from "react-redux";
import {Container,Row,Col} from 'react-bootstrap';
import {Crud,CustomDeleteModal,CustomModal} from '../../../components/';
import './style.css';
import {getIncomes,addIncome,deleteIncome} from "../../../redux/incomesReducer/actions";

const mapStateToProps = (state) => {
    return state.incomes;
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchIncomes: () => {dispatch(getIncomes())},
        deleteIncome: (incomeId) => {dispatch(deleteIncome(incomeId))},
        addIncome: (data) => {dispatch(addIncome(data))}
    }
};

class IncomePage extends React.Component {
    constructor(props){
        super(props);
        this.handleFetchIncomes();
    }
    /*Konstansok*/
    headers = [
        {
            header: "Információ",
            accessor: "information",
            textChange: (srt) => {
                return srt;
            },
            visualChange: (srt) => {
                return srt;
            }
        },
        {
            header: "Dátum",
            accessor: "date",
            textChange: (srt) => {
                if(srt !== null && srt !== undefined){
                    return new Intl.DateTimeFormat("hu-HU", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit"
                    }).format(new Date(srt));
                }else{
                    return "";
                }
            },
            visualChange: (srt) => {
                return srt;
            }
        },
        {
            header: "Összeg",
            accessor: "amount",
            textChange: (srt) => {
                return new Intl.NumberFormat("hu-HU", {
                    style: "currency",
                    currency: "HUF",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }).format(srt);
            },
            visualChange: (srt) => {
                return <div className="text-right text-amount"><b>{srt}</b></div>;
            }
        },
        {
            header: "Műveletek",
            textChange: (srt) => {
                return srt;
            },
            visualChange: (actualRow) => {
                return <Row><Col className="col-1"><CustomModal actualRow={actualRow} handleFunction={this.handleAddFunction} modalFunctionType="edit" modalType="IncomeModal"/></Col><Col className="col-1"><CustomDeleteModal type="income" dataId={actualRow.id} handleFunction={this.handleDeleteFunction} /></Col></Row>
            }
        }
    ];
    /*API*/
    handleFetchIncomes = () => {
        this.props.fetchIncomes();
    };
    handleAddFunction = (data) => {
        this.props.addIncome(data);
    };
    handleDeleteFunction = (incomeId) => {
        this.props.deleteIncome(incomeId);
    };
    /*Visual*/
    calculateRowClassNames = (data) => {
        return "";
    };

    render() {
        const incomes = this.props.incomes.data;
        const helpTextString = <div>Az alábbi táblázatban láthatók az eddig felvett bevételek. Hozzáadhat, törölhet vagy módosíthat bevételeket.</div>;
        return (
            <Container fluid className="p-4">
                <Row>
                    <Col>
                        <h4 className="mb-3 text-gray-800 text-center">Bevételek</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        { (incomes) ? <Crud crudTableData={incomes} crudTableHeaders={this.headers} modalType="IncomeModal" handleModalAddFunction={this.handleAddFunction} isStripped={true} pageHelpText={helpTextString} calculateTableRowClassNamesFunction={this.calculateRowClassNames}/> : <div></div>}
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(IncomePage);