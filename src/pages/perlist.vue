<template>
	<div>
		<template>
		<h1>已提交</h1>
		<el-table
			:data="tableData"
			style="width: 100%"
			size="mini"
			border
			:row-class-name="tableRowClassName">
			<el-table-column
			prop="username"
			label="姓名"
			width="180">
			</el-table-column>
			<el-table-column
			prop="xuehao"
			label="学号"
			width="180">
			</el-table-column>
			<el-table-column
			prop="workname"
			label="workname"
			width="180">
			</el-table-column>
 

		</el-table>
		</template>
		<button @click="weijiao">点击查询未交</button>

		<template>
		<h1>未提交</h1>
		<el-table
			:data="unfinishuser"
			style="width: 100%"
			size="mini"
			border
			:row-class-name="tableRowClassName">
			<el-table-column
			prop="username"
			label="姓名"
			width="180">
			</el-table-column>
			<el-table-column
			prop="xuehao"
			label="学号"
			width="180">
			</el-table-column>
			<el-table-column
			prop="workname"
			label="workname"
			width="180">
			</el-table-column>
			
			
		</el-table>
		</template>
		
	</div>
</template>

<script>


	export default {
		name:"perlist",
		data(){
			return{
				workname:"",
				// 完成人名单
				finishuser:JSON.parse(localStorage.getItem("finishuser")),
				// 全班人名单 --> obj
				userobj:JSON.parse(localStorage.getItem("userlist")),
				tableData:JSON.parse(localStorage.getItem("tableData")),
				unfinishuser:[]
				
				
			}
		},
		mounted() {
			this.$bus.$on("worknametouserlist",(data)=>{
				console.log("我是渲染页面，现在的学科是",data)
				this.workname = data
				console.log("这里是finishuser",this.finishuser)
				this.tableData=[]
				this.unfinishuser=[]
				for(var i=0;i<this.finishuser.finishperson.length;i++){
					if(this.finishuser.finishperson[i].workname==this.workname){
						this.tableData.push(this.finishuser.finishperson[i])
					}
				}
					
				})
			

		},
		methods: {
			tableRowClassName({row,rowIndex}) {
				console.log(row)
				console.log(rowIndex)
				// console.log("this.tabledata",this.tableData)


				return " "
				// if (this.tableData.indexOf(this.userobj.userlist[rowIndex].xuehao)) {
				
					
				// } else{
				// 	return 'success-row';
				// }
				
			},
			weijiao(){
				this.unfinishuser=[]
				var flag=0
				for(var i =0;i<this.userobj.userlist.length;i++){
					flag=0
					for(var j=0;j<this.tableData.length;j++){
						if(this.userobj.userlist[i].xuehao == this.tableData[j].xuehao){
							flag+=1
							break
						}
					}
					if(flag==0){
						this.unfinishuser.push(this.userobj.userlist[i])
					}
				}
				
				
			},
			

			
		},

	}
</script>

<style>
	.el-table .warning-row {
		background: oldlace;
	}

	.el-table .success-row {
		background: #f0f9eb;
	}

</style>