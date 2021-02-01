import React from 'react';
import PropTypes from 'prop-types';
import {CostTypeModal,CostModal,IncomeModal} from "../../components/";
import './style.css';
import { store as notificationStore } from 'react-notifications-component';
import {CustomNotification} from '../../components/';

function CustomModal(props) {
    const createNotification = (type,title,content) => {
        const element = <CustomNotification notificationType={type} title={title} content={content}/>;
        notificationStore.addNotification({
            content: element,
            insert: "top",
            container: "top-right",
            animationIn: ["animate__faster", "animate__animated", "animate__zoomIn"],
            animationOut: ["animate__faster", "animate__animated", "animate__zoomOut"],
            dismiss: {
                duration: 5000
            }
        });
    };
    const modals = {
        CostTypeModal: CostTypeModal,
        CostModal: CostModal,
        IncomeModal: IncomeModal
    };

    if(modals.hasOwnProperty(props.modalType)){
        const ModalTag = modals[props.modalType];
        return (
            <ModalTag createNotification={createNotification} {...props}/>
        );
    }else {
        return <div></div>
    }
}

CustomModal.propTypes = {
    modalType: PropTypes.string.isRequired,
    modalFunctionType: PropTypes.string.isRequired,
    data: PropTypes.array,
    handleFunction: PropTypes.func.isRequired,
    actualRow: PropTypes.object
};

CustomModal.defaultProps = {
    data: [],
    actualRow: {}
};

export default CustomModal;