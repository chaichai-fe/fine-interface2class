import type { NextApiRequest, NextApiResponse } from 'next'
import { genClass } from './transform'
import { log } from 'console'
type ResponseData = {
  code: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const code = req.query.code
  if (code) {
    res.status(200).json({ code: genClass(code as string) })
  }
}
