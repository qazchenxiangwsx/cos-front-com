<template>
  <div class="creating">
    <a-icon type="loading" />
    <p>Waiting to create</p>
    <div class="text">
      <p>
        This process will take some time to submit all information to the Ethereum Mainnet
        Blockchain
        <br />
        you can try visit our forum
        <a href="https://bbs.comunion.io/" target="_blank">bbs-comunion.io</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.creating {
  text-align: center;
  font-size: 90px;
  margin-top: 70px;
  p {
    font-size: 7px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }

  .text {
    margin-top: 100px;
  }
}
</style>
