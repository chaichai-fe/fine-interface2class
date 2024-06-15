import { genClass } from './transform'
import { log } from 'console'
import { type SgNode, ts } from '@ast-grep/napi'

// GET请求
// api/code
export async function GET(request: Request) {
  // 获取查询参数
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const isSimple = searchParams.get('isSimple')

  log(code, isSimple)

  if (code) {
    if (isSimple === 'true') {
      return Response.json({ code: genClass(code as string, true) })
    } else {
      return Response.json({ code: genClass(code as string) })
    }
  } else {
    return Response.json({ code: '' })
  }
}
