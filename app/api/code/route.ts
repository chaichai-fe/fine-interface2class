import { genClass } from './transform'

// GET请求
// api/code
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const isSimple = searchParams.get('isSimple')

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
