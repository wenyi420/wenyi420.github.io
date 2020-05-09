<template>
  <div class="park-item">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ item.name }}</h5>
        <p class="card-text">類型：{{ item.type }}</p>
        <p class="card-text">地區：{{ item.area }}</p>
        <p class="card-text">地址：{{ item.address }}</p>
        <p class="card-text">時間：{{ item.time }}</p>
        <p class="card-text">收費：{{ item.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ParkItem",
    props: {
      item: {
        type: Object,
        require: true
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .park-item {
    width: 33.33333%;
    text-align: left;
    padding: 15px;

    .card {
      height: 100%;
      border: 2px solid #eee;
      box-shadow: 2px 2px 6px 2px #eee;
      transition: ease 0.3s;
      .card-title {
        font-weight: bold;
      }
      .card-text {
        margin-bottom: 5px;
      }
      .card-text + .card-text {
        padding-top: 6px;

        border-top: 1px solid #eee;
      }
      &:hover {
        background: #eee;
        box-shadow: none;
      }
    }
  }
  @media screen and (max-width: 1024px) {
    .park-item {
      width: 50%;
    }
  }
  @media screen and (max-width: 420px) {
    .park-item {
      width: 100%;
    }
  }
</style>
