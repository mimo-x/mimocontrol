<template>
	<div class="box">
		<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
		<el-radio-button :label="false">展开</el-radio-button>
		<el-radio-button :label="true">收起</el-radio-button>
		</el-radio-group>

		<el-menu default-active="1-4-1" class="el-menu-vertical-demo"  @select="handleSelect" :collapse="isCollapse">
		
		<!-- 显示面板 -->
		<el-menu-item index="cartogram" >
			<i class="el-icon-document"></i>
			<span slot="title">提交情况总览</span>
		</el-menu-item>

		<!-- 提交页面 -->

		<el-submenu index="tijiao">

			<template slot="title">
			<i class="el-icon-menu"></i>
			<span slot="title">我的任务</span>
			</template>
			<el-submenu index="work">
				<span slot="title">作业</span>
				
				<el-menu-item :index="item.workname"  v-for="(item,index) in worklist.result" :key="index" >{{item.workname}} </el-menu-item>

			</el-submenu>
			
		</el-submenu>






		<el-submenu index="banwei" v-if="admin=='true'">
			<template slot="title">
			<i class="el-icon-location"></i>
			<span slot="title">班委管理</span>
			</template>

			<el-menu-item-group>
			<span slot="title">任务管理</span>
			<!-- 班委发布任务 -->
			<el-menu-item index="issue">发布任务</el-menu-item>
			</el-menu-item-group>



			<el-submenu index="perlist">
			<span slot="title">收取任务</span>
			<el-menu-item :index="item.workname"  v-for="(item,index) in worklist.result" :key="index" >{{item.workname}} </el-menu-item>
			
			</el-submenu>
		</el-submenu>
		
		<!-- 联系我们 -->
		<el-submenu index="fankui">
			<template slot="title">
			<i class="el-icon-service"></i>
			<span slot="title">联系/意见</span>
			</template>

			<el-menu-item-group>
			<span slot="title">提出意见</span>
			<el-menu-item index="yijian">意见发表</el-menu-item>
			</el-menu-item-group>



			<el-submenu index="lianxi">
			<span slot="title">联系我们</span>
			<el-menu-item index="xuxin">Mixin🎈</el-menu-item>
			<el-menu-item index="lucy">Lucy</el-menu-item>
			<el-menu-item index="lei">Lei</el-menu-item>
			</el-submenu>
		</el-submenu>
		
		</el-menu>
	</div>
</template>

<script>
export default {
	name:"left",

	data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
		isCollapse:false,
		localstor:JSON.parse(localStorage.getItem("worklist")),
		finishuser:JSON.parse(localStorage.getItem("finishuser")),
		admin:localStorage.getItem("admin"),


		
		// 以json格式存储到localstorage
		worklist:JSON.parse(localStorage.getItem("worklist"))
      };
    },
	mounted() {
		//挂载前请求数据刷新任务列表

		this.axios.post('https://qcakyo.fn.thelarkcloud.com/worklist', {
				banji:localStorage.getItem("banji")
				
				})
				.then(function (response) {
					console.log("查询成功")
					// console.log(response)
					// 获取任务列表儿
					localStorage.setItem("worklist",JSON.stringify(response.data)) 

					// alert("注册成功😊！请前往登录。")

					// 提示消息  (没有实现) 待完成
					
					// this.$message({
					// 	message: '恭喜你，这是一条成功消息',
					// 	type: 'success'
					// });
				})
				.catch(function (error) {
					console.log(error);
				});
		//请求全班人员名单
		this.axios.post('https://qcakyo.fn.thelarkcloud.com/userlist', {
				banji:localStorage.getItem("banji")
				
				})
				.then(function (response) {
					console.log("查询成功")
					console.log("userlist",response.data.userlist)
					
					// console.log(response)
					// 获取任务列表儿
					localStorage.setItem("userlist",JSON.stringify(response.data)) 

				})
				.catch(function (error) {
					console.log(error);
				});

		//请求已完成作业名单
		this.axios.post('https://qcakyo.fn.thelarkcloud.com/finish', {
				banji:localStorage.getItem("banji")
				
				})
				.then(function (response) {
					console.log("查询成功")
					console.log("finishuser",response.data.finishperson)
					
					// console.log(response)
					// 获取任务列表儿
					localStorage.setItem("finishuser",JSON.stringify(response.data)) 

				})
				.catch(function (error) {
					console.log(error);
				});

			
	},
    methods: {
      handleSelect(key, keyPath) {

        console.log("key->",key,"keyPath->", keyPath);
		localStorage.setItem("workname1",key)
		// 提交时步骤 和 任务名称存储到localstorage

		if(keyPath.length==3){
			
			for(var i=0;i<this.localstor.result.length;i++){
					if(keyPath[2]==this.localstor.result[i].workname){
						var tijiaostep=this.localstor.result[i].step
						var tijiaoworkid=this.localstor.result[i].workid
						var tableData=[]
						localStorage.setItem("tijiaostep",JSON.stringify(tijiaostep))
						localStorage.setItem("tijiaoworkid",tijiaoworkid)
						for(var j=0;j<this.finishuser.finishperson.length;j++){
							if(this.finishuser.finishperson[j].workname==keyPath[2]){
								tableData.push(this.finishuser.finishperson[j])
							}
						}
						localStorage.setItem("tableData",JSON.stringify(tableData))

						
					}
				}
		}


		
		if(keyPath[0]=="banwei"){
			// 任务发布  （这个路径跳转比较特殊 单独拉出来）
			this.$bus.$emit("changepath",keyPath[1])
			
		}else{
			// 实现路径跳转
			console.log("跳转方向",keyPath[0])
			this.$bus.$emit("changepath",keyPath[0])
			
		}
		// 同学提交任务
		localStorage.setItem("tijiaoworkname",key)
		this.$bus.$emit("worknametotijiao",key)
		
		// 检查完成度
		this.$bus.$emit("worknametouserlist",key)

		// 重新刷新页面
		if(localStorage.getItem("times")=="0"){
			localStorage.setItem("times","1")
			location.reload();
			
		}

      }
    }
}
</script>

<style scoped>
	.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

</style>