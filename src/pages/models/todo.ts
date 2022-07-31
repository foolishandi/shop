import { getTodoLists } from "@/services/todo"
export default {
    namespace:'todo',
    state:{
        todolists:[]
    },
    effects:{
        *getTodoLists(_,{call,put}){
            const res= yield call(getTodoLists())
            yield put({
                type:'setTodoLists',
                payload:res
            })
        }
    },
    reducers:{
        setTodoLists(state,action){
            return {
                ...state,todolists:action.payload
            }
        }
    }
}