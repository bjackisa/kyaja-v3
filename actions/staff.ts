"use server"

import db from "@/lib/db"
import { UserRole } from "@prisma/client"
import { revalidatePath } from "next/cache"

export async function updateUserRole(userId: string, newRole: UserRole) {
  try {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { role: newRole }
    })

    revalidatePath("/dashboard/users")
    return { success: true, user: updatedUser }
  } catch (error) {
    console.error("Failed to update user role:", error)
    return { 
      success: false, 
      error: "Failed to update user role" 
    }
  }
}

export async function deleteUser(userId: string) {
  try {
    await db.user.delete({
      where: { id: userId }
    })

    revalidatePath("/dashboard/staff")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete user:", error)
    return { 
      success: false, 
      error: "Failed to delete user" 
    }
  }
}