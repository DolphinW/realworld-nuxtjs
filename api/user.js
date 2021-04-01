import { request } from '@/plugins/request'

export const login = (data) => {
	return request({
		method: 'POST',
		url:'/api/users/login',
		data
	})
}

export const register = (data) => {
	return request({
		method: 'POST',
		url:'/api/users',
		data
	})
}

export const getCurUser = params => {
	return request({
		method: 'GET',
		url:'/api/user'
	})
}


export const updateCurUser = data => {
	return request({
		method: 'PUT',
		url:'/api/user',
		data
	})
}