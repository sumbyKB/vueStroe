<!--  -->
<template>
  <div class="app-container">
    <!-- 筛选条件 -->
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float: right" type="primary" size="small">查询结果</el-button>
        <el-button
          style="float: right;margin-right: 15px"
          size="small"
        >重置</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" size="small" label-width="140px">
          <el-form-item label="商品名称：">
            <el-input class="w_200" placeholder="请输入" v-model="seaching.shop_name"></el-input>
          </el-form-item>
          <el-form-item label="兑换币：">
            <el-input class="w_200" placeholder="请输入" v-model="seaching.shop_currency"></el-input>
          </el-form-item>

        </el-form>
      </div>
    </el-card>

    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table
        :data="table.tableData"
        :default-sort = "{prop: 'date', order: 'descending'}"
        border
        style="width: 100%">
  
        <el-table-column
          prop="name"
          label="商品名称"
          >
        </el-table-column>
        <el-table-column
          prop="picture"
          label="商品图片"
          >
        </el-table-column>
        <el-table-column
          prop="currency"
          label="商品所需兑换币"
          >
        </el-table-column>
        <el-table-column
          prop="putaway"
          label="是否上架"
          >
        </el-table-column>
        <el-table-column label="操作" width="250">
            <template slot-scope="scope">
              <el-button
                size="mini"
                 type="danger"
                @click="handleEdit(scope.$index, scope.row)">编辑所需兑换币</el-button>
            </template>
        </el-table-column>
        
      </el-table>
    </div>

    <el-dialog title="商品修改" :visible.sync="addShop">
      <el-form :model="add_shopForm">
        <el-form-item label="所需兑换币">
          <el-input v-model="add_shopForm.currency" placeholder="请填写" ></el-input>
        </el-form-item>

        <el-form-item label="是否上架">
          <el-tooltip>

            <el-switch
              v-model="add_shopForm.putaway"
              active-color="#13ce66"
              inactive-color="#eee"

              active-value="0"
              inactive-value="1">
            </el-switch>
          </el-tooltip>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addShop = false">取 消</el-button>
        <el-button type="primary" @click="addShop = false">确 定</el-button>
      </div>
    </el-dialog>
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
      addShop:false,//添加 / 编辑兑换币
      currency:'',//所需兑换货币
      putaway:'',//是否上架

      add_shopForm:{//商品修改
        currency:'',//所需兑换货币
        putaway:'',//是否上架
      },
      seaching:{ //搜索内容 
        shop_name:'',//搜索商品名称
        shop_currency:''
      },
      table:{//表格内容
        tableData:[
          {
            name:'商品',
            picture:'',
            currency:'',
          },
          {
            name:'商品2',
            picture:'',
            currency:'',
          }, 
        ],
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // table
    handleEdit(index, row){//编辑 所需兑换币
      this.addShop = true
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发

};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

.app-container{
  .w_200{
    width: 200px;
  }

  .table-container{
    margin-top:20px;
  }
}
</style>