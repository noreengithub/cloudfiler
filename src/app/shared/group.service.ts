import {Group} from "./group.model";

export class GroupService{

  private groups:Group[] = [
    new Group(2,"My First Group",2),
    new Group(3,"Partners",2),
    new Group(4,"Project Managers",2),
    new Group(5,"SysAdmin",2),
    new Group(6,"Other Group",2),
    new Group(7,"Staff",2),
    new Group(8,"Legal",2),
    new Group(1,"Main Board",2),

  ];

  getGroups(){
    return this.groups;
  }
}
