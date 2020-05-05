import axios, { CancelToken } from 'axios';

export const baseURL = 'https://xxx.xxx.xxx';
const instance = axios.create({
  baseURL,
  timeout: 30000
});

instance.interceptors.request.use(config => {
  // do something
  return config;
});

instance.interceptors.response.use(async res => {
  // 统一返回结果
  // if (res.status < 300 && res.status >= 200) {
  //   const { code, message, content } = res.data
  //   if (code === 0) {
  //     return {
  //       error: false,
  //       data: content,
  //       detail: { code }
  //     }
  //   }
  //   if (message) {
  //     console.error(message)
  //   }
  //   return {
  //     error: message || '系统错误',
  //     data: content,
  //     detail: { status: res.status, code }
  //   }
  // }
  // return {
  //   error: res.statusText,
  //   data: res.data,
  //   detail: { status: res.status }
  // }
});

// 取消请求列表
const cancelSourceList = [];

// 默认一页20条数据
export const ITEMS_PER_PAGE = 20;

// 取消所有请求
export function cancelAllRequest(reason) {
  for (const _cancelSource of cancelSourceList) {
    // 特权请求不取消，例如获取用户信息等
    if (!_cancelSource.keepWhenNavigate) {
      _cancelSource.cancel(reason);
    }
  }
}

// 添加请求取消
function pushCancelSource(_cancelSource) {
  cancelSourceList.push(_cancelSource);
}

// 移除请求取消
function removeCancelSource(_cancelSource) {
  if (_cancelSource) {
    const index = cancelSourceList.indexOf(_cancelSource);
    cancelSourceList.splice(index, 1);
  }
}

// 统一封装请求接口
// keepWhenNavigate 路由跳转时是否保留而不取消
export async function request(method, url, paramsOrData, ext = {}) {
  const source = CancelToken.source();
  const { keepWhenNavigate, bodyParams } = Object.assign(
    {
      keepWhenNavigate: false,
      bodyParams: {}
    },
    ext
  );
  source.keepWhenNavigate = keepWhenNavigate;
  pushCancelSource(source);
  let ret;
  if (['post', 'put', 'patch'].includes(method)) {
    ret = await instance[method](url, paramsOrData, {
      cancelToken: source.token,
      params: bodyParams,
      responseType: ext.responseType || 'json'
    });
  } else {
    ret = await instance[method](url, {
      cancelToken: source.token,
      params: paramsOrData,
      responseType: ext.responseType || 'json'
    });
  }
  removeCancelSource(source);
  return ret;
}