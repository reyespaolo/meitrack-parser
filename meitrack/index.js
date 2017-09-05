'use strict';
const config = require('./data.js');
const moment = require('moment');

const dateParse = (date, format) => {

  if(format!=undefined){
    date = date.split("/");
    format = format.split("/");
    let year,month,day;

    for(var key in format){
      if(format[key]==="yy"){
        year ="20"+date[key]
      }else if(format[key]==="mm"){
        month = date[key]
      }else if(format[key]==="dd"){
        day = date[key]
      }
    }
    return (`${year}-${month}-${day}`);
  }
}

const getIndex = raw => {
  for (var key in config.patterns) {
    if (config.patterns.hasOwnProperty(key)) {
      if(raw.protocol === key){
        return config.mapIndex[key];
      }
    }
  }
};

const parseMeitrack = raw => {
  let parsedData = parse(raw);
  let jsonResult = {"alert" : null,"latitude":null,"longitude":null,"speed":null,"date":null,"parsedDate": Date,"dateTime":Date,"time":null,"power":null,"door":null,"acc":null,"lastlatitude":null,"lastlongitude":null,"mnc":null,"mcc":null,"timestampsent":null,"direction":null, "GPSPosition":null, "GPSSIgnal":null, "vehicleBattery":null};

  if(parsedData.status == "Failed"){
    jsonResult = parsedData;
  }else{
    let dataIndex = getIndex(parsedData);
    for (var key in dataIndex) {
      if (dataIndex.hasOwnProperty(key)) {
          if(key === "alert"){
            jsonResult[key] = config.parseAlarm(parsedData[dataIndex[key]]).AlertType;
          }else{
            jsonResult[key] = parsedData[dataIndex[key]];
          }
      }
    }
  }
  // jsonResult["parsedDate"] = dateParse(jsonResult["date"], config.dateFormat[parsedData.protocol])
  return jsonResult;
};

const parse = raw => {
  let result = {status: 'Failed', message: 'UnknownProtocol', raw: raw.toString()};
  for (var key in config.patterns) {
    if (config.patterns.hasOwnProperty(key)) {
      if(config.patterns[key].test(raw)){
          result = config.patterns[key].exec(raw);
          result.protocol = key;
      }
    }
  }
  return result;
};

module.exports = {
  parse: parse,
  parseMeitrack: parseMeitrack
};
