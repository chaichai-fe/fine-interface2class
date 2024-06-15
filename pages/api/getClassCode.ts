import type { NextApiRequest, NextApiResponse } from 'next'
import { genClass } from './transform'

type ResponseData = {
  code: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { code, isSimple } = req.query

  if (code) {
    if (isSimple === 'true') {
      res.status(200).json({ code: genClass(code as string, true) })
    } else {
      res.status(200).json({ code: genClass(code as string) })
    }
  }
}
