import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { useAppContext } from "../contexts/AppContext";

import ExitIcon from "../components/icons/ExitIcon";
import PlusIcon from "../components/icons/PlusIcon";
import { Card, CreateCard } from "../components/Card";
import LoadingIcon from "../components/icons/LoadingIcon";

export default function HomePage() {
  const navigate = useNavigate();
  const { state, dispatch, getCards } = useAppContext();

  const [isLoad, setIsLoad] = useState(false);
  const [create, setCreate] = useState(false);
  const [data, setData] = useState({ user: {}, memos: [] });

  const filteredCards = useMemo(() => {
    return data.memos.filter(
      (card) => data.user.role === "ADMIN" || card.role === data.user.role
    );
  }, [data.memos, data.user]);

  const userCardSorted = useMemo(() => {
    return data.memos
      .filter((card) => card.role === "USER")
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }, [data.memos]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/auth/login");
  };

  useEffect(() => {
    localStorage.removeItem("newMemoTimestamps");
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("login-token");
    if (!token) {
      navigate("/auth/login");
      return;
    }
    try {
      const decode = jwtDecode(token);
      if (!["ADMIN", "USER"].includes(decode.role)) {
        console.error("Unauthorized role:", decode.role);
        localStorage.clear();
        navigate("/auth/login");
        return;
      }
      setData((prev) => ({ ...prev, user: decode }));
    } catch (error) {
      console.error("Invalid token", error);
      localStorage.clear();
      navigate("/auth/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoad(true);
      try {
        const response = await getCards();
        if (response.success) {
          setData((prev) => ({ ...prev, memos: state.memos }));
        }
      } catch (error) {
        console.error("Error fetching memos:", error);
      } finally {
        setIsLoad(false);
      }
    };

    const memos = localStorage.getItem("memos");
    if (memos) {
      setData((prev) => ({ ...prev, memos: JSON.parse(memos) }));
    } else {
      fetchData();
    }
  }, [state.memos, getCards]);

  return (
    <div className="py-12 px-2 sm:px-10 h-screen">
      <div className="flex justify-end items-center sm:gap-16">
        <p className="text-lg sm:text-3xl font-semibold">{data.user.email}</p>
        <button
          onClick={handleLogout}
          className="cursor-pointer rounded-lg p-2 hover:inset-shadow-sm hover:inset-shadow-black duration-200"
        >
          <ExitIcon width={32} />
        </button>
      </div>
      <div className="mt-40">
        <div className="text-center mb-20">
          <h1 className="text-4xl sm:text-6xl font-bold inline">Memo Cards </h1>
          <span className="text-xl sm:text-3xl">
            ({filteredCards.length}
            {create && "+1"})
          </span>
        </div>
        {isLoad ? (
          <div className="w-fit mx-auto">
            <LoadingIcon spin={true} width={150} color="#ffffff" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 px-4 sm:px-16 pb-6 gap-5">
            {data.user.role === "USER"
              ? userCardSorted.map((card, index) => (
                  <Card
                    key={index}
                    role={card.role}
                    number={card.number}
                    text={card.text}
                    createdAt={card.createdAt}
                  />
                ))
              : data.memos
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((card, index) => (
                    <Card
                      key={index}
                      role={card.role}
                      number={card.number}
                      text={card.text}
                      createdAt={card.createdAt}
                    />
                  ))}
            {create && (
              <CreateCard
                role={data.user.role}
                number={
                  data.user.role === "ADMIN"
                    ? data.memos.filter((card) => card.role === "ADMIN").length
                    : userCardSorted.length
                }
                setCreate={setCreate}
              />
            )}
            {!create && (
              <button
                onClick={() => setCreate(true)}
                className="bg-white/70 hover:bg-white/60 duration-200 p-6 rounded-xl flex justify-center items-center cursor-pointer"
              >
                <PlusIcon width={60} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
