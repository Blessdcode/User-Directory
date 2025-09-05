import { useState } from "react";
import { AddUserCard } from "../addUserForm";

export function Header({
  logoText,
  titleText,
  setUserData,
  handlerDeleteUser,
}) {
  const [showFormModel, setShowFormModel] = useState(false);
  const handleFormModel = () => {
    setShowFormModel(!showFormModel);
  };

  return (
    <header >
      <div className="sticky top-0 z-10 mb-8 border-b bg-white/80 backdrop-blur">

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-gray-900 text-white grid place-items-center font-bold">
            {logoText}
          </div>
          <h1 className="text-xl font-semibold">{titleText}</h1>
        </div>
        <div
          className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-center hover:scale-105 transition-all cursor-pointer"
          onClick={handleFormModel}
          >
          <span className="text-3xl text-center font-semibold">+</span>
        </div>
      </div>
          </div>

      {showFormModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <AddUserCard
            setUserData={setUserData}
            setShowFormModel={setShowFormModel}
            handlerDeleteUser={handlerDeleteUser}
          />
        </div>
      )}
    </header>
  );
}