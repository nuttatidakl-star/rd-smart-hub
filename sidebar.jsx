// Sidebar navigation
const Sidebar = ({ active, onChange }) => {
  const NAV = [
    { id: "dashboard", label: t("Dashboard", "แดชบอร์ด"), icon: "home" },
    { id: "meetings",  label: t("Meeting Schedule", "ตารางการประชุม"), icon: "calendar" },
    { id: "rm",        label: t("RM Database", "ฐานข้อมูลวัตถุดิบ"), icon: "flask", badge: "1.8k" },
    { id: "guidelines",label: t("Guideline Center", "ศูนย์รวมเอกสารแนวทาง"), icon: "book" },
    { id: "assistant", label: t("AI Assistant", "ผู้ช่วย AI"), icon: "sparkle" }
  ];

  const PINNED = [
    { name: t("Vanilla 24 Master Brief", "บรีฟหลัก Vanilla 24"), color: "var(--color-primary)" },
    { name: t("Beverage Innovation Q3", "นวัตกรรมเครื่องดื่ม ไตรมาส 3"), color: "var(--color-purple)" },
    { name: t("EU Reg. Compliance 2026", "ข้อกำหนด EU 2026"), color: "var(--color-success)" }
  ];

  return (
    <aside className="sidebar">
      <div className="section">{t("Workspace", "พื้นที่ทำงาน")}</div>
      {NAV.map(item => (
        <div
          key={item.id}
          className={"nav-item" + (active === item.id ? " active" : "")}
          onClick={() => onChange(item.id)}
        >
          <Icon name={item.icon} size={18} />
          <span>{item.label}</span>
          {item.badge && <span className="badge">{item.badge}</span>}
        </div>
      ))}

      <div className="divider"></div>
      <div className="section">{t("Pinned Projects", "โครงการที่ปักหมุด")}</div>
      {PINNED.map(p => (
        <div key={p.name} className="pinned">
          <span className="dot" style={{ background: p.color }}></span>
          <span>{p.name}</span>
        </div>
      ))}

      <div className="divider"></div>
      <div className="section">{t("Quick Access", "เข้าถึงด่วน")}</div>
      <div className="nav-item">
        <Icon name="star" size={18} />
        <span>{t("Favorites", "รายการโปรด")}</span>
      </div>
      <div className="nav-item">
        <Icon name="history" size={18} />
        <span>{t("Recent", "ล่าสุด")}</span>
      </div>
      <div className="nav-item">
        <Icon name="settings" size={18} />
        <span>{t("Settings", "การตั้งค่า")}</span>
      </div>
    </aside>
  );
};

window.Sidebar = Sidebar;
