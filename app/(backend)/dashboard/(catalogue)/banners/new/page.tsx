import BannerForm from "@/components/back-end/BannerForm";
import FormHeader from "@/components/back-end/FormHeader";
import Unauthorized from "@/components/Unauthorized";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export default async function NewBanner() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const role = user?.role;
  if (role === "USER") {
    return(
      <Unauthorized/>
    )
  }
  return (
    <div>
      <FormHeader title="New Banner" />
      <BannerForm />
    </div>
  );
}
