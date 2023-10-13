<script setup>
import { ref } from 'vue'

// 行ごとにpで囲いたいため配列
const body = ref(['sample'])
const fontSize = ref('middle')
const fontColor = ref('#000000')
const backgroundColor = ref('#E9E9E9')
const arrangement = ref('center')

//
const setConfig = (optinos) => {
  body.value = splitBody(optinos.body)
  fontSize.value = optinos.fontSize
  fontColor.value = optinos.fontColor
  backgroundColor.value = optinos.backgroundColor
  arrangement.value = optinos.arrangement
}

// 改行で分けたいので
const splitBody = (arg) => {
  console.log(arg)
  const separatorString = /\r\n|\n|\r/
  return arg.split(separatorString)
}

defineExpose({
  setConfig
})
</script>

<template>
  <div class="signboard" :class="arrangement">
    <p v-for="line in body" :key="line">
      {{ line }}
    </p>
  </div>
</template>

<style scoped>
.signboard {
  background-color: v-bind(backgroundColor);
  & p {
    color: v-bind(fontColor);
    font-size: v-bind(fontSize);
  }
}

.center {
  text-align: center;
}

.left {
  text-align: left;
  & p {
    margin-left: 10px;
  }
}

.right {
  text-align: right;
  & p {
    margin-right: 10px;
  }
}

/* とにかく目いっぱい表示させたい */
.larger {
  & p {
  }
}

.large {
  & p {
  }
}

.medium {
  & p {
  }
}

.small {
  & p {
  }
}
</style>
