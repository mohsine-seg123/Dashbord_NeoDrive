
import type {usertype} from './userType';

export type ContextdashbordType={
      darkMode:boolean,
      setDarkMode:(value:boolean)=>void,
      getAllusers:usertype[],
      setAllusers:(value:usertype[])=>void,
      isLogin:boolean,
      setisLogin:(value:boolean)=>void
}
  
