<template>
  <div class="all" style="margin-top: -15px;margin-right: -2%;">
    <div class="myHeader" style="margin-top: 30px; margin-bottom: 20px;">
        <h2 style="margin:0 auto" class="centered-element">上证50股票涨跌预测</h2>
        <div style="display: flex; justify-content: right;" class="right-element">
          <el-button size="mini" @click="handleSubScribe"  type="warning" >{{subScribe}}</el-button>
        </div>
      </div>
      <div v-if="subScribeStatus.subScribeStatus == false" style="display: flex;justify-content: center;">
        <h2>
          你还没有订阅该服务
        </h2>
      </div>

    <el-row v-else class="content">
      <el-col :span="22" :offset="1" class="form">
        <el-row>
          <el-col :span="22" :offset="1">
            <el-row style="margin-top: 40px;">
              <!-- 搜索表单 -->
              <el-col :span="8" class="gap-4 items-center" style="display: flex; align-items: center;">
                <el-select
                prefix-icon="el-icon-search"
                  v-model="selectedStock"
                  size="large"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
              <el-col :span="12" style="display: flex; align-items: center;">
                <el-autocomplete
                prefix-icon="el-icon-search"
                  v-model="search"
                  :fetch-suggestions="querySearch"
                  placeholder="股票名称/代码"
                  @select="handleSelect"
                  style="width: 100%"
                ></el-autocomplete>
              </el-col>
              <el-col :span="1" style="display: flex; align-items: center;">
                  <el-button type="warning"  size="mini" @click="handleSearch">搜索</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
