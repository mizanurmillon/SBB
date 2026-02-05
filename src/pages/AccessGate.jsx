import { useState } from "react";

const PIN = "SBB52##";

export default function AccessGate() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  const handleSubmit = () => {
    if (input === PIN) {
      localStorage.setItem("site_access", "granted");
      window.location.reload();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-80 text-center">
        <h2 className="text-lg font-bold mb-4">Enter Access PIN</h2>

        {/* input wrapper */}
        <div className="relative mb-3">
          <input
            type={show ? "text" : "password"}
            value={input}
            onChange={e => setInput(e.target.value)}
            className="border p-2 w-full text-center rounded border-gray-500 pr-10"
          />

          {/* toggle button */}
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600"
          >
            {show ? "🙈" : "👁️"}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-2">Wrong PIN</p>}

        <button
          onClick={handleSubmit}
          className="bg-[#E7000B] cursor-pointer rounded text-white px-4 py-2 w-full"
        >
          Unlock
        </button>
      </div>
    </div>
  );
}
