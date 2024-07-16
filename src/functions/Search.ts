import { UserProps } from "../types/Types";

export const SearchQuery = (data:UserProps[], search:string)=>{
    return(
        data.filter((item:UserProps)=>{
          return search === '' ? item : Object.values(item)
            .join(' ')
            .toLowerCase()
            .includes(search.toLowerCase())
        })
      )
}