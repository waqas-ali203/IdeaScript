'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import React from 'react'

interface IConfirmModalProps {
    children: React.ReactNode;
    onConfirm: () => void
}


export const ConfirmModal = (
    {
        children, onConfirm
    }: IConfirmModalProps
) => {

const handleConfirm = (e:React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
    e.stopPropagation()
    onConfirm();
}

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild onClick={(e) => e.stopPropagation()}>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutly sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be indone
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm} >
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}