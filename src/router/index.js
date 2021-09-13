import Vuerouter from "vue-router"

import login from "../pages/login"
import info from "../pages/info"



const router = new Vuerouter({
	routes:[
		{
			path:"/login",
			component:login,
			meta:{isAuth:false,title:"登录"}
		},
		{
			path:"/info",
			component:info,
			meta:{isAuth:false,title:"详细信息"}
		},

	]
})

// router.beforeEach((to,from,next)=>{
// 	console.log(to,from)
// 	//是否需要权限校验
// 	document.title = to.meta.title || "作业管理系统"
// 	if(!localStorage.getItem('xuehao')){
// 		// 如果没有学号
// 		console.log("请登录")
// 	}else{
// 		next()
// 	}
	
// })
router.afterEach((to) => {
	// to and from are both route objects.
	document.title = to.meta.title || "作业管理系统"
	
	
})

export default router