// Meeting Schedule view — with interactive slot picking + conflict warnings
const HOURS_EN = ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];
const HOURS_TH = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

const DAYS_DATA = [
  { abbrEn: "MON", abbrTh: "จ.", num: 18 },
  { abbrEn: "TUE", abbrTh: "อ.", num: 19 },
  { abbrEn: "WED", abbrTh: "พ.", num: 20 },
  { abbrEn: "THU", abbrTh: "พฤ.", num: 21 },
  { abbrEn: "FRI", abbrTh: "ศ.", num: 22, today: true }
];

// Events with which people IDs are busy during them
const EVENTS = [
  { d: 0, s: 2,  span: 2, type: "busy",      t: "Lab time",                t_th: "ทำงานในห้องแลป",     who: ["p1"] },
  { d: 0, s: 6,  span: 3, type: "mine",      t: "Vanilla 24 sensory",      t_th: "ทดสอบประสาทสัมผัส Vanilla 24", who: ["p1","p2"] },
  { d: 0, s: 12, span: 2, type: "busy",      t: "1:1 — Daniel",            t_th: "พบ 1:1 — ดาเนียล",   who: ["p4"] },
  { d: 1, s: 0,  span: 2, type: "tentative", t: "QA review",               t_th: "ตรวจ QA",            who: ["p7","p1"] },
  { d: 1, s: 4,  span: 4, type: "busy",      t: "Sensory panel",           t_th: "คณะทดสอบ",           who: ["p2","p3"] },
  { d: 1, s: 10, span: 3, type: "mine",      t: "EU Reg. sync",            t_th: "ประชุมข้อกำหนด EU", who: ["p5"] },
  { d: 2, s: 2,  span: 2, type: "busy",      t: "Innovation gate",         t_th: "Innovation gate",    who: ["p6","p4"] },
  { d: 2, s: 8,  span: 2, type: "tentative", t: "Marketing brief",         t_th: "บรีฟการตลาด",        who: ["p8"] },
  { d: 3, s: 0,  span: 2, type: "mine",      t: "Weekly stand-up",         t_th: "Stand-up รายสัปดาห์", who: ["p1","p2","p3","p4"] },
  { d: 3, s: 4,  span: 3, type: "busy",      t: "Pilot scale-up",          t_th: "ขยายสเกล Pilot",     who: ["p3"] },
  { d: 3, s: 12, span: 2, type: "tentative", t: "Q3 planning",             t_th: "วางแผน Q3",          who: ["p4","p8"] },
  { d: 4, s: 3,  span: 1, type: "mine",      t: "Vanilla 24 review",       t_th: "รีวิว Vanilla 24",   who: ["p1","p2","p3"] },
  { d: 4, s: 6,  span: 2, type: "busy",      t: "Pipeline sync",           t_th: "ประชุม Pipeline",    who: ["p4"] },
  { d: 4, s: 12, span: 2, type: "mine",      t: "Beverage gate",           t_th: "Gate เครื่องดื่ม",    who: ["p8","p6"] }
];

// AI-suggested known-good slots
const SUGGESTED = [
  { d: 1, s: 8,  span: 2, who: [] }, // Tue 12:00 — all clear
  { d: 2, s: 5,  span: 2, who: [] }, // Wed 10:30 — clear
  { d: 3, s: 9,  span: 2, who: [] }  // Thu 12:30 — clear
];

// Helper: format time from slot index (slot 0 = 8:00)
const slotTime = (slot) => {
  const h24 = 8 + Math.floor(slot / 2);
  const m = (slot % 2) * 30;
  return { h24, m };
};
const fmtTime = (slot, lang) => {
  const { h24, m } = slotTime(slot);
  if (lang === "th") return `${String(h24).padStart(2,"0")}:${String(m).padStart(2,"0")}`;
  const h12 = h24 > 12 ? h24 - 12 : (h24 === 0 ? 12 : h24);
  const ap = h24 >= 12 ? "PM" : "AM";
  return `${h12}:${String(m).padStart(2,"0")} ${ap}`;
};

