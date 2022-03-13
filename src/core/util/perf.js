import { inBrowser } from './env'

export let mark
export let measure

// 不在生产环境
if (process.env.NODE_ENV !== 'production') {
  // 在浏览器 && 允许网页访问某些函数来测量网页和Web应用程序的性能
  const perf = inBrowser && window.performance
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = tag => perf.mark(tag)
    measure = (name, startTag, endTag) => {
      perf.measure(name, startTag, endTag)
      perf.clearMarks(startTag)
      perf.clearMarks(endTag)
      // perf.clearMeasures(name)
    }
  }
}
