import request from "@/pages/utils/request";
/**
*获取阿里云oss验证
*
* params:
* @return 
*/
export async function ossConfig() {
    return request('/api/auth/oss/token')
}