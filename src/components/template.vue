<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form ref="formDataCon" :inline="true" :model="formData" size="small" class="search">
            <el-form-item label="编号">
              <el-input v-model="formData.orderNo" placeholder="请输入编号"></el-input>
            </el-form-item>
            <el-form-item label="名称">
              <el-input v-model="formData.productName" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="订单状态">
              <el-select v-model="formData.status" placeholder="请选择">
                <el-option
                  v-for="item in statusArr"
                  :label="item.chinese"
                  :key="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间范围">
              <el-date-picker
                v-model="formData.timeDate"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="search">搜索</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card mt20">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-button type="primary" size="mini" @click="add">新增</el-button>
        </el-col>
        <el-col>
          <template>
            <el-table
              ref="multipleTable"
              :data="dataList"
              tooltip-effect="dark"
              style="width: 100%"
              class="mt20"
              border
            >
              <el-table-column prop="orderNo" align="center" label="订单号"></el-table-column>
              <el-table-column prop="productName" align="center" label="产品名称" width="120"></el-table-column>
              <el-table-column prop="orderQuantity" align="center" label="产品总量"></el-table-column>
              <el-table-column prop="payment" align="center" label="订单总额（元）" width="120"></el-table-column>
              <el-table-column label="订单状态" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.status.value === 0">已取消</span>
                  <span v-if="scope.row.status.value === 1">待支付</span>
                  <span v-if="scope.row.status.value === 2">已支付</span>
                  <span v-if="scope.row.status.value === 3">退款中</span>
                  <span v-if="scope.row.status.value === 4">已退款</span>
                </template>
              </el-table-column>
              <el-table-column prop="refundPrice" align="center" label="退款总额（元）" width="120">
                <template slot-scope="scope">
                  <span>{{scope.row.refundPrice ? scope.row.refundPrice : '-'}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="createTime" align="center" label="下单时间"></el-table-column>
              <el-table-column prop="productResource.chinese" align="center" label="产品来源"></el-table-column>
              <el-table-column prop="mobile" align="center" label="联系人电话" width="120"></el-table-column>
              <el-table-column label="操作" align="center" width="60">
                <template slot-scope="scope">
                  <el-button @click="view(scope.row)" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row class="mt20">
              <el-col :span="22">
                <div>
                  <el-pagination
                    class="text-center mt20"
                    background
                    layout="prev, pager, next, total"
                    :total="totalNum"
                    :current-page.sync="formData.pageNum"
                    :page-size="formData.pageSize"
                    @current-change="handleCurrentChange"
                  ></el-pagination>
                </div>
              </el-col>
            </el-row>
          </template>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      statusArr: [],
      dataList: [], // 列表数据
      totalNum: 0, // 列表总数
      formData: {
        orderNo: '',
        productName: '',
        status: '',
        timeDate: '',
        beginTime: '',
        endTime: '',
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    add () {
      console.log('新增')
      this.$router.push('/taskManageAdd')
    },
    search () {
      console.log('搜索')
    },
    handleCurrentChange (num) {
      this.formData.pageNum = num
      // this.getList()
    }
  }
}
</script>
<style lang="stylus"></style>
