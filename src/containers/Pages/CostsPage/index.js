import React from 'react';
import { connect } from "react-redux";
import {Container,Row,Col, Badge} from 'react-bootstrap';
import {Crud,CustomModal,CustomDeleteModal} from '../../../components/';
import './style.css';
import {addCost,getCosts,deleteCost} from "../../../redux/costsReducer/actions";
import {getCostTypes} from "../../../redux/costTypesReducer/actions";

const mapStateToProps = (state) => {
    return {
        costs: state.costs.costs,
        costTypes: state.costTypes.costTypes
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchCosts: () => {dispatch(getCosts())},
        fetchCostTypes: () => {dispatch(getCostTypes())},
        deleteCost: (costId) => {dispatch(deleteCost(costId))},
        addCost: (data) => {dispatch(addCost(data))}
    }
};

class CostsPage extends React.Component {
    constructor(props){
        super(props);
        this.handleFetchCosts();
        this.handleFetchCostTypes();
    }
    /*Konstansok*/
    headers = [
        {
            header: "Kategória",
            accessor: "costType.name",
            textChange: (srt) => {
                return srt;
            },
            visualChange: (srt) => {
                return srt;
            }
        },
        {
            header: "Befizetés módja",
            accessor: "paymentMethod",
            textChange: (srt) => {
                if(srt === "None"){
                    return "";
                }else{
                    return srt;
                }
            },
            visualChange: (srt) => {
                return srt;
            }
        },
        {
            header: "Tárgyidőszak",
            accessor: "paymentPeriod",
            textChange: (srt) => {
                if(srt !== null && srt !== undefined){
                    return new Intl.DateTimeFormat("hu-HU", {
                        year: "numeric",
                        month: "long"
                    }).format(new Date(srt));
                }else{
                    return "";
                }
            },
            visualChange: (srt) => {
                return (srt);
            }
        },
        {
            header: "Fizetési határidő",
            accessor: "paymentDeadline",
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
                return (srt);
            }
        },
        {
            header: "Befizetés időpontja",
            accessor: "paymentTime",
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
                return (srt);
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
            header: "Állapot",
            accessor: "paid",
            textChange: (srt) => {
                if(srt === true){
                    return "Befizetve";
                }else{
                    return "Tartozás";
                }
            },
            visualChange: (srt) => {
                if(srt === "Befizetve"){
                    return <Badge variant="success text-status">{srt}</Badge>;
                }else{
                    return <Badge variant="danger text-status">{srt}</Badge>;
                }
            }
        },
        {
            header: "Műveletek",
            textChange: (srt) => {
                return srt;
            },
            visualChange: (actualRow) => {
                return <Row><Col className="col-1"><CustomModal actualRow={actualRow} handleFunction={this.handleAddFunction} modalFunctionType="edit" modalType="CostModal" data={this.props.costTypes.data}/></Col><Col className="col-1"><CustomDeleteModal type="cost" dataId={actualRow.id} handleFunction={this.handleDeleteFunction} /></Col></Row>
            }
        }
    ];
    /*API*/
    handleFetchCosts = () => {
        this.props.fetchCosts();
    };
    handleFetchCostTypes = () => {
        this.props.fetchCostTypes();
    };
    handleDeleteFunction = (costId) => {
        this.props.deleteCost(costId);
    };
    handleAddFunction = (data) => {
        this.props.addCost(data);
    };
    /*Visual*/
    calculateRowClassNames = (data) => {
        const months = ["január","február","március","április","május","június","július","augusztus","szeptember","október","november","december"];
        const currentDate = new Date();
        const currentDateLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const paymentPeriodDateMonthNumber = months.map((month, key) => data.paymentPeriod.includes(month) ? key : "").filter((x) => x !== "");
        const paymentPeriodNewString = data.paymentPeriod.replace(months[paymentPeriodDateMonthNumber], Number(paymentPeriodDateMonthNumber)+1);
        const paymentPeriodDate = new Date(paymentPeriodNewString);

        if(data.paid === "Befizetve"){
            return "rowHighliteGreen";
        }else if((paymentPeriodDate.getYear() === currentDate.getYear()) && (paymentPeriodDate.getMonth() === currentDate.getMonth())){
            return "rowHighliteBlue";
        }else if (paymentPeriodDate > currentDateLastDay){
            return "";
        }else{
            return "rowHighliteRed";
        }
    };

    render() {
        const costs = this.props.costs.data;
        const costTypes = this.props.costTypes.data;
        const helpTextString = <div><p>Az alábbi táblázatban a felvett költségek láthatók. A rendszer színekkel jelzi az állapotukat.</p><ul><li><b className='text-danger'>Piros</b> színnel jelzi az aktuális hónapnál régebbi befizetetlen költségeket.</li><li><b className='text-info'>Kék</b> színnel jelzi az aktuális hőnap befizetetlen költségeit.</li><li><b>Fehér</b> színnel jelzi a következő hónapok költségeit.</li><li><b className='text-success'>Zöld</b> színnel jelzi a már befizetett költségeket.</li></ul></div>;

        return (
            <Container fluid className="p-4">
                <Row>
                    <Col>
                        <h4 className="mb-3 text-gray-800 text-center">Költségek</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        { (costs && costTypes) ? <Crud crudTableData={costs} isStripped={true} customModalData={costTypes} crudTableHeaders={this.headers} modalType="CostModal" handleModalAddFunction={this.handleAddFunction} pageHelpText={helpTextString} calculateTableRowClassNamesFunction={this.calculateRowClassNames}/> : <div></div>}
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CostsPage);