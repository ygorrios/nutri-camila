'use client'

import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'

interface EditorProps {
  onChange: (value: string) => void
  value: string
}

export const Editor = ({ onChange, value }: EditorProps) => {
  return (
    <div className='bg-white'>
      <ReactQuill value={value} onChange={onChange} theme='snow' />
    </div>
  )
}
