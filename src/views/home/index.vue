<template>
  <div class="app-container">

    <!-- 订单管理 -->
    <div class="un-handle-layout">
      <div class="layout-title">订单管理</div>
      <div class="un-handle-content">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待付款订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">已完成订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待确认收货订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待发货订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">缺货登记</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待处理退货 / 退款申请</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">已发货 / 配送中订单</span>
              <span style="float: right" class="color-danger">(10)</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 商品数量总览 -->
    <div class="overview-layout">
      <el-row :gutter="20">
        <el-col>
          <div class="out-border">
            <div class="layout-title">商品总览</div>
            <div style="padding: 40px">
              <el-row>
                <el-col :span="6" class="color-danger overview-item-value">100</el-col>
                <el-col :span="6" class="color-danger overview-item-value">400</el-col>
                <el-col :span="6" class="color-danger overview-item-value">50</el-col>
                <el-col :span="6" class="color-danger overview-item-value">500</el-col>
              </el-row>
              <el-row class="font-medium">
                <el-col :span="6" class="overview-item-title">已上架</el-col>
                <el-col :span="6" class="overview-item-title">已下架</el-col>
                <el-col :span="6" class="overview-item-title">库存紧张</el-col>
                <el-col :span="6" class="overview-item-title">全部商品</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 销售业绩 echars表 -->
    <div class="statistics-layout">
      <div class="layout-title">销售业绩一览 （ 只展示一周的时间选择 ）</div>
      <el-row>

        <el-col :span="4">
          <div style="padding: 20px">
            <div>
              <div style="color: #909399;font-size: 14px">本月订单总数</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">10000</div>
              <div>
                <span class="color-success" style="font-size: 14px">+10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上月</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本周订单总数</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">1000</div>
              <div>
                <span class="color-danger" style="font-size: 14px">-10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上周</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本月销售总额</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">100000</div>
              <div>
                <span class="color-success" style="font-size: 14px">+10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上月</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本周销售总额</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">50000</div>
              <div>
                <span class="color-danger" style="font-size: 14px">-10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上周</span>
              </div>
            </div>
          </div>
        </el-col>

      
        <el-col :span="20">
          <div style="padding: 10px;border-left:1px solid #DCDFE6">
    
            <el-date-picker
              style="float: right;z-index: 1"
              size="small"
              v-model="orderCountDate"
              type="daterange"
              align="right"
              unlink-panels
              :editable="false"
              start-placeholder="开始日期"
              range-separator="至"

              end-placeholder="结束日期"
              @change="handleDateChange"
              
              :picker-options="pickerOptions">
            </el-date-picker>

            <div>
              <ve-line
                :data="chartData"
                :legend-visible="false"
                :settings="chartSettings"></ve-line>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {str2Date} from '@/utils/date';//转换成 时间戳
  // import {searchCorpType} from "@/api/api";
  const data_from_backend = {
    //orderCount左边的数据  data下面的数据    orderAmount右边的数据
    //https://v-charts.js.org/#/
    columns: ['date', 'orderCount','orderAmount'],
    rows: [//表中展示内容
      {date: '2019-05-11', orderCount: 10, orderAmount: 1093},
      {date: '2019-05-12', orderCount: 20, orderAmount: 2230},
      {date: '2019-05-13', orderCount: 33, orderAmount: 3623},
      {date: '2019-05-14', orderCount: 50, orderAmount: 6423},
      {date: '2019-05-15', orderCount: 80, orderAmount: 8492},
      {date: '2019-05-16', orderCount: 60, orderAmount: 6293},
      {date: '2019-05-17', orderCount: 20, orderAmount: 2293},
      {date: '2019-05-18', orderCount: 60, orderAmount: 6293},
      {date: '2019-05-19', orderCount: 50, orderAmount: 5293},
      {date: '2019-05-20', orderCount: 30, orderAmount: 3293},
      {date: '2019-05-21', orderCount: 20, orderAmount: 2293},
      {date: '2019-05-22', orderCount: 80, orderAmount: 8293},
      {date: '2019-05-23', orderCount: 70, orderAmount:9293},
      {date: '2019-05-24', orderCount: 10, orderAmount: 1293},
      {date: '2019-05-25', orderCount: 40, orderAmount: 4293}
    ]
  };
  export default {
    name: 'home',
    data() {
      let that = this;
      return {
        pickerOptions: {//限制选择的时间
          // disabledDate(time) { //不能选择今日后的时间
          //     return time.getTime() > Date.now();
          // },

          //限制前后一周的时间选择 disabledDate 和  disabledDate 要在一起用
          disabledDate(time) {//获取选中时间做判断
            let timeOptionRange = that.timeOptionRange;
            let secondNum = 60*60*24*7*1000;
            if(timeOptionRange){
                return time.getTime() > timeOptionRange.getTime() + secondNum || time.getTime() < timeOptionRange.getTime() - secondNum ;
            }
          },
          onPick(time){ //获取第一次选中时间
              //当第一时间选中才设置禁用
      
              if(time.minDate && !time.maxDate){
                  that.timeOptionRange = time.minDate;
              }
              if(time.maxDate){
                  that.timeOptionRange = null;
              }
          }
        },
        orderCountDate: '',//选择的时间 开始时间 结束时间 yyyy-mm-dd
        chartSettings: {//Eacher的基本格式
            area:true,//面积图
            axisSite: { left:['orderCount'],bottom:['data'],right: ['orderAmount']},//自定义数据位置
            labelMap: {'orderCount': '订单数量', 'orderAmount': '订单金额'}},//Map上面的对应数据
            chartData: {//数据 
              columns: [], //orderCount左边的数据  data下面的数据    orderAmount右边的数据
              rows: []//表中展示内容
            },

        }
    },
    created(){
      this.initOrderCountDate();//获取系统时间
      this.getData();//Eacher数据变化
    },
    methods:{
      // 接口实例
      // getCompanyType() {
      //   let that = this;
      //   searchCorpType().then(res => {
      //     console.log("查企业分类", res.data);
      //     that.company = res.data.data;
      //     that.companyfenleiId = res.data.data[0].id;
      //     that.companyfenleiName = res.data.data[0].name;
      //   });
      // },
      handleDateChange(){
        this.getData();
      },
      initOrderCountDate(){//获取系统时间
        let start = new Date();//系统时间
        start.setFullYear();//年
        start.setMonth();//月
        start.setDate();//日
        const end = new Date();
        end.setTime(start.getTime() + 1000 * 60 * 60 * 24 * 7);
        this.orderCountDate=[start,end];
      },
      getData(){//Eacher数据变化
        setTimeout(() => {
          this.chartData = {
            columns: ['date', 'orderCount','orderAmount'],
            rows: []
          };
          for(let i=0;i<data_from_backend.rows.length;i++){
            let item=data_from_backend.rows[i]; // 获取选择的时间 2019-05-01

            let currDate=str2Date(item.date); //转为 中国标准时间
            let start=this.orderCountDate[0];
            let end=this.orderCountDate[1];
            //getTime() 转时间戳
            if(currDate.getTime()>=start.getTime()&&currDate.getTime()<=end.getTime()){
              this.chartData.rows.push(item);//把获取到的数据放到 chartData.rows中（Map中）
            }
          }
        }, 1000)
      },
    }
  }
