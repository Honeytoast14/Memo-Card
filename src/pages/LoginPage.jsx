import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "../components/icons/LoadingIcon";
import { useAppContext } from "../contexts/AppContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAppContext();

  const [username, setUsername] = useState("user.email@gmail.com");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [isLoad, setIsLoad] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoad(true);
      setErrorText("");

      const resposnse = await login(username, password);
      if (resposnse.success) {
        navigate("/");
      } else {
        setErrorText(resposnse.message);
      }
    } catch (error) {
      console.error("Error: ", error);
      setErrorText("An unexpected error occurred");
    } finally {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("login-token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-2xs sm:w-sm">
        <h2 className="text-2xl sm:text-3xl mb-5">เข้าสู่ระบบ</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block text-xs mb-3">บัญชีพนักงาน</label>
            <input
              type="text"
              className="bg-[#393937] p-2 w-full rounded-lg"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs mb-3">รหัสผ่าน</label>
            <input
              type="password"
              className="bg-[#393937] p-2 w-full rounded-lg"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorText && (
            <div className="bg-red-500/45 p-1 rounded-lg text-center">
              {errorText}
            </div>
          )}
          <button
            type="submit"
            disabled={isLoad}
            className="bg-white text-[#11181C] cursor-pointer py-3 rounded-lg flex justify-center text-sm"
          >
            {isLoad ? (
              <LoadingIcon spin={isLoad} width={20} color="#11181C" />
            ) : (
              "ค้นหา"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
