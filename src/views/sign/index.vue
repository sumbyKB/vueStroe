<!--  -->
<template>
  <div>
    <div>
      <el-card class="operate-container title" shadow="never">
        <i class="el-icon-tickets"></i>
        <span>签到所获得币</span>
      </el-card>
      <el-form :model="formInline" class="form-margin" >
        <el-form-item label="第 1 天签到获得币" >
          <el-input size="small"  class="input-width" v-model="formInline.time_1" placeholder="请填写"></el-input>
        </el-form-item>
        <el-form-item label="第 2 天签到获得币">
          <el-input  size="small" class="input-width" v-model="formInline.time_2" placeholder="请填写"></el-input>
        </el-form-item>
        <el-form-item label="第 3 天签到获得币">
          <el-input  size="small" class="input-width" v-model="formInline.time_3" placeholder="请填写"></el-input>
        </el-form-item>
        <el-form-item label="第 4 天签到获得币">
          <el-input  size="small" class="input-width" v-model="formInline.time_4" placeholder="请填写"></el-input>
        </el-form-item>
        <el-form-item label="第 5 天签到获得币">
          <el-input  size="small" class="input-width" v-model="formInline.time_5" placeholder="请填写"></el-input>
        </el-form-item>
        <el-form-item label="第 6 天签到获得币">
          <el-input  size="small" class="input-width" v-model="formInline.time_6" placeholder="请填写"></el-input>
        </el-form-item>
        <el-form-item label="第 7 天签到获得币">
          <el-input  size="small" class="input-width" v-model="formInline.time_7" placeholder="请填写"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div>
      <el-card class="operate-container title" shadow="never">
        <i class="el-icon-tickets"></i>
        <span>新用户注册所得签到币</span>
      </el-card>
      <el-form :model="new_user" class="form-margin" >
        <el-form-item label="新用户注册所得签到币" >
          <el-input size="small"  class="input-width" v-model="new_user.coin" placeholder="请填写"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div>
      <el-card class="operate-container title" shadow="never">
        <i class="el-icon-tickets"></i>
        <span>分享所得币</span>
      </el-card>
      <el-form :model="new_user" class="form-margin" >
        <el-form-item label="分享所得币" >
          <el-input size="small"  class="input-width" v-model="shaw_coin.coin" placeholder="请填写"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div>
        <el-button type="success">确认</el-button>
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
    formInline:{//普通签到所获得币
      time_1:'',//第1天签到
      time_2:'',//第2天签到
      time_3:'',//第3天签到
      time_4:'',//第4天签到
      time_5:'',//第5天签到
      time_6:'',//第6天签到
      time_7:'',//第7天签到
    },
    new_user:{//新用户注册所得签到币
      coin:''
    },
    shaw_coin:{//分享所得签到币
      coin:''
    }
  };
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {

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
.title{
  width: 30%;
  margin-top: 30px;
}
.form-margin{
  margin: 50px;

  .input-width{
    width: 80px;
  }
  .el-button{
    margin: 50px;
  }
}
</style>