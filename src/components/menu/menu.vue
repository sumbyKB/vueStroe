<template>
  <div class="content">
    <el-container>
      <el-aside style="width:200px;">
        <el-menu
          :default-active="$route.path"
          router
          mode="vertical"
          background-color="white"
          text-color="black"
        >
          <template>
            <div v-for="(item , index) in $router.options.routes" :key="index">
              <div v-if="item.meta.menuShow">
                <el-submenu :index="item.path" v-if="item.children && item.children.length > 1">
                  <template slot="title">{{item.meta.menuName}}</template>
                  <el-menu-item
                    v-for="(itemChild , index) in item.children"
                    :index="itemChild.path"
                    :key="index"
                  >
                    <div v-if="itemChild.meta.menuShow">
                      <span>{{itemChild.meta.menuName}}</span>
                    </div>
                  </el-menu-item>
                </el-submenu>
                <el-menu-item
                  :index="item.children[0].path"
                  v-else
                >{{item.children[0].meta.menuName}}</el-menu-item>
              </div>
            </div>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header><h5 class="center-text">后台管理</h5></el-header>
        <el-main>
          <router-view class="mian" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  props: {},
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  //生命周期 - 创建之前
  beforeCreate() {},
  //生命周期 - 挂载之前
  beforeMount() {},
  //生命周期 - 更新之前
  beforeUpdate() {},
  //生命周期 - 更新之后
  updated() {},
  //生命周期 - 销毁之前
  beforeDestroy() {},
  ///生命周期 - 销毁完成
  destroyed() {},
  //如果页面有keep-alive缓存功能，这个函数会触发
  activated() {}
};
</script>

<style scoped lang="scss">
</style>
