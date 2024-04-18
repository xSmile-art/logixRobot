/**
 * 自定义组件 Props 传值对比
 * @param oldProps
 * @param newProps
 * @returns {boolean}
 */
export function arePropsEqual(oldProps, newProps) {
  return JSON.stringify(oldProps) === JSON.stringify(newProps);
}
