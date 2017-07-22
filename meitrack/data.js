'use strict';
const patterns = {
  MVT380SMS: /^(Interval),(\d{6})[\r|\n|\ ](\d{2}:\d{2}),(A|V),(\d+),(\d+)Km\/h,(\d+)%,http?\:\/\/?maps.google\.[a-z]+\/maps\?[f]\=q&hl=en&q=([-]?\d+\.\d+),([-]?\d+\.\d+)/,
  MVT380GPRS: /^\$\$([\x41-\x7A])(\d{1,3}),(\d{15}),([0-9A-F]{3}),(\d{1,3}),([-]?\d+\.\d+),([-]?\d+\.\d+),(\d{12}),([AV]),(\d{1,3}),(\d{1,2}),(\d+(\.\d+)?),(\d+(\.\d+)?),(\d+(\.\d+)?),(\d+(\.\d+)?),(\d+(\.\d+)?),(\d+),(\d{3})\|(\d{1,3})\|([0-9A-F]{4})\|([0-9A-F]{4}),([0-9A-F]{4}),([0-9A-F]{1,4})?\|([0-9A-F]{1,4})?\|([0-9A-F]{1,4})?\|([0-9A-F]{1,4})\|([0-9A-F]{1,4}),([0-9A-F]{8})?,?([0-9A-F]+)?,?(\d{1,2})?,?([0-9A-F]{4})?,?([0-9A-F]{6})?\|?([0-9A-F]{6})?\|?([0-9A-F]{6})?\|?\*([0-9A-F]{2})\r\n$/,
  ok: /^\$\$([\x41-\x7A])(\d{1,3}),(\d{15}),([0-9A-F]{3}),OK\*([0-9A-F]{2})\r\n$/,
};



const parseAlarm = event => {
  const alarms = {
    '1': {AlertType: 'SOS_Button'},
    '2': {AlertType: 'DI', number: 2, status: true},
    '3': {AlertType: 'DI', number: 3, status: true},
    '4': {AlertType: 'DI', number: 4, status: true},
    '5': {AlertType: 'DI', number: 5, status: true},
    '9': {AlertType: 'DI', number: 1, status: false},
    '10': {AlertType: 'DI', number: 2, status: false},
    '11': {AlertType: 'DI', number: 3, status: false},
    '12': {AlertType: 'DI', number: 4, status: false},
    '13': {AlertType: 'DI', number: 5, status: false},
    '17': {AlertType: 'DI', number: 2, status: false},
    '18': {AlertType: 'lowExternalBattery'},
    '19': {AlertType: 'Over_Speed', status: true},
    '20': {AlertType: 'Geo_Fence', status: true},
    '21': {AlertType: 'Geo_Fence', status: false},
    '22': {AlertType: 'Charge', status: true},
    '23': {AlertType: 'Charge', status: false},
    '24': {AlertType: 'gpsSignal', status: false},
    '25': {AlertType: 'gpsSignal', status: true},
    '26': {AlertType: 'Sleep', status: true},
    '27': {AlertType: 'Sleep', status: false},
    '28': {AlertType: 'gpsAntennaCut'},
    '29': {AlertType: 'deviceReboot'},
    '31': {AlertType: 'Heartbeat'},
    '32': {AlertType: 'Angle'},
    '33': {AlertType: 'distanceIntervalTracking'},
    '34': {AlertType: 'replyCurrent'},
    '35': {AlertType: undefined},
    '36': {AlertType: 'tow'},
    '37': {AlertType: 'Rfid'},
    '39': {AlertType: 'picture'},
    '40': {AlertType: 'powerOff'},
    '41': {AlertType: 'Moving', status: false},
    '42': {AlertType: 'Moving', status: true},
    '44': {AlertType: 'jamming', status: true},
    '50': {AlertType: 'temperature', status: true},
    '51': {AlertType: 'temperature', status: false},
    '52': {AlertType: 'fuelFulled'},
    '53': {AlertType: 'fuelEmpty'},
    '54': {AlertType: 'fuelStolen'},
    '56': {AlertType: 'armed'},
    '57': {AlertType: 'disarmed'},
    '58': {AlertType: 'stealing'},
    '63': {AlertType: 'jamming', status: false},
    '65': {AlertType: 'pressInput1ToCall'},
    '66': {AlertType: 'pressInput2ToCall'},
    '67': {AlertType: 'pressInput3ToCall'},
    '68': {AlertType: 'pressInput4ToCall'},
    '69': {AlertType: 'pressInput5ToCall'},
    '70': {AlertType: 'rejectIncomingCall'},
    '71': {AlertType: 'getLocationByCall'},
    '72': {AlertType: 'autoAnswerIncomingCall'},
    '73': {AlertType: 'listenIn'},
    '79': {AlertType: 'fall'},
    '80': {AlertType: 'install'},
    '81': {AlertType: 'dropOff'},
    '139': {AlertType: 'maintenance'}
  };
  return event in alarms ? alarms[event] : null;
};

// const dateFormat = {
//   mvt380GPRS: "yymmdd",
// }

const mapIndex = {
  MVT380SMS: {
    date: 2,
    time: 3,
    GPSPosition:4,
    GPSSIgnal:5,
    speed: 6,
    vehicleBattery: 7,
    latitude: 8,
    longitude: 9
  },
  MVT380GPRS: {
    IMEI: 3,
    command: 4,
    alert: 5,
    latitude: 7,
    longitude: 6

  }

};

module.exports = {
  parseAlarm: parseAlarm,
  patterns: patterns,
  mapIndex: mapIndex
};