const dayDate = (dIdx, lang) => {
  const d = DAYS_DATA[dIdx];
  if (lang === "th") return `${d.abbrTh} 19 พ.ค.`.replace("19", d.num);
  return `${d.abbrEn} May ${d.num}`;
};

const MeetingSchedule = () => {
  const data = window.HUB_DATA;
  const state = useAppState();
  const isTh = state.lang === "th";

  const [search, setSearch] = React.useState("");
  const [attendees, setAttendees] = React.useState([data.people[0], data.people[1], data.people[2]]);
  // selected slot: { d, s, span }
  const [picked, setPicked] = React.useState({ d: 1, s: 8, span: 2 });
  const [title, setTitle] = React.useState(isTh
    ? "Vanilla 24 — รีวิวประสาทสัมผัส (ติดตามผล)"
    : "Vanilla 24 — sensory review (follow-up)");
  const [outlook, setOutlook] = React.useState(true);
  const [teamsOn, setTeamsOn] = React.useState(true);
  const [recurring, setRecurring] = React.useState(false);
  const [location, setLocation] = React.useState(isTh ? "ห้องแลป 2 / ออนไลน์" : "Lab 2 / Online");
  const [duration, setDuration] = React.useState("60");
  const [description, setDescription] = React.useState(isTh
    ? "ติดตามรีวิวประสาทสัมผัสของแบทช์ pilot ล่าสุด เราจะคาลิเบรตคณะทดสอบเทียบกับอ้างอิงก่อนหน้า และตกลงขอบเขตของรอบถัดไป"
    : "Follow-up sensory review on the latest pilot batch. We'll calibrate the panel against the previous reference and align on next iteration scope.");

  // Created meetings that appear on the calendar
  const [createdMeetings, setCreatedMeetings] = React.useState([]);
  // Modal state
  const [confirmed, setConfirmed] = React.useState(null); // last created meeting

  // Compute span from duration
  React.useEffect(() => {
    const span = Math.max(1, Math.round(parseInt(duration, 10) / 30));
    setPicked(p => ({ ...p, span }));
  }, [duration]);

  // Detect conflicts at the picked slot for the current attendees
  const conflicts = React.useMemo(() => {
    if (!picked) return [];
    const pickEnd = picked.s + picked.span;
    const attendeeIds = new Set(attendees.map(a => a.id));
    const conflictPeople = new Map(); // id -> reason
    EVENTS.forEach(ev => {
      if (ev.d !== picked.d) return;
      const evEnd = ev.s + ev.span;
      const overlap = picked.s < evEnd && pickEnd > ev.s;
      if (!overlap) return;
      ev.who.forEach(pid => {
        if (attendeeIds.has(pid)) {
          conflictPeople.set(pid, isTh ? ev.t_th : ev.t);
        }
      });
    });
    return Array.from(conflictPeople.entries()).map(([pid, reason]) => ({
      person: data.people.find(p => p.id === pid),
      reason
    }));
  }, [picked, attendees, isTh]);

  const isSuggested = SUGGESTED.some(s => s.d === picked.d && s.s === picked.s && s.span === picked.span);

  const filteredPeople = data.people.filter(p =>
    !attendees.find(a => a.id === p.id) &&
    (search === "" || p.name.toLowerCase().includes(search.toLowerCase()) || p.role.toLowerCase().includes(search.toLowerCase()))
  );

  const addAttendee = (p) => setAttendees([...attendees, p]);
  const removeAttendee = (id) => setAttendees(attendees.filter(a => a.id !== id));

  const pickSlot = (d, s) => {
    const span = Math.max(1, Math.round(parseInt(duration, 10) / 30));
    setPicked({ d, s, span });
  };

  const sendInvites = () => {
    if (conflicts.length === attendees.length) return;
    const newMeeting = {
      id: "M-" + Date.now(),
      d: picked.d,
      s: picked.s,
      span: picked.span,
      title,
      attendees: attendees.map(a => ({ id: a.id, name: a.name, color: a.color, initials: a.initials })),
      location,
      description,
      outlook,
      teamsOn,
      recurring,
      conflicts: conflicts.length,
      teamsLink: "https://teams.acme.com/_/meet/" + Math.random().toString(36).slice(2, 10)
    };
    setCreatedMeetings(prev => [...prev, newMeeting]);
    setConfirmed(newMeeting);
  };

  const closeModal = () => setConfirmed(null);

  // Banner content
  let banner;
  if (conflicts.length === 0) {
    banner = {
      tone: "good",
      icon: "check",
      title: t(
        `Time works for all ${attendees.length} attendees`,
        `เวลานี้ว่างตรงกันทั้ง ${attendees.length} คน`
      ),
      detail: t(
        `${dayDate(picked.d, "en")}, ${fmtTime(picked.s, "en")} — ${fmtTime(picked.s + picked.span, "en")}. Ready to send invites.`,
        `${dayDate(picked.d, "th")} ${fmtTime(picked.s, "th")} — ${fmtTime(picked.s + picked.span, "th")} น. พร้อมส่งคำเชิญ`
      )
    };
  } else if (conflicts.length < attendees.length) {
    banner = {
      tone: "warn",
      icon: "alert",
      title: t(
        `${conflicts.length} of ${attendees.length} attendees aren't available`,
        `มี ${conflicts.length} ใน ${attendees.length} คนติดเวลานี้`
      ),
      detail: t(
        "You can still send the invite, but the meeting won't reach full attendance. Consider one of the AI-suggested slots below.",
        "ส่งคำเชิญได้ แต่ผู้เข้าร่วมจะไม่ครบ ลองดูช่วงเวลาที่ AI แนะนำด้านล่าง"
      ),
      conflicts
    };
  } else {
    banner = {
      tone: "bad",
      icon: "x",
      title: t(
        "This time doesn't work — no one is available",
        "เวลานี้ใช้ไม่ได้ — ไม่มีใครว่างเลย"
      ),
      detail: t(
        "All selected attendees have a conflict during this slot. Pick a different time, or use an AI-suggested green slot.",
        "ผู้เข้าร่วมทุกคนติดธุระในช่วงเวลานี้ กรุณาเลือกเวลาอื่น หรือใช้ช่วงเวลาสีเขียวที่ AI แนะนำ"
      ),
      conflicts
    };
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="crumb">{t("R&D Smart Hub › Meeting Schedule", "R&D Smart Hub › ตารางการประชุม")}</div>
          <h1>{t("Schedule a meeting", "นัดประชุม")}</h1>
        </div>
        <div className="actions">
          <button className="btn"><Icon name="refresh" size={14} />{t("Refresh availability", "อัปเดตเวลาว่าง")}</button>
          <button className="btn primary"><Icon name="plus" size={14} />{t("New meeting", "ประชุมใหม่")}</button>
        </div>
      </div>

      <div className="meet-layout">
        {/* LEFT — People */}
        <div className="meet-col">
          <div className="h">
            <span>{t("People & attendees", "บุคคลและผู้เข้าร่วม")}</span>
            <span className="text-xs text-secondary">{attendees.length} {t("added", "คน")}</span>
          </div>
          <div className="b">
            <div className="search-input" style={{marginBottom: 8}}>
              <Icon name="search" size={14} color="var(--color-text-tertiary)" />
              <input
                placeholder={t("Find people, e.g. 'Marcus' or 'sensory'", "ค้นหา เช่น 'มาร์คัส' หรือ 'sensory'")}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {attendees.length > 0 && (
              <div style={{marginBottom: 8}}>
                <div className="text-xs text-tertiary fw-600" style={{textTransform:"uppercase", letterSpacing:"0.05em", margin:"6px 0"}}>
                  {t("Added", "ที่เลือกแล้ว")}
                </div>
                <div className="attendee-chips">
                  {attendees.map(a => (
                    <span key={a.id} className="attendee-chip">
                      <div className={"av sm " + a.color}>{a.initials}</div>
                      {a.name.split(" ")[0]}
                      <span className="x" onClick={() => removeAttendee(a.id)}>
                        <Icon name="x" size={10} />
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="text-xs text-tertiary fw-600" style={{textTransform:"uppercase", letterSpacing:"0.05em", margin:"14px 0 6px"}}>
              {t("Suggested", "แนะนำ")} ({filteredPeople.length})
            </div>
            {filteredPeople.map(p => (
              <div key={p.id} className="person-row" onClick={() => addAttendee(p)}>
                <div className={"av sm " + p.color}>{p.initials}</div>
                <div className="info">
                  <p className="nm">{p.name}</p>
                  <p className="role">{p.role}</p>
                </div>
                <span className="status">
                  <span className={"dot " + (p.availability === "available" ? "green" : p.availability === "busy" ? "red" : "orange")}></span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER — Calendar */}
        <div className="meet-col" style={{display: "flex", flexDirection: "column"}}>
          <div className="h">
            <div style={{display:"flex", alignItems:"center", gap:8}}>
              <span>{t("Week of May 18 — 22, 2026", "สัปดาห์ที่ 18 — 22 พ.ค. 2569")}</span>
              <button className="btn" style={{padding:"3px 6px"}}><Icon name="chevron_left" size={12} /></button>
              <button className="btn" style={{padding:"3px 6px"}}><Icon name="chevron_right" size={12} /></button>
            </div>
            <div style={{display:"flex", gap: 6, alignItems:"center"}}>
              <span className="text-xs text-secondary">{t("View", "มุมมอง")}</span>
              <div className="filter-tabs">
                <span className="t">{t("Day", "วัน")}</span>
                <span className="t active">{t("Week", "สัปดาห์")}</span>
                <span className="t">{t("Month", "เดือน")}</span>
              </div>
            </div>
          </div>

          {/* Status banner */}
          <div style={{padding: "12px 16px 0"}}>
            <div className={"status-banner " + banner.tone}>
              <div className="sb-ic">
                <Icon name={banner.icon} size={12} />
              </div>
              <div className="sb-body">
                <div className="sb-ttl">{banner.title}</div>
                <div className="sb-detail">{banner.detail}</div>
                {banner.conflicts && (
                  <div className="conflict-list">
                    {banner.conflicts.map(c => (
                      <span key={c.person.id} className="chip" style={{ background: "rgba(0,0,0,0.06)", color: "inherit" }}>
                        <div className={"av sm " + c.person.color}>{c.person.initials}</div>
                        <span style={{fontWeight: 600}}>{c.person.name.split(" ")[0]}</span>
                        <span style={{opacity: 0.7}}>· {c.reason}</span>
                      </span>
                    ))}
                  </div>
                )}
                {isSuggested && conflicts.length === 0 && (
                  <div style={{marginTop: 4, fontSize: 11, opacity: 0.85}}>
                    <Icon name="sparkle" size={10} style={{verticalAlign: "-1px"}} /> {t("AI-suggested slot", "ช่วงเวลาที่ AI แนะนำ")}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="cal">
            <div className="head gutter"></div>
            {DAYS_DATA.map(day => (
              <div key={day.num} className={"head day" + (day.today ? " today" : "")}>
                <div>{isTh ? day.abbrTh : day.abbrEn}</div>
                <b>{day.num}</b>
              </div>
            ))}

            <div className="body">
              <div className="hour-col">
                {(isTh ? HOURS_TH : HOURS_EN).map(h => <div key={h} className="hour">{h}</div>)}
              </div>
              {DAYS_DATA.map((day, dIdx) => (
                <div key={day.num} className="day-col">
                  {(isTh ? HOURS_TH : HOURS_EN).map((h, hi) => (
                    <div key={hi} className="slot hot" onClick={() => pickSlot(dIdx, hi * 2)}></div>
                  ))}

                  {EVENTS.filter(e => e.d === dIdx).map((e, i) => {
                    const top = e.s * 28;
                    const height = e.span * 28 - 2;
                    return (
                      <div key={"ev"+dIdx+"-"+i} className={"ev " + e.type} style={{top, height}}>
                        <div className="et">{isTh ? e.t_th : e.t}</div>
                        {height > 30 && (
                          <div style={{opacity: 0.8, marginTop: 2, fontSize: 10}}>
                            {e.who.map(pid => data.people.find(p => p.id === pid)?.initials).filter(Boolean).join(", ")}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Created meetings — render as "mine" */}
                  {createdMeetings.filter(m => m.d === dIdx).map((m) => {
                    const top = m.s * 28;
                    const height = m.span * 28 - 2;
                    return (
                      <div key={m.id} className="ev mine" style={{top, height, zIndex: 1, boxShadow: "0 0 0 2px var(--color-primary)"}}>
                        <div className="et">
                          <Icon name="check" size={9} style={{verticalAlign: "-1px", marginRight: 3}} />
                          {m.title.length > 22 ? m.title.slice(0, 22) + "…" : m.title}
                        </div>
                        {height > 30 && (
                          <div style={{opacity: 0.8, marginTop: 2, fontSize: 10}}>
                            {m.attendees.map(a => a.initials).join(", ")}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {SUGGESTED.filter(s => s.d === dIdx).map((s, i) => {
                    const top = s.s * 28;
                    const height = s.span * 28 - 2;
                    const isPicked = picked.d === s.d && picked.s === s.s;
                    return (
                      <div
                        key={"sg"+dIdx+"-"+i}
                        className={"ev suggest" + (isPicked ? " selected" : "")}
                        style={{top, height, zIndex: 1}}
                        onClick={(e) => { e.stopPropagation(); pickSlot(s.d, s.s); }}
                      >
                        <div className="et">★ {t("AI-suggested", "AI แนะนำ")}</div>
                      </div>
                    );
                  })}

                  {/* Selection overlay */}
                  {picked.d === dIdx && (
                    <div
                      className={"slot-pick " + (conflicts.length === 0 ? "good" : conflicts.length === attendees.length ? "bad" : "")}
                      style={{
                        top: picked.s * 28,
                        height: picked.span * 28 - 2
                      }}
                    >
                      <div className="lbl">
                        {conflicts.length === 0
                          ? t("✓ Selected", "✓ เลือกเวลา")
                          : conflicts.length === attendees.length
                            ? t("✕ Conflict", "✕ ติดเวลา")
                            : t("⚠ Partial conflict", "⚠ ติดบางคน")}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="cal-legend">
            <span className="lg"><span className="sw mine"></span>{t("My meetings", "การประชุมของฉัน")}</span>
            <span className="lg"><span className="sw busy"></span>{t("Busy", "ไม่ว่าง")}</span>
            <span className="lg"><span className="sw tent"></span>{t("Tentative", "เบื้องต้น")}</span>
            <span className="lg"><span className="sw sug"></span>{t("AI-suggested slot", "AI แนะนำ")}</span>
            <span className="text-xs text-tertiary" style={{marginLeft: "auto"}}>
              {t("Click any time slot to test it", "คลิกช่วงเวลาเพื่อตรวจสอบ")}
            </span>
          </div>
        </div>

        {/* RIGHT — Meeting form */}
        <div className="meet-col">
          <div className="h">
            <span>{t("Meeting details", "รายละเอียดการประชุม")}</span>
            <span className="chip blue"><Icon name="sparkle" size={10} />{t("AI-drafted", "AI ร่างให้")}</span>
          </div>
          <div className="b">
            <div className="field">
              <label>{t("Title", "หัวข้อ")}</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
            </div>

            <div className="field">
              <label>{t("Selected time", "เวลาที่เลือก")}</label>
              <div style={{
                padding: "10px 12px",
                background: conflicts.length === 0 ? "var(--color-success-soft)" : (conflicts.length === attendees.length ? "var(--color-danger-soft)" : "var(--color-warning-soft)"),
                color: conflicts.length === 0 ? "var(--color-success)" : (conflicts.length === attendees.length ? "var(--color-danger)" : "var(--orange-chip-text)"),
                border: "1px dashed",
                borderColor: conflicts.length === 0 ? "var(--color-success)" : (conflicts.length === attendees.length ? "var(--color-danger)" : "var(--color-warning)"),
                borderRadius: 4,
                fontSize: 13,
                fontWeight: 600,
                display: "flex", alignItems: "center", gap: 8
              }}>
                <Icon name={conflicts.length === 0 ? "check" : "alert"} size={14} />
                {dayDate(picked.d, isTh ? "th" : "en")}, {fmtTime(picked.s, isTh ? "th" : "en")} — {fmtTime(picked.s + picked.span, isTh ? "th" : "en")}
              </div>
              <div className="help">
                {conflicts.length === 0
                  ? t(`All ${attendees.length} attendees confirmed available`, `ผู้เข้าร่วมทั้ง ${attendees.length} คนว่างตรงกัน`)
                  : t(`${conflicts.length} attendee(s) have conflicts`, `มี ${conflicts.length} คนติดเวลา`)}
              </div>
            </div>

            <div className="field">
              <label>{t("Duration", "ระยะเวลา")}</label>
              <select value={duration} onChange={e => setDuration(e.target.value)}>
                <option value="15">{t("15 minutes", "15 นาที")}</option>
                <option value="30">{t("30 minutes", "30 นาที")}</option>
                <option value="45">{t("45 minutes", "45 นาที")}</option>
                <option value="60">{t("60 minutes", "60 นาที")}</option>
                <option value="90">{t("90 minutes", "90 นาที")}</option>
              </select>
            </div>

            <div className="field">
              <label>{t("Location", "สถานที่")}</label>
              <input type="text" value={location} onChange={e => setLocation(e.target.value)} />
            </div>

            <div className="field">
              <label>{t("Description", "รายละเอียด")}</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} />
            </div>

            <div className="sect-h" style={{
              fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em",
              color: "var(--color-text-secondary)", fontWeight: 700, margin: "20px 0 4px"
            }}>{t("Integrations", "การเชื่อมต่อ")}</div>

            <div className="toggle-row">
              <div className="lbl">
                <div className="ic-sq" style={{background: "#0078D4", color: "#fff"}}>
                  <Icon name="mail" size={14} />
                </div>
                <div>
                  <div className="nm">{t("Outlook calendar invite", "ส่งคำเชิญผ่าน Outlook")}</div>
                  <div className="sub">{t("Send to all attendees via Exchange", "ส่งให้ผู้เข้าร่วมทุกคนผ่าน Exchange")}</div>
                </div>
              </div>
              <div className={"tog" + (outlook ? " on" : "")} onClick={() => setOutlook(!outlook)}></div>
            </div>

            <div className="toggle-row">
              <div className="lbl">
                <div className="ic-sq" style={{background: "#464EB8", color: "#fff"}}>
                  <Icon name="teams" size={14} />
                </div>
                <div>
                  <div className="nm">{t("Teams meeting link", "ลิงก์ประชุม Teams")}</div>
                  <div className="sub">{t("Auto-generate join URL + dial-in", "สร้าง URL เข้าร่วมและเบอร์โทรอัตโนมัติ")}</div>
                </div>
              </div>
              <div className={"tog" + (teamsOn ? " on" : "")} onClick={() => setTeamsOn(!teamsOn)}></div>
            </div>

            <div className="toggle-row">
              <div className="lbl">
                <div className="ic-sq" style={{background: "var(--color-purple-soft)", color: "var(--color-purple)"}}>
                  <Icon name="refresh" size={14} />
                </div>
                <div>
                  <div className="nm">{t("Recurring", "ประชุมประจำ")}</div>
                  <div className="sub">{t("Repeat weekly until cancelled", "ทำซ้ำทุกสัปดาห์จนกว่าจะยกเลิก")}</div>
                </div>
              </div>
              <div className={"tog" + (recurring ? " on" : "")} onClick={() => setRecurring(!recurring)}></div>
            </div>
          </div>

          <div style={{
            padding: "12px 16px",
            borderTop: "1px solid var(--color-border)",
            display: "flex", gap: 8, justifyContent: "flex-end"
          }}>
            <button className="btn">{t("Save draft", "บันทึกฉบับร่าง")}</button>
            <button
              className="btn primary"
              disabled={conflicts.length === attendees.length}
              onClick={sendInvites}
              style={conflicts.length === attendees.length ? {opacity: 0.5, cursor: "not-allowed"} : {}}
              title={conflicts.length === attendees.length ? t("Cannot send — no one is available", "ส่งไม่ได้ — ไม่มีใครว่าง") : ""}
            >
              <Icon name="send" size={14} />{t("Send invites & set meeting", "ส่งคำเชิญและจองประชุม")}
            </button>
          </div>
        </div>
      </div>

      {/* Success modal */}
      <div className={"modal-backdrop" + (confirmed ? " open" : "")} onClick={closeModal}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          {confirmed && (
            <React.Fragment>
              <div className="mh">
                <div className="check"><Icon name="check" size={28} /></div>
                <h3>{t("Meeting set successfully", "จองประชุมสำเร็จ")}</h3>
                <p>{t(
                  `Invites are on the way to ${confirmed.attendees.length} attendees.`,
                  `กำลังส่งคำเชิญถึงผู้เข้าร่วม ${confirmed.attendees.length} คน`
                )}</p>
              </div>
              <div className="mb">
                <div className="summary">
                  <div className="summary-row">
                    <div className="lbl">{t("Title", "หัวข้อ")}</div>
                    <div className="val">{confirmed.title}</div>
                  </div>
                  <div className="summary-row">
                    <div className="lbl">{t("Time", "เวลา")}</div>
                    <div className="val">
                      {dayDate(confirmed.d, isTh ? "th" : "en")}, {fmtTime(confirmed.s, isTh ? "th" : "en")} — {fmtTime(confirmed.s + confirmed.span, isTh ? "th" : "en")}
                    </div>
                  </div>
                  <div className="summary-row">
                    <div className="lbl">{t("Location", "สถานที่")}</div>
                    <div className="val">{confirmed.location}</div>
                  </div>
                  <div className="summary-row">
                    <div className="lbl">{t("Attendees", "ผู้เข้าร่วม")}</div>
                    <div className="val">
                      <div style={{display: "flex", flexWrap: "wrap", gap: 4}}>
                        {confirmed.attendees.map(a => (
                          <span key={a.id} className="chip" style={{padding: "2px 8px 2px 2px"}}>
                            <div className={"av sm " + a.color} style={{marginRight: 4}}>{a.initials}</div>
                            {a.name.split(" ")[0]}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="delivered">
                  {confirmed.outlook && (
                    <div className="row">
                      <span className="tick"><Icon name="check" size={10} /></span>
                      <Icon name="mail" size={12} color="#0078D4" />
                      <span>{t(
                        `Outlook invites sent to all ${confirmed.attendees.length} attendees`,
                        `ส่งคำเชิญ Outlook ถึงผู้เข้าร่วมทั้ง ${confirmed.attendees.length} คนแล้ว`
                      )}</span>
                    </div>
                  )}
                  {confirmed.teamsOn && (
                    <div className="row">
                      <span className="tick"><Icon name="check" size={10} /></span>
                      <Icon name="teams" size={12} color="#464EB8" />
                      <span>
                        {t("Teams link", "ลิงก์ Teams")}:{" "}
                        <a href={confirmed.teamsLink} onClick={e => e.preventDefault()}
                          style={{color: "var(--color-primary)", fontFamily: "Cascadia Code, Consolas, monospace"}}>
                          {confirmed.teamsLink}
                        </a>
                      </span>
                    </div>
                  )}
                  <div className="row">
                    <span className="tick"><Icon name="check" size={10} /></span>
                    <Icon name="calendar" size={12} color="var(--color-primary)" />
                    <span>{t("Added to calendar", "เพิ่มลงปฏิทินแล้ว")}</span>
                  </div>
                  {confirmed.conflicts > 0 && (
                    <div className="row" style={{color: "var(--orange-chip-text)"}}>
                      <Icon name="alert" size={12} />
                      <span>{t(
                        `${confirmed.conflicts} attendee(s) had conflicts and may decline`,
                        `มี ${confirmed.conflicts} คนติดเวลาและอาจปฏิเสธ`
                      )}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mf">
                <button className="btn" onClick={closeModal}>{t("View in calendar", "ดูในปฏิทิน")}</button>
                <button className="btn primary" onClick={closeModal}>{t("Done", "เสร็จสิ้น")}</button>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

window.MeetingSchedule = MeetingSchedule;
