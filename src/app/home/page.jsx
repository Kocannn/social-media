import Layout from "@/components/Layout";
import Content from "@/components/content/index";
import { authUserSession } from "@/libs/auth-libs";
import PostBox from "@/components/PostBox";
const Page = async () => {
  const user = await authUserSession();
  console.log(user);

  return (
    <Layout>
      <div className="flex border-b bg-transparent sticky top-0 backdrop-blur-sm border-gray-700 h-14">
        <a
          className="w-1/2 justify-center items-center flex transition-all duration-200  hover:bg-zinc-700"
          href="#"
        >
          Untuk Anda
        </a>
        <a
          className="w-1/2 justify-center items-center flex transition-all duration-200  hover:bg-zinc-700"
          href="#"
        >
          Mengikuti
        </a>
      </div>
      <div>
        <PostBox user={user} />
      </div>
      <Content/>
    </Layout>
  );
};

export default Page;
