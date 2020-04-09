<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="font-weight:700;">列表</span>
      <el-button size="mini" style="float: right;" type="primary" icon="el-icon-back" @click="derive">导出</el-button>
    </div>
    <div>
      <el-row :gutter="20">
        <el-col :span="5" style="border-right:1px solid #EBEEF5;">
          <el-form ref="detailData" :model="form" size="small">
            <el-form-item label="视频源" label-width="55px">
              <el-select v-model="form.source" placeholder="请选择">
                <el-option
                  v-for="item in sourceArr"
                  :label="item.chinese"
                  :key="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-tree
            :data="treeData"
            :props="defaultProps"
            node-key="id"
            default-expand-all
            :filter-node-method="filterNode"
            @node-click="handleNodeClick"
            ref="tree">
            <span slot-scope="{node, data}">
              <span>
                <i :class="data.icon + ' mr5'"></i>{{node.label}}
              </span>
            </span>
          </el-tree>
        </el-col>
        <el-col :span="19">
          <div class="content">
            <el-row>
              <el-table
                ref="multipleTable"
                height="250"
                :data="dataList"
                tooltip-effect="dark"
                style="width: 100%"
                border
              >
                <el-table-column prop="orderNo" align="center" label="id"></el-table-column>
                <el-table-column prop="productName" align="center" label="创建时间"></el-table-column>
                <el-table-column prop="productName" align="center" label="更新时间"></el-table-column>
                <el-table-column prop="orderNo" align="center" label="日期"></el-table-column>
                <el-table-column prop="productName" align="center" label="酒店名称"></el-table-column>
                <el-table-column prop="productName" align="center" label="类型"></el-table-column>
                <el-table-column prop="orderNo" align="center" label="区"></el-table-column>
                <el-table-column prop="productName" align="center" label="酒店地址"></el-table-column>
                <el-table-column prop="productName" align="center" label="员工人数"></el-table-column>
                <el-table-column prop="orderNo" align="center" label="营业收入"></el-table-column>
                <el-table-column prop="productName" align="center" label="接待住宿"></el-table-column>
              </el-table>
            </el-row>
            <el-row class="mt20" style="font-weight:700;">
              高级搜索
            </el-row>
            <el-row class="mt10">
              <el-form :model="searchForm" ref="searchForm" class="dynamic" size="mini">
                <el-form-item label-width="0">
                  <el-col :span="7">
                    <el-form-item prop="field" label="字段"
                      :rules="{required: true, message: '请填入字段名', trigger: 'change'}">
                      <el-autocomplete placeholder="列如：酒店名称" v-model="searchForm.field" :fetch-suggestions="querySearchAsync"></el-autocomplete>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item prop="middle" :rules="{required: true, message: '请选择规则', trigger: 'blur'}">
                      <el-select v-model="searchForm.middle">
                        <el-option v-for="option in middleOptions" :key="option.value" :label="option.label" :value="option.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item prop="endValue" style="width:70%;"
                      :rules="{required: true, message: '请填入值', trigger: 'blur'}">
                      <el-input placeholder="列如：12" v-model="searchForm.endValue"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5" v-if="!searchForm.addFiled.length">
                    <el-form-item>
                      <el-button type="success" @click="addGroup('and')">and</el-button>
                      <el-button type="success" @click="addGroup('or')">or</el-button>
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <el-form-item label-width="0" v-for="(itemAddFiled, index) in searchForm.addFiled" :key="index">
                  <el-col :span="7">
                    <el-form-item :prop="'addFiled.' + index + '.field'" :label="'字段' + index"
                      :rules="{required: true, message: '请填入字段名', trigger: 'change'}">
                      <el-autocomplete placeholder="列如：酒店名称" v-model="itemAddFiled.field" :fetch-suggestions="querySearchAsync"></el-autocomplete>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item :prop="'addFiled.' + index + '.middle'" :rules="{required: true, message: '请选择规则', trigger: 'blur'}">
                      <el-select v-model="itemAddFiled.middle">
                        <el-option v-for="option in middleOptions" :key="option.value" :label="option.label" :value="option.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item :prop="'addFiled.' + index + '.endValue'" style="width:70%;"
                      :rules="{required: true, message: '请填入值', trigger: 'blur'}">
                      <el-input placeholder="列如：12" v-model="itemAddFiled.endValue"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item>
                      <el-button type="success" @click="addGroup('and')" v-if="index === searchForm.addFiled.length - 1">and</el-button>
                      <el-button type="success" @click="addGroup('or')" v-if="index === searchForm.addFiled.length - 1">or</el-button>
                      <el-button type="danger" icon="el-icon-delete" circle @click.prevent="removeDomain(itemAddFiled)"></el-button>
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('searchForm')">提交</el-button>
                  <el-button @click="resetForm('searchForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
/* eslint-disable */
export default {
  data () {
    return {
      searchForm: {
        field: '',
        middle: '',
        endValue: '',
        addFiled: []
      },
      middleOptions: [],
      dataList: [{}],
      sourceArr: [{
        name: '全部',
        value: '全部'
      }, {
        name: '枫泾古镇',
        value: '枫泾古镇'
      }, {
        name: '徐家汇源旅游服务中心',
        value: '徐家汇源旅游服务中心'
      }, {
        name: '上海震旦博物馆',
        value: '上海震旦博物馆'
      }],
      form: {
        source: '全部'
      },
      treeData: [{
        id: 1,
        icon: 'el-icon-folder',
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 10,
            icon: 'el-icon-location',
            label: '上海月湖雕塑公园',
            monitorcode: '001579',
            streamtype: 'VAG'
          }, {
            id: 11,
            icon: 'el-icon-location',
            label: '上海佘山国家森林公园',
            monitorcode: '001535',
            streamtype: 'VAG'
          }, {
            id: 12,
            icon: 'el-icon-location',
            label: '朱家角古镇',
            monitorcode: '001412',
            streamtype: 'VAG'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      restaurants: [
        { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
        { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
        { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
        { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
        { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
        { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
        { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
        { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
        { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
        { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
        { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
        { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
        { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
        { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
        { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
        { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
        { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
        { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
        { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
        { "value": "枪会山", "address": "上海市普陀区棕榈路" },
        { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
        { "value": "钱记", "address": "上海市长宁区天山西路" },
        { "value": "壹杯加", "address": "上海市长宁区通协路" },
        { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
        { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
        { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
        { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
        { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
        { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
        { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
        { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
        { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
        { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
        { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
        { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
        { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
        { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
        { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
        { "value": "浏阳蒸菜", "address": "天山西路430号" },
        { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
        { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
        { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
        { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
        { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
        { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
        { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
        { "value": "阳阳麻辣烫", "address": "天山西路389号" },
        { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
      ]
    }
  },
  watch: {
    'form.source' (val) {
      if (val === '全部') {
        val = ''
      }
      this.$refs.tree.filter(val)
    }
  },
  mounted () {
  },
  methods: {
    handleNodeClick (data) {
      console.log(data)
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    derive () {
      console.log('导出')
    },
    submit () {
      console.log('提交')
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    removeDomain (item) {
      var index = this.searchForm.addFiled.indexOf(item)
      if (index !== -1) {
        this.searchForm.addFiled.splice(index, 1)
      }
    },
    addGroup () {
      this.searchForm.addFiled.push({ field: '', middle: '', endValue: '' })
    },
    querySearchAsync (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter (queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    }
  }
}
</script>
<style lang="stylus">
.dynamic
  .el-input
    width 100%
</style>
