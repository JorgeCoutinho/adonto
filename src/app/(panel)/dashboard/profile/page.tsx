import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserData } from "./_date-access/get-info-user";
import { ProfileContent } from "./_components/profile";

const Profile = async () => {

  const session = await auth();
  if (!session || !session.user?.id) {
    redirect('/')
  }

  const user = await getUserData({ userId: session.user.id })
  //console.log(user)
  if (!user) {
    redirect('/')
  }

  return (
    <section>
      <ProfileContent user={user}/>
    </section>
  );
}

export default Profile;