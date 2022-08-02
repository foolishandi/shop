import request from "../pages/utils/request";
export async function getGoods(params) {
    // console.log(params)
    return request('/api/admin/goods', { params })
}

export async function isOn(goodsId) {
    let res = await request.patch(`/api/admin/goods/${goodsId}/on`)
    return res
}

export async function isRecommend(goodsId) {
    return request.patch(`/api/admin/goods/${goodsId}/recommend`)
}

export async function addGoods(pramas) {
    console.log('aa1', pramas);
    return request.post('/api/admin/goods', { pramas })
}

export async function showGoods(uid) {
    return request(`/api/admin/goods/${uid}?include=category`)
}

export async function updateGoods(uid, params) {
    console.log('aa2', uid, params)
    return request.put(`/api/admin/goods/${uid}`, { params })
}
