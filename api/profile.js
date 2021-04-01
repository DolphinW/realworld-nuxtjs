import { request } from '@/plugins/request'

// 获取个人简介
export const getProfile = username => {
	return request({
		method: 'GET',
		url:`/api/profiles/${username}`
	})
}

// 关注个人
export const follow = username => {
	return request({
		method: 'POST',
		url:`/api/profiles/${username}/follow`
	})
}

// 取消关注个人
export const unFollow = username => {
	return request({
		method: 'DELETE',
		url:`/api/profiles/${username}/follow`
	})
}