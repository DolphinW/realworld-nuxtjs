const cookieParser = process.server ? require('cookieparser'):undefined

export const state = () => {
	return {
		user: null
	}
}

export const mutations = {
	setUser (state, data) {
		state.user = data
	}
}

export const actions = {
	// nuxt中特殊的action方法
	// 这个action仅会在服务端渲染期间自动调用
	// 作用：初始化容器数据及传递数据给客户端使用
	nuxtServerInit ({ commit }, {req}) {
		let user = null

		if(req.headers.cookie) {
			// 把cookie字符串转为js对象
			const parsed = cookieParser.parse(req.headers.cookie)
			try{
				user = JSON.parse(parsed.user)
			}catch(err){

			}
		}

		commit('setUser', user)
	}
}

