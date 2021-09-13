<template>
	<div class="box">
		<el-empty description="数据为空" v-if="!flag"></el-empty>
		<!-- {{worklist}} -->
		<div class="block">
		<el-timeline>
			<el-timeline-item  v-for="(item,index) in worklist" :key="index" :timestamp="item.updatedAt.slice(0,10)" placement="top">
			<el-card>
				<h4>更新 {{item.workname}} 作业</h4>
				<!-- <p>{{worklist[0].username}} 提交于 {{worklist[0].updatedAt}}</p> -->
				<p > 我 提交于 {{time(item.updatedAt)}}</p>
			</el-card>
			</el-timeline-item>

		</el-timeline>
		</div>

	</div>
</template>

<script>
export default {
	name:"feedback",
	data(){
		return{
			flag:true,
			worklist:JSON.parse(localStorage.getItem("feedback"))
		}
	},
	mounted() {
		this.axios.post("https://qcakyo.fn.thelarkcloud.com/feedback",{

			username:localStorage.getItem("username"),
			xuehao:localStorage.getItem("xuehao")
		}).then(function (response){
			console.log("查询提交记录成功")
			console.log(response)
			// this.worklist = response.data.worklist
			localStorage.setItem("feedback",JSON.stringify(response.data.worklist))

		}).catch(function (error){
			console.log(error);
		})
	},
	computed:{
		// 格式化时间
		time(){
			return function(dateForm){
				if (dateForm === "") {  //解决deteForm为空传1970-01-01 00:00:00
				return "";
				}else{
					var dateee = new Date(dateForm ).toJSON();
					var date = new Date(+new Date(dateee)+ 8 * 3600 * 1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
					return date;
				}

			}
			
			
		}
	
					
	}
}
</script>

<style scoped>
	.box{
		margin-top: 40px;
	}
</style>