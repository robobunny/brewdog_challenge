import React from 'react';
import Box from '@mui/material/Box';
import cow from '../svg/cow.svg';
import Paper from '@mui/material/Paper';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

export default function beerCard ({beer}) {
    const {name, tagline, description, imageUrl, abv, ibu,
        containsLactose, isDryHopped} = beer;
    return (
        <Paper elevation={2}>
            <Typography component='h2'>{name}</Typography>
            <Box>
                <img src={imageUrl} alt={`logo for the BrewDog beer ${name}`}/>
                <Box>
                    <Typography component='h3'>ABV: </Typography>
                    <Typography component='p'>{abv}</Typography>
                </Box>
                <Box>
                    <Typography component='h3'>IBU: </Typography>
                    <Typography component='p'>{ibu}</Typography>
                </Box>
                </Box>
            <Typography component='h4'>{tagline}</Typography>
            <Typography component='p'>{description}</Typography>
            {containsLactose && 
                <Box>
                    <SvgIcon alt='cow icon'>{cow}</SvgIcon>
                    <Typography component='p'>
                        This beer contains lactose
                    </Typography>
                </Box>
            }
            {isDryHopped &&
                <Typography component='p'>
                    This beer is dry-hopped
                </Typography>
            }
        </Paper>
    );
}
