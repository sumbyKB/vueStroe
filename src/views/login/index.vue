<!--  -->
<template>
  <div class='content'>
    <div>
      <div class="content-login">
        <div class="content-login-text">小果后台</div>
        <div>
          <span>账号</span>
          <el-input class="content-input" prefix-icon="el-icon-user-solid" v-model="user_name" placeholder="请输入内容"></el-input>
        </div>
        <div>
          <span>密码</span>
          <el-input class="content-input" prefix-icon="el-icon-lollipop" v-model="password" placeholder="请输入内容" show-password></el-input>
        </div>
      </div>
      <div class="content-makeSuccess" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
  return {
    user_name:'',//姓名
    password:'',//密码
  };
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  login(){
    console.log(this.user_name,this.password)
  }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
$color:#409eff;
.content{
  height: 500px;
  width: 100%;
  background: $color;
  display: flex;
  margin:180px 0px;
  justify-content: center;
  align-items: center;
  &-login{
    width: 100%;
    height: 200px;
    background: white;
    border-radius:5px; 
    margin-bottom: 30px;
    &-text{
      font-weight: 600;
      padding-top: 5px;
      color:$color;
    }
    div{
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      margin:10px 20px;
      span{
        width: 60px;
      }
      .content-input{ 
        width: 80%;
      }
    }
  }
  &-makeSuccess{
    cursor:pointer;
    width: 50%;
    display: block;
    margin: auto;
    border-radius:3px;
    background:white; 
    line-height: 40px;
    color:$color;
    font-weight: 600;
    text-align: center;
  }
}
</style>