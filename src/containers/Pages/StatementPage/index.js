import React from 'react';
import { connect } from "react-redux";
import {Container,Row,Col,Card} from 'react-bootstrap';
import { faDollarSign,faHandHoldingUsd} from '@fortawesome/free-solid-svg-icons';
import {DataChart,HelpPopup,StatementWidget} from '../../../components/';
import './style.css';
import {getFullYearIncomes,getMonthlyIncomes,getChartIncomes} from "../../../redux/incomesReducer/actions";
import {getFullYearCosts,getMonthlyCosts,getChartCosts} from "../../../redux/costsReducer/actions";

const mapStateToProps = (state) => {
    return {
        incomes: state.incomes,
        costs: state.costs
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchFullYearIncomes: () => {dispatch(getFullYearIncomes())},
        fetchMonthlyIncomes: () => {dispatch(getMonthlyIncomes())},
        fetchChartIncomes: () => {dispatch(getChartIncomes())},

        fetchFullYearCosts: () => {dispatch(getFullYearCosts())},
        fetchMonthlyCosts: () => {dispatch(getMonthlyCosts())},
        fetchChartCosts: () => {dispatch(getChartCosts())}
    }
};

class StatementPage extends React.Component {
    constructor(props){
        super(props);
        this.handleFetchFullYearIncomes();
        this.handleFetchMonthlyIncomes();
        this.handleFetchChartIncomes();

        this.handleFetchFullYearCosts();
        this.handleFetchMonthlyCosts();
        this.handleFetchChartCosts();
    }
    state = {
        postableAddData: {}
    };
    /*Api*/
    handleFetchFullYearIncomes = () => {
        this.props.fetchFullYearIncomes();
    };
    handleFetchMonthlyIncomes = () => {
        this.props.fetchMonthlyIncomes();
    };
    handleFetchChartIncomes = () => {
        this.props.fetchChartIncomes();
    };
    handleFetchFullYearCosts = () => {
        this.props.fetchFullYearCosts();
    };
    handleFetchMonthlyCosts = () => {
        this.props.fetchMonthlyCosts();
    };
    handleFetchChartCosts = () => {
        this.props.fetchChartCosts();
    };
    handleAddFunction = (data) => {
        this.setState({
            postableAddData: data
        });
    };
    /*Util*/
    transformToList = (raw) =>{
        let list = [];
        for(let i=0; i<=11; i++){
            list[i] = null;
        }
        raw.forEach((item) => {
            list[item.monthIndex-1] = item.amount;
        });
        return list;
    };

    render() {
        return (
            <Container fluid className="p-4">
                <Row>
                    <Col>
                        <h4 className="mb-3 text-gray-800 text-center">Összegzés</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card className="pageContentCard">
                            <Card.Header className="pageContentCardHeader">

                            </Card.Header>
                            <Card.Body>
                                <Row className="justify-content-around">
                                    <StatementWidget icon={faDollarSign} amount={this.props.costs.fullYearCosts.data ? this.props.costs.fullYearCosts.data : ""} title="Éves költség" type="cost" />
                                    <StatementWidget icon={faDollarSign} amount={this.props.costs.monthlyCosts.data ? this.props.costs.monthlyCosts.data : ""} title="Aktuális havi költség" type="cost" />
                                    <StatementWidget icon={faHandHoldingUsd} amount={this.props.incomes.fullYearIncomes.data ? this.props.incomes.fullYearIncomes.data : ""} title="Éves bevétel" type="income" />
                                    <StatementWidget icon={faHandHoldingUsd} amount={this.props.incomes.monthlyIncomes.data ? this.props.incomes.monthlyIncomes.data : ""} title="Aktuális havi bevétel" type="income" />
                                </Row>
                                <Row className="justify-content-around mt-5">
                                    <Col className="col-lg-5">
                                        <Row className="mb-3">
                                            <Col>
                                                <b className="mb-5">Költségek havi bontása</b>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <DataChart datasets={{
                                                    labels: ['Jan', 'Feb', 'Már', 'Ápr', 'Máj', 'Jún', 'Júl', 'Aug', 'Szept', 'Okt', 'Nov', 'Dec'],
                                                    datasets: [
                                                        {
                                                            label: 'Havi költség',
                                                            data: this.props.costs.chartCosts.data ? this.transformToList(this.props.costs.chartCosts.data) : [],
                                                            backgroundColor: "#ff5f57",
                                                            borderColor: "#f24a40",
                                                            borderWidth: 1,
                                                            barThickness: 18
                                                        }
                                                    ]}}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col className="col-lg-5">
                                        <Row className="mb-3">
                                            <Col>
                                                <b>Bevételek havi bontása</b>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <DataChart datasets={{
                                                    labels: ['Jan', 'Feb', 'Már', 'Ápr', 'Máj', 'Jún', 'Júl', 'Aug', 'Szept', 'Okt', 'Nov', 'Dec'],
                                                    datasets: [{
                                                        label: 'Havi bevétel',
                                                        data: this.props.incomes.chartIncomes.data ? this.transformToList(this.props.incomes.chartIncomes.data) : [],
                                                        backgroundColor: "#2acb45",
                                                        borderColor: "#37c34d",
                                                        borderWidth: 1,
                                                        barThickness: 18
                                                    }]}}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className="align-items-center mt-5">
                                    <Col className="col-auto">
                                        <HelpPopup content={<div>ide jön valami</div>} placement="right" />
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(StatementPage);