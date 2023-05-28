import type { MissionData, Stage, VehicleData, VehicleDataAir, VehicleDataGround, VehicleMission, WidgetData } from "@/types.js";
import axios from "axios";
import { defaultPolygon } from "./coordinates.js";

// url to root of baseUrl
export const baseUrl = "http://localhost:5000/api/";

const getMissionData = (vehicleName: string): Promise<MissionData | VehicleMission> => {
  let addVehicleIcons = (missionData: MissionData) => {
    // vehicle icons are represented as svg?
    missionData.MAC.icon = {
      path: "M31.16,7.48c-0.41,3.6-2.82,4.57-5.29,5.72C15.36,18.09,8.71,26.34,5.15,37.28 c-5.62,17.23,3.52,36.4,17.74,44.31c6.22,3.46,12.78,5.73,19.8,5.44c17.79-0.72,32.29-11.15,37.33-29.48 c4.91-17.87-4.99-36.59-20.07-43.77c-2.66-1.27-6.24-1.9-6.31-6.35c9.66,2.02,16.46,8.19,22.42,15.26 c7.49,8.88,9.07,19.56,8.24,30.81c-1.29,17.61-18.74,34.81-36.32,36.66C20.3,93.08,3.05,72.54,0.52,55.28 C-3.18,29.97,13.48,12.1,31.16,7.48z M47.85,63.95c-2.27-1.1-2.7-3.09-2.55-5.44c0.15-2.3,0.03-4.62,0.03-7.25 c5.46,1.65,10.54,3.18,15.56,4.7c1.21-3-0.28-4.44-2.24-5.67c-3.64-2.29-7.19-4.75-10.95-6.81c-1.94-1.06-2.51-2.34-2.41-4.37 c0.12-2.49,0.01-5,0.03-7.49c0.01-1.91-0.7-3.24-2.76-3.43c-1.97-0.18-3.11,0.96-3.22,3.44c-0.11,2.49-0.12,5,0,7.49 c0.1,2.03-0.47,3.31-2.4,4.38c-3.9,2.17-7.58,4.72-11.36,7.11c-2.06,1.3-3.05,2.93-1.71,5.35c5.08-1.52,10.08-3.02,15.44-4.62 c0,2.41-0.11,4.56,0.03,6.7c0.16,2.47-0.17,4.57-2.48,6.04c-1.34,0.85-2.14,2.1-0.94,4c4.17-1.76,8.43-2.21,12.93,0.23 C49.5,66.16,49.66,64.83,47.85,63.95z M41.78,0c-2.28,5.82-4.56,11.64-7.01,17.91c5.32,0,9.89,0,15.18,0 C47.48,11.64,45.18,5.82,42.89,0C42.52,0,42.15,0,41.78,0z",
      fillColor: "#45FBFE",
    };
    missionData.ERU.icon = {
      path: "M52.96,7.06c12.51,3.03,24.43,14.73,28.34,24.91c1.35,3.5,2.75,7.01,2.71,10.87c-0.03,3.16,0.08,6.33-0.02,9.49 c-0.28,8.69-3.49,16.26-9.35,22.58c-3.1,3.34-6.09,6.88-10.13,9.25c-3.76,2.21-7.62,3.95-11.9,5.09c-6.04,1.6-12.15,1.21-18.08,0.69 c-6.49-0.57-12.71-3.35-17.7-7.66C12.89,78.9,8.9,75.38,6.11,70.8c-2.36-3.87-4.07-7.9-5.25-12.34C-0.75,52.4,0.54,46.37,0,40.35 c1.95-7.32,4.36-14.45,10.13-19.77c2.75-2.53,5.13-5.38,8.29-7.6c3.79-2.67,7.91-4.22,12.61-6.26c-0.49,2.65-0.94,4.3-3.27,5.54 c-2.73,1.45-5.53,2.8-8.15,4.56c-4.44,2.98-7.83,6.79-10.51,11.17C7.2,31.1,5.32,34.4,4.6,38.09c-0.82,4.24-2.49,8.59-1.43,12.79 c0.87,3.46,0.46,7.22,2.46,10.46c1.87,3.03,3.14,6.36,5.21,9.36c3.02,4.37,6.72,7.83,11.2,10.38c3.05,1.73,6.03,3.85,9.69,4.34 c0.26,0.04,0.49,0.67,0.71,0.65c4.09-0.34,8.05,2.07,12.03,0.98c3.21-0.87,6.64-0.57,9.68-1.93c3.09-1.39,6.09-3.02,9.05-4.69 c3.61-2.04,6.54-5,9.06-8.16c3.49-4.37,5.89-9.52,7.61-14.8c1.02-3.13,1.19-6.7,1.02-10.03c-0.21-4.06-0.55-8.31-2.27-12.01 c-2.3-4.95-4.63-9.95-8.69-13.92c-3.58-3.5-7.45-6.37-12.05-8.38C54.36,11.58,54.42,11.45,52.96,7.06z M59.97,45.63 c-1.99-3.88-2.96-8.11-4.27-12.23c-0.13-0.42-0.68-0.72-1.12-1.16c-8.36,0-16.81,0-25.69,0c-0.78,2.27-1.6,4.59-2.39,6.91 c-0.84,2.48-2.22,4.94-2.39,7.47C23.74,52.06,24,57.53,24,62.23c1.47,2.6,3.17,1.85,5.03,1.77c0.49-1.26,0.98-2.55,1.41-3.67 c7.85,0,15.64,0,23.18,0c0.48,1.39,0.89,2.55,1.26,3.6c2,0.28,3.62,0.66,5.1-1.36C59.97,56.95,59.97,51.29,59.97,45.63z  M30.92,35.24c7.54,0,14.64,0,22.16,0c0.98,2.8,1.98,5.65,3.07,8.74c-9.56,0-18.78,0-28.33,0C28.93,40.87,29.94,38.01,30.92,35.24z  M29.46,54.05c-1.86-1.22-1.54-2.88-1.34-4.53c1.72-1.98,3.56-1.89,5.6-0.27c0.46,1.75,0.78,3.47-1.13,4.8 C31.53,54.05,30.41,54.05,29.46,54.05z M50,49.78c1.13-1.88,2.83-1.88,4.67-1.45c1.28,1.77,1.32,1.77,1.24,4.41 c-0.35,0.35-0.71,0.71-1.24,1.24c-0.94,0-2.05,0-3.24,0C49.57,52.81,50.09,51.21,50,49.78z M41.19,0.51 c-1.75,4.26-3.69,8.46-5.06,12.84c-0.44,1.42-2.34,3-0.77,4.65c4.6,0,9.04,0,13.53,0c0.05-0.63,0.24-1.17,0.09-1.57 c-1.54-4.18-3.1-8.34-4.72-12.49C43.72,2.57,43.01,1.27,42.41,0C41.73,0.27,41.27,0.31,41.19,0.51z",
      fillColor: "#DEFB1E",
    };
    missionData.MEA.icon = {
      path: "M46.62,56.34c-3.07,0-6.13,0-9.48,0c0.3,1.5,0.62,2.85,0.84,4.21c0.78,4.77-4.65,10.14-9.5,9.64 c-4.91-0.51-9-5.26-8.28-10.32c0.61-4.28,5.42-9.34,11.71-7.33c2.97,0.95,3.9,0.24,4.09-2.69c0.05-0.83,0.02-1.66,0.01-2.5 c-0.09-3.96-0.51-4.25-4.6-3.37c-3.92,0.84-7.15-0.48-9.5-3.65c-2.11-2.85-2.57-6.05-0.73-9.23c1.95-3.38,4.79-5.35,8.88-4.96 c5.26,0.5,8.94,6.05,7.65,11.58c-0.14,0.61-0.49,1.17-1.04,2.41c2.03,0,3.62,0,5.2,0c1.6,0,3.21,0,5.18,0 c-1.73-4.43-1.63-8.06,1.54-11.3c2.63-2.68,6.7-3.7,10.29-1.7c3.71,2.07,5.79,6.79,4.64,10.48c-1.15,3.7-5.08,6.64-8.89,6.49 c-1.09-0.04-2.17-0.53-3.26-0.78c-1.98-0.45-3.22,0.33-3.43,2.35c-0.16,1.48-0.13,3-0.02,4.49c0.19,2.56,1.28,3.32,3.92,2.45 c4.13-1.36,7.37-0.07,10.01,3.13c2.33,2.83,2.76,6.57,0.56,10.09c-2.07,3.31-6.44,5.12-9.78,4.22c-3.09-0.83-6.53-4.67-6.65-7.83 C45.9,60.33,46.37,58.43,46.62,56.34z M28.99,30.11c-3.04,0.04-4.9,2.79-4.89,4.98c0.02,3.03,2.64,5.25,5.29,5.05 c2.64-0.2,4.76-2.57,4.64-5.22C33.92,32.31,31.56,30.06,28.99,30.11z M54.73,30.11c-2.89,0.02-4.89,2.67-4.89,4.98 c0.01,2.93,2.53,5.25,5.29,5.05c2.63-0.19,4.76-2.58,4.64-5.22C59.66,32.3,57.31,30.06,54.73,30.11z M34.04,61.34 c0.13-2.64-1.99-5.03-4.63-5.23c-2.52-0.19-5.03,1.98-5.29,4.54c-0.27,2.76,2.09,5.42,4.87,5.48 C31.55,66.19,33.91,63.95,34.04,61.34z M54.78,66.14c2.56,0.02,4.9-2.24,5-4.84c0.11-2.85-2.34-5.31-5.16-5.18 c-2.59,0.12-4.81,2.49-4.76,5.1C49.92,64.43,52.78,66.23,54.78,66.14z M56.4,12.37c2.93,1.29,5.81,2.87,8.37,4.78 c5.3,3.96,9.35,8.94,12.02,15.18c3.02,7.08,4.3,14.09,2.99,21.87c-1.27,7.56-4.28,14.04-9.25,19.56 c-6.28,6.98-13.92,11.22-23.46,12.7c-5.75,0.89-10.89-0.08-16.21-1.3c-4.64-1.07-8.69-3.55-12.4-6.4 c-4.72-3.63-8.69-8.22-11.04-13.69c-3.1-7.19-4.9-14.56-3.36-22.8c1.48-7.89,4.71-14.5,9.82-20.35c3.7-4.24,8.17-7.5,13.44-9.49 c2.45-0.93,3.25-2.65,3.61-5.21C9.18,14.29-2.96,32.91,0.62,55.82c2.79,17.86,19.79,37.36,47.42,34.29 c16.91-1.88,33.62-18.24,35.39-35.58c1.15-11.23-0.12-22.23-7.5-31.27c-5.98-7.33-12.86-13.86-23.17-16 C53.49,9.7,54.12,11.36,56.4,12.37z M48.83,17.86C47.94,12.56,43.76,2.37,41.46,0c-2.3,5.89-5.04,11.5-6.65,17.86 C39.77,17.86,44.28,17.86,48.83,17.86z",
      fillColor: "#C962D8",
    };

    return missionData;
  };

  let payload = {
    id: "GET Primary Mission",
  };

  // sends new command to backend
  return new Promise((resolve, reject) => {
    axios
      .post(baseUrl + "send", payload)
      .then((response) => {
        let missionData = response.data;
        missionData = addVehicleIcons(missionData);

        if (vehicleName == "all") resolve(missionData);
        resolve(missionData[vehicleName]); // give the mission data for a specific vehicle
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getMissionStages = (vehicleName: string): Promise<Stage[]> => {
  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + `missionStages/${vehicleName}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      })
  });
}

// obtains the stages of all vehicles
const getGeneralStage = () : Promise<string> => {
  let path = baseUrl + "missionWaypoint/MAC";
  return new Promise((resolve, reject) => {
    axios
      .get(path)
      .then((response) => {
        resolve(`${response.data[""]}: ${response.data["name"]}`);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

// gets data pertaining to an individual vehicle
const getVehicleData = (vehicleName: string): Promise<VehicleDataGround | VehicleDataAir> => {
  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + `vehicleData/${vehicleName}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};


// gets vehicle regarding the widget of a given vehicle
const getWidgetData = async (vehicleName: string): Promise<WidgetData> => {
  // FIX THIS LATER
  let widgetData: any = {};

  let path: string;

  // Mission Waypoint
  path = baseUrl + vehicleName;
  axios
    .get(path)
    .then((response) => {
      widgetData["missionWaypoint"] = response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  if (!widgetData["missionWaypoint"]) {
    widgetData["missionWaypoint"] = {};
  }

  // Home Coordinates
  path = `http://localhost:5000/getHomeCoordinates/${vehicleName}`;
  axios
    .get(path)
    .then((response) => {
      widgetData["homeCoordinates"] = {
        lat: response.data.lat,
        lng: response.data.lng,
      };
    })
    .catch((error) => {
      console.log(error);
    });

  if (!widgetData["homeCoordinates"]) {
    widgetData["homeCoordinates"] = {};
  }

  // Search Area
  path = baseUrl + "geofenceSpecial/searchArea";
  axios
    .get(path)
    .then((response) => {
      widgetData["searchArea"] = response.data;
    })
    .catch((error) => {
      console.log(error.response);
    });

  if (!widgetData["searchArea"]) {
    widgetData["searchArea"] = [];
  }

  // Geofence
  path = baseUrl + "geofence";
  axios
    .get(path)
    .then((response) => {
      widgetData["geofence"] = response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  if (!widgetData["geofence"]) {
    widgetData["geofence"] = [];
  }

  widgetData["geofenceWorkspace"] = {
    coordinates: [...defaultPolygon],
    keep_in: true,
  };

  return widgetData as WidgetData;
};

// gets position of hiker by querying each vehicle for position
// const getHikerPosition = () => {
//   let path = "http://localhost:5000/send";

//   return new Promise(async (resolve, reject) => {
//     // MEA
//     let payload = null;

//     payload = {
//       id: "GET Vehicle Data",
//       data: {
//         vehicle_name: "MEA",
//       },
//     };
//     await axios
//       .post(path, payload)
//       .then((response) => {
//         let hikerPosition = {
//           lat: response.data["hiker_position_lat"],
//           lng: response.data["hiker_position_lng"],
//         };

//         if (hikerPosition != null) {
//           resolve(hikerPosition);
//         }
//       })
//       .catch((error) => {
//         reject(error);
//       });

//     // ERU
//     payload = {
//       id: "GET Vehicle Data",
//       data: {
//         vehicle_name: "ERU",
//       },
//     };
//     await axios
//       .post(path, payload)
//       .then((response) => {
//         let hikerPosition = {
//           lat: response.data["hiker_position_lat"],
//           lng: response.data["hiker_position_lat"],
//         };

//         if (hikerPosition != null) {
//           resolve(hikerPosition);
//         }
//       })
//       .catch((error) => {
//         reject(error);
//       });

//     // MAC
//     payload = {
//       id: "GET Vehicle Data",
//       data: {
//         vehicle_name: "MAC",
//       },
//     };
//     await axios
//       .post(path, payload)
//       .then((response) => {
//         let hikerPosition = {
//           lat: response.data["hiker_position_lat"],
//           lng: response.data["hiker_position_lat"],
//         };

//         if (hikerPosition != null) {
//           resolve(hikerPosition);
//         }
//       })
//       .catch((error) => {
//         reject(error);
//       });

//     resolve("error getting vehicle information");
//   });
// };

export { getMissionData, getGeneralStage, getVehicleData, getWidgetData, getMissionStages };
