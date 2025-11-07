import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

export function UpdateProfile({ setAddress, setPhone }:any) {
  const [isSaved, setIsSaved] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      phone: "",
      address: "",
    },
  });

  const onSubmit = (data:any) => {
    if (data.phone && data.address) {
      setPhone(data.phone);
      setAddress(data.address);
      setIsSaved(true);
      toast.success("Profile updated successfully.");
    } else {
      toast.error("Please fill in both address and phone number.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{isSaved ? "Profile Saved " : "Change"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>
            Enter your address and phone number for delivery.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" {...register("address")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input type="tel" id="phone" {...register("phone")} />
            </div>
          </div>
          <DialogFooter>
            <Button className="bg-[#f68b1e]" type="submit"> {isSaved ? "Success" : "Save changes"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
