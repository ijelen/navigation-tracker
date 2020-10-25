import React from "react";
import PropTypes from 'prop-types';

const ExpireDateField = ({ source, record = {} }) => (<span>{record[source]}</span>);

ExpireDateField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

export default ExpireDateField;
