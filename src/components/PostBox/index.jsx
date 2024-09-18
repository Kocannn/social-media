"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Page = ({ user }) => {
  const router = useRouter();
  const [status, setStatus] = useState("");

  const handleClick = async (e) => {
    const data = {content: status, userId: user.id }
    e.preventDefault();
    const response = await fetch('/api/v1/post',{
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if(response.status == 200){
      console.log("cihuyyyy");
    }
    setStatus('')
    router.refresh()
  }

  console.log(user);
  return (
    <div className=" text-white p-6 border-gray-700 w-full border-b">
      <form>
        <div className="flex items-center space-x-4">
          <Image
            src={user.image} // ganti dengan path gambar yang valid
            alt="user icon"
            width={40}
            height={40}
            className="rounded-full"
          />
          <input
            type="text"
            placeholder="Apa yang sedang hangat dibicarakan?!"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="flex-1 bg-transparent text-xl border-none focus:outline-none hover:outline-none focus:ring-0 text-white placeholder-gray-400"
          />
        </div>
        <div className="flex justify-end items-center mt-4 ">
          <button
            onClick={handleClick}
            type="submit"
            className=" px-4 py-2 rounded-full bg-blue-500 hover:opacity-90"
          >
            Posting
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
