<template>
	<div class="box">
		<!-- 班委发布任务 -->
		<el-form :model="formdata" ref="formdata" label-width="100px" class="demo-dynamic" >
		<el-form-item label="任务名称">
			<el-input v-model="workinfo.workname" class="elinput"> </el-input>
		</el-form-item>
		<el-form-item label="总人数">
			<el-input v-model.number="workinfo.count" class="elinput"> </el-input>
		</el-form-item>
		<el-form-item
			v-for="(domain, index) in formdata.domains"
			:label="'步骤' + (index+1)"
			:key="index"
		>
			<el-input v-model="domain.value" class="elinput"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>
		</el-form-item>
		<!-- 日期选择选择 -->
		<div class="block">
			<el-date-picker
			v-model="workinfo.date"
			value-format="yyyy-MM-dd"
			type="daterange"
			range-separator="至"
			start-placeholder="开始日期"
			end-placeholder="结束日期">
			</el-date-picker>
		</div>


		<el-form-item>
			<el-button type="primary" @click="submitForm('formdata')">提交</el-button>
			<el-button @click="addDomain">新增步骤</el-button>
			<!-- <el-button @click="resetForm('formdata')">重置</el-button> -->
		</el-form-item>
		</el-form>

		
	</div>
</template>

<script>
// 班委发布任务
export default {
	name:"issue",
	data() {
      return {
        formdata: {
          domains: [{
            value: ''
          }],
          
        },
		// 任务期限/任务数据
		workinfo:{
			date:"",
			step:[],
			workname:'',
			banji:localStorage.getItem("banji"),
			workid:(Date.parse( new Date())).toString(),
			count:"",
			auth:localStorage.getItem("username"),
			xuehao:localStorage.getItem("xuehao"),
			
		},
		
		
		
		
      };
    },
	mounted:{
		
	},

    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            
			// 得到用户传递的数据
			for(var i =0 ;i<this.formdata.domains.length;i++){
				// console.log(this.formdata.domains[i].__ob__.value.value)
				this.workinfo.step.push(this.formdata.domains[i].__ob__.value.value)
			}
			
			console.log(this.workinfo)
			console.log("正在推送任务给服务器····")


			//发送数据给服务器

			this.axios.post('https://qcakyo.fn.thelarkcloud.com/workinfo', {
				workinfo:this.workinfo
				
				})
				.then(function (response) {
					console.log(response);
					alert("推送成功😊！请刷新页面。")

					//小需求 推送后 自动刷新页面

					// 提示消息  (没有实现) 待完成
					
					// this.$message({
					// 	message: '恭喜你，这是一条成功消息',
					// 	type: 'success'
					// });
				})
				.catch(function (error) {
					console.log(error);
				});
				
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(item) {
        var index = this.formdata.domains.indexOf(item)
        if (index !== -1) {
          this.formdata.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.formdata.domains.push({
          value: '',
        //   key: Date.now()
        });
      }
    }
}
</script>

<style scoped> 
	.box{
		/* border: slateblue solid 1px; */
		font-weight: 100;
		letter-spacing: 5px;
		margin: 100px auto;
		width: 45%;
	}
	.elinput{
		width: 70%;
		margin-right: 20px;
	}
	.block{
		margin: 20px;
		margin-left: 20%;
	}

</style>