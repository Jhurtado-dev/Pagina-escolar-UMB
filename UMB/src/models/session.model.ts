import { UserModel } from './user.model';
export class SessionModel {
  public token: string;
  public user: UserModel;
}
