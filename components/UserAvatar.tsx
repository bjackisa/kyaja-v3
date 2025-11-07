"use client";
import React, { useEffect, useState } from "react";
import {Dropdown } from "flowbite-react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { getProfileByUserId } from "@/actions/UpdateUser";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
interface Profile {
  username?: string;
  email?: string;
  image?: string;
  role?: string;
  id?:string
}
interface User {
        name?: string;
        email?: string;
        image?: string;
        role?: string;
        id?:string
}

interface UserAvatarProps {
  user: User;
}

export default function UserAvatar({ user  }:UserAvatarProps) {
  console.log(user?.id)
  const [profile, setProfile] = useState(null); 
  const profileImage = profile?.image || "https://utfs.io/f/8b034fb4-1f45-425a-8c57-a7a68835311f-2558r.png"; 
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const fetchedProfile: Profile = await getProfileByUserId(user.id);
        setProfile(fetchedProfile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [user?.id]);

 
  const router = useRouter();
  async function handleLogout() {
    // console.log("btn clicked")
    await signOut();
    router.push("/login");
  }
  return (
    <Dropdown
        arrowIcon={false}
        inline
        label={
          <Avatar>
           <AvatarImage className="object-cover" src={profileImage} />
          <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        }
      >
              <Dropdown.Header>
              {
                profile?.username?(
                  <span className="block truncate text-sm font-medium">{profile?.username}@gmail.com</span>
                ):""
              }
                <span className="block truncate text-sm font-medium">
                  {user?.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
              <Dropdown.Item href="/dashboard/settings">Settings</Dropdown.Item>
              {/* <Dropdown.Item>Earnings</Dropdown.Item> */}
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
            </Dropdown>
  );
}
