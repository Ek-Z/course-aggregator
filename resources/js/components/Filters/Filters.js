import * as React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { filterStateChanged } from '../../store/courseList/action';

export const Filters = ({ filterTitles, filterValues }) => {
    const dispatch = useDispatch();

    const changeFilterState = evt => {
        const filterIndex = filterValues.findIndex(filterValue => filterValue.id === +evt.target.id);
        dispatch(filterStateChanged(filterIndex, filterTitles));
    };

    return (
        <Accordion defaultExpanded={true} disableGutters={true}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography>{filterTitles}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormGroup>{filterValues.map(statefulValue => statefulValue ?
                    <FormControlLabel
                        key={statefulValue.id}
                        control={<Checkbox id={statefulValue.id.toString()}
                                           title={statefulValue.title}
                                           color="secondary"
                                           checked={statefulValue.state}
                                           onChange={changeFilterState}/>}
                        label={statefulValue.title}
                    /> :
                    null
                )}</FormGroup>
            </AccordionDetails>
        </Accordion>
    );
};

Filters.propTypes = {
    filterTitles: PropTypes.string,
    filterValues: PropTypes.array,
};
