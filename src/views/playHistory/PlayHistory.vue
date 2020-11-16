<template>
  <div>
    <PlayMusicDetail></PlayMusicDetail>
  </div>
</template>

<script>

  import PlayMusicDetail from "../../components/common/playMusicDetail/PlayMusicDetail";

  export default {
    name: "PlayHistory",
    components: {
      PlayMusicDetail
    },
    created() {
      if (localStorage.getItem("userId") == null) {
        window.location.href = '/login'
      }
    }
  }
</script>

<style scoped>

</style>
