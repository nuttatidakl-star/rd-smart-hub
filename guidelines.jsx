// Guideline Center view
const FILE_LABEL = {
  pdf: "PDF",
  docx: "DOC",
  xlsx: "XLS",
  pptx: "PPT",
  video: "MP4",
  link: "URL"
};

const GC_THAI = {
  "Product Development": "การพัฒนาผลิตภัณฑ์",
  "Templates, frameworks and tools for new product creation": "เทมเพลต กรอบงาน และเครื่องมือสำหรับการสร้างผลิตภัณฑ์ใหม่",
  "Assessment & Compliance": "การประเมินและการกำกับ",
  "Regulatory, safety, sustainability, and stability protocols": "เอกสารกำกับ ความปลอดภัย ความยั่งยืน และความเสถียร",
  "Sensory Training": "การฝึกประสาทสัมผัส",
  "Panelist training, lexicons, and calibration material": "การฝึกผู้ทดสอบ คำศัพท์ และวัสดุคาลิเบรต",
  "New Product Development Stage-Gate Process": "ขั้นตอน Stage-Gate การพัฒนาผลิตภัณฑ์ใหม่",
  "End-to-end framework for moving concepts from ideation to commercial launch.": "กรอบงานครบวงจรตั้งแต่แนวคิดถึงเปิดตัวเชิงพาณิชย์",
  "Flavor Brief Template — 2026 Edition": "เทมเพลตบรีฟกลิ่น — ฉบับปี 2569",
  "Standard template capturing target profile, application, dosage, and constraints.": "เทมเพลตมาตรฐาน บันทึกโปรไฟล์เป้าหมาย การใช้งาน ปริมาณ และข้อจำกัด",
  "Cost-in-Use Calculator": "ตัวคำนวณต้นทุนการใช้งาน",
  "Spreadsheet model for estimating compound cost per kg of finished application.": "โมเดล spreadsheet ประเมินต้นทุนต่อ กก. ของผลิตภัณฑ์สำเร็จ",
  "Encapsulation Technology Overview": "ภาพรวมเทคโนโลยีการห่อหุ้ม",
  "Comparison of spray-drying, coacervation, and liposomal carriers.": "เปรียบเทียบ spray-drying, coacervation และตัวพา liposomal",
  "Regulatory Compliance Checklist — EU": "เช็คลิสต์การกำกับ — EU",
  "Per-RM checklist for EU 1334/2008, allergens, and naturalness claims.": "เช็คลิสต์ต่อ RM สำหรับ EU 1334/2008 สารก่อภูมิแพ้ และการอ้างความเป็นธรรมชาติ",
  "Allergen Risk Assessment Form": "แบบประเมินความเสี่ยงสารก่อภูมิแพ้",
  "Standardized form for declaring cross-contamination risks.": "แบบมาตรฐานสำหรับประกาศความเสี่ยงปนเปื้อน",
  "Shelf-Life Study Protocol": "โปรโตคอลศึกษาอายุการเก็บ",
  "Accelerated and ambient stability testing methods.": "วิธีทดสอบความเสถียรแบบเร่งและที่อุณหภูมิห้อง",
  "Sustainability Scorecard 2026": "สกอร์การ์ดความยั่งยืน 2569",
  "Internal scoring methodology for environmental impact of new RMs.": "วิธีให้คะแนนภายในสำหรับผลกระทบสิ่งแวดล้อมของ RM ใหม่",
  // Shelf life additions
  "Shelf Life Study Protocol": "โปรโตคอลศึกษาอายุการเก็บ",
  "Accelerated and ambient stability testing methods with sampling plan.": "วิธีทดสอบความเสถียรแบบเร่งและอุณหภูมิห้อง พร้อมแผนการเก็บตัวอย่าง",
  "Shelf Life Study Form 2026": "ฟอร์มศึกษาอายุการเก็บ 2569",
  "Fillable XLSX form for recording batch data, storage conditions, sampling intervals, and pass/fail criteria.": "ฟอร์ม XLSX สำหรับบันทึกข้อมูลแบทช์ สภาพการเก็บ ระยะเวลาเก็บตัวอย่าง และเกณฑ์ผ่าน/ไม่ผ่าน",
  "Shelf Life Study Guideline — Full Manual": "แนวทางการศึกษาอายุการเก็บ — ฉบับเต็ม",
  "Comprehensive guideline covering test design, controls, environmental conditions, microbiological criteria, and reporting.": "แนวทางครบชุด ครอบคลุมการออกแบบการทดลอง การควบคุม สภาวะสิ่งแวดล้อม เกณฑ์จุลชีววิทยา และการรายงาน",
  // Sensory additions
  "Sensory Training Procedure — SOP 04": "ขั้นตอนการฝึกประสาทสัมผัส — SOP 04",
  "Standard operating procedure for onboarding & calibrating new descriptive sensory panelists.": "ขั้นตอนปฏิบัติงานมาตรฐานสำหรับการเตรียมและคาลิเบรตผู้ทดสอบเชิงพรรณนาใหม่",
  "Triangle Test Guideline": "แนวทาง Triangle Test",
  "Methodology, sample preparation, statistical interpretation, and result template for triangle discrimination tests.": "วิธีการ การเตรียมตัวอย่าง การตีความทางสถิติ และเทมเพลตผลการทดสอบ Triangle",
  "Triangle Test Result Form": "ฟอร์มผล Triangle Test",
  "Excel template for entering panelist responses and auto-calculating significance.": "เทมเพลต Excel บันทึกการตอบของผู้ทดสอบและคำนวณนัยสำคัญอัตโนมัติ",
  "Descriptive Panel Onboarding": "การเตรียมคณะทดสอบเชิงพรรณนา",
  "Slide deck used in initial training program for new descriptive sensory panelists.": "สไลด์ที่ใช้ในโปรแกรมฝึกผู้ทดสอบประสาทสัมผัสใหม่",
  "Sensory Lexicon — Dairy & Confectionery": "คำศัพท์ประสาทสัมผัส — ผลิตภัณฑ์นมและขนม",
  // Tags new
  "SOP": "SOP", "Method": "วิธีการ", "Sensory": "ประสาทสัมผัส", "Shelf Life": "อายุการเก็บ",
  "Descriptive Panel Onboarding": "การเตรียมตัวคณะทดสอบเชิงพรรณนา",
  "Training program for new descriptive sensory panelists.": "โปรแกรมฝึกผู้ทดสอบประสาทสัมผัสใหม่",
  "Basic Tastes Calibration Module": "โมดูลคาลิเบรตรสพื้นฐาน",
  "Video module covering sweet/sour/salty/bitter/umami calibration.": "วิดีโอครอบคลุมการคาลิเบรต หวาน เปรี้ยว เค็ม ขม อูมามิ",
  "Off-Note Identification Workbook": "สมุดงานระบุกลิ่นรสผิดปกติ",
  "Workbook with 40+ off-note references and recognition exercises.": "สมุดงานพร้อม 40+ อ้างอิงและแบบฝึก",
  "Sensory Lexicon — Dairy & Confectionery": "คำศัพท์ประสาทสัมผัส — ผลิตภัณฑ์นมและขนม",
  "Reference vocabulary for descriptive panels in dairy/confectionery.": "คำศัพท์อ้างอิงสำหรับการทดสอบเชิงพรรณนาในกลุ่มนมและขนม",
  "Process": "กระบวนการ", "Mandatory": "บังคับ", "Template": "เทมเพลต", "Tool": "เครื่องมือ",
  "Reference": "อ้างอิง", "Compliance": "การกำกับ", "Form": "ฟอร์ม",
  "Protocol": "โปรโตคอล", "ESG": "ESG", "Scoring": "การให้คะแนน",
  "Training": "ฝึกอบรม", "Video": "วิดีโอ", "Workbook": "สมุดงาน", "Link": "ลิงก์",
  "2 weeks ago": "2 สัปดาห์ที่แล้ว", "1 month ago": "1 เดือนที่แล้ว",
  "3 days ago": "3 วันก่อน", "1 week ago": "1 สัปดาห์ที่แล้ว",
  "5 days ago": "5 วันก่อน", "3 weeks ago": "3 สัปดาห์ที่แล้ว",
  "2 months ago": "2 เดือนก่อน", "6 weeks ago": "6 สัปดาห์ก่อน",
  "just now": "เมื่อสักครู่"
};

