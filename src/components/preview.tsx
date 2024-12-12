'use client'

import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'

interface PreviewProps {
  value: string
}

export const Preview = ({ value }: PreviewProps) => {
  return <ReactQuill value={value} readOnly theme='bubble' />
}
