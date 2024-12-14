import { LucideIcon, Notebook } from 'lucide-react'

type Submenu = {
  href: string
  label: string
  active: boolean
}

type Menu = {
  href: string
  label: string
  active: boolean
  icon: LucideIcon
  requiredAdmin: boolean
  submenus: Submenu[]
}

type Group = {
  groupLabel: string
  requiredAdmin: boolean
  menus: Menu[]
}

const getMenuList = (pathname: string): Group[] => {
  return [
    {
      groupLabel: '',
      requiredAdmin: false,
      menus: [
        {
          href: '/app/teacher/courses/',
          label: 'Cursos',
          active: pathname === '/app/teacher/courses/',
          requiredAdmin: false,
          icon: Notebook,
          submenus: [],
        },
      ],
    },
  ]
}

export { getMenuList }
