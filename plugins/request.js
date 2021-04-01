/* 基于axios封装的请求模块 */
import axios from 'axios'

export const request = axios.create({
	baseURL:'https://conduit.productionready.io'
})

// 插件导出函数必须作为default成员
// 通过插件机制获取上下文中的内容
export default ({store}) => {

	// 请求拦截器
	request.interceptors.request.use(function (config) {
		const { user } = store.state
		
		if( user && user.token ){
			config.headers.Authorization = `Token ${user.token}`
		}
		
		return config
	}, function(error) {
		return Promise.reject(error);
	})
	// 响应拦截器

}