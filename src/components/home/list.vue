<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form ref="formDataCon" :inline="true" :model="formData" size="small" class="search">
            <el-form-item label="任务名称">
              <el-input v-model="formData.taskName" placeholder="请输入名称"></el-input>
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
        <el-col>
          <template>
            <el-table
              ref="multipleTable"
              :data="dataList"
              tooltip-effect="dark"
              style="width: 100%"
              class="mt20"
              height="250"
              border
            >
              <el-table-column prop="orderNo" align="center" label="任务名称"></el-table-column>
              <el-table-column prop="productName" align="center" label="开始时间"></el-table-column>
              <el-table-column prop="orderQuantity" align="center" label="结束时间"></el-table-column>
              <el-table-column prop="payment" align="center" label="结果"></el-table-column>
              <el-table-column prop="createTime" align="center" label="数据量"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button @click="log(scope.row)" type="text" size="small">日志</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row class="mt20">
              <el-col :span="24">
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
    <el-dialog
      title="日志"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <span>需要注意的是内容是默认不居中的</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dataList: [{

      }], // 列表数据
      totalNum: 0, // 列表总数
      formData: {
        taskName: '',
        timeDate: '',
        beginTime: '',
        endTime: '',
        pageNum: 1,
        pageSize: 10
      },
      centerDialogVisible: false
    }
  },
  methods: {
    search () {
      console.log('搜索')
    },
    log () {
      console.log('日志')
      this.centerDialogVisible = true
    },
    handleCurrentChange (num) {
      this.formData.pageNum = num
      // this.getList()
    }
  }
}
</script>
<style lang="stylus"></style>
