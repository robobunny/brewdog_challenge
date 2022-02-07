import React from "react";
import Box from "@mui/material/Box";
import cow from "../svg/cow.svg";
import Paper from "@mui/material/Paper";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";

export default function BeerCard({ beer }) {
    const {
        name,
        tagline,
        description,
        imageUrl,
        abv,
        ibu,
        containsLactose,
        isDryHopped,
    } = beer;
    return (
        <Paper elevation={2}>
            <Typography component="h2">{name}</Typography>
            <Box>
                <img src={imageUrl} alt={`logo for the BrewDog beer ${name}`} />
                <Box>
                    <Typography component="span">ABV: </Typography>
                    <Typography component="span">{abv}</Typography>
                </Box>
                <Box>
                    <Typography component="span">IBU: </Typography>
                    <Typography component="span">{ibu}</Typography>
                </Box>
            </Box>
            <Typography component="span">{tagline}</Typography>
            <Typography component="span">{description}</Typography>
            {containsLactose && (
                <Box>
                    <SvgIcon alt="cow icon">{cow}</SvgIcon>
                    <Typography component="p">
                        This beer contains lactose
                    </Typography>
                </Box>
            )}
            {isDryHopped && (
                <Typography component="p">This beer is dry-hopped</Typography>
            )}
        </Paper>
    );
}
