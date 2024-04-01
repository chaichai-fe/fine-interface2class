'use client'

import Editor from '@monaco-editor/react'
import axios from 'axios'
import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'
// Then register the languages you need
hljs.registerLanguage('javascript', javascript)

import { useState } from 'react'

export default function Home() {
  const [code, setCode] = useState('')

  const onCodeChnage = (code?: string) => {
    code && setCode(code)
  }

  const [targetCode, setTargetCode] = useState('')

  async function startTransform() {
    const res = await axios({
      url: '/api/getClassCode',
      params: {
        code: code,
      },
    })

    setTargetCode(res.data.code)
  }

  return (
    <div>
      <div className="w-full h-14 border-b font-mono text-xl text-center  content-center">
        Interface2Class
      </div>
      <div className="columns-3 flex">
        <div className="flex-1">
          <Editor
            height="100vh"
            defaultLanguage="typescript"
            defaultValue=""
            onChange={onCodeChnage}
          />
        </div>
        <div className="px-2 pt-2">
          <button
            onClick={startTransform}
            type="submit"
            className=" flex w-full justify-center rounded-md bg-slate-400 px-3 py-1.5 text-xs font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Save
          </button>
        </div>
        <div className="flex-1">
          <Editor
            height="100vh"
            defaultLanguage="typescript"
            value={targetCode}
          />
        </div>
      </div>
    </div>
  )
}
