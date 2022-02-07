import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import getBeerInfo from "../api/getBeerInfo";
import BeerCard from "./BeerCard";
import CollapsibleAlert from "./CollapsibleAlert";
import useDataLoader from "../hooks/useDataLoader";

export default function BeerCards() {
    const [alertOpen, setAlertOpen] = useState(false);
    const handleLoadingError = () => setAlertOpen(true);
    const { isLoading, data: beers } = useDataLoader(getBeerInfo, handleLoadingError);
    let content;
    if (isLoading) {
        content = (
            <Paper elevation={2}>
                <Typography component={"p"}>
                    Loading info about beer...
                </Typography>
            </Paper>
        );
    } else if (!beers || beers.length == 0) {
        content = (
            <Paper elevation={2}>
                <Typography component={"p"}>
                    Couldn't find any beers to display
                </Typography>
            </Paper>
        );
    } else {
        content = beers.map((b, i) => <BeerCard beer={b} key={i} />);
    }
    return (
        <div>
            <CollapsibleAlert
                open={alertOpen}
                setOpen={setAlertOpen}
                message="There was an error loading the beer data."
            />
            {content}
        </div>
    );
}
