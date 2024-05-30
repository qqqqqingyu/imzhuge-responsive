<template>
    <div class="all" style="margin-top: -15px;margin-right: -2%;">
      <div class="header">
        <h2 style="margin-top: 30px; margin-bottom: 20px;">上证50股票涨跌预测</h2>
      </div>
      <h2 v-if="!isSubscribe">你还没有订阅该服务</h2>
      <el-row v-if="isSubscribe" class="content">
        <el-col :span="22" :offset="1" class="form">
          <el-row>
            <el-col :span="22" :offset="1">
              <el-row style="margin-top: 40px;">
                <!-- 搜索表单 -->
                <el-col :span="4" class="gap-4 items-center" style="display: flex; align-items: center;">
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
                <el-col :span="18" style="display: flex; align-items: center;">
                  <el-autocomplete
                  prefix-icon="el-icon-search"
                    v-model="search"
                    :fetch-suggestions="querySearch"
                    placeholder="搜索股票名称/代码"
                    @select="handleSelect"
                    style="width: 100%"
                  ></el-autocomplete>
                </el-col>
                <el-col :span="2">
                  <el-form-item class="yellow-btn" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                    <el-button size="large" @click="handleSearch">搜索</el-button>
                  </el-form-item>
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
          :cell-style="{'text-align':'center'}">
          <el-table-column prop="state" label="状态">
            <template #default="scope">
              <span v-if="scope.row.state.endsWith('已结束')" class="finished">已结束</span>
              <span class="unfinished" v-else>进行中</span>
            </template>
          </el-table-column>
          <el-table-column prop="code" sortable label="股票代码"></el-table-column>
          <el-table-column prop="name" sortable label="股票名称"></el-table-column>
          <el-table-column prop="start" sortable label="开始日期">
            <template #default="scope">
              <span class="date">{{scope.row.start}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="end" sortable label="目标日期">
            <template #default="scope">
              <span class="date">{{scope.row.end}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="possibility" sortable label="上涨概率"></el-table-column>
          <el-table-column prop="result" label="真实结果"></el-table-column>
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
  import { getSubscribe,subscribeCompetition } from '@/api/competition';
  export default {
    name: "pc_competition_subscribe",
    data() {
      return {
        search: '',
        selectedStock: '',
        filteredTableData: [],
        currentPage: 1,
        pageSize: 25,
        tableData: [
  {
    "state": "已结束",
    "code": "39472",
    "name": "平安银行",
    "start": "2024-03-01",
    "end": "2024-04-01",
    "possibility": 0.3,
    "result": "上涨"
  },
  {
    "state": "进行中",
    "code": "85039",
    "name": "贵州茅台",
    "start": "2024-05-01",
    "end": "2024-06-01",
    "possibility": 0.6,
    "result": "下跌"
  },
  {
    "state": "已结束",
    "code": "21048",
    "name": "中国平安",
    "start": "2024-04-10",
    "end": "2024-05-10",
    "possibility": 0.7,
    "result": "上涨"
  },
  {
    "state": "进行中",
    "code": "37485",
    "name": "招商银行",
    "start": "2024-05-05",
    "end": "2024-06-05",
    "possibility": 0.5,
    "result": "下跌"
  },
  {
    "state": "已结束",
    "code": "19647",
    "name": "兴业银行",
    "start": "2024-03-20",
    "end": "2024-04-20",
    "possibility": 0.4,
    "result": "上涨"
  },
  {
    "state": "已结束",
    "code": "83210",
    "name": "中信证券",
    "start": "2024-02-15",
    "end": "2024-03-15",
    "possibility": 0.9,
    "result": "下跌"
  },
  {
    "state": "进行中",
    "code": "59374",
    "name": "工商银行",
    "start": "2024-04-25",
    "end": "2024-05-25",
    "possibility": 0.8,
    "result": "上涨"
  },
  {
    "state": "已结束",
    "code": "48327",
    "name": "交通银行",
    "start": "2024-01-10",
    "end": "2024-02-10",
    "possibility": 0.2,
    "result": "下跌"
  },
  {
    "state": "进行中",
    "code": "72039",
    "name": "中国银行",
    "start": "2024-03-30",
    "end": "2024-04-30",
    "possibility": 0.1,
    "result": "上涨"
  },
  {
    "state": "已结束",
    "code": "59382",
    "name": "农业银行",
    "start": "2024-02-20",
    "end": "2024-03-20",
    "possibility": 0.5,
    "result": "下跌"
  },
  {
    "state": "进行中",
    "code": "45721",
    "name": "民生银行",
    "start": "2024-04-01",
    "end": "2024-05-01",
    "possibility": 0.7,
    "result": "上涨"
  },
  {
    "state": "已结束",
    "code": "29387",
    "name": "浦发银行",
    "start": "2024-01-15",
    "end": "2024-02-15",
    "possibility": 0.3,
    "result": "下跌"
  },
  {
    "state": "进行中",
    "code": "60348",
    "name": "光大银行",
    "start": "2024-03-25",
    "end": "2024-04-25",
    "possibility": 0.4,
    "result": "上涨"
  },
  {
    "state": "已结束",
    "code": "28371",
    "name": "华夏银行",
    "start": "2024-02-05",
    "end": "2024-03-05",
    "possibility": 0.6,
    "result": "下跌"
  },
  {
    "state": "进行中",
    "code": "19384",
    "name": "北京银行",
    "start": "2024-04-10",
    "end": "2024-05-10",
    "possibility": 0.9,
    "result": "上涨"
  },
  {
    "state": "已结束",
    "code": "87329",
    "name": "南京银行",
    "start": "2024-01-20",
    "end": "2024-02-20",
    "possibility": 0.2,
    "result": "下跌"
  },
  {
    "state": "进行中",
    "code": "39457",
    "name": "上海银行",
    "start": "2024-03-15",
    "end": "2024-04-15",
    "possibility": 0.1,
    "result": "上涨"
  },
  {
    "state": "已结束",
    "code": "74928",
    "name": "广发证券",
    "start": "2024-02-25",
    "end": "2024-03-25",
    "possibility": 0.8,
    "result": "下跌"
  },
  {
    "state": "进行中",
    "code": "59304",
    "name": "海通证券",
    "start": "2024-04-05",
    "end": "2024-05-05",
    "possibility": 0.5,
    "result": "上涨"
  },
  {
    "state": "已结束",
    "code": "19375",
    "name": "国泰君安",
    "start": "2024-03-01",
    "end": "2024-04-01",
    "possibility": 0.7,
    "result": "下跌"
  }
]
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
        totalPage() {
      return this.filteredTableData.length;
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = this.currentPage * this.pageSize;
      return this.filteredTableData.slice(start, end);
    },
      options() {
    const allOption = { value: 'all', label: '全部股票' };
    const partOption = { value: 'part', label: '部分股票' };
    const noneOption = { value: 'none', label: '无' };
    const otherOptions = this.tableData.map(item => ({
      value: item.code,
      label: item.name,
    }));
    return [allOption, partOption, noneOption, ...otherOptions];
  },
    },
    mounted() {
      this.filteredTableData = this.tableData;
      this.selectedStock = 'all';
      this.getSubscribe();
    },
    methods: {
      getSubscribe() {
        getSubscribe().then(res => {
          if (res.code == '200') {
            this.isSubscribe = true;
            return;
          }else if(res.code == '201'){
            this.isSubscribe = false;
            return;
          }
          
        });
      },
      querySearch(queryString, cb) {
        if (queryString.length === 0) {
          cb([]);
        } else {
          const results = this.tableData.filter(item => {
            return (
              item.name.includes(queryString) ||
              item.code.includes(queryString)
            );
          }).map(item => ({ value: `${item.code} ${item.name}` }));
          cb(results);
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
  .header {
    display: flex;
    justify-content: center;
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
  