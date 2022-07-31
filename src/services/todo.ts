import request from "../pages/utils/request"
/*
*：
?：
!：
TODO:
@param:
*/
export const getTodoLists=async ()=>{
    return request('/api/todoLists')
}