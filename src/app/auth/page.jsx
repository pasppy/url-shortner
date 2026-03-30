"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Login from "@/components/login";
import Signup from "@/components/signup";
import { useSearchParams } from "next/navigation";


const Auth = () => {
  const searchParams = useSearchParams()
  const longUrl = searchParams.get("createNew");

  return (
    <div className="flex flex-col items-center mt-12 gap-10 mb-12">
      {
        longUrl && <h2 className="text-3xl sm:text-5xl font-extrabold text-center">Hold up let's login first</h2>
      }


      <Tabs defaultValue="login" className="sm:w-[400px] ">

        <TabsList className={"w-full "}>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">SignUp</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>


    </div >
  )
}

export default Auth