<!-- 表格内容 -->
<el-row style="margin-top: 30px;">
<el-col :span="22" :offset="1" class="my-card mb-20">
  <!-- 表头和内容都改为居中 -->
  <el-table 
    :data="paginatedData" 
    class="my-table" 
    :header-cell-style="{'text-align':'center'}" 
    :cell-style="{'text-align':'center'}"
    @sortChange="handleSortChange">
    <el-table-column prop="state" label="状态">
            <template #default="scope">
              <span v-if="scope.row.status.endsWith('已结束')" class="finished">已结束</span>
              <span class="unfinished" v-else>进行中</span>
            </template>
          </el-table-column>
          <el-table-column prop="code" sortable="custom" :sort-orders="['descending','ascending',null]" label="股票代码"></el-table-column>
          <el-table-column prop="name" sortable="custom" :sort-orders="['descending','ascending',null]" label="股票名称"></el-table-column>
          <el-table-column prop="start" sortable="custom" :sort-orders="['descending','ascending',null]" label="开始日期">
            <template #default="scope">
              <span class="date">{{scope.row.start}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="end" sortable="custom" :sort-orders="['descending','ascending',null]" label="目标日期">
            <template #default="scope">
              <span class="date">{{scope.row.end}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="possibility" sortable="custom" :sort-orders="['descending','ascending',null]" label="上涨概率"></el-table-column>
          <el-table-column prop="result" label="预测结果"></el-table-column>
          <el-table-column prop="true_result" label="真实结果"></el-table-column>
  </el-table>
  <!--底部分页栏 -->
  <el-row>
    <el-col class="center my-pagination" style="margin-bottom: 10px">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="totalPage"
        layout="prev, pager, next">
      </el-pagination>
    </el-col>
  </el-row>
</el-col>
</el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState ,mapActions} from 'vuex';
import { ElMessageBox } from 'element-plus';
import { getSubscribeData } from '../../../api/competition';
  // import { getSubscribe,subscribeCompetition } from '@/api/competition';
  export default {
    name: "pc_competition_subscribe",
    data() {
      return {
        search: '',
        selectedStock: '',
        filteredTableData: [],
        currentPage: 1,
        pageSize: 25,
        tableData: [],
//         tableData: [
//   {
//     "state": "已结束",
//     "code": "39472",
//     "name": "平安银行",
//     "start": "2024-03-01",
//     "end": "2024-04-01",
//     "possibility": 0.3,
//     "result": "上涨"
//   },
//   {
//     "state": "进行中",
//     "code": "85039",
//     "name": "贵州茅台",
//     "start": "2024-05-01",
//     "end": "2024-06-01",
//     "possibility": 0.6,
//     "result": "下跌"
//   },
//   {
//     "state": "已结束",
//     "code": "21048",
//     "name": "中国平安",
//     "start": "2024-04-10",
//     "end": "2024-05-10",
//     "possibility": 0.7,
//     "result": "上涨"
//   },
//   {
//     "state": "进行中",
//     "code": "37485",
//     "name": "招商银行",
//     "start": "2024-05-05",
//     "end": "2024-06-05",
//     "possibility": 0.5,
//     "result": "下跌"
//   },
//   {
//     "state": "已结束",
//     "code": "19647",
//     "name": "兴业银行",
//     "start": "2024-03-20",
//     "end": "2024-04-20",
//     "possibility": 0.4,
//     "result": "上涨"
//   },
//   {
//     "state": "已结束",
//     "code": "83210",
//     "name": "中信证券",
//     "start": "2024-02-15",
//     "end": "2024-03-15",
//     "possibility": 0.9,
//     "result": "下跌"
//   },
//   {
//     "state": "进行中",
//     "code": "59374",
//     "name": "工商银行",
//     "start": "2024-04-25",
//     "end": "2024-05-25",
//     "possibility": 0.8,
//     "result": "上涨"
//   },
//   {
//     "state": "已结束",
//     "code": "48327",
//     "name": "交通银行",
//     "start": "2024-01-10",
//     "end": "2024-02-10",
//     "possibility": 0.2,
//     "result": "下跌"
//   },
//   {
//     "state": "进行中",
//     "code": "72039",
//     "name": "中国银行",
//     "start": "2024-03-30",
//     "end": "2024-04-30",
//     "possibility": 0.1,
//     "result": "上涨"
//   },
//   {
//     "state": "已结束",
//     "code": "59382",
//     "name": "农业银行",
//     "start": "2024-02-20",
//     "end": "2024-03-20",
//     "possibility": 0.5,
//     "result": "下跌"
//   },
//   {
//     "state": "进行中",
//     "code": "45721",
//     "name": "民生银行",
//     "start": "2024-04-01",
//     "end": "2024-05-01",
//     "possibility": 0.7,
//     "result": "上涨"
//   },
//   {
//     "state": "已结束",
//     "code": "29387",
//     "name": "浦发银行",
//     "start": "2024-01-15",
//     "end": "2024-02-15",
//     "possibility": 0.3,
//     "result": "下跌"
//   },
//   {
//     "state": "进行中",
//     "code": "60348",
//     "name": "光大银行",
//     "start": "2024-03-25",
//     "end": "2024-04-25",
//     "possibility": 0.4,
//     "result": "上涨"
//   },
//   {
//     "state": "已结束",
//     "code": "28371",
//     "name": "华夏银行",
//     "start": "2024-02-05",
//     "end": "2024-03-05",
//     "possibility": 0.6,
//     "result": "下跌"
//   },
//   {
//     "state": "进行中",
//     "code": "19384",
//     "name": "北京银行",
//     "start": "2024-04-10",
//     "end": "2024-05-10",
//     "possibility": 0.9,
//     "result": "上涨"
//   },
//   {
//     "state": "已结束",
//     "code": "87329",
//     "name": "南京银行",
//     "start": "2024-01-20",
//     "end": "2024-02-20",
//     "possibility": 0.2,
//     "result": "下跌"
//   },
//   {
//     "state": "进行中",
//     "code": "39457",
//     "name": "上海银行",
//     "start": "2024-03-15",
//     "end": "2024-04-15",
//     "possibility": 0.1,
//     "result": "上涨"
//   },
//   {
//     "state": "已结束",
//     "code": "74928",
//     "name": "广发证券",
//     "start": "2024-02-25",
//     "end": "2024-03-25",
//     "possibility": 0.8,
//     "result": "下跌"
//   },
//   {
//     "state": "进行中",
//     "code": "59304",
//     "name": "海通证券",
//     "start": "2024-04-05",
//     "end": "2024-05-05",
//     "possibility": 0.5,
//     "result": "上涨"
//   },
//   {
//     "state": "已结束",
//     "code": "19375",
//     "name": "国泰君安",
//     "start": "2024-03-01",
//     "end": "2024-04-01",
//     "possibility": 0.7,
//     "result": "下跌"
//   }
// ]
      };
    },
    watch: {
        selectedStock(newVal) {
    if (newVal === 'all') {
      this.filteredTableData = this.tableData;
    } else if (newVal === 'part') {
      this.filteredTableData = this.tableData.slice(0, this.tableData.length / 2);
    } else if (newVal === 'none') {
      this.filteredTableData = [];
    } else {
      this.filteredTableData = this.tableData.filter(item => item.code === newVal);
    }
  },
  },

    computed: {
      ...mapState(['subScribeStatus',['subScribeStatus']]),
      subScribe(){
        if (this.subScribeStatus.subScribeStatus == false || this.subScribeStatus.subScribeStatus == null){
          return "订阅";
      }
      else{
        return "取消订阅";
      }
    },
        totalPage() {
      return this.filteredTableData.length;
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = this.currentPage * this.pageSize;
      return this.filteredTableData.slice(start, end);
    },
      options() {
    const allOption = { value: 'all', label: '显示全部' };
    const seenCodes = new Set(); // 用于存储已经添加过的code
    const otherOptions = this.tableData.filter(item => {
      // 检查是否已经添加过此code
      if (!seenCodes.has(item.code)) {
        seenCodes.add(item.code); // 如果未添加，加入Set中
        return true; // 并且将此条目添加到结果数组中
      }
      return false; // 已添加过的code不再添加
    }).map(item => ({
      value: item.code,
      label: item.name
    }));
    const partOption = { value: 'part', label: '部分股票' ,disabled: true};
    const noneOption = { value: 'none', label: '无' };
    return [allOption, ...otherOptions,partOption, noneOption ];
  },
    },
    mounted() {
      this.getTableData();
   
      // this.getSubscribe();
    },
   
    methods: {
      ...mapActions('subScribeStatus',['changeMySubScribeStatus']),
          handleSortChange({ prop, order }) {
      if (!order) return; // 如果没有排序方向，则不进行排序

      // 排序整个数据集
      this.filteredTableData.sort((a, b) => {
        // 首先根据状态进行排序：'进行中'在前，'已结束'在后
        if (a.status !== b.status) {
          return a.status === '进行中' ? -1 : 1;
        }

        // 然后根据指定的属性进行排序
        let val1 = a[prop];
        let val2 = b[prop];
        if (order === 'ascending') {
    
          return val1 > val2 ? 1 : (val1 < val2 ? -1 : 0);
        } else {
          return val1 < val2 ? 1 : (val1 > val2 ? -1 : 0);
        }
      });

      this.updatePaginatedData(); // 更新分页数据显示
    },

    updatePaginatedData() {
      // 计算当前页的数据
   
      const start = (this.currentPage - 1) * this.pageSize;
      this.paginatedData = this.filteredTableData.slice(start, start + this.pageSize);
    },
      getTableData(){
        if (this.subScribeStatus.subScribeStatus == false || this.subScribeStatus.subScribeStatus == null){
          return;
        }
        getSubscribeData().then(res => {
          this.tableData = res.data;
          this.filteredTableData = this.tableData.sort((a, b) => {
            const aDate = new Date(a.end);
            const bDate = new Date(b.end);
            return bDate - aDate;
          }
          );
          this.selectedStock = 'all';
        });
      },
      handleSubScribe(){
      // 弹出确认框
      if (this.subScribe === '订阅'){
        ElMessageBox.alert(
        '订阅该服务请联系haichao@swufe.edu.cn', 
      ).then(() => {
        
        // this.changeMySubScribeStatus();
      }).catch(() => {

      });
      }
      else{
        ElMessageBox.confirm(
        '你确定取消订阅状态吗？该操作不可逆转。', 
        '确认操作', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        
        this.changeMySubScribeStatus();
      }).catch(() => {

      });
      }
 

      },
      querySearch(queryString, cb) {
  if (queryString.length === 0) {
    cb([]);
  } else {
    const uniqueResults = new Map(); // 使用 Map 来存储唯一结果

    this.tableData.forEach(item => {
      if (item.name.includes(queryString) || item.code.includes(queryString)) {
        const uniqueKey = `${item.code} ${item.name}`; // 使用 code 和 name 的组合作为键
        if (!uniqueResults.has(uniqueKey)) { // 检查是否已经有这个键
          uniqueResults.set(uniqueKey, { value: uniqueKey });
        }
      }
    });

    cb(Array.from(uniqueResults.values())); // 将 Map 中的值转换为数组并回调
  }
},
      handleSelect(item) {
        this.search = item.value.split(' ')[1]; // 选择时只获取股票名称
        this.handleSearch();
      },
      handleSearch() {
        this.filteredTableData = this.tableData.filter(item => {
          return (
            item.name.includes(this.search) ||
            item.code.includes(this.search)
          );
        });
        switch (this.filteredTableData.length) {
      case 0:
        this.selectedStock = 'none';
        break;
      case this.tableData.length:
        this.selectedStock = 'all';
        break;
      case 1:
        this.selectedStock = this.filteredTableData[0].code;
        break;
      default:
        this.selectedStock = 'part';
    }
      },

      handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.currentPage = 1; // 重置到第一页
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
    }
  }
  };
  </script>

<style scoped>
/* 取消行之间的线条 */
.el-table .el-table__row,
.el-table .el-table__row:hover {
  border-bottom: none !important;
}

/* 给表头添加灰色的背景颜色，使用深度选择器 */
::v-deep .el-table th {
  background-color: #F7F7F7 !important;
}
.all {
  background-color: white;
}
.myHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
.form {
  background-color: #FFFFFF;
}
.unfinished {
  border: 1px solid #F0C27B;
  border-radius: 5px;
  padding: 2px 6px 2px;
  font-size: small;
  color: #F0C27B;
}
.finished {
  border: 1px solid #AAAAAA;
  border-radius: 5px;
  padding: 2px 6px 2px;
  font-size: small;
  color: #AAAAAA;
}
.date{

  border-radius: 5px;
  padding: 2px 6px 2px;
  font-size: small;
  background-color: #F2F2F2;
  color: black;
}
.el-table >>> .el-table__row>td{
/* 去除表格线 */
border: none;
}

</style>
