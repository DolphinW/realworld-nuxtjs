// 验证如果已登录，则跳转到首页
export default function ({store, redirect}) {
	if(store.state.user){
		return redirect('/')
	}
}