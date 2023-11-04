import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Setting from '@/components/Setting.vue'

describe('Setting', () => {
    // 期待:textareaに書かれた内容がbodyに代入されている
  it('textarea', () => {
    const wrapper = mount(Setting)
    // findは非推奨らしいがこれじゃないとやりにくい
    const textarea = wrapper.find('textarea')
    textarea.setValue('some value')
    // console.log(textarea.element.value);
    // console.log(wrapper.vm.body);
    expect(wrapper.vm.body).toBe(textarea.element.value)
  })
})

describe('fullScreen', () => { 
    // 期待:初期状態ではチェックがついてない
    it("default",() => {
        const wrapper = mount(Setting)
        const check = wrapper.find('input[type="checkbox"]')
        expect(check.element.value).toBeFalsy
    })

    // 期待:クリックしたらチェックがついてv-modelも更新されているか
    it("check",async() => {
        const wrapper = mount(Setting)
        const check = wrapper.find('input[type="checkbox"]')

        await check.setChecked()
        expect(check.element.value).toBeTruthy
        expect(wrapper.vm.fullScreen).toBeTruthy
    })

    // 期待:再度クリックしたらチェックがはずれてv-modelも更新されているか
    it("uncheck",async() => {
        const wrapper = mount(Setting)
        const check = wrapper.find('input[type="checkbox"]')

        await check.setChecked()
        await check.setChecked()
        expect(check.element.value).toBeFalsy
        expect(wrapper.vm.fullScreen).toBeFalsy
    })
 })

describe('fontsize',() => {
    // 期待:初期状態では"middle"が選ばれているか 
    // 変数fontSizeとv-modelでつながっており変数の初期値は'middle'
    it('default',() => {
        const wrapper = mount(Setting)
        const select = wrapper.findAll('select').at(0)
        expect(wrapper.vm.fontSize).toBe(select.find('option:checked').element.value)
    })

    // 期待:変更した時に､v-modelが更新されているか
    it.each([
        ["larger",0],
        ["large",1],
        ["middle",2],
        ["small",3],
        ["smaller",4],
    ])('%s',async (checked,index) => {
        const wrapper = mount(Setting)
        const select = wrapper.findAll('select').at(0)
        const options = select.findAll('option')

        await options.at(index).setSelected()
        expect(select.find('option:checked').element.value).toBe(checked)
        expect(wrapper.vm.fontSize).toBe(checked)
    })
})

describe('arrangement',() => {
    // 期待:初期状態では"center"が選ばれているか
    // 変数arrangementとv-modelでつながっており変数の初期値は'center'
    it('default',() => {
        const wrapper = mount(Setting)
        const select = wrapper.findAll('select').at(1)
        expect(wrapper.vm.arrangement).toBe(select.find('option:checked').element.value)
    })

    // 期待:変更した時に､v-modelが更新されているか
    it.each([
        ["center",0],
        ["left",1],
        ["right",2],
    ])('%s',async (checked,index) => {
        const wrapper = mount(Setting)
        const select = wrapper.findAll('select').at(1)
        const options = select.findAll('option')

        await options.at(index).setSelected()
        expect(select.find('option:checked').element.value).toBe(checked)
        expect(wrapper.vm.arrangement).toBe(checked)
    })
})