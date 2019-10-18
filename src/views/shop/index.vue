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
          <el-form-item label="商品货号：">
            <el-input class="w_200" placeholder="请输入" v-model="seaching.shop_id"></el-input>
          </el-form-item>
          <el-form-item label="上架状态：">
            <el-select v-model="seaching.shelf_value" placeholder="请选择">
              <el-option
                v-for="item in seaching.shelf"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="价格范围：">
            <el-input class="w_120" v-model="seaching.price_down" placeholder="最低价格"></el-input>
            <el-input class="w_120" v-model="seaching.price_up" placeholder="最高价格"></el-input>
          </el-form-item>
          <el-form-item label="库存状态：">
            <el-select v-model="seaching.inventory_value" placeholder="请选择">
              <el-option
                v-for="item in seaching.inventory"
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

    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        size="mini"
        @click="handleEdit()"
        >
        添加商品
      </el-button>
    </el-card>
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
          prop="date_id"
          label="商品编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="picture"
          label="商品图片">
        </el-table-column>
        <el-table-column
          prop="video"
          label="商品视频封面">
        </el-table-column>
        <el-table-column
          prop=""
          label="购买价格"
          sortable>
        </el-table-column>
        <el-table-column
          prop=""
          label="进货价格"
          sortable>
        </el-table-column>
        <el-table-column
          prop=""
          label="库存数量"
          sortable>
        </el-table-column>
        <el-table-column
          prop=""
          label="销售数量"
          sortable>
        </el-table-column>
        <el-table-column
          prop=""
          label="商品规格">
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑商品 / 新增商品 -->
    <el-dialog title="商品修改" :visible.sync="addShop">
      <el-form :model="add_shopForm">
        <el-form-item label="商品编号" :label-width="formLabelWidth">
          <el-input v-model="add_shopForm.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="add_shopForm.name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="商品副标题" :label-width="formLabelWidth">
          <el-input v-model="add_shopForm.vice_name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="商品主图"  :label-width="formLabelWidth">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove_main">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" size="tiny">
            <img width="100%" :src="add_shopForm.fileList" alt="">
          </el-dialog>
        </el-form-item>

        <el-form-item label="轮播图片" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="add_shopForm.fileList2"
            list-type="picture">
            <el-button size="small" type="primary">点击上传轮播图片</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item label="进货价" :label-width="formLabelWidth">
          <el-input v-model="add_shopForm.purchasing_price" placeholder="进货价" ></el-input>
        </el-form-item>

        <el-form-item :model="add_shopForm.shop_specification" label="商品规格" :label-width="formLabelWidth">
         
              <!-- <el-input size="small" class="input_small" v-model="add_shopForm.shop_specification.selling_price" placeholder="商品售价/优惠价格" ></el-input>
              <el-input size="small" class="input_small" v-model="add_shopForm.shop_specification.bazaar_price" placeholder="市场售价/不优惠价格" ></el-input>
              <el-input size="small" class="input_small" v-model="add_shopForm.shop_specification.inventory_value" placeholder="少于50为库存紧张" ></el-input>
              <el-input size="small" class="input_small"  placeholder="商品规格数量" v-model="add_shopForm.shop_specification.specification"></el-input>
              <el-select size="small" class="input_small" v-model="add_shopForm.shop_specification.unit" placeholder="请选择单位">
                <el-option label="斤" value="0"></el-option>
                <el-option label="件" value="1"></el-option>
              </el-select> -->
             
          <el-table
            :data="add_shopForm.shop_specification"
            >

            <el-table-column label="商品售价">
              <template class="input_small" slot-scope="scope">
                  <el-input size="small"  placeholder="商品售价/优惠价格"  v-model="scope.row.selling_price"></el-input>
              </template>
            </el-table-column>

            <el-table-column label="市场售价">
              <template  class="input_small" slot-scope="scope">
                <el-input size="small" placeholder="市场售价/不优惠价格"  v-model="scope.row.bazaar_price"></el-input>
              </template>
            </el-table-column>

            <el-table-column label="购买获得币">
              <template  class="input_small" slot-scope="scope">
                <el-input size="small" placeholder="购买获得签到币"  v-model="scope.row.sign_currency"></el-input>
              </template>
            </el-table-column>

            <el-table-column label="库存数量">
              <template  class="input_small" slot-scope="scope">
                <el-input  size="small" placeholder="少于50为库存紧张"  v-model="scope.row.inventory_value"></el-input>
              </template>
            </el-table-column>

            <el-table-column label="规格数量">
              <template  class="input_small" slot-scope="scope">
                <el-input  size="small" placeholder="规格数量"  v-model="scope.row.specification"></el-input>
              </template>
            </el-table-column>

            <el-table-column label="单位">
               <template  class="input_small" slot-scope="scope">
                 <el-select size="small" v-model="scope.row.unit" placeholder="请选择单位">
                  <el-option label="斤" value="0"></el-option>
                  <el-option label="件" value="1"></el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column >
                <el-button size="small" type="danger">删除</el-button>
            </el-table-column>
           
          </el-table>

          <i class="el-icon-circle-plus" @click="add_specification()"></i>
        </el-form-item>

        <el-form-item label="是否热门" :label-width="formLabelWidth">
          <el-radio v-model="add_shopForm.radio_hot" label="0">是</el-radio>
          <el-radio v-model="add_shopForm.radio_hot" label="1">否</el-radio>
        </el-form-item>

        <el-form-item label="是否兑换" :label-width="formLabelWidth">
          <el-radio v-model="add_shopForm.welfare" label="0">是</el-radio>
          <el-radio v-model="add_shopForm.welfare" label="1">否</el-radio>
        </el-form-item>
        
        <el-form-item label="商品视频"  :label-width="formLabelWidth">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="getVideo"
            :on-remove="removeVideo">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" size="tiny">
            <img width="100%" :src="add_shopForm.fileList" alt="">
          </el-dialog>
        </el-form-item>

        <el-form-item label="视频封面"  :label-width="formLabelWidth">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="getPicture"
            :on-remove="removePicture">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" size="tiny">
            <img width="100%" :src="add_shopForm.fileList4" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="内容编辑" :label-width="formLabelWidth">
          <Richtext></Richtext>
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
import Richtext from '@/components/Richtext/index';
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Richtext
  },
  data() {
    //这里存放数据
    return {
      formLabelWidth:'120px',//宽度大小
      dialogVisible: false,
      addShop:false,//添加商品 / 修改商品弹窗
      seaching:{ //搜索内容 
        shelf:[{//上架状态
          value: '0',
          label: '热门'
        }, {
          value: '1',
          label: '已上架'
        }, {
          value: '2',
          label: '已下架'
        }],
        shelf_value:'',//上架状态的value
        shop_name:'',//搜索商品名称
        shop_id:'',//搜索商品货号
        
        price_down:'',//价格低价
        price_up:'',//价格高价
        inventory:[{//库存状态
          value: '0',
          label: '紧张'
        }, {
          value: '1',
          label: '正常'
        }],
        inventory_value:'',//库存状态的value

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
            date_id:'1',
            name:'商品',
            picture:''
          },
          {
            date_id:'2',
            name:'商品2',
            picture:''
          }, 
        ],
      },
      add_shopForm:{//添加商品 / 修改商品 参数
        date_id:'',//编号
        name: '',//名称
        vice_name:'',//商品副标题
        picture:'',//商品图片 包括商品视频
        video:'',//商品视频封面
        purchasing_price:'',//进货价

        shop_specification:[//商品规格
          {
            inventory_value:'',//商品库存
            selling_price:'',//售价   优惠价格
            bazaar_price:'',//市场售价  不优惠价格
            sign_currency:'',//购买商品获得签到币
            specification:'',//商品规格数量
            unit:'',//商品规格单位
          }
        ],
      
        radio_hot:'',//是否热门
        welfare:'',//是否成为兑换商品
        fileList: [],//商品主图
        fileList2: [//上传轮播图图片
          {
            name: 'food.jpeg', 
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }
        ],
        fileList3:[],//视频上传
        fileList4:[],//视频封面设置
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
    handleDelete(index, row){//删除 
      // console.log( row);//获取点击的商品的内容
      this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      })
    },

    //编辑产品图片
    handleRemove_main(file, fileList) {//商品主图移除
        console.log(file, fileList);
        this.add_shopForm.fileList = ''
    },
    handlePictureCardPreview(file) {//商品主图上传 / 预览
      this.add_shopForm.fileList = file.url;
      this.dialogVisible = true;
    },

    handleRemove(file, fileList) {//去除轮播图图片
      console.log(file, fileList);
    },
    handlePreview(file) {//上传 / 预览轮播图图片
      console.log(file);
    },
    
    removeVideo(file) {//删除视频 
      console.log(file);
      this.add_shopForm.fileList3 = ''
    },
    getVideo(file,fileList){//上传 / 预览视频
      this.add_shopForm.fileList3 = file.url;
    },

    removePicture(file) {//删除视频主图
      console.log(file);
      this.add_shopForm.fileList3 = ''
    },
    getPicture(file,fileList){//上传 / 预览视频主图
      this.add_shopForm.fileList3 = file.url;
    },

    add_specification(){//添加规格
      var list = {  
        inventory_value:'',//商品库存
        selling_price:'',//售价   优惠价格
        bazaar_price:'',//市场售价  不优惠价格
        specification:'',//商品规格数量
        unit:'',//商品规格单位
      }
      this.add_shopForm.shop_specification.push(list)
    }
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