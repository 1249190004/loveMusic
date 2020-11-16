<template>
  <div>
    <img src="../../../assets/img/404.png" alt="404">
  </div>
</template>

<script>
  export default {
    name: "RequestFail",
    created() {
      this.$message.error('请求数据失败！！！')
    }
  }
</script>

<style scoped>
  div {
    height: 100%;
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
