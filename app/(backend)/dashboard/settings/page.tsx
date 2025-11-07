import { getProfileByUserId } from "@/actions/UpdateUser";
import { ProfileForm } from "@/components/back-end/ProfileSettings";
import { Separator } from "@/components/ui/separator"
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export default async function SettingsProfilePage() {
  const session = await getServerSession(authOptions);
  const id = session?.user.id;

  let singleProfile;
  if (id) { 
    singleProfile = await getProfileByUserId(id);
    // console.log(singleProfile);
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is your profile settings.
        </p>
      </div>
      <Separator />
      {id && <ProfileForm id={id} singleProfile={singleProfile} />}
    </div>
  )
}
