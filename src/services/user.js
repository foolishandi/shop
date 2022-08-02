import request from "../pages/utils/request";
export async function getUsers(params) {
    // console.log(params)
    return request('/api/admin/users', { params })
}

export async function getLocekd(uid) {
    let res = await request.patch(`/api/admin/users/${uid}/lock`)
    return res
}

export async function addUser(params) {
    return request.post('/api/admin/users', { params })
}

export async function updateUser(uid, params) {
    return request.put(`/api/admin/users/${uid}`, { params })
}

export async function showUser(uid) {
    return request.get(`/api/admin/users/${uid}`)
}