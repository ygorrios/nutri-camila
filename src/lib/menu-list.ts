import { KeyRound, LucideIcon } from 'lucide-react'

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
      groupLabel: 'Acre Intranet',
      requiredAdmin: false,
      menus: [
        {
          href: '/app',
          label: 'Secret Manager',
          active: pathname === '/app/',
          requiredAdmin: false,
          icon: KeyRound,
          submenus: [],
        },
      ],
    },
  ]
}

export { getMenuList }
