<template>
  <div class="container">
    <div class="loading"></div>
  </div>
</template>

<script>
  export default {
    name: 'Loading'
  }
</script>

<style scoped>
  .container {
    position: absolute;
    left: 15%;
    top: 61px;
    /*background: url('../../../assets/img/loading.gif') center center no-repeat #fff;
    background-size: cover;*/
    width: 85%;
    height: 92%;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loading {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    border: 5px #ffffff solid;
    border-right-color: #87CEEB;
    animation: loading 1s linear infinite;
    /*background: black;*/
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
