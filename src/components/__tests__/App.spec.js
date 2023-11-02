import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '@/App.vue'
import Setting from '@/components/Setting.vue'
import Signboard from '@/components/Signboard.vue'

describe('App', () => {
  it('default', () => {
    const wrapper = mount(App)
    const settingComponent = wrapper.findComponent(Setting)
    const signboardComponent = wrapper.findComponent(Signboard)

    expect(settingComponent.isVisible()).toBe(true)
    expect(signboardComponent.isVisible()).toBe(false)
  })

  it('stopExecution', async() => {
    const wrapper = mount(App)
    const settingComponent = wrapper.findComponent(Setting)
    const signboardComponent = wrapper.findComponent(Signboard)

    await wrapper.vm.stopExecution()
    expect(settingComponent.isVisible()).toBe(true)
    expect(signboardComponent.isVisible()).toBe(false)
  })


  it('executing', async () => {
    const wrapper = mount(App)
    const settingComponent = wrapper.findComponent(Setting)
    const signboardComponent = wrapper.findComponent(Signboard)
    
    await wrapper.vm.execution()
    expect(settingComponent.isVisible()).toBe(false)
    expect(signboardComponent.isVisible()).toBe(true)
  })
})

// テストしたいこと
// 実行中の時設定コンポーネントが非表示になっているか
// 非実行中の時サインボードコンポーネントが非表示になっているか