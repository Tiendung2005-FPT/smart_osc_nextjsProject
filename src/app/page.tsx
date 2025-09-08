"use client";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.js";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const [books, setBooks] = useState<any[]>([]);
  const [displayBooks, setDisplayBooks] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [subSelector, setSubSelector] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [subArray, setSubArray] = useState<any[]>([]);
  const [subSearch, setSubSearch] = useState<string>('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchItems = async () => {
      const book = await getDocs(collection(db, "books"));
      setBooks(book.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) })));
      setDisplayBooks(book.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) })));
      const sub = await getDocs(collection(db, "subjects"));
      setSubjects(sub.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) })));
    };
    fetchItems();
    if (searchParams.get('sub')) {
      setSubArray(prev => [...prev, searchParams.get('sub')])
    }
    console.log(subjects);
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      const sub = await getDocs(collection(db, 'subjects'));
      let query = sub.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }));
      console.log(query);

      query = query.filter(
        s =>
          subArray.some(subId => subId === s.id) ||
          s.name.toLowerCase().includes(subSearch.toLowerCase())
      );
      setSubjects(query);
      console.log(query);

    };

    fetchSubjects();
  }, [subSearch]);

  const filterSub = (sub: string) => {
    if (subArray.includes(sub)) {
      setSubArray(prev => prev.filter(s => s !== sub));
    }
    else {
      setSubArray(prev => ([...prev, sub]));
    }
  }

  useEffect(() => {
    let filteredBooks = books;

    if (search.trim() !== '') {
      filteredBooks = filteredBooks.filter(b =>
        b.title.toLowerCase().includes(search.toLowerCase().trim()) ||
        b.author.toLowerCase().includes(search.toLowerCase().trim()) ||
        b.isbn.toLowerCase().includes(search.toLowerCase().trim()) ||
        b.olid.toLowerCase().includes(search.toLowerCase().trim())
      );
    }

    if (subArray.length > 0) {
      filteredBooks = filteredBooks.filter(b =>
        subArray.every(s => b.subjects.includes(s))
      );
    }

    setDisplayBooks(filteredBooks);
  }, [search, subArray, books]);

  return (
    <div className="px-25 flex flex-col gap-10 py-10 bg-[#F9FAFB] h-full">
      <div className="bg-linear-to-r from-[#2563EA] to-[#16A34A] p-8 text-white rounded-xl flex flex-col gap-2">
        <div className="font-bold text-[1.8rem]">Welcome back, Test Student!</div>
        <div className="text-[#DBEAFE] text-[1.2rem]">Discover and check out books from our extensive collection</div>
        <div className="bg-neutral-300/40 w-fit p-2 rounded-full text-sm">{books.length} books available</div>
      </div>

      <div className="p-8 rounded-xl select-none bg-white text-lg flex flex-col gap-3">
        <div className="text-xl font-medium flex gap-3 items-center"><i className="bi bi-search text-blue-400"></i>Search & Filter Books
        </div>
        <div className="lg:grid lg:grid-cols-2 flex flex-col gap-3">
          <div className="border flex w-[100%] rounded p-1 gap-2 has-[input:not(:placeholder-shown)]:border-blue-400">
            <button className="cursor-pointer"><i className="bi bi-search text-neutral-400 hover:text-blue-300"></i></button>
            <input value={search} onChange={e => setSearch(e.target.value)} className="placeholder-gray-500 outline-none bg-transparent w-[100%]" placeholder="Search by title, author, or ISBN..."></input>
          </div>

          <div className="border flex w-[100%] rounded p-1 gap-2 has-[input:not(:placeholder-shown)]:border-blue-400">
            <input value={subSearch} onChange={e => setSubSearch(e.target.value)} onFocus={() => setSubSelector(true)} className="placeholder-gray-500 outline-none bg-transparent w-[100%]" placeholder="Search by category, genres..."></input>
          </div>

        </div>
        {(subSelector || subArray.length != 0) && (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 text-white">
              <button className="cursor-pointer bg-red-400 py-1 px-2 rounded hover:shadow-[0_0_14px_theme(colors.red.200)]" onClick={() => setSubSelector(false)}>Close</button>
              <button className="cursor-pointer bg-blue-400 py-1 px-2 rounded hover:shadow-[0_0_14px_theme(colors.blue.200)]" onClick={() => {
                setSubArray([]);
                setSubSearch('');
              }}>Reset</button>
            </div>
            <div className="flex flex-wrap gap-1">
              {subjects.map(s => (
                <button className={`border p-1 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-green-300 ${subArray.includes(s.id) ? 'bg-blue-400 text-white hover:bg-red-400' : ''}`}
                  onClick={() => filterSub(s.id)} key={s.id}>{s.name}</button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {displayBooks && displayBooks.map(b => (
          <div key={b.id} className="border rounded flex flex-col">
            <div className="flex justify-center items-center bg-neutral-200 h-112 rounded-t">
              <img className="rounded-t w-full h-112 object-contain" src={b.image} alt="Book cover could not load" />
            </div>
            <div className="p-3 flex flex-col justify-between gap-2 h-full">
              <div className="text-xl font-medium">
                {b.title}
              </div>

              <div className="text-neutral-700 flex flex-col gap-1">
                <div>
                  <i className="bi bi-person"></i> {b.author}
                </div>
                {b.isbn && (
                  <div>
                    <i className="bi bi-hash"></i> {b.isbn}
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <p className="line-clamp-2 lg:line-clamp-3">{b.description}</p>
                  <hr />
                  <div className="flex flex-wrap gap-2">
                    {b.subjects.map((s: string) => (
                      <button className={`border p-1 rounded-lg cursor-pointer hover:bg-green-200 ${subArray.includes(s) ? 'bg-blue-400 text-white hover:bg-red-400' : ''}`} onClick={() => filterSub(s)} key={s}>{subjects.find(subject => subject.id === s)?.name}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button onClick={() => router.push(`/book/${b.id}`)} className="rounded-lg cursor-pointer bg-blue-500 text-white font-medium p-4">View Book Detail</button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div >
  );
}
