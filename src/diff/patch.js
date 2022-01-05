import vnode from './vnode';
import createElement from "./createElement";

export default function patch(oldVnode, newVnode) {
  // 判断第一个参数，是 dom 节点还是虚拟节点
  if (oldVnode.sel === '' || oldVnode.sel === undefined) {
    // 将真实 节点转化为 虚拟节点
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }

  if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
    console.log("同一个节点");
  } else {
    console.log("不是同一个节点，暴力插入新的，删除旧的");
    let domNode = createElement(newVnode, )
    oldVnode.elm.parentNode.insertBefore(domNode, oldVnode.elm);
  }
}