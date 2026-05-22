// AI Assistant view
const RELATED_DOCS_BY_TOPIC = {
  vanilla: [
    { type: "pdf",  title: "RM-2418 Bourbon Vanilla Spec Sheet",  title_th: "เอกสารสเปก RM-2418 Bourbon Vanilla", meta: "2.4 MB · Updated 2 days ago", meta_th: "2.4 MB · อัปเดต 2 วันก่อน" },
    { type: "docx", title: "Dairy Application Dosage Guidelines", title_th: "แนวทางปริมาณใช้สำหรับผลิตภัณฑ์นม", meta: "Section 4.2 · Marcus Webb", meta_th: "หัวข้อ 4.2 · Marcus Webb" },
    { type: "xlsx", title: "Vanilla Cost-in-Use Calculator 2026", title_th: "ตัวคำนวณต้นทุน Vanilla 2569",  meta: "Updated 1 week ago", meta_th: "อัปเดต 1 สัปดาห์ที่แล้ว" }
  ],
  gluten: [
    { type: "xlsx", title: "Allergen Master Register 2026",       title_th: "ทะเบียนสารก่อภูมิแพ้ปี 2569", meta: "Updated daily · 1,847 rows", meta_th: "อัปเดตทุกวัน · 1,847 แถว" },
    { type: "pdf",  title: "Gluten-Free Certification Process",   title_th: "ขั้นตอนการรับรองไร้กลูเตน",   meta: "Anna Lindqvist · 5 pages", meta_th: "Anna Lindqvist · 5 หน้า" },
    { type: "docx", title: "Q1-Q2 RM Additions Report",          title_th: "รายงานเพิ่ม RM ไตรมาส 1-2",  meta: "62 entries · May 2026", meta_th: "62 รายการ · พ.ค. 2569" }
  ],
  regulation: [
    { type: "pdf",  title: "EU Reg. 1334/2008 — 2026 Update",     title_th: "EU Reg. 1334/2008 — ฉบับ 2569", meta: "Official text · 48 pages", meta_th: "ฉบับทางการ · 48 หน้า" },
    { type: "docx", title: "Internal Compliance Action List",    title_th: "รายการที่ต้องทำเพื่อกำกับ",     meta: "Anna Lindqvist · 12 items", meta_th: "Anna Lindqvist · 12 รายการ" },
    { type: "pdf",  title: "Smoke Flavorings Positive List Q3",  title_th: "Positive List กลิ่นรมควัน Q3", meta: "EFSA · 2 pages", meta_th: "EFSA · 2 หน้า" }
  ],
  citral: [
    { type: "pdf",  title: "RM-1827 Citral 95% Spec Sheet",      title_th: "เอกสารสเปก RM-1827 Citral 95%", meta: "Citromax · IFRA-OK", meta_th: "Citromax · ผ่าน IFRA" },
    { type: "xlsx", title: "IFRA Cat. 4 Usage Calculator",       title_th: "ตัวคำนวณการใช้งาน IFRA Cat. 4", meta: "Internal tool · v3.2", meta_th: "เครื่องมือภายใน · v3.2" },
    { type: "docx", title: "Citrus Pipeline Status Report",     title_th: "รายงานสถานะไลน์ Citrus",       meta: "May 2026 · Daniel Okafor", meta_th: "พ.ค. 2569 · Daniel Okafor" }
  ],
  default: [
    { type: "pdf",  title: "R&D Smart Hub Quick Start Guide",   title_th: "คู่มือเริ่มต้น R&D Smart Hub",  meta: "8 pages · Recommended", meta_th: "8 หน้า · แนะนำ" },
    { type: "docx", title: "AI Assistant — Tips & Best Practices", title_th: "ผู้ช่วย AI — เคล็ดลับการใช้งาน", meta: "How to ask great questions", meta_th: "วิธีตั้งคำถามที่ดี" }
  ]
};

