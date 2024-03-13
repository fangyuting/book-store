<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="less">
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: inter-var, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Helvetica, 'Apple Color Emoji', Arial, sans-serif, 'Segoe UI Emoji',
    'Segoe UI Symbol';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  overflow: hidden;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  margin: 0 0 0 0;
}
</style>
