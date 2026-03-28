export interface ILoginUser {
  email: string;
  password: string;
}

export interface IResetPassword {
  email: string;
  token: string;
  newPassword: string;
}
export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
}
