import { useState } from "react";
import { Edit, FileText, Briefcase } from "lucide-react";

interface WorkExperience {
  domain: string;
  subdomain: string;
  experience: string;
}

interface UserData {
  work_experience: WorkExperience[];
  linkedin_url?: string;
  resume_url?: string;
}

interface ExperienceTabProps {
  userData: UserData;
  onUpdate: (data: Partial<UserData>) => Promise<void>;
}

export default function ExperienceTab({
  userData,
  onUpdate,
}: ExperienceTabProps) {
  const [isEditingWork, setIsEditingWork] = useState(false);
  const [isEditingLinkedIn, setIsEditingLinkedIn] = useState(false);
  const [isEditingResume, setIsEditingResume] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [workExperience, setWorkExperience] = useState(
    Array.isArray(userData.work_experience) &&
      userData.work_experience.length > 0
      ? userData.work_experience
      : [
          { domain: "", subdomain: "", experience: "" },
          { domain: "", subdomain: "", experience: "" },
        ]
  );

  const [linkedInUrl, setLinkedInUrl] = useState(userData.linkedin_url || "");
  const [resumeUrl] = useState(userData.resume_url || "");

  async function handleSaveWork() {
    await onUpdate({ work_experience: workExperience });
    setIsEditingWork(false);
  }

  async function handleSaveLinkedIn() {
    await onUpdate({ linkedin_url: linkedInUrl });
    setIsEditingLinkedIn(false);
  }

  function updateWorkExperience(index: number, field: string, value: string) {
    const updated = [...workExperience];
    updated[index] = { ...updated[index], [field]: value };
    setWorkExperience(updated);
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium">Work Experience</h2>
          <button
            onClick={() =>
              isEditingWork ? handleSaveWork() : setIsEditingWork(true)
            }
            className="text-violet-600 hover:text-violet-700"
          >
            <Edit className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {workExperience.map((exp, index) => (
            <div key={index}>
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">
                  Domain
                </label>
                <input
                  type="text"
                  placeholder="e.g. Technology"
                  value={exp.domain}
                  onChange={(e) =>
                    updateWorkExperience(index, "domain", e.target.value)
                  }
                  disabled={!isEditingWork}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative pl-6">
                  <div className="absolute left-2 top-1 bottom-0 w-px bg-gray-400"></div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Sub-domain
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. MERN Stack"
                    value={exp.subdomain}
                    onChange={(e) =>
                      updateWorkExperience(index, "subdomain", e.target.value)
                    }
                    disabled={!isEditingWork}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Experience
                  </label>
                  <div className="relative">
                    <select
                      value={exp.experience}
                      onChange={(e) =>
                        updateWorkExperience(
                          index,
                          "experience",
                          e.target.value
                        )
                      }
                      disabled={!isEditingWork}
                      className="w-full px-3 py-2 pr-10 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50 appearance-none"
                    >
                      <option value="">Select an option</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5+">5+ years</option>
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
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">LinkedIn</h2>
            <button
              onClick={() =>
                isEditingLinkedIn
                  ? handleSaveLinkedIn()
                  : setIsEditingLinkedIn(true)
              }
              className="text-violet-600 hover:text-violet-700"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Profile URL
            </label>
            <input
              type="text"
              placeholder="linkedin.com/in/mrbean"
              value={linkedInUrl}
              onChange={(e) => setLinkedInUrl(e.target.value)}
              disabled={!isEditingLinkedIn}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Resume</h2>
            <button
              onClick={() => setIsEditingResume(!isEditingResume)}
              className="text-violet-600 hover:text-violet-700"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>

          {isEditingResume ? (
            <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-md hover:border-violet-500 transition-colors cursor-pointer">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={async (e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    // TODO: Implement file upload logic
                    await onUpdate({ resume_url: file.name });
                    setIsEditingResume(false);
                  }
                }}
              />
              <div className="text-center text-gray-600">
                <Briefcase className="w-8 h-8 mx-auto mb-2 text-violet-600" />
                <p className="text-sm mb-1">Click to upload your resume</p>
                <p className="text-xs text-gray-400">
                  PDF, DOC, DOCX (max 5MB)
                </p>
              </div>
            </label>
          ) : resumeUrl ? (
            <div className="flex items-center justify-between p-3 bg-white-50 rounded-md">
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="w-5 h-5 text-violet-600 flex-shrink-0" />
                <div className="text-sm text-black-600 truncate min-w-0">
                  {resumeUrl}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowPreview(true)}
                  className="px-3 py-1 text-sm text-violet-700 bg-violet-100 rounded hover:bg-violet-200 transition"
                >
                  View
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => setIsEditingResume(true)}
              className="flex items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-md hover:border-violet-500 transition-colors cursor-pointer"
            >
              <div className="text-center text-gray-400">
                <Briefcase className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm mb-1">Click to upload your resume</p>
                <p className="text-xs">PDF, DOC, DOCX (max 5MB)</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/** Resume preview panel */}
      {showPreview && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <FileText className="w-5 h-5 text-violet-600 flex-shrink-0" />
              <div className="text-sm text-gray-700 truncate">{resumeUrl}</div>
            </div>

            <div className="flex items-center gap-2">
              {resumeUrl && resumeUrl.startsWith("http") ? (
                <button
                  onClick={() => window.open(resumeUrl, "_blank")}
                  className="px-3 py-1 text-sm text-violet-700 bg-violet-100 rounded hover:bg-violet-200 transition"
                >
                  Open
                </button>
              ) : (
                <button
                  onClick={() =>
                    alert("Preview not available. File is not a public URL.")
                  }
                  className="px-3 py-1 text-sm text-violet-700 bg-violet-100 rounded hover:bg-violet-200 transition"
                >
                  Open
                </button>
              )}

              <button
                onClick={() => {
                  setIsEditingResume(true);
                  setShowPreview(false);
                }}
                className="px-3 py-1 text-sm text-violet-600 hover:bg-violet-100 rounded transition-colors"
              >
                Change
              </button>

              <button
                onClick={async () => {
                  // remove resume entry
                  await onUpdate({ resume_url: undefined });
                  setShowPreview(false);
                  setIsEditingResume(true);
                }}
                className="px-3 py-1 text-sm text-red-600 hover:bg-red-100 rounded transition-colors"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="mt-4">
            {resumeUrl &&
            resumeUrl.startsWith("http") &&
            resumeUrl.toLowerCase().endsWith(".pdf") ? (
              <iframe
                src={resumeUrl}
                className="w-full h-96 border rounded"
                title="Resume preview"
              />
            ) : (
              <div className="p-6 text-sm text-gray-600 bg-gray-50 rounded">
                Preview not available for this file. Use Change to upload a new
                file or Open if you have a public URL.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
