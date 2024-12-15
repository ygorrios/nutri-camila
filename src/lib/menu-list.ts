import { ChartBarStacked, LucideIcon, Notebook } from 'lucide-react'

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
          href: '/app/professor/cursos/',
          label: 'Cursos',
          active: pathname.includes('/app/professor/cursos/'),
          requiredAdmin: false,
          icon: Notebook,
          submenus: [],
        },
        {
          href: '/app/professor/categorias/',
          label: 'Categorias',
          active: pathname.includes('/app/professor/categorias/'),
          requiredAdmin: false,
          icon: ChartBarStacked,
          submenus: [],
        },
      ],
    },
  ]
}

export { getMenuList }
