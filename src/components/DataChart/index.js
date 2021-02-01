import React from 'react';
import PropTypes from 'prop-types';
import {Bar} from 'react-chartjs-2';
require ('./roundedCorners.js');

export const Chart = (props) => {
    return (
        <Bar
            data={props.datasets}
            options={{
                cornerRadius: 4,
            }}
        />
    )
};

Chart.propTypes = {
    datasets: PropTypes.object,
};

export default Chart;