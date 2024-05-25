'use client'
import React from 'react'
import NotesHeroAnimation from '../../_components/NotesHeroAnimation'
import { useUser } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';




export default function Page() {

  const create = useMutation(api.documents.create)
  const { user } = useUser();
  const router = useRouter();

  const onCreate = ()=>{
    const promise = create({title:'Untitled'}).then((documentId)=>{
      router.push(`/documents/${documentId}`)
    }) 
    toast.promise(promise,{
      loading:'Creating a new note...',
      success:'new note created!',
      error:'Failed to create a new note'
    })
  }


  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4'>
      <NotesHeroAnimation />
      <h2 className='text-lg font-medium'>Welcome to {user?.firstName}&apos;s Script</h2>
      <Button onClick={onCreate}>
        <PlusCircle className='h-4 w-4 mr-2' /> Create Note
      </Button>
    </div>
  )
}
