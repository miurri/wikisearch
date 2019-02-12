import React from 'react';
import PropTypes from 'prop-types';

import './button.css';

const Button = ({ onClick, value }) => (
        <input
            className="button"
            onClick={onClick}
            value={value}
            type="button"
        />
);

Button.propTypes = {
    onClick: PropTypes.func,
};

Button.defaultProps = {
    onClick: () => {},
    value: ""
};

export default Button;