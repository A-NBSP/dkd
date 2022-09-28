/**
 * 图片无法正常加载，自定义指令
 */
export const imagerror = {
  inserted(dom, binding) {
    console.log(dom, binding)
    dom.src = binding.value
    // 当数据中图片有地址但无法加载时，会触发image的onerror事件
    dom.onerror = function() {
      dom.src = binding.value
    }
  }
}