const tg = (str, isTh) => isTh ? (GC_THAI[str] || str) : str;

// Heuristic to derive an icon/type from a URL
const detectLinkType = (url) => {
  const u = url.toLowerCase();
  if (u.endsWith(".pdf")) return "pdf";
  if (u.endsWith(".docx") || u.endsWith(".doc")) return "docx";
  if (u.endsWith(".xlsx") || u.endsWith(".xls")) return "xlsx";
  if (u.endsWith(".pptx") || u.endsWith(".ppt")) return "pptx";
  if (u.includes("youtube.com") || u.includes("vimeo.com") || u.includes("stream") || u.endsWith(".mp4")) return "video";
  return "link";
};

// Pretty short hostname from a URL
const shortHost = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch (e) {
    return url;
  }
};

const Guidelines = ({ initialSearch }) => {
  const d = window.HUB_DATA;
  const state = useAppState();
  const isTh = state.lang === "th";
  const [search, setSearch] = React.useState(initialSearch || "");
  // User-added links by section key
  const [userLinks, setUserLinks] = React.useState({ productDev: [], assessment: [], sensory: [] });
  // Which section is showing the add-link form
  const [addingTo, setAddingTo] = React.useState(null);
  const [draftUrl, setDraftUrl] = React.useState("");
  const [draftTitle, setDraftTitle] = React.useState("");

  const SECTIONS = [
    { key: "productDev",  title: "Product Development",   icon: "lightbulb", color: "blue",   desc: "Templates, frameworks and tools for new product creation" },
    { key: "assessment",  title: "Assessment & Compliance", icon: "review", color: "green",  desc: "Regulatory, safety, sustainability, and stability protocols" },
    { key: "sensory",     title: "Sensory Training",      icon: "tongue",    color: "purple", desc: "Panelist training, lexicons, and calibration material" }
  ];

  const startAdd = (sectionKey) => {
    setAddingTo(sectionKey);
    setDraftUrl("");
    setDraftTitle("");
  };
  const cancelAdd = () => { setAddingTo(null); setDraftUrl(""); setDraftTitle(""); };
  const submitAdd = () => {
    if (!draftUrl.trim()) return;
    const url = draftUrl.trim().match(/^https?:\/\//) ? draftUrl.trim() : "https://" + draftUrl.trim();
    const type = detectLinkType(url);
    const title = draftTitle.trim() || shortHost(url);
    const newItem = {
      id: "ul-" + Date.now(),
      title,
      desc: t(`External link · ${shortHost(url)}`, `ลิงก์ภายนอก · ${shortHost(url)}`),
      type,
      tags: ["Link"],
      owner: "Sarah Chen",
      updated: t("just now", "just now"),
      url,
      isUserLink: true
    };
    setUserLinks(prev => ({ ...prev, [addingTo]: [newItem, ...prev[addingTo]] }));
    cancelAdd();
  };

  const openLink = (item) => {
    if (item.url) {
      window.open(item.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="crumb">{t("R&D Smart Hub › Guideline Center", "R&D Smart Hub › ศูนย์รวมเอกสารแนวทาง")}</div>
          <h1>{t("Guideline Center", "ศูนย์รวมเอกสารแนวทาง")}</h1>
        </div>
        <div className="actions">
          <button className="btn"><Icon name="bookmark" size={14} />{t("My favorites", "รายการโปรด")}</button>
          <button className="btn primary"><Icon name="plus" size={14} />{t("Upload document", "อัปโหลดเอกสาร")}</button>
        </div>
      </div>

      <div className="tools-row">
        <div className="search-input" style={{maxWidth: 480, flex: 1}}>
          <Icon name="search" size={14} color="var(--color-text-tertiary)" />
          <input
            placeholder={t("Search guidelines, templates, training material…", "ค้นหาแนวทาง เทมเพลต สื่อฝึกอบรม…")}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <span className="chip">{t("All file types", "ทุกประเภทไฟล์")}</span>
        <span className="chip">{t("All owners", "ทุกผู้ดูแล")}</span>
        <span className="chip">{t("Last updated", "อัปเดตล่าสุด")}</span>
      </div>

      {SECTIONS.map(sec => {
        const all = [...userLinks[sec.key], ...d.guidelines[sec.key]];
        const items = all.filter(g =>
          !search || (g.title + g.desc + g.owner + g.tags.join(" ")).toLowerCase().includes(search.toLowerCase())
        );
        if (items.length === 0 && search) return null;
        const tn = tone(sec.color);
        return (
          <div key={sec.key} className="gc-section">
            <div className="gc-section-h">
              <div className="ic" style={{ background: tn.bg, color: tn.fg }}>
                <Icon name={sec.icon} size={18} />
              </div>
              <div>
                <h2>{tg(sec.title, isTh)}</h2>
                <div className="text-xs text-secondary">{tg(sec.desc, isTh)}</div>
              </div>
              <span className="count">
                {items.length} {t("documents", "เอกสาร")}
              </span>
              <button
                className="btn"
                style={{marginLeft: "auto"}}
                onClick={() => startAdd(sec.key)}
              >
                <Icon name="link" size={12} />{t("Paste link", "แปะลิงก์")}
              </button>
            </div>
            <div className="gc-grid">
              {/* Add link form (shown only for active section) */}
              {addingTo === sec.key && (
                <div className="add-link-form">
                  <div className="alf-h">
                    <Icon name="link" size={13} />
                    {t("Add a new link to this section", "เพิ่มลิงก์ใหม่ในหมวดนี้")}
                  </div>
                  <input
                    type="text"
                    placeholder={t("Paste URL (SharePoint, Teams, OneDrive, etc.)", "วาง URL (SharePoint, Teams, OneDrive ฯลฯ)")}
                    value={draftUrl}
                    onChange={e => setDraftUrl(e.target.value)}
                    autoFocus
                  />
                  <input
                    type="text"
                    placeholder={t("Title (optional, will use hostname if blank)", "หัวข้อ (ไม่ใส่ก็ได้)")}
                    value={draftTitle}
                    onChange={e => setDraftTitle(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && submitAdd()}
                  />
                  <div className="alf-row">
                    <button className="btn primary" onClick={submitAdd} disabled={!draftUrl.trim()}>
                      <Icon name="check" size={12} />{t("Add link", "เพิ่มลิงก์")}
                    </button>
                    <button className="btn" onClick={cancelAdd}>
                      {t("Cancel", "ยกเลิก")}
                    </button>
                  </div>
                </div>
              )}

              {/* Empty add-link prompt (when no form is active for this section) */}
              {addingTo !== sec.key && (
                <div className="add-link-card" onClick={() => startAdd(sec.key)}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: "var(--color-primary-soft)", color: "var(--color-primary)",
                    display: "grid", placeItems: "center"
                  }}>
                    <Icon name="plus" size={18} />
                  </div>
                  <div>{t("Paste a link here", "แปะลิงก์ตรงนี้")}</div>
                  <div style={{fontSize: 11, fontWeight: 400, textAlign: "center"}}>
                    {t("SharePoint, Teams, OneDrive, any URL", "SharePoint, Teams, OneDrive หรือ URL ใดก็ได้")}
                  </div>
                </div>
              )}

              {items.map(g => (
                <div
                  key={g.id}
                  className={"gc-card" + (g.url ? " is-link" : "")}
                  onClick={() => openLink(g)}
                  style={g.url ? { cursor: "pointer" } : {}}
                >
                  <div className="top">
                    <div className={"file-ic " + g.type}>{FILE_LABEL[g.type] || "URL"}</div>
                    <div style={{flex: 1, minWidth: 0}}>
                      <h3 className="ttl">{tg(g.title, isTh)}</h3>
                      {g.url && (
                        <span className="link-badge" style={{marginTop: 4}}>
                          <Icon name="external" size={9} />
                          {shortHost(g.url)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="desc">{tg(g.desc, isTh)}</div>
                  {g.url && (
                    <div className="link-url" title={g.url}>{g.url}</div>
                  )}
                  <div className="tags">
                    {g.tags.map(tag => (
                      <span
                        key={tag}
                        className={"chip " + (
                          tag === "Mandatory" ? "red" :
                          tag === "Compliance" || tag === "EU" || tag === "Link" ? "blue" :
                          tag === "Training" || tag === "Video" ? "purple" : ""
                        )}
                      >
                        {tg(tag, isTh)}
                      </span>
                    ))}
                  </div>
                  <div className="meta-row">
                    <div className="av sm av-blue">{g.owner.split(" ").map(s=>s[0]).join("").slice(0,2)}</div>
                    <div className="who">
                      <div style={{fontWeight: 600, color: "var(--color-text)"}}>{g.owner}</div>
                      <div style={{fontSize: 10}}>
                        {t("Updated", "อัปเดต")} {tg(g.updated, isTh)}
                      </div>
                    </div>
                    {g.url && (
                      <span className="btn subtle" style={{marginLeft: "auto", padding: "3px 8px", fontSize: 11}}
                        onClick={e => { e.stopPropagation(); openLink(g); }}
                      >
                        <Icon name="external" size={11} />
                        {t("Open", "เปิด")}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

window.Guidelines = Guidelines;
