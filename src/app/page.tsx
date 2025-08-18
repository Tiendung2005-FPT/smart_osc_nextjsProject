export default function Home() {
  return (
    <div className="px-25 flex flex-col gap-10 py-10 bg-[#F9FAFB] h-[100vh]">
      <div className="bg-linear-to-r from-[#2563EA] to-[#16A34A] p-8 text-white rounded-xl flex flex-col gap-2">
        <div className="font-bold text-[1.8rem]">Welcome back, Test Student!</div>
        <div className="text-[#DBEAFE] text-[1.2rem]">Discover and check out books from our extensive collection</div>
        <div className="bg-neutral-300/40 w-fit p-2 rounded-full text-sm">8 books available</div>
      </div>

      <div className="p-8 rounded-xl select-none bg-white">
        <div className="text-xl font-medium flex gap-3 items-center"><i className="bi bi-search text-blue-400"></i>Search & Filter Books
        </div>
      </div>
    </div>
  );
}
