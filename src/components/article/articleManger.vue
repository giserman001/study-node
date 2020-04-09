<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form ref="formDataCon" :inline="true" :model="formData" size="small" class="search">
            <el-form-item label="接口中文名称">
              <el-input v-model="formData.productName" placeholder="请输入中文名称" style="width: 140px;"></el-input>
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
              border
            >
              <el-table-column prop="orderNo" align="center" label="接口中文名称"></el-table-column>
              <el-table-column prop="productName" align="center" label="状态"></el-table-column>
              <el-table-column prop="productName" align="center" label="接口说明"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button @click="view(scope.row)" type="text" size="small">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row class="mt20">
              <el-col>
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
      dataList: [{}], // 列表数据
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
    search () {
      console.log('搜索')
    },
    handleCurrentChange (num) {
      this.formData.pageNum = num
      // this.getList()
    },
    view () {
      this.$router.push({
        path: '/listDetail',
        query: {
          id: '1',
          name: 'test'
        }
      })
    }
  }
}
</script>
<style lang="stylus"></style>
