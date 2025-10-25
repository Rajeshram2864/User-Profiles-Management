import { useState, useEffect, useRef } from "react";
import { User, Copy, Edit } from "lucide-react";
import { supabase } from "../lib/supabase";
import BasicInfoTab from "./tabs/BasicInfoTab";
import EducationTab from "./tabs/EducationTab";
import ExperienceTab from "./tabs/ExperienceTab";

interface UserProfileProps {
  userId: string;
}

import type { UserData } from "../types/UserData";

export default function UserProfile({ userId }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<
    "basic" | "education" | "experience"
  >("basic");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", userId)
          .maybeSingle();

        if (error) throw error;
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, [userId]);

  async function fetchUserData() {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (error) throw error;
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(updatedData: Partial<UserData>) {
    try {
      const { error } = await supabase
        .from("users")
        .update(updatedData)
        .eq("id", userId);

      if (error) throw error;
      fetchUserData();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  if (loading || !userData) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-[90rem] mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
        <div className="flex items-start gap-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0 group border-4 border-white ring-1 ring-gray-200">
            {/** image preview or placeholder */}
            {avatarPreview || userData.avatar_url ? (
              <img
                src={avatarPreview || userData.avatar_url!}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-purple-100 flex items-center justify-center">
                <User className="w-16 h-16 text-purple-600" strokeWidth={1.5} />
              </div>
            )}

            {/** hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files && e.target.files[0];
                if (!file) return;
                // show local preview
                const url = URL.createObjectURL(file);
                setAvatarPreview(url);
                // Persist change to backend - here we store filename; adapt to upload as needed
                await handleUpdate({ avatar_url: file.name });
              }}
            />

            {/** pencil overlay - visible on hover */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Change profile picture"
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 text-white opacity-0 group-hover:opacity-100 transition"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-medium mb-2">{userData.name}</h1>
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <span>{userData.email}</span>
              <button
                onClick={() => copyToClipboard(userData.email)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <div className="text-gray-600">{userData.contact}</div>
          </div>
        </div>

        <div className="flex gap-2 mt-8">
          <button
            onClick={() => setActiveTab("basic")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors relative ${
              activeTab === "basic"
                ? "bg-purple-100 text-purple-700"
                : "bg-[#F5F6F7] text-gray-600 hover:bg-gray-100"
            }`}
          >
            Basic Info
          </button>
          <button
            onClick={() => setActiveTab("education")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors relative ${
              activeTab === "education"
                ? "bg-purple-100 text-purple-700"
                : "bg-[#F5F6F7] text-gray-600 hover:bg-gray-100"
            }`}
          >
            Education & skills
            <span
              aria-hidden="true"
              className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"
            ></span>
          </button>
          <button
            onClick={() => setActiveTab("experience")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors relative ${
              activeTab === "experience"
                ? "bg-purple-100 text-purple-700"
                : "bg-[#F5F6F7] text-gray-600 hover:bg-gray-100"
            }`}
          >
            Experience
          </button>
        </div>
      </div>

      {activeTab === "basic" && (
        <BasicInfoTab userData={userData} onUpdate={handleUpdate} />
      )}
      {activeTab === "education" && (
        <EducationTab userData={userData} onUpdate={handleUpdate} />
      )}
      {activeTab === "experience" && (
        <ExperienceTab userData={userData} onUpdate={handleUpdate} />
      )}
    </div>
  );
}
