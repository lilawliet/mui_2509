// ----------------------------------------------------------------------


export type ITaskFilterValue = string;

export type ITaskFilters = {
  status: string;
};

export type ITaskItem = {
  title: string;
  due?: Date;
  created: Date;
  id: string;
  done: boolean;
};

export type ITaskTableFilterValue = string ;

export type ITaskTableFilters = {
  status: string;
};

