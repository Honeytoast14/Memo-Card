/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { useAppContext } from "../contexts/AppContext";

export function Card({ role, number, text, createdAt }) {
  const [latest, setLatest] = useState(false);

  useEffect(() => {
    const newMemoTimestamps =
      JSON.parse(localStorage.getItem("newMemoTimestamps")) || [];
    if (newMemoTimestamps.includes(createdAt)) {
      setLatest(true);
    }
  }, [createdAt]);
  return (
    <div className=" relative">
      {latest && (
        <span className="bg-[#8C6CFF] text-xs py-2 px-3 rounded-2xl absolute -right-3 -top-4">
          NEW
        </span>
      )}
      <div className="grid grid-cols-3 bg-white p-6 rounded-xl">
        <div>
          <h1 className="mb-3 font-semibold text-md text-black/50">
            {role === "USER" ? "MEMO" : "ADMIN"}-{number}
          </h1>
          <span
            className={`${
              role === "USER" ? "bg-[#62AEFF]" : "bg-[#FF6C6F]"
            } rounded-full text-xs font-semibold py-1 px-2`}
          >
            {role}
          </span>
        </div>
        <div className="text-black font-light col-span-2 text-sm/loose">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}

export function CreateCard({ role, number, setCreate }) {
  const { createCard } = useAppContext();
  const [text, setText] = useState("");
  const [invalidText, setInvalidText] = useState(false);

  const save = async () => {
    if (!text) {
      return setInvalidText(true);
    }
    const card = {
      role: role,
      number: number + 1,
      text: text,
      createdAt: new Date().toISOString(),
    };
    const response = await createCard(card);
    if (response.success) {
      setCreate(false);
      setInvalidText(false);

      const newCardTimestamps =
        JSON.parse(localStorage.getItem("newMemoTimestamps")) || [];
      newCardTimestamps.push(card.createdAt);
      localStorage.setItem(
        "newMemoTimestamps",
        JSON.stringify(newCardTimestamps)
      );
    }
  };
  return (
    <div className="grid grid-cols-3 bg-white rounded-xl">
      <div className="p-6 pr-0 flex flex-col justify-between gap-10">
        <div>
          <h1 className="mb-3 font-semibold text-md text-black/50">
            {role === "USER" ? "MEMO" : "ADMIN"}-{number + 1}
          </h1>
          <span
            className={`${
              role === "USER" ? "bg-[#62AEFF]" : "bg-[#FF6C6F]"
            } rounded-full text-xs font-semibold py-1 px-2`}
          >
            {role}
          </span>
        </div>
        <span>
          <button
            onClick={save}
            className="text-[#393937] font-bold text-left border-b cursor-pointer"
          >
            SAVE
          </button>
        </span>
      </div>
      <div className="col-span-2 text-sm text-black font-light rounded-xl p-2">
        <textarea
          onChange={(e) => setText(e.target.value)}
          placeholder={
            !invalidText ? "Type something ..." : "Please Type something ..."
          }
          className={`w-full h-full resize-none p-4 ${
            !invalidText ? "bg-[#D4D4D8]/30" : "bg-red-300/50"
          } rounded-xl`}
        ></textarea>
      </div>
    </div>
  );
}
