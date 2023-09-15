export class Group{

  public group_id:number;
  public description:string;
  public role_id:number;

  constructor(group_id:number, description:string,role_id:number) {

    this.group_id = group_id;
    this.description = description;
    this.role_id = role_id;

  }
}
