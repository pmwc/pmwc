export const debounce = function (func, wait) {
  let timeout;
  return function () {
    const context = this, args = arguments;
    const later = function () {
      timeout = null;
      func.apply(context, args);
    };
    timeout !== null && clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
