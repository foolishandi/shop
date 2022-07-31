import request from '../pages/utils/request'

export function fetchDashBoard() {
    return request('/api/admin/index')
}
