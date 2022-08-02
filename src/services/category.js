import request from "@/pages/utils/request"
/**
*
*
* params:
* @return 
*/
export async function getCategory() {
    return request(`/api/admin/category`)
}