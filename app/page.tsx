'use client'

import Editor from '@monaco-editor/react'
import axios from 'axios'

import { ChangeEvent, useState } from 'react'

import { Switch } from '@headlessui/react'

export default function Home() {
  const [code, setCode] = useState('')
  const [isSimple, setSimple] = useState(false)

  const simpleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSimple(e.target.checked)
  }

  const onCodeChnage = (code?: string) => {
    code && setCode(code)
  }

  const [targetCode, setTargetCode] = useState('')

  async function startTransform() {
    const res = await axios({
      url: '/api/getClassCode',
      params: {
        code,
        isSimple,
      },
    })

    setTargetCode(res.data.code)
  }

  return (
    <div>
      <div className="flex justify-between items-center w-full pl-6 pr-6 h-14 border-b font-mono text-xl ">
        <span>Interface2Class</span>
        <div className="flex items-center">
          <button
            onClick={startTransform}
            type="submit"
            className="flex mt-2 w-full justify-center rounded-md bg-slate-400 px-3 py-1.5 text-xs font-semibold leading-6 text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Save
          </button>
          <div className="flex ml-2 text-xs pt-2 font-semibold text-slate-400">
            <span className="justify-center content-center">Simple:</span>
            <Switch
              checked={isSimple}
              onChange={setSimple}
              className={`${
                isSimple ? 'bg-slate-400' : 'bg-slate-300'
              } relative inline-flex h-6 w-11 items-center rounded-full`}>
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${
                  isSimple ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
        </div>
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
