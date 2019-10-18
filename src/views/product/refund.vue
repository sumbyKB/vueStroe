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
          <el-form-item label="订单编号：">
            <el-input class="w_200" placeholder="请输入" v-model="seaching.goods_id"></el-input>
          </el-form-item>



          <el-form-item label=" 用户申请时间：">
            <el-date-picker
              v-model="seaching.user_time"
              type="daterange"
              :picker-options="seaching.pickerOptions"
              start-placeholder="开始日期"
              range-separator="至"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
          </el-form-item>


          <el-form-item label="退货/退款物流：">
            <el-input class="w_200" placeholder="请输入" v-model="seaching.refund"></el-input>
          </el-form-item>

          <el-form-item label="订单状态：">
            <el-select v-model="seaching.shelf_value" placeholder="请选择">
              <el-option
                v-for="item in seaching.shelf"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="处理人账号：">
            <el-input class="w_200" placeholder="请输入" v-model="seaching.handler"></el-input>
          </el-form-item>

          <el-form-item label=" 商家处理时间：">
            <el-date-picker
              v-model="seaching.value_time"
              type="daterange"
              :picker-options="seaching.pickerOptions"
              start-placeholder="开始日期"
              range-separator="至"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <!-- 中间分隔栏 -->
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>

    <!-- table数据 -->
    <div class="table-container">
      <el-table
        :data="table.tableData"
        :default-sort = "{prop: 'date', order: 'descending'}"
        border
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>

        <el-table-column
          prop="goods_id"
          label="订单编号"
          width="180">
        </el-table-column>

        <el-table-column
          prop="user_time"
          label="用户申请时间"
          width="180">
        </el-table-column>

        <el-table-column
          prop=""
          label="处理人员账号">
        </el-table-column>

        <el-table-column
          prop="video"
          label="退货物流编号">
        </el-table-column>

        <el-table-column
          prop=""
          label="退款订单金额">
        </el-table-column>

        <el-table-column
          prop=""
          label="订单处理状态">
        </el-table-column>

        <el-table-column
          prop=""
          label="商家最后处理时间">
        </el-table-column>
        
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑商品 / 新增商品 -->
    <el-dialog title="订单修改" :visible.sync="addShop">
      <el-form :model="add_shopForm">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="add_shopForm.goods_name" ></el-input>
        </el-form-item>
        <el-form-item label="商品图片" :label-width="formLabelWidth">
          <el-input v-model="add_shopForm.picture" ></el-input>
        </el-form-item>

        <el-form-item label="商品单价" :label-width="formLabelWidth">
          <el-input v-model="add_shopForm.price" ></el-input>
        </el-form-item>

        <el-form-item label="购买数量" :label-width="formLabelWidth">
          <el-input v-model="add_shopForm.number" placeholder="" ></el-input>
        </el-form-item>

        <el-form-item label="退款订单金额" :label-width="formLabelWidth">
          <el-input v-model="add_shopForm.amount" placeholder="" ></el-input>
        </el-form-item>

        <el-form-item label="用户联系电话" :label-width="formLabelWidth">
          <el-input v-model="add_shopForm.iphone" placeholder="" ></el-input>
        </el-form-item>

        <el-form-item label="用户申请理由" :label-width="formLabelWidth">
          <el-input v-model="add_shopForm.reason" placeholder="" ></el-input>
        </el-form-item>

        <el-form-item label="商家备注" :label-width="formLabelWidth">
          <el-input v-model="add_shopForm.remarks" placeholder="" ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addShop = false" type="warning">拒绝</el-button>
        <el-button @click="addShop = false" type="danger">同意</el-button>
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
      formLabelWidth:'120px',//宽度大小
      dialogVisible: false,
      addShop:false,//添加商品 / 修改商品弹窗
      seaching:{ //搜索内容 
        shelf:[{//订单状态
          value: '0',
          label: '待处理'
        }, {
          value: '1',
          label: '退货退款'
        }, {
          value: '2',
          label: '已完成'
        }, {
          value: '3',
          label: '已拒绝'
        }],
        
        goods_id:'',//搜索订单编号
        user_time:'',//用户申请时间
        user_start_time:'',//用户处理时间 开始时间
        user_end_time:'',//用户处理时间 结束时间

        refund:'',//退货物流查询
        handler:'',//处理人账号

        value_time:'',//商家处理时间
        value_start_time:'',//商家处理时间 开始时间
        value_end_time:'',//商家处理时间 结束时间
        pickerOptions: {//限制选择的时间
          disabledDate(time) { //不能选择今日后的时间
              return time.getTime() > Date.now();
          },
        }
      },
      table:{//表格内容
        tableData:[
          {
            goods_id:'1',
            user_time:'商品',
            picture:''
          },
          {
            goods_id:'2',
            user_time:'商品2',
            picture:''
          }, 
        ],
      },
      add_shopForm:{// 添加商品 / 修改商品 参数
        goods_name:'',//商品名称
        pictur:'',//商品图片  :'',
        price:'',//商品单价  price
        number:'',//购买数量  number
        amount:'',//退款订单金额  amount
        iphone:'',//用户联系电话  iphone
        reaso:'',//用户申请理由  reason
        remarks:''//商家备注  remarks
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
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
  methods:{
    // table
    handleEdit(index, row){//编辑 / 添加
      this.addShop = true
      // console.log(row);//获取点击的商品的内容
    },
  }
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

.app-container{

  .w_200{
    width: 200px;
  }
  .w_120{
    width: 120px;
  }
  .table-container{
    margin-top:20px;
  }

  .input_small{
    width:120px;
  }

}
</style>