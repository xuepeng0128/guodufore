export interface IUserQueryResult {
  userId ?: string;
  account ?: string;
  schoolId ?: string;
  schoolName ?: string;
  employeeId ?: string;
  employeeName ?: string;
  teacherPaperId ?: string;
  teacherName ?: string;
  supperAdmin ?: boolean;
  schoolAdmin ?: boolean;
  addTime ?: Date;
  kind ?: number;
}
