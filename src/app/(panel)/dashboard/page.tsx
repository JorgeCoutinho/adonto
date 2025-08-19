import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";


const DashboardPage = async () => {
  // privando rotas 
  const session = await getSession()
  if (!session) {
    redirect('/')
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="w-full h-[600px] bg-gray-400 mb-10"></div>
      <div className="w-full h-[600px] bg-red-400 mb-10" ></div>
      <div className="w-full h-[600px] bg-blue-400 mb-10"></div>
    </div>
  );
}

export default DashboardPage;