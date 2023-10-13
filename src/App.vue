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
    arrangement: settingComponent.value.arrangement
  })
}
</script>

<template>
  <header></header>

  <main>
    <button @click="execution">表示</button>
    <Signboard ref="signboardComponent" />
    <Setting v-show="!executing" ref="settingComponent" />
  </main>
</template>

<style scoped></style>
