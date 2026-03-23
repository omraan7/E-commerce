"use client"
import { Button } from '@/components/ui/button'
 import React from 'react'

export default function FreshButton({ className, children }:  React.ComponentProps<typeof Button>) {
    return (
        <>

            { <Button className={`${className}`}  >{children}</Button>}


        </>)
}
