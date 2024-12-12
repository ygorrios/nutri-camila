'use client'

import { Category } from '@prisma/client'
import { ChartNoAxesCombined, Database, HardHat, LucideIcon, MonitorSpeaker, Music } from 'lucide-react'
import CategoryItem from '../_components/category-item'

interface CategoriesProps {
  items: Category[]
}

const iconMap: Record<Category['name'], LucideIcon> = {
  Música: Music,
  'Ciência da Computação': MonitorSpeaker,
  Tecnologia: Database,
  Finanças: ChartNoAxesCombined,
  Engenharia: HardHat,
}

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className='flex items-center gap-x-2 overflow-x-auto pb-2'>
      {items.map((category) => (
        <CategoryItem key={category.id} label={category.name} icon={iconMap[category.name]} value={category.id} />
      ))}
    </div>
  )
}
