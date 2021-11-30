import React from 'react';
import PropTypes from 'prop-types';
import style from './Error.module.scss';

export const Error = ({ textError }) => {
    return (
        <>
            <div className={style.Error}>{textError}</div>
        </>
    );
};

Error.propTypes = {
    textError: PropTypes.string,
};
