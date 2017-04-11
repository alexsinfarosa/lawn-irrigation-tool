import math from "mathjs";

export const quartileBounds = _sample => {
  // find the median as you did
  var _median = math.median(_sample);

  // split the data by the median
  var _firstHalf = _sample.filter(f => f < _median);
  var _secondHalf = _sample.filter(f => f >= _median);

  // find the medians for each split
  var _25percent = math.median(_firstHalf);
  var _75percent = math.median(_secondHalf);

  var _50percent = _median;
  var _100percent = math.max(_secondHalf);

  // this will be the upper bounds for each quartile
  // console.log([_25percent, _50percent, _75percent, _100percent]);
  return [_25percent, _50percent, _75percent, _100percent].map(e =>
    Math.round(e));
};
