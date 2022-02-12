import React from 'react';
import PropTypes from 'prop-types';

export default function Card({ children, className }) {
    return (
        <div
            className={`w-full bg-white rounded-xl overflow-hdden shadow-md p-4 ${className}`}
            style={{ border: "3px solid rgb(0, 0, 0)", boxShadow: "rgb(0 0 0) 4px 4px 0px"}}
        >
            {children}
        </div>
    );
}

Card.propTypes = {
    children: PropTypes.node.isRequired,
};
