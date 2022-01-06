export default function createElement(vnode) {
  // 目标是把虚拟节点转为真实 dom
  let domNode = document.createElement(vnode.sel);

  if (vnode.text !== "" && (vnode.children === undefined || vnode.children.length === 0)) {
    domNode.innerHTML = vnode.text;
    
  } else if (vnode.children.length >= 0 && Array.isArray(vnode.children)) {
    for (let i = 0; i < vnode.children.length; i++) {
      const childNode = createElement(vnode.children[i]);
      vnode.children[i].elm = childNode;
      domNode.appendChild(childNode);
    }
  }
  vnode.elm = domNode;
  return domNode
}