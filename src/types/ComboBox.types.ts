// import { COMBO_ENUM } from 'src/constants/comboEnum'
// import { IActions } from './Api.types'
// import { LabelProps } from './Input.types'

// type ComboEnum = keyof typeof COMBO_ENUM

interface ComboBoxProps<T> {
  // labelProps: LabelProps
  // queryFn: ({ params }: IActions) => Promise<T[] | ComboBoxOption[]>
  onChange?: (key: string, option: T | ComboBoxOption | undefined | null) => void
  isInfiniteScroll?: boolean
  // comboBoxType?: ComboEnum
  params?: Record<string, string>
  hideLabel?: boolean
  defaultValue?: string | T | ComboBoxOption | null
}

interface ComboBoxOption {
  code: string
  description: string
  avatar?: string
  email?: string
}

type ComboboxOptionType = {
  id: string | number
  name: string
}

export type { ComboBoxOption, ComboboxOptionType, ComboBoxProps }
// export type { ComboBoxOption, ComboBoxProps, ComboEnum }
