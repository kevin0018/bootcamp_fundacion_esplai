import { useEffect, useState } from "react";
import { useTranslation } from "../utils/hooks.js";
import { getCurrentTheme, toggleTheme } from "../utils/theme.js";

const USER_PROFILE_KEY = "userProfile";

const defaultUserProfile = {
  name: "Juan Pérez",
  email: "juan.perez@email.com",
  language: "es",
  theme: "dark",
};

function loadUserProfile() {
  const stored = localStorage.getItem(USER_PROFILE_KEY);
  return stored ? JSON.parse(stored) : defaultUserProfile;
}

function saveUserProfile(profile) {
  localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
}

export default function Profile() {
  const { translate, changeLanguage } = useTranslation();
  const [profile, setProfile] = useState(loadUserProfile());
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    changeLanguage(profile.language);
    if (profile.theme !== getCurrentTheme()) {
      toggleTheme();
    }
    // eslint-disable-next-line
  }, [profile.language, profile.theme]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveUserProfile(profile);
    setEditing(false);
  };

  const handleReset = () => {
    setProfile(defaultUserProfile);
    saveUserProfile(defaultUserProfile);
    setEditing(false);
  };

  return (
    <section className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-lg bg-primary rounded-xl shadow-lg p-8 border-4 border-secondary flex flex-col gap-8">
        <h1 className="text-3xl font-extrabold text-secondary text-center mb-4">
          {translate("profile")}
        </h1>
        {!editing ? (
          <div className="flex flex-col gap-4">
            <div>
              <span className="font-bold text-secondary">{translate("name")}: </span>
              <span className="text-secondary">{profile.name}</span>
            </div>
            <div>
              <span className="font-bold text-secondary">{translate("email")}: </span>
              <span className="text-secondary">{profile.email}</span>
            </div>
            <div>
              <span className="font-bold text-secondary">{translate("language")}: </span>
              <span className="text-secondary">{profile.language === "es" ? "Español" : "English"}</span>
            </div>
            <div>
              <span className="font-bold text-secondary">{translate("theme")}: </span>
              <span className="text-secondary">
                {profile.theme === "dark" ? translate("darkMode") : translate("lightMode")}
              </span>
            </div>
            <div className="flex gap-4 mt-4">
              <button
                className="px-4 py-2 bg-accent text-primary rounded font-bold hover:opacity-80 transition-opacity"
                onClick={() => setEditing(true)}
              >
                {translate("edit")}
              </button>
              <button
                className="px-4 py-2 bg-secondary text-primary rounded font-bold hover:opacity-80 transition-opacity"
                onClick={handleReset}
              >
                {translate("reset")}
              </button>
            </div>
          </div>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleSave}>
            <label className="flex flex-col gap-1 text-secondary font-bold">
              {translate("name")}
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="px-3 py-2 rounded border border-secondary"
                required
              />
            </label>
            <label className="flex flex-col gap-1 text-secondary font-bold">
              {translate("email")}
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="px-3 py-2 rounded border border-secondary"
                required
              />
            </label>
            <label className="flex flex-col gap-1 text-secondary font-bold">
              {translate("language")}
              <select
                name="language"
                value={profile.language}
                onChange={handleChange}
                className="px-3 py-2 rounded border border-secondary"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </label>
            <label className="flex flex-col gap-1 text-secondary font-bold">
              {translate("theme")}
              <select
                name="theme"
                value={profile.theme}
                onChange={handleChange}
                className="px-3 py-2 rounded border border-secondary"
              >
                <option value="dark">{translate("darkMode")}</option>
                <option value="light">{translate("lightMode")}</option>
              </select>
            </label>
            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-accent text-primary rounded font-bold hover:opacity-80 transition-opacity"
              >
                {translate("save")}
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-secondary text-primary rounded font-bold hover:opacity-80 transition-opacity"
                onClick={() => setEditing(false)}
              >
                {translate("cancel")}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
