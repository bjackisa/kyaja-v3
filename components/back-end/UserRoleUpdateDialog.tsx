"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { UserRole } from "@prisma/client"
import FormSelectInput from './FormSelectInput' 
import { updateUserRole } from '@/actions/staff'
import { toast } from 'sonner'

const USER_ROLE_OPTIONS = [
  { value: 'USER', label: 'User' },
  { value: 'ADMIN', label: 'Admin' },
  { value: 'SECRETARY', label: 'Secretary' },
]

export function UserRoleUpdateDialog({ 
  userId, 
  currentRole 
}: { 
  userId: string, 
  currentRole: UserRole 
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [selectedRole, setSelectedRole] = useState({ 
    value: currentRole, 
    label: currentRole 
  })

  const handleRoleUpdate = async () => {
    setIsLoading(true)
    try {
      const result = await updateUserRole(userId, selectedRole.value as UserRole)
      
      if (result.success) {
        toast.success("User role updated successfully")
        setIsOpen(false)
      } else {
        toast.error(result.error || "Failed to update user role")
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Change Role
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update User Role</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <FormSelectInput 
            options={USER_ROLE_OPTIONS}
            label="Role"
            option={selectedRole}
            setOption={setSelectedRole}
          />
         <Button 
            onClick={handleRoleUpdate} 
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Role"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}