export type ChangeStatusType = {
  uniqueHash: string;
  status: number;
};

export type ChangeStatusResponseType = {
  uniqueHash: string;
  employeeId: number;
  total: number;
  category: number;
  status: number;
  description: string;
};
