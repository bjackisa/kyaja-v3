"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { deleteUser } from "@/actions/staff";
import { User } from "@prisma/client";
import { FaSpinner } from 'react-icons/fa';

interface UserDeleteActionProps {
  user: User;
  onDeleteSuccess?: () => void;
}

export const UserDeleteAction: React.FC<UserDeleteActionProps> = ({ 
  user, 
  onDeleteSuccess 
}) => {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    Swal.fire({
      title: `Are you sure you want to delete user ${user.name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          await deleteUser(user.id);
          toast.success("User deleted successfully");
          onDeleteSuccess?.();
        } catch (error: any) {
          toast.error(error.message || "Failed to delete user");
        } finally {
          setLoading(false);
        }
      }
    });
  }

  return (
    <Button 
      variant="destructive" 
      size="sm" 
      onClick={handleDelete}
      disabled={loading}
    >
      {loading ? (
        <FaSpinner className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </Button>
  );
};