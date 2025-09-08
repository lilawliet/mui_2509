export type ILineItem = {
  sensor_id: string;
  sensor_line_id: string;
  site_id: string;
  name: string;
  description: string;
  is_enabled: boolean;
  is_hide: boolean;
  line_type: string;
};

export type ILineTableFilters = {
  name: string;
  stock: string[];
  publish: string[];
};

export type IPcrsSensorLinesItem = {
  sensor_line_id: string;
  site_id: string;
  sensor_id: string;
  name: string;
  line_type: number;
  is_hide: number;
  is_enabled: number;
};

export type IPcrsSensorGroupListItem = {
  site_id: string;
  group_id: string;
  sensor_line_id: string;
};
