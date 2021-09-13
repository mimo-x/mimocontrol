<template>
	<div class="rightbox" v-if="flash">
		<el-alert title="文件提交成功" type="success" center show-icon v-show="show"> </el-alert>
		<el-alert :title="'文件提交失败'+errorname" type="error" center show-icon v-show="showerr"> </el-alert>
		<el-alert title="正在上传请等待····" type="info" center show-icon v-show="upding"> </el-alert>
		<!-- <el-alert :title="'你选择的作业是'+workname" type="info" center show-icon :v-show="!show || !showerr || !upding"> </el-alert> -->
		<div class="jindutiao" >
			<el-steps :active="1" align-center>
				<el-step :title="'步骤'+(index+1)" :description="item" v-for="(item, index) in step" :key="index"></el-step>

			</el-steps>
		</div>
		<div class="upfile">
			<el-upload
				class="upload-demo"
				:drag="true"
				
				:limit="1"
				
				:http-request="befor"
				
				multiple
				>
			<i class="el-icon-upload"></i>
			<div class="el-upload__text"><u>{{workname}}</u>作业将文件拖到此处，或<em>点击上传</em></div>
			<div class="el-upload__tip fonts" slot="tip">bug已修复 </div>
			</el-upload>
			
			<!-- 测试用的input 和 button -->
			<!-- <input type="file" id="filebox" name="文件">
			<button @click="befor"> 提交</button>
			<a href="https://s1-lc.thelarkcloud.com/obj/larkcloud-mgcloud/baas/qcakyo/8e15a39fc8f26dcb_1630481990008.zip" download="xuxin.js">Download file</a> -->
		</div>
		
	</div>

</template>

<script>
	export default {
		name:"tijiao",
		data(){
			return{
				filelist:[],
				show:false,
				showerr:false,
				upding:false,
				userinfo:{
					username:localStorage.getItem("username"),
					xuehao:localStorage.getItem("xuehao"),
					class:"web2",
					workid:localStorage.getItem("tijiaoworkid")

				},
				workname:"",
				workname1:localStorage.getItem("workname1"),
				localstor:JSON.parse(localStorage.getItem("worklist")),
				step:JSON.parse(localStorage.getItem("tijiaostep")),

				flash:false,
				biaoji:"",
				errorname:"双击作业名了吗？"
				
			}
		},
		mounted() {
			// 改变提交的科目
			this.workname1=localStorage.getItem("workname1"),
			console.log("workname1",this.workname1)
			console.log("挂载")
			this.$bus.$on("worknametotijiao",(data)=>{
				// console.log("我是提交页面，现在的学科是",data)

				this.workname = data

				
				for(var i=0;i<this.localstor.result.length;i++){
					if(data==this.localstor.result[i].workname){
						this.step=this.localstor.result[i].step
						this.userinfo.workid=this.localstor.result[i].workid
					}
				}
				// console.log("数据来了")
			})

			this.flash=true

			// console.log("挂载完毕")
		},
		computed:{
			
		},
		methods: {
			upsuccess(){
				// console.log("上传成功")
				this.show=true
			},
			befor(params){
				// 云函数 发送 就用这个 可操作空间大
				// 以下为客户端代码
				// 轻服务 JavaScript SDK 可以通过 npm 进行安装：
				// npm i @byteinspire/js-sdk  
				confirm("确定提交："+localStorage.getItem("workname1"))
				
				this.upding=true
				console.log(params)

				
				const InspireCloud = require ('@byteinspire/js-sdk')
				const serviceId = 'qcakyo'; // 替换成你的 serviceId，可在后台「设置」页面获取
				const inspirecloud = new InspireCloud({ serviceId });

				// 构建 FormData 对象
				const formData = new FormData();

				// 添加文件
				// const fileinput = document.getElementById("filebox")
				// const file=fileinput.files[0]
				
				formData.append('myFile',params.file);
				formData.append('username', localStorage.getItem("username"));
				formData.append('xuehao', localStorage.getItem("xuehao"));
				formData.append('banji', "web2");
				formData.append('workid', localStorage.getItem("tijiaoworkid"));
				formData.append('workname', localStorage.getItem("tijiaoworkname"));
				// formData.append('myFile',params.file);
				// formData.append('username', this.userinfo.username);
				// formData.append('xuehao', this.userinfo.xuehao);
				// formData.append('banji', this.userinfo.class);
				// formData.append('workid', this.userinfo.workid);
				// formData.append('workname', localStorage.getItem("tijiaoworkname"));

				// for (var value of formData.values()) {
				// 	console.log(value);
				// }


				// 以 multipart/form-data 的类型调用上文的函数，实现上传
				inspirecloud.run('upfile', formData, {
				headers: {
					'content-type': 'multipart/form-data',
					// "Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Origin": "https://qcakyo.fn.thelarkcloud.com/"
				},
				}).then((e)=>{
					// 控制提示成功弹窗
					console.log(e)
					this.upding=false
					this.show=true
					// location.reload();
					
				}).catch((error)=>{
					console.log(error)
					this.upding=false
					this.showerr=true
					alert("作业已经上传服务器，但是更新名单失败！滴下徐鑫（734532469），可解决！😊")
					
				});
				
			},
			
			befor2(){
				// 以下为客户端（浏览器端）代码
				// 轻服务 JavaScript SDK 可以通过 npm 进行安装：
				// npm i @byteinspire/js-sdk  
				const InspireCloud = require('@byteinspire/js-sdk')

				const serviceId = 'qcakyo'; // 替换成你的 serviceId，可在后台「设置」页面获取
				const fileUploadToken = '04720c21-b0d0-407e-b2f7-564ea1ef183f'; // 替换成你的客户端上传 token，可在后台「设置」页面获取

				const inspirecloud = new InspireCloud({ serviceId });

				// 获取到上传选择框
				const fileInputElement = document.getElementById('filebox');

				if (fileInputElement.files.length > 0) {
					const file = fileInputElement.files[0];
					// const filename = file.name;
					const filename = localStorage.getItem("username")
					const xuehao = localStorage.getItem("xuehao")

					// 调用 JavaScript SDK 的 upload 方法实现上传，第二个参数为 File 对象
					inspirecloud.file.upload(filename, file, { token: fileUploadToken ,xuehao:xuehao})
						.then((data) => {
						// 上传成功
							console.log(data.url);
							this.show=true
						})
						.catch((error) => {
						// 调用失败，进行错误处理
							console.log(error)
					});
				}
			},
			
		},
	}
	

</script>

<style scoped>
	.scale-up-hor-left{-webkit-animation:scale-up-hor-left 1s cubic-bezier(.39,.575,.565,1.000) both;animation:scale-up-hor-left 1s cubic-bezier(.39,.575,.565,1.000) both}

	@-webkit-keyframes scale-up-hor-left{0%{-webkit-transform:scaleX(.4);transform:scaleX(.4);-webkit-transform-origin:0 0;transform-origin:0 0}100%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:0 0;transform-origin:0 0}}@keyframes scale-up-hor-left{0%{-webkit-transform:scaleX(.4);transform:scaleX(.4);-webkit-transform-origin:0 0;transform-origin:0 0}100%{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:0 0;transform-origin:0 0}}
	
	.rightbox{
		margin: 30px auto;
		/* border: 1px solid slateblue; */


	}
	.upfile{
		margin: 80px auto;
		width: 30%;
		margin-bottom: 150px;
		/* border: slategray 1px solid; */
	}
	.fonts{
		color: red;
		padding-left: 5px;
	}

</style>