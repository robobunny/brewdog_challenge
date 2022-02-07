import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";

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
    <Paper elevation={2} style={{ padding: "1em" }}>
      <Box style={{ margin: "1em", display: "flex" }}>
        <Box
          style={{
            padding: "1em",
            width: "50%",
            display: "flex",
            flexDirection: "column",
            placeContent: "center space-around",
          }}
        >
          <Typography
            component="h2"
            style={{ fontWeight: "bold", fontSize: "1.6em" }}
          >
            {name}
          </Typography>
          <p>
            <Typography component="span">ABV: </Typography>
            <Typography component="span">{abv}</Typography>
          </p>
          <p>
            <Typography component="span">IBU: </Typography>
            <Typography component="span">{ibu}</Typography>
          </p>
          {containsLactose && (
            <Box style={{ display: "flex", alignItems: "center" }}>
              <AnnouncementIcon />
              <Typography component="p">This beer contains lactose</Typography>
            </Box>
          )}
          {isDryHopped && (
            <Box style={{ display: "flex", alignItems: "center" }}>
              <LocalFloristIcon />
              <Typography component="p">This beer is dry-hopped</Typography>
            </Box>
          )}
        </Box>
        <Box style={{ width: "50%" }}>
          <img
            src={imageUrl}
            alt={`logo for the BrewDog beer ${name}`}
            style={{ height: "250px" }}
          />
        </Box>
      </Box>
      <Typography
        component="p"
        style={{ fontStyle: "italic", padding: ".5em" }}
      >
        {tagline}
      </Typography>
      <Typography component="p" style={{ textAlign: "left" }}>
        {description}
      </Typography>
    </Paper>
  );
}
