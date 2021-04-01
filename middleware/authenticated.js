// 验证如果未登录则跳转登陆页的中间件
export default function ({store, redirect}) {
	if(!store.state.user){
		return redirect('/login')
	}
}