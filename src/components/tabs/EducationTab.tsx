import { useState } from "react";
import { Edit } from "lucide-react";

interface UserData {
  school_college?: string;
  highest_degree?: string;
  course?: string;
  year_of_completion?: string;
  grade?: string;
  skills?: string;
  projects?: string;
}

interface EducationTabProps {
  userData: UserData;
  onUpdate: (data: UserData) => Promise<void>;
}

export default function EducationTab({
  userData,
  onUpdate,
}: EducationTabProps) {
  const [isEditingEducation, setIsEditingEducation] = useState(false);
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [formData, setFormData] = useState({
    school_college: userData.school_college || "",
    highest_degree: userData.highest_degree || "",
    course: userData.course || "",
    year_of_completion: userData.year_of_completion || "",
    grade: userData.grade || "",
    skills: userData.skills || "",
    projects: userData.projects || "",
  });

  async function handleSaveEducation() {
    await onUpdate({
      school_college: formData.school_college,
      highest_degree: formData.highest_degree,
      course: formData.course,
      year_of_completion: formData.year_of_completion,
      grade: formData.grade,
    });
    setIsEditingEducation(false);
  }

  async function handleSaveSkills() {
    await onUpdate({
      skills: formData.skills,
      projects: formData.projects,
    });
    setIsEditingSkills(false);
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium">Education Details</h2>
          <button
            onClick={() =>
              isEditingEducation
                ? handleSaveEducation()
                : setIsEditingEducation(true)
            }
            className="text-violet-600 hover:text-violet-700"
          >
            <Edit className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 grid grid-cols-2 gap-6 mb-2">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                School / College
              </label>
              <input
                type="text"
                placeholder="e.g. Lincoln College"
                value={formData.school_college}
                onChange={(e) =>
                  setFormData({ ...formData, school_college: e.target.value })
                }
                disabled={!isEditingEducation}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Highest degree
              </label>
              <input
                type="text"
                placeholder="e.g. Bachelors in Technology"
                value={formData.highest_degree}
                onChange={(e) =>
                  setFormData({ ...formData, highest_degree: e.target.value })
                }
                disabled={!isEditingEducation}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Course</label>
            <input
              type="text"
              placeholder="e.g. Computer science engineering"
              value={formData.course}
              onChange={(e) =>
                setFormData({ ...formData, course: e.target.value })
              }
              disabled={!isEditingEducation}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Year of completion
              </label>
              <div className="relative">
                <select
                  value={formData.year_of_completion}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      year_of_completion: e.target.value,
                    })
                  }
                  disabled={!isEditingEducation}
                  className="w-full px-3 py-2 pr-10 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50 appearance-none"
                >
                  <option value="">YYYY</option>
                  {Array.from(
                    { length: 40 },
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
              <label className="block text-sm text-gray-600 mb-2">Grade</label>
              <input
                type="text"
                placeholder="Enter here"
                value={formData.grade}
                onChange={(e) =>
                  setFormData({ ...formData, grade: e.target.value })
                }
                disabled={!isEditingEducation}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium">Skills & Projects</h2>
          <button
            onClick={() =>
              isEditingSkills ? handleSaveSkills() : setIsEditingSkills(true)
            }
            className="text-violet-600 hover:text-violet-700"
          >
            <Edit className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-600 mb-2">Skills</label>
            <textarea
              placeholder="Enter here"
              value={formData.skills}
              onChange={(e) =>
                setFormData({ ...formData, skills: e.target.value })
              }
              disabled={!isEditingSkills}
              rows={6}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Projects</label>
            <textarea
              placeholder="Enter here"
              value={formData.projects}
              onChange={(e) =>
                setFormData({ ...formData, projects: e.target.value })
              }
              disabled={!isEditingSkills}
              rows={6}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
