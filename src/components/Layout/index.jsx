import Navbar from "@/components/Sidebar";
import ForYou from "@/components/trending";
import Search from "@/components/Search";

export default function Index({ children }) {
  return (     
        <div className="flex">
          <div className="rounded-lg w-80 ">
            <Navbar />
          </div>
          <div className="grid grid-cols-1 h-screen gap-4 lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2 border-l border-r border-gray-700">{children}</div>
            <div className="rounded-lg">
              <div className="flex flex-col mx-4">
                <Search />
                <ForYou />
              </div>
            </div>
          </div>
        </div>
  );
}
