export class Location{
   public id:string;
   public description:string;
   public type: boolean;
   public isSearchDefault: boolean;
   public path: string;
   constructor(id:string, description:string,type:boolean,isSearchDefault:boolean,path:string) {
     this.id = id;
     this.description = description;
     this.type = type;
     this.isSearchDefault = isSearchDefault;
     this.path = path;
   }
}
