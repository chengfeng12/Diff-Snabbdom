import vnode from './vnode';
import createElement from "./createElement";
import patchVnode from "./patchVnode.js";

export default function patch(oldVnode, newVnode) {
  // 判断第一个参数，是 dom 节点还是虚拟节点?
  if (oldVnode.sel === '' || oldVnode.sel === undefined) {
    // 传入的第一个参数是 DOM 节点，此时要包装为虚拟节点
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode);
  }

  // 判断 oldVnode 和 newVnode 是不是同一个节点
  if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
    // 是同一个节点开始精细化比较
    patchVnode(oldVnode, newVnode);
  } else {
    // 不是同一个节点，暴力插入新的，删除旧的
    const domNode = createElement(newVnode);
    // 先将新节点插入到老节点之前 然后删除老节点
    if (oldVnode.elm.parentNode && newVnode) {
      oldVnode.elm.parentNode.insertBefore(domNode, oldVnode.elm);
    }
    oldVnode.elm.parentNode.removeChild(oldVnode.elm);
  }
}