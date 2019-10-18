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

          <el-form-item label="物流单号：">
            <el-input class="w_200" placeholder="请输入" v-model="seaching.logisticsd_id"></el-input>
          </el-form-item>

          <el-form-item label="收货人姓名：">
            <el-input class="w_200" placeholder="请输入" v-model="seaching.name"></el-input>
          </el-form-item>

          <el-form-item label="收货人号码：">
            <el-input class="w_200" placeholder="请输入" v-model="seaching.iphone"></el-input>
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

          <el-form-item label=" 时间范围：">
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
          prop="logisticsd_id"
          label="物流单号"
          width="180">
        </el-table-column>
        <el-table-column
          prop=""
          label="物流方式">
        </el-table-column>
        <el-table-column
          prop="video"
          label="收货人姓名">
        </el-table-column>
        <el-table-column
          prop=""
          label="收货人号码">
        </el-table-column>
        <el-table-column
          prop=""
          label="收货人地址">
        </el-table-column>
        <el-table-column
          prop=""
          label="下单时间">
        </el-table-column>
        <el-table-column
          prop=""
          label="订单金额">
        </el-table-column>
        <el-table-column
          prop=""
          label="备注">
        </el-table-column>
        <el-table-column
          prop=""
          label="订单状态">
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
    <el-dialog title="商品修改" :visible.sync="addShop">
      <el-form :model="add_shopForm">
        <el-form-item label="订单编号" :label-width="formLabelWidth">
          <el-input v-model="add_shopForm.goods_id" ></el-input>
        </el-form-item>
        <el-form-item label="物流单号" :label-width="formLabelWidth">
          <el-input v-model="add_shopForm.logisticsd_id" ></el-input>
        </el-form-item>

        <el-form-item label="物流方式" :label-width="formLabelWidth">
          <el-input v-model="add_shopForm.logistics_type" ></el-input>
        </el-form-item>

        <el-form-item label="收货人姓名" :label-width="formLabelWidth">
          <el-input v-model="add_shopForm.consignee_name" placeholder="" ></el-input>
        </el-form-item>

        <el-form-item label="收货人号码" :label-width="formLabelWidth">
          <el-input v-model="add_shopForm.iphone" placeholder="" ></el-input>
        </el-form-item>

        <el-form-item label="收货人地址" :label-width="formLabelWidth">
          <el-input v-model="add_shopForm.address" placeholder="" ></el-input>
        </el-form-item>

        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="add_shopForm.remark" placeholder="" ></el-input>
        </el-form-item>

        <el-form-item label="订单状态" :label-width="formLabelWidth">
          <el-select v-model="add_shopForm.unit" placeholder="请选择">
            <el-option label="待发货" value="0"></el-option>
            <el-option label="已发货，配送中" value="1"></el-option>
            <el-option label="交易完成" value="2"></el-option>
            <el-option label="待处理退货 / 退款" value="3"></el-option>
            <el-option label="待确认收货" value="4"></el-option>
          </el-select>
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
      formLabelWidth:'120px',//宽度大小
      dialogVisible: false,
      addShop:false,//添加商品 / 修改商品弹窗
      seaching:{ //搜索内容 
        shelf:[{//订单状态
          value: '0',
          label: '待发货'
        }, {
          value: '1',
          label: '已发货，配送中'
        }, {
          value: '2',
          label: '交易完成'
        }, {
          value: '3',
          label: '待处理退货 / 退款'
        }, {
          value: '4',
          label: '待确认收货'
        }],
        
        goods_id:'',//搜索订单编号
        logisticsd_id:'',//物流单号
        name:'',//收货人姓名
        iphone:'',//收货人号码 

        value_time:'',//时间
        start_time:'',//开始时间
        end_time:'',//结束时间
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
            logisticsd_id:'商品',
            picture:''
          },
          {
            goods_id:'2',
            logisticsd_id:'商品2',
            picture:''
          }, 
        ],
      },
      add_shopForm:{//添加商品 / 修改商品 参数
        goods_id:'',//订单编号
        logisticsd_id: '',//物流单号
        logistics_type:'',//物流方式
        consignee_name:'',//收货人姓名
        iphone:'',//收货人号码
        address:'',//收货人地址
        remark:'',//备注
        goods_type:'',//订单状态同步到界面
        unit:''//选择的订单状态状态码
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