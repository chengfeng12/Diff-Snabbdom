export default function createElement(vnode, pivot) {
  // 目标是把虚拟节点转为真实 dom
  let domNode = document.createElement(vnode.sel);
  // 这种方式只能简单的上树，不适用 递归多级上树
  if (vnode.text !== "" && (vnode.children === undefined || vnode.children.length === 0)) {
    domNode.innerHTML = vnode.text;
    pivot.parentNode.insertBefore(domNode, pivot)
  } else if (vnode.length >= 0 && Array.isArray(vnode.children)) {
    // for (let i = 0; i < vnode.children.length; i++) {

    // }
  }
}