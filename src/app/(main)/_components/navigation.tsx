import { cn } from '@/lib/utils'
import { ChevronLeftIcon, MenuIcon, Plus, PlusCircle, Search, Settings, Trash } from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import React, { ElementRef, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import UserItem from './UserItem'
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import Item from './item'
import { toast } from 'sonner'
import DocumentList from './DocumentList'
import {
    Popover,
    PopoverTrigger,
    PopoverContent
} from '@/components/ui/popover'
import TrashBox from './TrashBox'

import { useSearch } from '../../../../hooks/use-search'
import { useSettings } from '../../../../hooks/use-settings'
import Navbar from './Navbar'



export default function Navigation() {
    const pathname = usePathname()
    const params = useParams()
    const isMobile = useMediaQuery("(max-width:768px)")

    const create = useMutation(api.documents.create)

    const isResizingRef = useRef(false)
    const sideBarRef = useRef<ElementRef<"aside">>(null)
    const navBarRef = useRef<ElementRef<"div">>(null)
    const [isResetting, setIsResetting] = useState(false)
    const [isCollasped, setIsCollasped] = useState(isMobile)

    const search = useSearch();
    const settings = useSettings();

    const router = useRouter()

    useEffect(() => {
        if (isMobile) {
            collapse()
        } else {
            resetWith()
        }
    }, [isMobile])

    useEffect(() => {
        if (isMobile) {
            collapse()
        }
    }, [pathname, isMobile])


    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation()
        isResizingRef.current = true
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWidth = e.clientX;
        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;
        if (sideBarRef.current && navBarRef.current) {
            sideBarRef.current.style.width = `${newWidth}px`
            navBarRef.current.style.setProperty('left', `${newWidth}px`);
            navBarRef.current.style.setProperty('width', `calc(100% - ${newWidth}px)`);
        }
    }

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
    }

    const resetWith = () => {
        if (sideBarRef.current && navBarRef.current) {
            setIsCollasped(false)
            setIsResetting(true);

            sideBarRef.current.style.width = isMobile ? "100%" : '240px'
            navBarRef.current.style.setProperty('width', isMobile ? '0' : "calc(100% - 240px)");
            navBarRef.current.style.setProperty('left', isMobile ? '100%' : '240px')
            setTimeout(() => setIsResetting(false), 300)
        }
    }


    const collapse = () => {
        if (sideBarRef.current && navBarRef.current) {
            setIsCollasped(true)
            setIsResetting(true)

            sideBarRef.current.style.width = '0';
            navBarRef.current.style.setProperty('width', '100%')
            navBarRef.current.style.setProperty('left', '0')
            setTimeout(() => setIsResetting(false), 300)
        }
    }

    const handleCreate = () => {
        const promise = create({ title: 'Untitled' }).then((documentId)=>{
            router.push(`/documents/${documentId}`)
        })

        toast.promise(promise, {
            loading: "creating a new note...",
            success: "new note created",
            error: "Faild to create a new note :(",
        })
    }

    return (
        <>
            <aside ref={sideBarRef} className={cn(
                'group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]',
                isResetting && 'transition-all ease-in-out duration-300',
                isMobile && 'w-0'
            )}>

                <div
                    role='button'
                    onClick={collapse}
                    className={cn(
                        'h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition',
                        isMobile && 'opacity-100'
                    )}>
                    <ChevronLeftIcon className='h-6 w-6' />
                </div>

                <div className="">
                    <UserItem />
                    <Item
                        label='Search'
                        icon={Search}
                        isSearch
                        onClick={search.onOpen}
                    />
                    <Item
                        label='Setting'
                        icon={Settings}
                        onClick={settings.onOpen}
                    />
                    <Item onClick={handleCreate} label={'New page'} icon={PlusCircle} />
                </div>
                <div className="mt-4">
                    <DocumentList />
                    <Item onClick={handleCreate} icon={Plus} label='Add a page' />
                    <Popover>
                        <PopoverTrigger className='w-full mt-4'>
                            <Item label='Trash' icon={Trash} />
                        </PopoverTrigger>
                        <PopoverContent side={isMobile ? "bottom" : "right"} className='p-0 w-72'>
                            <TrashBox />
                        </PopoverContent>
                    </Popover>
                </div>
                <div
                    onMouseDown={handleMouseDown}
                    onClick={resetWith}
                    className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0" />
            </aside>

            <div
                ref={navBarRef}
                className={cn(
                    'absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]',
                    isResetting && 'transition-all ease-in-out duration-300',
                    isMobile && 'left-0 w-full'
                )}>

                {!!params.documentId
                    ? (
                        <Navbar
                        isCollasped={isCollasped}
                        onResetWidth={resetWith}
                        />
                    ) : (
                        <nav className='bg-transparent px-3 py-2 w-full'>

                            {isCollasped && <MenuIcon onClick={resetWith} className='h-6 w-6 text-muted-foreground' role='button' />}

                        </nav>
                    )}

            </div>

        </>
    )
}
