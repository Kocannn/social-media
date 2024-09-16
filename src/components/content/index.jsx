import prisma from "@/libs/prisma";
import { formatDistanceToNow } from "date-fns";
const Page = async () => {
  const getData = await prisma.post.findMany({
    include: {
      user: true,
    },
  });

  return getData.flatMap((item) => {
    return (
      <div className="flex p-4 border-b border-gray-700 text-white">
        {/* Profile Image */}
        <div className="mr-4">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="rounded-full"
          />
        </div>

        {/* Tweet Content */}
        <div className="flex flex-col w-full">
          {/* Username and Handle */}
          <div className="flex items-center space-x-2">
            <span className="font-bold">{item.user.name}</span>
            <span className="text-gray-400">@{item.user.username}</span>
            <span className="text-gray-400">·{formatDistanceToNow(new Date(item.createdAt),{addSuffix: true} )}</span>
          </div>

          {/* Tweet Text */}
          <p className="mt-1">{item.content}</p>

          {/* Tweet Actions */}
          <div className="flex justify-between text-gray-400 mt-3 w-3/4">
            {/* Reply */}
            <div className="flex items-center space-x-1 cursor-pointer">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2h2m10 0V6a4 4 0 00-8 0v2m8 0H7"
                ></path>
              </svg>
              <span>3</span>
            </div>

            {/* Like */}
            <div className="flex items-center space-x-1 cursor-pointer">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 15l7-7 7 7"
                ></path>
              </svg>
              <span>3</span>
            </div>

            {/* View Count */}
            <div className="flex items-center space-x-1 cursor-pointer">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5c-7.333 4.333-10 9.5-10 9.5s2.667 5.167 10 9.5c7.333-4.333 10-9.5 10-9.5s-2.667-5.167-10-9.5z"
                ></path>
              </svg>
              <span>27</span>
            </div>

            {/* Share */}
            <div className="flex items-center space-x-1 cursor-pointer">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11l4-4m0 0l-4-4m4 4H8m7 8v6m0-6l-4-4m4 4l4-4"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  });
};

export default Page;
