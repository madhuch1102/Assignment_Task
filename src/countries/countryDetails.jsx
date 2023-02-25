import React from "react";
import Grid from "@mui/material/Grid";
import "./styles.css";

export function CountrieList(props) {
  const { details } = props;
  return (
    <Grid container spacing={2} sx={{ pl: 10 }}>
      <Grid item xs={12} md={3}>
        Country
      </Grid>
      <Grid item xs={12} md={9}>
        <span className="textColor">{details.name}</span>
      </Grid>
      <Grid item xs={12} md={3}>
        Capital
      </Grid>
      <Grid item xs={12} md={9}>
        <span className="textColor">{details.capital}</span>
      </Grid>
      <Grid item xs={12} md={3}>
        Currency
      </Grid>
      <Grid item xs={12} md={9}>
        <span className="textColor">{details.currency}</span>
      </Grid>
      <Grid item xs={12} md={3}>
        Native
      </Grid>
      <Grid item xs={12} md={9}>
        <span className="textColor">{details.native}</span>
      </Grid>
      <Grid item xs={12} md={3}>
        Emoji
      </Grid>
      <Grid item xs={12} md={9}>
        <span className="textColor"> {details.emoji}</span>
      </Grid>
      <Grid item xs={12} md={3}>
        Languages
      </Grid>
      <Grid item xs={12} md={9}>
        {details?.languages.map((item) => (
          <>
            <span className="textColor">{item.name} </span> <br />
          </>
        ))}
      </Grid>
    </Grid>
  );
}

// ReactDOM.render(<CountrySelect />, document.getElementById('root'));
