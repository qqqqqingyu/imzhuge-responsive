<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
    <!--    添加索引标签index，作为下标-->
    <div v-for="item in category_data" :key='item' style="display: flex;flex-direction: column-reverse">
      <div v-if="item.category_type==='radio'">
        <el-form-item :label="item.category_name" prop="radio">
          <el-row>
            <el-col :xs="24" :sm="12" :md="8" :lg="4" :xl="3" v-for="category in item.categories" :key='category'>
              <el-radio v-model="ruleForm.marked_category[item.category_name]" :value="category" :label="category"
                        border>{{ category }}
              </el-radio>
            </el-col>
          </el-row>
        </el-form-item>
      </div>
      <div v-else-if="item.category_type==='checkbox'">
        <el-form-item :label="item.category_name" prop="checkbox">
          <el-row>
            <el-col :xs="24" :sm="12" :md="8" :lg="4" :xl="3" v-for="category in item.categories" :key='category'>
              <el-checkbox v-model="ruleForm.marked_category[item.category_name]" :value="category"
                           :label="category+item.category_name" border>
                {{ category }}
              </el-checkbox>
            </el-col>
          </el-row>
        </el-form-item>
      </div>
      <div v-else-if="item.category_type==='input'">
        <el-form-item :label="item.category_name" prop="text">
          <el-row>
            <el-col :xs="24" :sm="12" :md="8" :lg="4" :xl="3">
              <el-input style="margin-top: 20px" type="textarea"
                        v-model="ruleForm.marked_category[item.category_name]"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </div>
    </div>
  </el-form>
  <!--  <p>{{ ruleForm.marked_category }}</p>-->
</template>

<script>

export default {
  name: "AddOptions",
  props: ['category_data'],
  data() {
    return {
      ruleForm: {
        name: '',
        marked_category: {},
        cleanMarkedCategory: {},
      },
      rules: {
        checkbox: [
          {type: 'array', required: true, message: '请至少选择一个选项', trigger: 'change'}
        ],
        radio: [
          {required: true, message: '请选择一个选项', trigger: 'change'}
        ],
        text: [
          {required: false}
        ]
      }
    };
  },
  methods: {
    getCategories() {
      //检查必选项是否为空
      let flag = false
      for (let key in this.ruleForm.marked_category) {
        let category = this.ruleForm.cleanMarkedCategory[key]
        if (category.required) {
          let value = this.ruleForm.marked_category[key]
          if (category.category_type === 'input') {
            value = value.trim()
          }
          if (value.length === 0) {
            flag = true
            break
          }
        }
      }

      if (flag) {
        alert("请将所有必选题作答完成后才能提交")
        return null
      } else {
        return this.ruleForm.marked_category
      }
    },


    setCategories(marked_category) {
      for (let categoryName in marked_category) {
        this.ruleForm.marked_category[categoryName] = marked_category[categoryName]
      }
    },

    cleanCategories() {
      for (let categoryName in this.ruleForm.cleanMarkedCategory) {
        this.ruleForm.marked_category[categoryName] = this.ruleForm.cleanMarkedCategory[categoryName].data
      }
    },
    createVModel(categoryDatas) {
      for (const category_data of categoryDatas) {
        let initValue = []
        if (category_data.category_type !== 'checkbox') {
          initValue = ''
        }
        this.ruleForm.marked_category[category_data.category_name] = initValue
        this.ruleForm.cleanMarkedCategory[category_data.category_name] = {
          'data': initValue,
          'category_type': category_data.category_type,
          'required': category_data.required,
        }
      }
    }
  },
}


</script>

<style>
.demo-ruleForm {
  padding: 0 6vw;
}

</style>
