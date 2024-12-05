'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// import { useUser } from '@clerk/nextjs'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { addEnv } from 'src/actions/bo/add-env'
import { editEnv } from 'src/actions/bo/edit-env'
import { Button } from 'src/components/ui/button'
import { Checkbox } from 'src/components/ui/checkbox'
import {
  Form as EnvironmentEdit,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'
import { toast } from 'src/hooks/use-toast'

const FormSchema = z.object({
  id: z.number(),
  name: z.string().min(1, { message: '' }),
  clientId: z.string(),
  dbHost: z.string().min(1, { message: '' }),
  dbPass: z.string().min(1, { message: '' }),
  dbSid: z.string().min(1, { message: '' }),
  dbUser: z.string().min(1, { message: '' }),
  kioskPw: z.string(),
  kioskUsername: z.string(),
  isGlobalEnv: z.boolean().default(false).optional(),
  // isIntegrations: z.string(),
})

const FormPage = ({ envData }: { envData?: any }) => {
  const { data: session } = useSession()
  // const { user }: any = useUser()
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: envData?.id || 0,
      name: envData?.name || '',
      clientId: envData?.clientId || '',
      dbHost: envData?.dbHost || '',
      dbPass: envData?.dbPass || '',
      dbSid: envData?.dbSid || '',
      dbUser: envData?.dbUser || '',
      kioskPw: envData?.kioskPw || '',
      kioskUsername: envData?.kioskUsername || '',
      isGlobalEnv: envData?.isGlobalEnv || false,
    },
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const isEdit = !!envData?.id
      let dataObj = {
        description: data.name,
        isIntegrations: false,
        isGlobalEnv: false,
        kioskUsername: data.kioskUsername,
        kioskPw: data.kioskPw,
        dbHost: data.dbHost,
        dbUser: data.dbUser,
        dbPass: data.dbPass,
        dbSid: data.dbSid,
        clientId: data.clientId,
      }
      if (isEdit) {
        await editEnv({ ...dataObj, id: data.id })
      } else {
        await addEnv(dataObj)
      }
      toast({
        title: 'Success',
        description: `Environment ${isEdit ? 'edited' : 'added'} successfully`,
      })
      router.push('/app/environment')
    } catch (error: any) {
      toast({
        title: 'Error',
        description: `Issue trying to save environment: ${error?.message}`,
        variant: 'destructive',
      })
    }
  }

  return (
    <EnvironmentEdit {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 w-2/3'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='clientId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client ID</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='dbHost'
          render={({ field }) => (
            <FormItem>
              <FormLabel>DB Host *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='dbUser'
          render={({ field }) => (
            <FormItem>
              <FormLabel>DB User *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='dbPass'
          render={({ field }) => (
            <FormItem>
              <FormLabel>DB Pass *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='dbSid'
          render={({ field }) => (
            <FormItem>
              <FormLabel>DB SID *</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='kioskPw'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kiosk Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='kioskUsername'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kiosk Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {session?.user?.isAdmin && (
          // {user?.isAdmin && (
          <FormField
            control={form.control}
            name='isGlobalEnv'
            render={({ field }) => (
              <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>Is Global Environment?</FormLabel>
                </div>
              </FormItem>
            )}
          />
        )}
        <Button type='submit'>{`${!!envData?.id ? 'Edit' : 'Add'}`}</Button>
      </form>
    </EnvironmentEdit>
  )
}

export { FormPage }
