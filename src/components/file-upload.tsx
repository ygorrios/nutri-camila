'use client'
import { NextPage } from 'next'
import toast from 'react-hot-toast'
import { ourFileRouter } from 'src/app/api/uploadthing/core'
import { UploadDropzone } from 'src/lib/uploadthing'

interface Props {
  onChange: (url?: string) => void
  endpoint: keyof typeof ourFileRouter
}

const FileUpload: NextPage<Props> = ({ endpoint, onChange }) => {
  return (
    <UploadDropzone
    
      endpoint={endpoint}
      onClientUploadComplete={(res) => onChange(res?.[0]?.url)}
      onUploadError={(error: Error) => {
        toast.error(error?.message)
      }}
    />
  )
}

export default FileUpload
