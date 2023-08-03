let info = hmSetting.getDeviceInfo();
let deviceName = info.deviceName;
let deviceClass = "";
let isLowRamDevice = false;

// What the fuck, real device name didn't match with emulator?
// Okay, then I'll use deviceSource
switch(info.deviceSource) {
  case 260:
  case 261:
  case 262:
  case 263:
  case 264:
  case 265:
    deviceName = "Mi Band 7";
    deviceClass = "miband";
    isLowRamDevice = true;
    break;
  case 252:
  case 253:
  case 254:
    deviceName = "Band 7";
    deviceClass = "band";
    isLowRamDevice = true;
    break;
  case 224:
  case 225:
    deviceName = "GTS 3";
    deviceClass = "square";
    break;
  case 7995648:
  case 7995649:
    deviceName = "GTS 4";
    deviceClass = "square";
    break;
  case 246:
  case 247:
    deviceName = "GTS 4 mini";
    deviceClass = "square";
    break;
  case 250:
  case 251:
    deviceName = "GTR mini";
    deviceClass = "circle";
    break;
  case 226:
  case 227:
    deviceName = "GTR 3";
    deviceClass = "circle";
    break;
  case 229:
  case 230:
  case 6095106:
    deviceName = "GTR 3 pro";
    deviceClass = "circle";
    break;
  case 7930113:
  case 7930112:
    deviceName = "GTR 4";
    deviceClass = "circle";
    break;
  case 6553856:
  case 6553857:
    deviceName = "T-Rex Ultra";
    deviceClass = "circle";
    break;
  case 8126720:
  case 8126721:
    deviceName = "Cheetah Pro";
    deviceClass = "circle";
    break;
  case 8192256:
  case 8192257:
    deviceClass = "circle";
    deviceName = "Cheetah";
    break;
  case 418:
  case 419:
    deviceName = "T-Rex 2";
    deviceClass = "circle";
    break;
  case 414:
  case 415:
    deviceName = "Falcon";
    deviceClass = "circle";
    break;
  case 8454401:
    deviceName = "Bip 5";
    deviceClass = "square";
    break;
}

export { deviceName, deviceClass, isLowRamDevice };
