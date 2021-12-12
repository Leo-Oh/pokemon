
export function  Comments(name,comment){
      if(name === null && comment === null) return false;
      if(name === null || comment === null) return false;
      if(name === undefined && comment === undefined) return false;
      if(name === undefined || comment === undefined) return  false;
      if(typeof(name) !== "string" && typeof(comment) !== "string") false;
      if((typeof(name) !== "string") || (typeof(comment) !== "string")) false;
      if(name == "" && comment == "" ) return false;
      if(name == "" || comment  == "") return false;
      return true;
}   