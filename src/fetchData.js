import axios from "axios";

// Fetch data -------------------------------------------------------------------------
export const currentYearData = (protocol, station, temperature) => {
  const params = {
    sid: station.sid,
    sdate: "1980-08-01",
    edate: "2017-08-01",
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