const NEXT_ACTIONS_BY_TOPIC = {
  vanilla:    [{ icon: "flask",     label: "Open RM-2418 in database",           label_th: "เปิด RM-2418 ในฐานข้อมูล" },
               { icon: "calendar",  label: "Schedule dairy panel session",       label_th: "นัดทดสอบประสาทสัมผัสกลุ่มนม" },
               { icon: "doc",       label: "Generate dosage summary",            label_th: "สร้างสรุปปริมาณการใช้" }],
  gluten:     [{ icon: "filter",    label: "Apply 'gluten-free' filter",         label_th: "ใช้ตัวกรอง 'ไร้กลูเตน'" },
               { icon: "download",  label: "Export 47-item shortlist as XLSX",   label_th: "ส่งออกรายการ 47 รายการเป็น XLSX" }],
  regulation: [{ icon: "review",    label: "Review RM-2380 (wheat carrier flag)", label_th: "ตรวจสอบ RM-2380 (มีตัวพาข้าวสาลี)" },
               { icon: "calendar",  label: "Add EU compliance review to calendar", label_th: "เพิ่มรีวิวกำกับ EU ลงปฏิทิน" },
               { icon: "doc",       label: "Open Compliance Checklist",          label_th: "เปิดเช็คลิสต์การกำกับ" }],
  citral:     [{ icon: "flask",     label: "Cross-check 12 projects' IFRA totals", label_th: "ตรวจสอบยอดรวม IFRA ของ 12 โครงการ" },
               { icon: "review",    label: "Flag projects nearing Cat. 4 limit",   label_th: "ติดธงโครงการใกล้ขีด Cat. 4" }],
  default:    [{ icon: "lightbulb", label: "Try a more specific question",       label_th: "ลองตั้งคำถามให้เฉพาะเจาะจงขึ้น" }]
};

const detectTopic = (q) => {
  const t = q.toLowerCase();
  if (t.includes("vanilla") || t.includes("dairy") || t.includes("วานิลลา") || t.includes("นม")) return "vanilla";
  if (t.includes("gluten") || t.includes("allergen") || t.includes("กลูเตน") || t.includes("แพ้")) return "gluten";
  if (t.includes("regulation") || t.includes("eu") || t.includes("natural") || t.includes("กฎ") || t.includes("ข้อกำหนด") || t.includes("ธรรมชาติ")) return "regulation";
  if (t.includes("citral") || t.includes("citrus") || t.includes("ifra") || t.includes("ส้ม") || t.includes("ซิตรัส")) return "citral";
  return "default";
};

