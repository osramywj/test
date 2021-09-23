<template>
  <div>
    <el-row>
      <el-button plain>朴素按钮</el-button>
      <el-button type="danger" plain>主要按钮</el-button>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-row>
  </div>
</template>

<script>
export default {
    name: 'App',
};
</script>

