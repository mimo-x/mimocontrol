<template>
	<div class="box">
		<div class="title">
			Job Management System📚
		</div>
		<div class="user">
			Hello 🎈,{{username}}-{{xuehao}}-{{banji}}！
			<el-button size="mini" round @click="quit">退出登录</el-button>
		</div>

	</div>
</template>

<script>
export default {
	name:"top",
	data() {
      return {
        username:localStorage.getItem("username"),
		xuehao:localStorage.getItem("xuehao"),
		banji:localStorage.getItem("banji"),

      }
    },
	methods:{
		quit(){
			localStorage.clear()
			location.reload()
		}
	}
    
     
}
</script>

<style scoped>
	.box{
		display: flex;
		justify-content: space-between;
		/* background-color: #eef5fe; */
		text-align: center;
		padding: 10px;

	}
	.title{
		/* font-size: %; */
		font-weight: bolder;
		font-family:Georgia, 'Times New Roman', Times, serif;
		/* letter-spacing: 5px; */
	}
</style>