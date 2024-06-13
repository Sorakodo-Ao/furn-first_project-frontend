<template>
  <div style="height: 100%">
    <!--        搜索框和添加框-->
    <div style="margin: 10px 0">
      <el-input v-model="input" style="width: 150px; margin: 0 10px" placeholder="Please input"/>
      <el-button type="primary" @click="search">
        搜索
      </el-button>
      <el-button type="primary" @click="addData" style="margin-right: 30px; position: absolute; right: 0;">
        添加
      </el-button>
    </div>
    <!--        表格展示部分-->
    <el-table :data="tableData" stripe style="width: 100%">
      <!--            <el-table-column sortable prop="id" label="编号"/>-->
      <el-table-column prop="name" label="名字"/>
      <el-table-column prop="maker" label="厂家"/>
      <el-table-column prop="price" label="价格"/>
      <el-table-column prop="sales" label="销量"/>
      <el-table-column prop="stock" label="库存"/>
      <!--            操作栏-->
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-popconfirm
              width="220"
              confirm-button-text="是"
              cancel-button-text="否"
              title="是否确认删除"
              @confirm="handleDelete(scope.row)"
          >
            <template #reference>
              <el-button link type="primary" size="small">
                删除
              </el-button>
            </template>
          </el-popconfirm>

        </template>
      </el-table-column>
    </el-table>

    <!--        点击添加/修改弹出对话框-->
    <el-dialog v-model="dialogVisible" title="Tips" width="30%">
      <el-form :model="form" label-width="100px">
        <el-form-item label="name" style="width: 80%">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="maker" style="width: 80%">
          <el-input v-model="form.maker"/>
        </el-form-item>
        <el-form-item label="price" style="width: 80%">
          <el-input v-model="form.price"/>
        </el-form-item>
        <el-form-item label="sales" style="width: 80%">
          <el-input v-model="form.sales"/>
        </el-form-item>
        <el-form-item label="stock" style="width: 80%">
          <el-input v-model="form.stock"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save">确认</el-button>
        </div>
      </template>
    </el-dialog>
    <!--        分页部分-->
    <div>
      <el-pagination
          style="  display: flex; justify-content: center; /* 水平居中分页按钮 */margin: 20px 0px; /* 与页面内容之间的间距 */"
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[5,10,15]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="sizes, prev, pager, next"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>


<script>
import request from "@/utils/request";
import {ElMessage} from 'element-plus'

export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      input: '',//搜素框

      tableData: [],//home组件的数据展示

      form: {},//对话框的表单

      dialogVisible: false,//对话框的显现

      total: 100, //分页的总页数

      pageSize: 5,//每页数量

      currentPage: 1,//第几页
    }
  },
  //页面初始化
  created() {
    this.list();
  },

  methods: {

    //添加数据
    addData() {
      this.dialogVisible = true;
      //每次显示对话框需要清空表单的数据
      this.form = {}
    },

    //搜索栏
    search() {
      //alert(this.input);
      if (this.input === '') {
        this.list()
      } else {
        request.get('/api/page', {
          params: {
            'pageNum': this.currentPage,
            'pageSize': this.pageSize,
            'name': this.input
          }
        }).then(
            res => {
              // console.log(res.data)
              this.tableData = res.data.records;
              this.total = res.data.total;
              console.log(res)
            }
        )
      }
    },

    //编辑方法
    handleEdit(row) {
      //先在对话框回显数据
      /*            //console.log("row = " , row)
      方法一
                  var target = JSON.parse(JSON.stringify(row));
                  this.form = target;
                  this.dialogVisible = true;*/
      //方法二
      request.get("/api/" + row.id).then(
          res => {
            this.form = res.data;
            this.dialogVisible = true;

          }
      )
      //发送请求保存
      save();
    },

    //删除改行的数据
    handleDelete(row) {
      // alert("Delete");
      //console.log(row)
      request.delete('/api/delete/' + row.id).then(
          res => {
            if (res.code === '200') {
              this.$message({
                type: "success",
                message: '删除成功'
              })
            } else {
              this.$message({
                type: "error",
                message: '删除失败'
              })
            }
            //刷新
            this.list();
          }
      )
    },

    //保存数据
    save() {
      if (this.form.id != null) {
        //发送修改操作
        request.put('/api/update', this.form).then(
            res => {
              console.log(res);
              if (res.code === '200') {
                ElMessage({
                  message: '修改成功',
                  type: 'success',
                })
                /*                            this.$message({
                                                type: "success",
                                                message: '修改成功'
                                                })*/
              } else {
                ElMessage.error('修改失败')
                /*                            this.$message({
                                                type: "error",
                                                message: '修改失败'
                                            })*/
              }
              this.dialogVisible = false;
              this.list();
            }
        )
      } else {
        //发送添加操作
        request.post('/api/save', this.form).then(
            res => {
              console.log("res = ", res);
              this.dialogVisible = false;
              this.list();
              this.$message({
                type: "success",
                message: '添加成功'
              })
            }
        )
      }
    },

    //显示所有数据
    list() {
      /*            request.get('/api/list').then(*/
      request.get('/api/page', {
        params: {
          'pageNum': this.currentPage,
          'pageSize': this.pageSize,
          'name': null
        }
      }).then(
          res => {
            this.tableData = res.data.records;
            this.total = res.data.total;
            console.log(res)
          }
      )
    },
    handleCurrentChange() {
      console.log("currentPage =", this.currentPage)
      if(this.input){
        this.search();
      }else {
        this.list();
      }

    },
    handleSizeChange() {
      if(this.input){
        this.search();
      }else {
        this.list();
      }
    }

  }
}
</script>