import {ElLoading } from "element-plus";
let loading: any = null;
export function startLoading(text="拼命加载中...") {
    loading = ElLoading.service({
      lock: true,
      text,
      background: "rgba(0,0,0,.3)",
      fullscreen: true
    });
  }
  export function endLoading() {
    loading.close();
  }
