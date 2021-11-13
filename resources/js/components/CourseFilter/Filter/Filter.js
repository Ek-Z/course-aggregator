import PropTypes from 'prop-types';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const Filter = ({ filterName, filterOptions, onChange }) => {
    const filter = () => {
        const filter = [];
        for (const [key, value] of Object.entries(filterOptions)) {
            filter.push(
                <FormControlLabel
                    key={key}
                    control={<Checkbox color="secondary" checked={value} onChange={() => onChange({ filterName, filterOption: key })} />}
                    label={key}
                />
            );
        }
        return filter;
    };

    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                <Typography sx={{ flexShrink: 0 }}>{filterName}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormGroup>{filter().map((el) => el)}</FormGroup>
            </AccordionDetails>
        </Accordion>
    );
};

Filter.propTypes = {
    filterName: PropTypes.string,
    filterOptions: PropTypes.object,
    onChange: PropTypes.func,
};
