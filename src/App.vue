<script setup>
import { ref } from 'vue'
import Setting from './components/Setting.vue'
import Signboard from './components/Signboard.vue'

const settingComponent = ref(null)
const signboardComponent = ref(null)

const executing = ref(false)

const execution = () => {
  executing.value = true
  signboardComponent.value.setConfig({
    body: settingComponent.value.body,
    fontSize: settingComponent.value.fontSize,
    fontColor: settingComponent.value.fontColor,
    backgroundColor: settingComponent.value.backgroundColor,
    arrangement: settingComponent.value.arrangement,
    fullScreen: settingComponent.value.fullScreen
  })
}

const stopExecution = () => {
  executing.value = false
  // フルスクリーンにしなかった時に
  // フルスクリーンじゃないからexitFullscreenできませんとエラーが図れる
  // 別にクラッシュするわけでも無ければ､バグの原因にもならないので方っておいても良いが消せるようなので消しとく

  // フルスクリーンにした要素がnull -> フルスクリーンを実行しなかった｡
  if (document.fullscreenElement != null) {
    document.exitFullscreen()
  }
}
</script>

<template>
  <header></header>

  <main>
    <Signboard v-show="executing" ref="signboardComponent" @stopExecution="stopExecution" />

    <button v-show="!executing" @click="execution">表示</button>
    <Setting v-show="!executing" ref="settingComponent" />
  </main>
</template>

<style scoped>
button {
  margin: 1rem;
  width: 25%;
  @media (max-width: 549px) {
    width: 100%;
  }
}
</style>
