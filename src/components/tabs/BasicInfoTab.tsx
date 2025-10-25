import { useState } from "react";
import { Edit } from "lucide-react";

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  year_of_birth: string;
  gender: string;
  phone_number: string;
  alternate_phone: string;
  address: string;
  pincode: string;
  domicile_state: string;
  domicile_country: string;
}

interface BasicInfoTabProps {
  userData: UserData;
  onUpdate: (data: UserData) => Promise<void>;
}

export default function BasicInfoTab({
  userData,
  onUpdate,
}: BasicInfoTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: userData.first_name || "",
    last_name: userData.last_name || "",
    email: userData.email || "",
    year_of_birth: userData.year_of_birth || "",
    gender: userData.gender || "",
    phone_number: userData.phone_number || "",
    alternate_phone: userData.alternate_phone || "",
    address: userData.address || "",
    pincode: userData.pincode || "",
    domicile_state: userData.domicile_state || "",
    domicile_country: userData.domicile_country || "",
  });

  async function handleSave() {
    await onUpdate(formData);
    setIsEditing(false);
  }

  const phoneCode = formData.phone_number?.slice(0, 3) || "+91";

  return (
    <div className="bg-gray rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium">Basic Details</h2>
        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="text-violet-600 hover:text-violet-700"
        >
          <Edit className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div>
          <label className="block text-sm text-gray-600 mb-2">First name</label>
          <input
            type="text"
            placeholder="e.g. John"
            value={formData.first_name}
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
            disabled={!isEditing}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">Last name</label>
          <input
            type="text"
            placeholder="e.g. Doe"
            value={formData.last_name}
            onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })
            }
            disabled={!isEditing}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">Email ID</label>
          <input
            type="email"
            placeholder="e.g. mrnobody@mail.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            disabled={!isEditing}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
          />
        </div>

        {/* Row 2: Year+Gender, Phone, Alternate Phone (each is one grid column) */}
        <div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Year of birth
              </label>
              <div className="relative">
                <select
                  value={formData.year_of_birth}
                  onChange={(e) =>
                    setFormData({ ...formData, year_of_birth: e.target.value })
                  }
                  disabled={!isEditing}
                  className="w-full px-3 py-2 pr-10 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50 appearance-none"
                >
                  <option value="">YYYY</option>
                  {Array.from(
                    { length: 80 },
                    (_, i) => new Date().getFullYear() - i
                  ).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <svg
                  className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M6 8l4 4 4-4"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Gender</label>
              <div className="relative">
                <select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  disabled={!isEditing}
                  className="w-full px-3 py-2 pr-10 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50 appearance-none"
                >
                  <option value="">Select an option</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <svg
                  className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M6 8l4 4 4-4"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Phone number
          </label>
          <div className="flex items-center min-w-0">
            <div className="relative">
              <select
                value={phoneCode}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    phone_number:
                      e.target.value +
                      (formData.phone_number?.replace(/^\+?\d{1,3}/, "") || ""),
                  });
                }}
                disabled={!isEditing}
                className="w-16 pl-1 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none disabled:opacity-50 appearance-none"
              >
                <option value="+91">IND</option>
                <option value="+1">US</option>
                <option value="+44">GB</option>
              </select>
              <svg
                className="w-3 h-3 absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M6 8l4 4 4-4"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <input
              type="text"
              placeholder="8332883854"
              value={formData.phone_number?.replace(/^\+?\d{1,3}/, "")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone_number:
                    (formData.phone_number?.slice(
                      0,
                      formData.phone_number.length -
                        (formData.phone_number?.replace(/^\+?\d{1,3}/, "")
                          .length || 0)
                    ) || "+91") + e.target.value,
                })
              }
              disabled={!isEditing}
              className="min-w-0 flex-1 px-4 py-2 bg-gray-50 border-t border-b border-r border-gray-200 rounded-r-md focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
            />
          </div>
        </div>

        <div className="min-w-0">
          <label className="block text-sm text-gray-600 mb-2">
            Alternate Phone no
          </label>
          <div className="min-w-0">
            <input
              type="text"
              placeholder="e.g. 9876543210"
              value={formData.alternate_phone?.replace(/^\+?\d{1,3}/, "")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  alternate_phone: "+91" + e.target.value,
                })
              }
              disabled={!isEditing}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">Address</label>
          <textarea
            placeholder="Enter here"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            disabled={!isEditing}
            rows={4}
            className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">Pincode</label>
          <input
            type="text"
            placeholder="Enter here"
            value={formData.pincode}
            onChange={(e) =>
              setFormData({ ...formData, pincode: e.target.value })
            }
            disabled={!isEditing}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
          />

          <label className="block text-sm text-gray-600 mt-3 mb-2">
            Domicile country
          </label>
          <div className="flex items-center">
            <div className="relative flex-1">
              <select
                value={formData.domicile_country}
                onChange={(e) =>
                  setFormData({ ...formData, domicile_country: e.target.value })
                }
                disabled={!isEditing}
                className="w-full px-3 py-2 pl-8 pr-10 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50 appearance-none"
              >
                <option value="">Select an option</option>
                <option value="india">India</option>
                <option value="usa">USA</option>
                <option value="uk">UK</option>
              </select>
              <svg
                className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M6 8l4 4 4-4"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Domicile state
          </label>
          <div className="relative">
            <select
              value={formData.domicile_state}
              onChange={(e) =>
                setFormData({ ...formData, domicile_state: e.target.value })
              }
              disabled={!isEditing}
              className="w-full px-3 py-2 pr-10 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50 appearance-none"
            >
              <option value="">Select an option</option>
              <option value="maharashtra">Maharashtra</option>
              <option value="delhi">Delhi</option>
              <option value="karnataka">Karnataka</option>
            </select>
            <svg
              className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M6 8l4 4 4-4"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* empty space below as requested */}
          <div className="h-6" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
