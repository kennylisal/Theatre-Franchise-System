interface JenisEmployee {
  display: string;
  roleCode: string;
}

interface CreateEmployeeDataType {
  name: string;
  password: string;
  role: string;
  location: string;
  acc_status: string;
  adminId: string;
  action: string;
}

interface GetAllEmployeeDataType {
  employee_id: string;
  employee_name: string;
  employee_role: string;
  account_status: string;
  account_username: string;
}

export {
  type JenisEmployee,
  type CreateEmployeeDataType,
  type GetAllEmployeeDataType,
};
