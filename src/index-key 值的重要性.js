import h from './diff/h';
import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
} from "snabbdom";

const patch = init([
  // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
]);

// 获取容器
const container = document.getElementById('container');
const btn = document.getElementById('btn');

const vnode1 = h('ul', {}, [
  h('li', {}, [
    h('h1', {}, 'Hemo')
  ]),
  h('li', {}, "A"),
  h('li', {}, "B"),
  h('li', {}, "C"),
  h('li', {}, "D")
])

console.log(vnode1)

/**
 * 如果不写 key 则会从新生成 虚拟 dom
 * 
 */

const vnodeKey1 = h("ul", {}, [
  h("li", { key: "A" }, "A"),
  h("li", { key: "B" }, "B"),
  h("li", { key: "C" }, "C"),
  h("li", { key: "D" }, "D"),
  h("li", { key: "E" }, "E"),
])


const vnodeKey2 = h("ul", {}, [
  h("li", { key: "Q" }, "Q"),
  h("li", { key: "T" }, "T"),
  h("li", { key: "E" }, "E"),
  h("li", { key: "B" }, "B"),
  h("li", { key: "A" }, "A"),
  h("li", { key: "D" }, "D"),
  h("li", { key: "C" }, "C"),
  h("li", { key: "V" }, "V"),
])

/**
 * 测试最小量更新的方法
 * 在 控制台修改标签文字，然后 patch ，更新 dom ，看文字是否去掉
 * 
 * 注意：
 *    1. 最小量更新，key 是这个节点的唯一标识，告诉 diff 算法，在更改前后是否是同一个 DOM 节点
 *    2. 只有是同一个虚拟节点，才会进行精细化比较，否则就是包里删除旧的，插入新的
 *         延伸问题： 如何定义是同一个虚拟节点？ 选择器（sel）相同且 key 相同
 *    3. 只进行同层比较，不会进行跨层比较。即使是同一片虚拟及诶单，但是跨层级，也不会进行精细化比较，采用暴力删除和插入。
 * 
 *    暴力部分基本不常见，所以这是 合理的优化机制。
 * 
 */

patch(container, vnodeKey1);

btn.addEventListener('click', () => {
  patch(vnodeKey1, vnodeKey2);
})
