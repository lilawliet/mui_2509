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
};

export type ITaskTableFilterValue = string ;

export type ITaskTableFilters = {
  status: string;
};


// ----------------------------------------------------------------------

// export type ITaskReviewNewForm = {
//   rating: number | null;
//   review: string;
//   name: string;
//   email: string;
// };

// export type ITaskReview = {
//   id: string;
//   name: string;
//   rating: number;
//   comment: string;
//   helpful: number;
//   avatarUrl: string;
//   isPurchased: boolean;
//   attachments?: string[];
//   postedAt: Date;
// };