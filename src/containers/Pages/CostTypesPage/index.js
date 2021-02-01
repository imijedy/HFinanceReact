import React from 'react';
import { connect } from "react-redux";
import {Container,Row,Col} from 'react-bootstrap';
import {Crud,CustomDeleteModal,CustomModal} from '../../../components/';
import './style.css';
import {addCostType, getCostTypes,getCostByType,getCostTypeCategories} from "../../../redux/costTypesReducer/actions";

const mapStateToProps = (state) => {
    return state.costTypes;
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchCostTypes: () => {dispatch(getCostTypes())},
        fetchCostTypeCategories: () => {dispatch(getCostTypeCategories())},
        getCostByType: (costTypeId) => {dispatch(getCostByType(costTypeId))},
        addCostType: (data) => {dispatch(addCostType(data))}
    }
};

class CostTypesPage extends React.Component {
    constructor(props){
        super(props);
        this.handleFetchCostTypes();
        this.handleFetchCostTypeCategories();
    }
    /*Konstansok*/

    headers = [
        {
            header: "Név",
            accessor: "name",
            textChange: (srt) => {
                return srt;
            },
            visualChange: (srt) => {
                return srt;
            }
        },
        {
            header: "Főkategória",
            accessor: "category.name",
            textChange: (srt) => {
                return srt;
            },
            visualChange: (srt) => {
                return srt;
            }
        },
        {
            header: "Műveletek",
            textChange: (srt) => {
                return srt;
            },
            visualChange: (actualRow) => {
                return <Row><Col className="col-1"><CustomModal actualRow={actualRow} handleFunction={this.handleAddFunction} modalFunctionType="edit" modalType="CostTypeModal" data={this.props.costTypeCategories.data}/></Col><Col className="col-1"><CustomDeleteModal type="costType" dataId={actualRow.id} handleFunction={this.handleDeleteFunction} /></Col></Row>
            }
        }
    ];
    /*API*/
    handleFetchCostTypes = () => {
        this.props.fetchCostTypes();
    };
    handleFetchCostTypeCategories = () => {
        this.props.fetchCostTypeCategories();
    };
    handleAddFunction = (data) => {
        this.props.addCostType(data);
    };
    handleDeleteFunction = (costTypeId) => {
        this.props.getCostByType(costTypeId);
    };
    /*Visual*/
    calculateRowClassNames = (data) => {
        return "";
    };

    render() {
        const costTypes = this.props.costTypes.data;
        const costTypeCategories = this.props.costTypeCategories.data;
        const helpTextString = <div><p className='mb-4'>Az alábbi táblázatban a költség kategóriák vannak felsorolva. Ezek tetszőlegesen módosíthatók, törölhetők, vagy új költség kategória is felvehető.</p><b>Fontos, hogy olyan költség kategóriákat a rendszer nem enged törölni, melyekhez már tartozik költség. Ezek törlése csak a költség törlésével vagy más kategóriába sorolásával lehetséges!</b></div>;

        return (
            <Container fluid className="p-4">
                <Row>
                    <Col>
                        <h4 className="mb-3 text-gray-800 text-center">Költség kategóriák</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        { (costTypes && costTypeCategories) ? <Crud crudTableData={costTypes} customModalData={costTypeCategories} crudTableHeaders={this.headers} modalType="CostTypeModal" handleModalAddFunction={this.handleAddFunction} isStripped={true} pageHelpText={helpTextString} calculateTableRowClassNamesFunction={this.calculateRowClassNames}/> : <div></div>}
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CostTypesPage);