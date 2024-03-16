export const USER_TYPE = {
  EMPLOYEE: "employee",
  FINANCE_EMPLOYEE: "finance_employee",
};

export type UserTypes = (typeof USER_TYPE)[keyof typeof USER_TYPE];
