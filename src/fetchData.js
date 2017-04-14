import axios from "axios";
import format from "date-fns/format";

// Fetch data -------------------------------------------------------------------------
export const fetchObservedData = (protocol, station, temperature) => {
  const params = {
    sid: station.sid,
    sdate: "1980-08-01",
    edate: format(new Date(), "YYYY-MM-DD"),
    elems: [
      {
        name: "maxt",
        interval: [1, 0, 0],
        duration: "std",
        season_start: "01-01",
        reduce: `cnt_ge_${temperature}`
      }
    ]
  };

  // console.log(params);

  return axios
    .post(`${protocol}//data.rcc-acis.org/StnData`, params)
    .then(res => {
      if (!res.data.hasOwnProperty("error")) {
        return res.data.data;
      }
      console.log(res.data.error);
    })
    .catch(err => {
      console.log(err);
    });
};

// Projection 2040-2069 ---------------------------------------------------------------------
export const fetchProjection2040 = (protocol, station, temperature) => {
  const params = {
    loc: `${station.lon}, ${station.lat}`,
    sdate: "2040-08-01",
    edate: "2069-08-01",
    grid: 23,
    elems: [
      {
        name: "maxt",
        interval: [1, 0, 0],
        duration: "std",
        season_start: "01-01",
        reduce: `cnt_ge_${temperature}`
      }
    ]
  };

  // console.log(params);

  return axios
    .post(`${protocol}//grid.rcc-acis.org/GridData`, params)
    .then(res => {
      if (!res.data.hasOwnProperty("error")) {
        return res.data.data;
      }
      console.log(res.data.error);
    })
    .catch(err => {
      console.log(err);
    });
};

// Projection 2070-2099 ----------------------------------------------------------------------
export const fetchProjection2070 = (protocol, station, temperature) => {
  const params = {
    loc: `${station.lon}, ${station.lat}`,
    sdate: "2070-08-01",
    edate: "2099-08-01",
    grid: 23,
    elems: [
      {
        name: "maxt",
        interval: [1, 0, 0],
        duration: "std",
        season_start: "01-01",
        reduce: `cnt_ge_${temperature}`
      }
    ]
  };

  // console.log(params);

  return axios
    .post(`${protocol}//grid.rcc-acis.org/GridData`, params)
    .then(res => {
      if (!res.data.hasOwnProperty("error")) {
        return res.data.data;
      }
      console.log(res.data.error);
    })
    .catch(err => {
      console.log(err);
    });
};

export const fetchProjections = (protocol, station, temperature) => {
  return axios
    .all([
      fetchProjection2040(protocol, station, temperature),
      fetchProjection2070(protocol, station, temperature)
    ])
    .then(res => {
      if (!res.hasOwnProperty("error")) {
        return res;
      }
    })
    .catch(err => {
      console.log(err);
    });
};