</script>

<style scoped>
  /* .app-container {
    margin-top: 40px;
    margin-left: 120px;
    margin-right: 120px;
  } */

  .total-layout {
    margin-top: 20px;
  }

  .total-frame {
    border: 1px solid #DCDFE6;
    padding: 20px;
    height: 100px;
  }

  .total-icon {
    color: #409EFF;
    width: 60px;
    height: 60px;
  }

  .total-title {
    position: relative;
    font-size: 16px;
    color: #909399;
    left: 70px;
    top: -50px;
  }

  .total-value {
    position: relative;
    font-size: 18px;
    color: #606266;
    left: 70px;
    top: -40px;
  }

  .un-handle-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }

  .layout-title {
    color: #606266;
    padding: 15px 20px;
    background: #F2F6FC;
    font-weight: bold;
  }

  .un-handle-content {
    padding: 20px 40px;
  }

  .un-handle-item {
    border-bottom: 1px solid #EBEEF5;
    padding: 10px;
  }

  .overview-layout {
    margin-top: 20px;
  }

  .overview-item-value {
    font-size: 24px;
    text-align: center;
  }

  .overview-item-title {
    margin-top: 10px;
    text-align: center;
  }

  .out-border {
    border: 1px solid #DCDFE6;
  }

  .statistics-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }
</style>
