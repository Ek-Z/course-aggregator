import style from './CourseFilter.module.scss';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectFilters } from '../../../store/courseList/selectors';

export const CourseFilter = ({ onSubmit }) => {
    const filters = useSelector(selectFilters);
    const obj = {};
    filters.progLangs.forEach((lang) => (obj[lang] = false));
    const [langFilters, setLangFilters] = useState(obj);
    // const [value, setValue] = useState('');

    // const handleChange = (evt) => {
    //     setValue(evt.target.value);
    // };

    const handleLangChange = (filter) => {
        setLangFilters((prev) => {
            const newFilters = { ...prev };
            newFilters[filter] = !newFilters[filter];
            console.log(newFilters);
            return newFilters;
        });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        // onSubmit(value);
        // setValue('');
        // console.log(evt.target);
        console.log(langFilters);
    };

    return (
        <div className={style.filter__container}>
            <form action="#" onSubmit={handleSubmit}>
                {/* <input type="text" value={value} onChange={handleChange} /> */}
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ flexShrink: 0 }}>Языки программирования</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormGroup>
                            {filters.progLangs?.map((filter) => (
                                <FormControlLabel
                                    key={filter}
                                    control={
                                        <Checkbox
                                            checked={langFilters[filter]}
                                            onChange={() => handleLangChange(filter)}
                                        />
                                    }
                                    label={filter}
                                />
                            ))}
                            {/* <FormControlLabel control={<Checkbox />} label="PHP" /> */}
                            {/* <FormControlLabel control={<Checkbox />} label="JavaScript" /> */}
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>
                <button type="submit">Поиск</button>
            </form>
        </div>
    );
};
