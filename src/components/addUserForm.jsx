import { useRef, useState } from "react";
import { readFileAsDataURL } from "./helper/fileUrl";
import SaveLocalStore from "./helper/saveLocalStore";
import { GrClose } from "react-icons/gr";
import { getSavedUsers } from "./helper/getSavedUsers";

const initialFormatData = {
  name: "",
  email: "",
  phone: "",
  picture: "",
};

export function AddUserCard({ setUserData, setShowFormModel }) {
  const [formData, setFormData] = useState(initialFormatData);
  const { name, email, phone } = formData;
  const [photoDataUrl, setPhotoDataUrl] = useState("");
  const [errors, setErrors] = useState({});
  const fileRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return setPhotoDataUrl("");
    const dataUrl = await readFileAsDataURL(file);
    setPhotoDataUrl(dataUrl);
  };

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Enter a valid email";
    if (!phone.trim()) e.phone = "Phone is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    const newUser = {
      id: crypto.randomUUID(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      picture: photoDataUrl || "",
      isLocal: true,
    };

    const existing = getSavedUsers();
    const updated = [newUser, ...existing];
    SaveLocalStore(updated);
    setUserData(updated);

    alert("User added successfully!");

    setFormData(initialFormatData);
    setPhotoDataUrl("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleClose = () => {
    setShowFormModel(false);
  };

  return (
    <div className="w-full md:w-[450px] m-auto rounded-2xl border border-gray-200 bg-white p-4 shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="mb-3 text-lg font-semibold">Add User</h2>
          <GrClose size={24} className="cursor-pointer" onClick={handleClose} />
        </div>
        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="mb-1 block text-sm text-gray-600">
              Full name
            </label>
            <input
              value={name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              type="text"
              className={`w-full rounded-xl border px-3 py-2 outline-none focus:border-gray-400 ${
                errors.name ? "border-red-300" : "border-gray-200"
              }`}
              placeholder="John Not Doe"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-600">Email</label>
            <input
              value={email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              type="email"
              className={`w-full rounded-xl border px-3 py-2 outline-none focus:border-gray-400 ${
                errors.email ? "border-red-300" : "border-gray-200"
              }`}
              placeholder="email@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-600">Phone</label>
            <input
              value={phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              type="tel"
              className={`w-full rounded-xl border px-3 py-2 outline-none focus:border-gray-400 ${
                errors.phone ? "border-red-300" : "border-gray-200"
              }`}
              placeholder="08104035222"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-600 ">
              Profile photo (optional)
            </label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFile(e.target.files?.[0])}
              className="block w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-gray-900 file:px-3 file:py-2 file:text-white"
            />
            {photoDataUrl && (
              <div className="mt-2 flex items-center gap-3">
                <img
                  src={photoDataUrl}
                  alt="preview"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPhotoDataUrl("");
                    if (fileRef.current) fileRef.current.value = "";
                  }}
                  className="text-xs text-gray-500 underline"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-gray-900 px-4 py-2 font-medium text-white hover:bg-gray-700 cursor-pointer transition"
          >
            Add user
          </button>
        </form>
      </div>
  );
}