const Assistant = ({ initialPrompt }) => {
  const d = window.HUB_DATA;
  const state = useAppState();
  const isTh = state.lang === "th";
  const initial = d.aiInitialMessages.map(m => ({
    role: m.role,
    content: isTh ? m.content_th : m.content
  }));
  const [messages, setMessages] = React.useState(initial);
  const [input, setInput] = React.useState("");
  const [topic, setTopic] = React.useState("default");
  const [thinking, setThinking] = React.useState(false);
  const bodyRef = React.useRef(null);

  const send = (text) => {
    const q = (text || input).trim();
    if (!q) return;
    setInput("");
    const newMsgs = [...messages, { role: "user", content: q }];
    setMessages(newMsgs);
    setThinking(true);

    setTimeout(() => {
      const topicKey = detectTopic(q);
      setTopic(topicKey);
      const responses = isTh ? d.aiResponses_th : d.aiResponses;
      const matched = Object.keys(d.aiResponses).find(k =>
        q.toLowerCase().includes(k.toLowerCase().slice(0, 18)) ||
        // also try matching Thai prompts
        (d.aiSuggested.find(s => s.q === k)?.q_th && q.includes(d.aiSuggested.find(s => s.q === k).q_th))
      );
      const reply = matched ? responses[matched] : (
        topicKey === "vanilla"    ? responses["What's the recommended dosage for Bourbon Vanilla in dairy?"]
        : topicKey === "gluten"     ? responses["Find all gluten-free RMs added since January"]
        : topicKey === "regulation" ? responses["Summarize EU naturalness regulation updates"]
        : topicKey === "citral"     ? responses["Show projects using Citral 95%"]
        : (isTh
            ? "ฉันค้นจาก **วัตถุดิบ 1,847 รายการ**, **บันทึกโครงการ 412 รายการ** และ **เอกสารกำกับ 89 ฉบับ** สำหรับคำถามของคุณ\n\nนี่คือเวอร์ชันต้นแบบ — เวอร์ชันจริงจะให้คำตอบที่อิงเอกสารและอ้างถึงแหล่งข้อมูล ลองเลือกคำถามแนะนำด้านล่างเพื่อดูตัวอย่างคำตอบที่สมบูรณ์"
            : "I searched across **1,847 raw materials**, **412 project notes**, and **89 regulatory documents** for your query. Here's what I found:\n\nThis is a prototype response. In the production build I'd return a grounded answer citing the most relevant documents. Try one of the suggested prompts below for a fully-built example response.")
      );
      const sources = isTh
        ? ["ฐานข้อมูลสเปก", "บันทึกโครงการ", "คลังกำกับ"]
        : ["Spec database", "Project notes", "Reg. archive"];
      setMessages(m => [...m, { role: "ai", content: reply, sources }]);
      setThinking(false);
    }, 900);
  };

  React.useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, thinking]);

  React.useEffect(() => {
    if (initialPrompt) send(initialPrompt);
    // eslint-disable-next-line
  }, []);

  const renderBubble = (m, i) => {
    if (m.role === "ai") {
      const lines = m.content.split("\n");
      return (
        <div key={i} className="msg ai">
          <div className="av-msg"><Icon name="sparkle" size={12} /></div>
          <div className="bubble">
            {lines.map((ln, idx) => {
              if (!ln.trim()) return <div key={idx} style={{height: 6}}></div>;
              const parts = ln.split(/(\*\*[^*]+\*\*)/g).map((part, pi) =>
                part.startsWith("**") && part.endsWith("**")
                  ? <b key={pi}>{part.slice(2, -2)}</b>
                  : part
              );
              return <div key={idx} style={{margin: "2px 0"}}>{parts}</div>;
            })}
            {m.sources && (
              <div className="src">
                <Icon name="link" size={10} style={{verticalAlign: "-1px"}} />
                <span style={{marginRight: 8, color: "var(--color-text-tertiary)"}}> {t("Sources:", "แหล่งข้อมูล:")}</span>
                {m.sources.map(s => (
                  <span key={s} className="sl"><Icon name="doc" size={10} />{s}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }
    return (
      <div key={i} className="msg user">
        <div className="av-msg">SC</div>
        <div className="bubble">{m.content}</div>
      </div>
    );
  };

  const docs = RELATED_DOCS_BY_TOPIC[topic];
  const actions = NEXT_ACTIONS_BY_TOPIC[topic];

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="crumb">{t("R&D Smart Hub › AI Assistant", "R&D Smart Hub › ผู้ช่วย AI")}</div>
          <h1 style={{display:"flex", alignItems:"center", gap:10}}>
            {t("R&D AI Assistant", "ผู้ช่วย AI ของ R&D")}
            <span className="chip purple" style={{fontSize: 11}}>
              <Icon name="sparkle" size={10} />{t("Powered by your R&D corpus", "ขับเคลื่อนด้วยคลังข้อมูล R&D ของคุณ")}
            </span>
          </h1>
        </div>
        <div className="actions">
          <button className="btn"><Icon name="history" size={14} />{t("History", "ประวัติ")}</button>
          <button className="btn"><Icon name="plus" size={14} />{t("New chat", "แชทใหม่")}</button>
        </div>
      </div>

      <div className="ai-layout">
        <div className="ai-chat">
          <div className="h">
            <div className="av-ai"><Icon name="sparkle" size={18} /></div>
            <div style={{flex: 1}}>
              <h3>{t("R&D Copilot", "R&D Copilot")}</h3>
              <div className="s">
                <span className="dot green"></span>
                {t("Connected · 1,847 RMs · 412 projects · 89 regs indexed",
                   "เชื่อมต่อแล้ว · RM 1,847 · โครงการ 412 · กำกับ 89 ฉบับ")}
              </div>
            </div>
            <button className="btn subtle"><Icon name="info" size={14} />{t("About", "เกี่ยวกับ")}</button>
          </div>

          <div className="b" ref={bodyRef}>
            {messages.map(renderBubble)}
            {thinking && (
              <div className="msg ai">
                <div className="av-msg"><Icon name="sparkle" size={12} /></div>
                <div className="bubble" style={{display: "flex", alignItems: "center", gap: 4}}>
                  <span className="ai-dot"></span>
                  <span className="ai-dot" style={{animationDelay: "0.15s"}}></span>
                  <span className="ai-dot" style={{animationDelay: "0.3s"}}></span>
                  <span style={{marginLeft: 8, color: "var(--color-text-secondary)", fontSize: 12}}>
                    {t("Searching your corpus…", "กำลังค้นในคลังข้อมูลของคุณ…")}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="suggested-prompts">
            <div className="lbl">{t("Try asking", "ลองถาม")}</div>
            {d.aiSuggested.map(p => (
              <div key={p.q} className="prompt" onClick={() => send(isTh ? p.q_th : p.q)}>
                <Icon name={p.icon} size={12} color="var(--color-primary)" />
                {isTh ? p.q_th : p.q}
              </div>
            ))}
          </div>

          <div className="ai-input">
            <button className="btn subtle" style={{padding: 6}}><Icon name="paperclip" size={16} /></button>
            <textarea
              placeholder={t("Ask anything across raw materials, projects, or regulations…",
                             "ถามอะไรก็ได้เกี่ยวกับวัตถุดิบ โครงการ หรือข้อกำหนด…")}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              rows={1}
            />
            <button className="send" onClick={() => send()} disabled={!input.trim()}>
              <Icon name="send" size={16} />
            </button>
          </div>
        </div>

        <div className="ai-side">
          <div className="card">
            <div className="card-h">
              <h3 style={{display:"flex", alignItems:"center", gap:6}}>
                <Icon name="doc" size={14} />
                {t("Related documents", "เอกสารที่เกี่ยวข้อง")}
              </h3>
            </div>
            <div className="card-b" style={{padding: "8px"}}>
              {docs.map((doc, i) => (
                <div key={i} className="ai-doc">
                  <div className={"file-ic " + doc.type}>{FILE_LABEL[doc.type]}</div>
                  <div className="info">
                    <div className="ttl">{isTh ? doc.title_th : doc.title}</div>
                    <div className="meta">{isTh ? doc.meta_th : doc.meta}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-h">
              <h3 style={{display:"flex", alignItems:"center", gap:6}}>
                <Icon name="sparkle" size={14} />
                {t("Next actions", "การดำเนินการต่อ")}
              </h3>
            </div>
            <div className="card-b" style={{padding: "10px"}}>
              {actions.map((a, i) => (
                <div key={i} className="next-action">
                  <Icon name={a.icon} size={14} color="var(--color-primary)" />
                  <span style={{flex: 1}}>{isTh ? a.label_th : a.label}</span>
                  <Icon name="arrow_right" size={12} color="var(--color-primary)" />
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-h">
              <h3 style={{display:"flex", alignItems:"center", gap:6}}>
                <Icon name="info" size={14} />
                {t("About this assistant", "เกี่ยวกับผู้ช่วยนี้")}
              </h3>
            </div>
            <div className="card-b" style={{fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.6}}>
              {t(
                "This Copilot is grounded in your internal R&D corpus only. Responses are not shared externally and reflect data as of the last sync at 09:14 today. Always verify critical decisions against the source documents linked in each reply.",
                "Copilot นี้ตอบจากคลังข้อมูล R&D ภายในของคุณเท่านั้น คำตอบไม่ถูกแชร์ออกภายนอก และอ้างอิงข้อมูล ณ เวลาซิงค์ล่าสุด 09:14 น. ของวันนี้ ควรตรวจสอบเอกสารต้นทางที่ลิงก์ในแต่ละคำตอบสำหรับการตัดสินใจสำคัญทุกครั้ง"
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

window.Assistant = Assistant;
