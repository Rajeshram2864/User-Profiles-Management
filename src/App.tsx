import { useState } from "react";
import Header from "./components/Header";
import UserList from "./components/UserList";
import UserProfile from "./components/UserProfile";

type View = "list" | "profile";

function App() {
  const [currentView, setCurrentView] = useState<View>("list");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  function handleViewUser(userId: string) {
    setSelectedUserId(userId);
    setCurrentView("profile");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onLogoClick={() => {
          setCurrentView("list");
          setSelectedUserId(null);
        }}
      />
      <main>
        {currentView === "list" && <UserList onViewUser={handleViewUser} />}
        {currentView === "profile" && selectedUserId && (
          <UserProfile userId={selectedUserId} />
        )}
      </main>
    </div>
  );
}

export default App;
