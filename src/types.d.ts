export type VehicleData = {
  yaw: number;
  latitude: number;
  longitude: number;
  rotation: number;
  battery: number;
  last_packet_time: number;
  mode: string;
  current_stage: string;
  altitude: number;
  speed: number;
  pitch: number;
  roll: number;
  err_msg: string;
  sensors_ok: number;
  status: number;
  geofence_compliant: string;
};

type Waypoint = {
  timeCreated: string;
  coordinates: {
    lat: number,
    lng: number
  }
}

export type VehicleDataGround = {
  vehicle: string;
  currentStageId: number;
  manualMode: boolean;
  homeCoordinates: {
    lat: number,
    lng: number
  };
  missionWaypoints: Waypoint[];
  lastUpdateTime: string;
  speed: number;
  yaw: number;
  batteryLife1: number;
  batteryLife2: number;
  sensorOk: boolean;
  latestCoordinates: {
    lat: number;
    lng: number
  }
};

export type VehicleDataAir = {
  vehicle: string;
  currentStageId: number;
  manualMode: boolean;
  homeCoordinates: {
    lat: number,
    lng: number
  };
  missionWaypoints: Waypoint[];
  lastUpdateTime: string;
  altitude: number;
  speed: number;
  pitch: number;
  roll: number;
  yaw: number;
  batteryLife: number;
  sensorOk: boolean;
  latestCoordinates: {
    lat: number;
    lng: number
  }
};

export type Icon = {
  path: string;
  fillColor: string;
};
export type Stage = {
  id: number;
  name: string;
};
export type VehicleMission = {
  icon: Icon;
  missionWaypoint: string;
  stages: Stage[];
  searchArea: Coordinate[];
};
export type MissionData = {
  ERU: VehicleMission;
  MAC: VehicleMission;
  MEA: VehicleMission;
};

export type Waypoint = {};
export type Coordinate = {
  lat: string;
  lng: string;
};
export type GeoFence = {};
export type GeoFenceWorkspace = {};
export enum WidgetType {
  "Geofence",
  "MissionWaypoint",
  "HomeCoordinates",
  "SearchArea",
  "ManualControl",
}
export type WidgetData = {
  type?: WidgetType;
  [key: string]: any; // this is hacky and really should be fixed.
  missionWaypoint: Waypoint;
  homeCoordinates: Coordinate[];
  searchArea: Coordinate[];
  geofence: GeoFence;
  geofenceWorkspace: GeoFenceWorkspace;
};

export type VehiclePositionMarker = {
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  icon: {
    path: string;
    fillColor: string;
    fillOpacity: number;
    strokeWeight: number;
    rotation: number;
    scale: number;
    anchor: {
      x: number;
      y: number;
    };
  };
};

export type Marker = {
  id: string;
  position: WayPoint;
  icon: {
    url: string;
    anchor: { x: number; y: number };
  };
  draggable: boolean;
};

export type HikerPosition = {
  lat: string;
  lng: string;
};
