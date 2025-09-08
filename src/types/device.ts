// ----------------------------------------------------------------------


export type IDeviceFilterValue = string | string[] | number | number[];

export type IDeviceFilters = {
  rating: string;
  gender: string[];
  category: string;
  colors: string[];
  priceRange: number[];
};

// ----------------------------------------------------------------------

export type IDeviceReviewNewForm = {
  rating: number | null;
  review: string;
  name: string;
  email: string;
};

export type IDeviceReview = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  helpful: number;
  avatarUrl: string;
  isPurchased: boolean;
  attachments?: string[];
  postedAt: Date;
};

export type IDeviceItem = {
  sensor_id: string;
  site_id: string;
  name: string; // device name
  mac_address: string; // mac address
  ip_address: string; // ip address
  port: string; // port
  floor_id: string; // floor id
  area_id: string; // area id
  zone_id: string; // zone id
  multiplier: number;
  description: string; // description
  sensor_type_id: string; // sensor type id
  discriminator: string; // discriminator
  public_ip_address: string; // public ip address
  additional_info: string; // additional info
  reading_interval: number; // reading interval
  is_enable: boolean; // activation status
  create_time: string;
  create_by: string;
  last_update_by: string;
  last_update_time: string;
};

export type IDeviceTableFilterValue = string | string[];

export type IDeviceTableFilters = {
  name: string;
  site: string;
  sort_floor_id: boolean;
  sort_area_id: boolean;
  sort_zone_id: boolean;
  sort_ip_address: boolean;
  // sites: string[];
  // areas: string[];
  // zones: string[];
};

export type ISensorItem = {
  activation_key: string;
  additional_info: string;
  area_id: string;
  create_by: string;
  create_time: string;
  description: string;
  discriminator: string;
  expiry_Date: string;
  floor_id: string;
  inactive_date: string;
  ip_address: string;
  isActive: boolean;
  is_enabled: false;
  last_response_time: string;
  last_status_time: string;
  last_update_by: string;
  last_update_time: string;
  mac_address: string;
  multipiler: number;
  name: string;
  port: string;
  public_ip_address: string;
  reading_interval: number;
  sensorStatusMessage: string;
  sensor_id: string;
  sensor_status: string;
  sensor_type_id: string;
  site_id: string;
  status: string;
  zone_id: string;
};
