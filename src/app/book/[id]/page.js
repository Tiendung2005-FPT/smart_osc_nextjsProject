"use client"

import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import { useRouter } from "next/navigation";

export default function Book() {
    const { id } = useParams();
    const [book, setBook] = useState({});
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!id) return;

        const fetchItems = async () => {
            const docRef = doc(db, "books", id);
            const docSnap = await getDoc(docRef);
            setBook({ id: docSnap.id, ...docSnap.data() });

            const subSnap = await getDocs(collection(db, "subjects"));
            const subs = subSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setSubjects(subs)
            console.log(subs);
            setLoading(false);
        }
        fetchItems();
    }, [id])

    const getSub = (sId) => {
        return subjects.find(s => s.id === sId).name;
    }

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }
    else {
        return (
            <div className="flex gap-3 px-25 py-10">
                <div>
                    <img className="shadow-lg" src={book.image}></img>
                </div>
                <div className="flex flex-col gap-2 border rounded-lg p-5">
                    <div className="font-bold text-[2rem]">{book.title}</div>
                    <div className="flex items-center gap-2 text-[1.5rem] italic text-neutral-500"><i className="fa-solid fa-user-pen text-red-400"></i>{book.author}</div>
                    <div className="flex gap-1">
                        {book.subjects && book.subjects.map(s => (
                            <button key={s}
                                className="cursor-pointer bg-blue-300 text-blue-800 w-fit rounded-lg p-1 hover:font-medium"
                                onClick={() => router.push(`/?sub=${s}`)}
                            >{getSub(s)}</button>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        {book.isbn && (
                            <a href={`https://openlibrary.org/isbn/${book.isbn}`} target="blank" className="border rounded bg-[#F8F9FA] w-fit p-1"><i className="fa-solid fa-barcode"></i> {book.isbn}</a>
                        )}
                        {book.olid && (
                            <a href={`https://openlibrary.org/works/${book.olid}`} target="blank" className="border rounded bg-[#F8F9FA] w-fit p-1"><i className="fa-solid fa-barcode"></i> {book.olid}</a>

                        )}
                    </div>
                    <div className="border rounded bg-[#F8F9FA] p-2 flex flex-col gap-1">
                        <div className="text-[1.5rem] text-[#2C3E50] font-medium"><i className="fa-solid fa-align-left"></i> Description</div>
                        <div className="text-lg">{book.description}</div>
                    </div>
                </div>
            </div>
        )
    }
}