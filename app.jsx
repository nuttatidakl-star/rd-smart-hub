// Main app: top-bar, sidebar, section routing
const App = () => {
  const state = useAppState();
  const [section, setSection] = React.useState("dashboard");
  const [assistantPrompt, setAssistantPrompt] = React.useState(null);
  const [guidelineSearch, setGuidelineSearch] = React.useState("");

  // Mirror lang into <html data-lang>
  React.useEffect(() => {
    document.documentElement.setAttribute("data-lang", state.lang);
  }, [state.lang]);

  const navigate = (sec, opts = {}) => {
    if (sec === "assistant" && opts.prompt) {
      setAssistantPrompt(opts.prompt);
    } else {
      setAssistantPrompt(null);
    }
    if (sec === "guidelines") {
      setGuidelineSearch(opts.search || "");
    }
    setSection(sec);
  };

  const renderSection = () => {
    switch (section) {
      case "dashboard": return <Dashboard onNavigate={navigate} />;
      case "meetings": return <MeetingSchedule />;
      case "rm": return <RMDatabase />;
      case "guidelines": return <Guidelines key={"g-" + guidelineSearch} initialSearch={guidelineSearch} />;
      case "assistant": return <Assistant key={assistantPrompt || "fresh"} initialPrompt={assistantPrompt} />;
      default: return <Dashboard onNavigate={navigate} />;
    }
  };

  const noPad = section === "meetings" || section === "assistant";

  return (
    <div className="app">
      <div className="topbar">
        <div className="waffle"><Icon name="waffle" size={16} /></div>
        <div className="product">
          <div className="logo">R</div>
          {t("R&D Smart Hub", "R&D Smart Hub")}
        </div>
        <div className="search">
          <Icon name="search" size={14} color="rgba(255,255,255,0.85)" />
          <input placeholder={t(
            "Search across RMs, projects, documents, and people…",
            "ค้นหาวัตถุดิบ โครงการ เอกสาร และบุคคล…"
          )} />
        </div>
        <div className="right">
          {/* Language switch */}
          <div className="topbar-seg" title={t("Language", "ภาษา")}>
            <span
              className={"opt" + (state.lang === "en" ? " active" : "")}
              onClick={() => state.set("lang", "en")}
            >EN</span>
            <span
              className={"opt" + (state.lang === "th" ? " active" : "")}
              onClick={() => state.set("lang", "th")}
            >ไทย</span>
          </div>
          {/* Theme switch */}
          <div
            className="icon-btn"
            title={t("Toggle dark mode", "สลับโหมดมืด")}
            onClick={() => state.set("theme", state.theme === "dark" ? "light" : "dark")}
          >
            <Icon name={state.theme === "dark" ? "sun" : "moon"} size={16} />
          </div>
          <div className="icon-btn" title={t("Notifications", "การแจ้งเตือน")}>
            <Icon name="bell" size={16} />
          </div>
          <div className="icon-btn" title={t("Settings", "การตั้งค่า")}>
            <Icon name="settings" size={16} />
          </div>
          <div className="avatar" title="Sarah Chen">SC</div>
        </div>
      </div>

      <Sidebar active={section} onChange={navigate} />

      <main
        data-screen-label={section}
        className="main"
        style={noPad ? { padding: "20px 24px" } : undefined}
      >
        {renderSection()}
      </main>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
