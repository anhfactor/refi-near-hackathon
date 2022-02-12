import React from 'react';
import PropTypes from 'prop-types';

export default function TabContent({ children }) {
  return (
    <div className="relative flex flex-col min-w-0 break-words w-full">
      <div className="flex-auto font-light leading-normal">
        {children}
      </div>
    </div>
  );
}

TabContent.propTypes = {
  children: PropTypes.node.isRequired,
};
