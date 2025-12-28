// ============================================================
//                PROFILE PAGE v6 – FUTURISTIC ULTRA UI
// ============================================================

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Edit3,
  Lock,
  KeyRound,
  Bell,
  Image as ImageIcon,
  Award,
  Star,
  Sparkles,
  Paintbrush,
  Globe,
  Github,
  Linkedin,
  Bot,
  ChevronRight,
  CreditCard,
  Shield,
  Smartphone,
  Mic,
  Volume2,
  VolumeX,
  Fingerprint,
} from "lucide-react";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  Radar,
  RadarChart,
  PolarAngleAxis,
  PolarGrid,
} from "recharts";

export default function Profile() {
  const [tab, setTab] = useState("profile");
  const [theme, setTheme] = useState("cyan");
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/300");
  const [cubeMode, setCubeMode] = useState(false);

  const [aiMessages, setAiMessages] = useState([
    { from: "bot", text: "Hello! I'm your AI Investment Advisor." }
  ]);
  const [userMessage, setUserMessage] = useState("");
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);

  // ---------------- Radar Data ----------------
  const personaRadar = [
    { trait: "Risk", value: 85 },
    { trait: "Patience", value: 60 },
    { trait: "Consistency", value: 90 },
    { trait: "Aggression", value: 30 },
    { trait: "Research", value: 75 },
  ];

  const themeColors = {
    cyan: "from-cyan-500/50 to-blue-600/50",
    purple: "from-purple-500/50 to-pink-600/50",
    emerald: "from-emerald-500/50 to-teal-600/50",
  };

  // ---------------- Portfolio Chart ----------------
  const chartData = [
    { month: "Jan", value: 20 },
    { month: "Feb", value: 40 },
    { month: "Mar", value: 60 },
    { month: "Apr", value: 55 },
    { month: "May", value: 80 },
    { month: "Jun", value: 95 },
  ];

  // ---------------- Speech Recognition ----------------
  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setUserMessage(text);
        sendMessage(text);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const startListening = () => {
    if (!recognitionRef.current) return;
    setListening(true);
    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (!recognitionRef.current) return;
    setListening(false);
    recognitionRef.current.stop();
  };

  // ---------------- AI Message Handler ----------------
  const sendMessage = (overrideText) => {
    const msg = overrideText || userMessage;
    if (!msg.trim()) return;

    const newMsg = { from: "user", text: msg };
    setAiMessages([...aiMessages, newMsg]);

    // Fake AI Engine
    setTimeout(() => {
      setAiMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text:
            "Based on your profile, you're an 'Aggressive Long-Term Investor'. Explore Large Cap + Flexi Cap portfolios.",
        },
      ]);
    }, 900);

    setUserMessage("");
  };

  // ---------------- Avatar Change ----------------
  const handleAvatarChange = (e) => {
    const f = e.target.files[0];
    if (f) setAvatar(URL.createObjectURL(f));
  };

  return (
    <div className="p-8 text-white min-h-screen">

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-1"
      >
        Your Premium Profile
      </motion.h1>

      <p className="text-gray-400 mb-8">
        AI-powered personalization, advanced analytics & futuristic UI.
      </p>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ================= LEFT PANEL ================= */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative overflow-hidden backdrop-blur-2xl bg-white/5 border border-white/10 p-8 rounded-3xl shadow-[0_0_40px_rgba(0,255,255,0.2)]"
        >
          {/* Themed Glow */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${themeColors[theme]} opacity-25 pointer-events-none`}
          />

          {/* Avatar + 3D Mode */}
          <div className="flex flex-col items-center relative z-20">

            {/* AVATAR / CUBE */}
            <motion.div
              animate={
                cubeMode
                  ? { rotateY: 360 }
                  : { rotateY: 0 }
              }
              transition={{
                duration: cubeMode ? 3 : 0.5,
                repeat: cubeMode ? Infinity : 0,
                ease: "linear",
              }}
              className={`${
                cubeMode
                  ? "w-40 h-40 rounded-none"
                  : "w-44 h-44 rounded-full"
              } overflow-hidden border-4 border-white/20 shadow-[0_0_40px_rgba(0,255,255,0.4)]`}
            >
              <img
                src={avatar}
                alt="avatar"
                className="w-full h-full object-cover"
                draggable="false"
              />
            </motion.div>

            {/* Toggle Cube Button */}
            <button
              className="mt-3 px-4 py-2 bg-cyan-500/30 backdrop-blur-xl rounded-xl hover:bg-cyan-500/50 transition"
              onClick={() => setCubeMode(!cubeMode)}
            >
              Toggle 3D Avatar
            </button>

            {/* Upload Avatar */}
            <label className="mt-4 bg-black/40 px-4 py-2 rounded-xl cursor-pointer flex items-center gap-2">
              <ImageIcon size={16} /> Change Image
              <input type="file" className="hidden" onChange={handleAvatarChange} />
            </label>

            {/* Name */}
            <h2 className="text-2xl font-semibold mt-5">Suhail</h2>
            <p className="text-gray-400">Premium Member</p>

            {/* ===== Tabs (Left Panel Navigation) ===== */}
            <div className="mt-8 w-full space-y-2">

              {/* Add/Remove tabs easily */}
              {[
                "profile",
                "security",
                "preferences",
                "portfolio",
                "persona",
                "achievements",
                "aiassistant",
                "roi",
                "sentiment",
                "avatar-ai",
                "xp",
                "payments",
                "connections",
                "2fa",
              ].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`w-full text-left px-4 py-2 rounded-xl capitalize flex items-center gap-2 transition ${
                    tab === t
                      ? "bg-cyan-500/20 text-cyan-400"
                      : "text-gray-300 hover:bg-white/5"
                  }`}
                >
                  <ChevronRight size={16} />
                  {t.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ================= RIGHT PANEL ================= */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 backdrop-blur-2xl bg-white/5 p-8 rounded-3xl border border-white/10 shadow-2xl"
        >
          {/* Tab Switch */}
          {tab === "profile" && <ProfileTab />}
          {tab === "security" && <SecurityTab />}
          {tab === "preferences" && (
            <PreferencesTab theme={theme} setTheme={setTheme} />
          )}
          {tab === "portfolio" && (
            <PortfolioAnalytics data={chartData} />
          )}
          {tab === "persona" && (
            <PersonaChart radar={personaRadar} />
          )}
          {tab === "achievements" && <Achievements />}
          {tab === "aiassistant" && (
            <AIAssistant
              aiMessages={aiMessages}
              userMessage={userMessage}
              setUserMessage={setUserMessage}
              sendMessage={sendMessage}
              listening={listening}
              startListening={startListening}
              stopListening={stopListening}
            />
          )}
          {tab === "roi" && <ROIPredictor />}
          {tab === "sentiment" && <MarketSentiment />}
          {tab === "avatar-ai" && <AIAvatarGenerator />}
          {tab === "xp" && <XPSystem />}
          {tab === "payments" && <Payments />}
          {tab === "connections" && <Connections />}
          {tab === "2fa" && <TwoFactor />}
        </motion.div>
      </div>
    </div>
  );
}
// ============================================================
//                         PROFILE TAB
// ============================================================
function ProfileTab() {
  return (
    <>
      <h3 className="text-3xl font-semibold mb-6">Personal Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* NAME */}
        <GlassInput
          label="Full Name"
          icon={<User size={16} />}
          defaultValue="Suhail"
        />

        {/* EMAIL */}
        <GlassInput
          label="Email Address"
          icon={<Mail size={16} />}
          defaultValue="guest@xfunds.com"
        />

        {/* PHONE */}
        <GlassInput
          label="Phone Number"
          icon={<Phone size={16} />}
          defaultValue="+91 90000 00000"
        />

        {/* JOIN DATE */}
        <GlassInput
          label="Member Since"
          icon={<Calendar size={16} />}
          defaultValue="Nov 2025"
          disabled
        />
      </div>

      <SaveButton />
    </>
  );
}

// ============================================================
//                         SECURITY TAB
// ============================================================
function SecurityTab() {
  return (
    <>
      <h3 className="text-3xl font-semibold mb-6">Security Settings</h3>

      <GlassToggle
        label="Two-Factor Authentication"
        icon={<Fingerprint size={18} />}
      />

      <GlassToggle
        label="Email Login Alerts"
        icon={<Bell size={18} />}
      />

      <GlassToggle
        label="Device Login Protection"
        icon={<Smartphone size={18} />}
      />

      <SaveButton />
    </>
  );
}

// ============================================================
//                        PREFERENCES TAB
// ============================================================
function PreferencesTab({ theme, setTheme }) {
  return (
    <>
      <h3 className="text-3xl font-semibold mb-6">Preferences</h3>

      <div className="space-y-6">

        <GlassToggle
          label="Dark Neon UI"
          icon={<Paintbrush size={18} />}
        />

        <GlassToggle
          label="Real-time News Notifications"
          icon={<Bell size={18} />}
        />

        {/* THEME SELECT */}
        <div>
          <p className="text-gray-300 mb-2 flex items-center gap-2">
            <Globe size={16} /> Dashboard Theme
          </p>

          <div className="flex gap-4">
            {[
              { id: "cyan", color: "bg-cyan-500" },
              { id: "purple", color: "bg-purple-500" },
              { id: "emerald", color: "bg-emerald-500" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`w-10 h-10 rounded-full shadow-lg ${t.color} ${
                  theme === t.id ? "ring-4 ring-white" : "opacity-50"
                }`}
              ></button>
            ))}
          </div>
        </div>

        <SaveButton />
      </div>
    </>
  );
}

// ============================================================
//                       PORTFOLIO ANALYTICS
// ============================================================
function PortfolioAnalytics({ data }) {
  return (
    <>
      <h3 className="text-3xl font-semibold mb-6">Portfolio Performance</h3>

      <div className="bg-white/10 p-6 rounded-2xl border border-white/10 shadow-xl">
        <h4 className="text-xl mb-4 text-gray-300">Investment Growth</h4>

        <div className="w-full h-64">
          <ResponsiveContainer>
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#06b6d4"
                strokeWidth={3}
                dot={{ stroke: "#06b6d4", strokeWidth: 2 }}
              />
              <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

// ============================================================
//                        PERSONA RADAR CHART
// ============================================================
function PersonaChart({ radar }) {
  return (
    <>
      <h3 className="text-3xl font-semibold mb-6">Investor Persona</h3>

      <div className="bg-white/10 p-6 rounded-2xl border border-white/10 shadow-xl">

        <div className="w-full h-80">
          <ResponsiveContainer>
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radar}>
              <PolarGrid />
              <PolarAngleAxis dataKey="trait" stroke="#94a3b8" />
              <Radar
                name="Score"
                dataKey="value"
                stroke="#06b6d4"
                fill="#06b6d4"
                fillOpacity={0.4}
              />
              <Tooltip
                contentStyle={{
                  background: "#0f172a",
                  border: "1px solid #1e293b",
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

// ============================================================
//                        ACHIEVEMENTS TAB
// ============================================================
function Achievements() {
  const items = [
    { title: "First Investment", icon: <Star />, color: "text-yellow-400" },
    { title: "100 Days Active", icon: <Award />, color: "text-cyan-400" },
    { title: "Risk Analyst", icon: <Sparkles />, color: "text-purple-400" },
  ];

  return (
    <>
      <h3 className="text-3xl font-semibold mb-6">Achievements</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((a, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 p-6 rounded-2xl border border-white/10 shadow-xl flex items-center gap-4"
          >
            <div className={`text-3xl ${a.color}`}>{a.icon}</div>
            <p className="text-lg">{a.title}</p>
          </motion.div>
        ))}
      </div>
    </>
  );
}
// ============================================================
//                      AI INVESTMENT ASSISTANT
// ============================================================
function AIAssistant({
  aiMessages,
  userMessage,
  setUserMessage,
  sendMessage,
  listening,
  startListening,
  stopListening,
}) {
  return (
    <>
      <h3 className="text-3xl font-semibold mb-6">AI Investment Assistant</h3>

      {/* Chat Window */}
      <div className="bg-white/10 border border-white/10 rounded-2xl p-6 h-96 overflow-y-auto mb-4 space-y-4">
        {aiMessages.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl max-w-[80%] ${
              m.from === "bot"
                ? "bg-cyan-500/20 text-cyan-300"
                : "bg-white/10 text-white ml-auto"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-3">
        <input
          className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
          placeholder="Ask something…"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />

        <button
          onClick={() => sendMessage()}
          className="bg-cyan-500 px-4 py-3 rounded-xl hover:bg-cyan-400"
        >
          Send
        </button>

        {/* Voice Button */}
        <button
          onClick={listening ? stopListening : startListening}
          className="bg-purple-500 px-4 py-3 rounded-xl hover:bg-purple-400"
        >
          {listening ? <VolumeX /> : <Mic />}
        </button>
      </div>
    </>
  );
}

// ============================================================
//                        ROI PREDICTOR v6
// ============================================================
function ROIPredictor() {
  const [monthly, setMonthly] = useState(5000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);

  // Future Value Formula (Monthly SIP)
  const fv =
    monthly *
    (((1 + rate / 100 / 12) ** (years * 12) - 1) / (rate / 100 / 12));

  return (
    <>
      <h3 className="text-3xl font-semibold mb-6">AI ROI Predictor</h3>

      <div className="bg-white/10 p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">

        {/* Monthly */}
        <SliderInput
          label="Monthly Investment"
          min={500}
          max={50000}
          value={monthly}
          setValue={setMonthly}
          unit="₹"
        />

        {/* Years */}
        <SliderInput
          label="Investment Duration"
          min={1}
          max={30}
          value={years}
          setValue={setYears}
          unit="years"
        />

        {/* Rate */}
        <SliderInput
          label="Expected Annual Return"
          min={6}
          max={20}
          value={rate}
          setValue={setRate}
          unit="%"
        />

        {/* Output */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="mt-8 p-6 bg-cyan-500/20 rounded-2xl text-center shadow-lg shadow-cyan-500/30"
        >
          <h4 className="text-xl font-semibold">Future Value</h4>
          <p className="text-4xl font-bold text-cyan-400 mt-2">
            ₹ {fv.toLocaleString()}
          </p>
          <p className="text-gray-400 mt-2">Based on compound interest</p>
        </motion.div>
      </div>
    </>
  );
}

// ============================================================
//                 MARKET SENTIMENT (FEAR–GREED)
// ============================================================
function MarketSentiment() {
  const sentiment = 72; // pretend AI fetch

  const status =
    sentiment < 40
      ? "Fear Zone"
      : sentiment < 70
      ? "Neutral"
      : "Greed Zone";

  const color =
    sentiment < 40
      ? "bg-red-500"
      : sentiment < 70
      ? "bg-yellow-500"
      : "bg-green-500";

  return (
    <>
      <h3 className="text-3xl font-semibold mb-6">Market Sentiment Index</h3>

      <div className="bg-white/10 p-6 rounded-2xl border border-white/10 shadow-xl">

        <h4 className="text-xl mb-4">Fear–Greed Meter</h4>

        <div className="relative w-full h-8 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${sentiment}%` }}
            transition={{ duration: 1 }}
            className={`h-full ${color}`}
          ></motion.div>
        </div>

        <p className="mt-4 text-lg text-gray-300">
          Current Sentiment:{" "}
          <span
            className={
              sentiment < 40
                ? "text-red-400"
                : sentiment < 70
                ? "text-yellow-400"
                : "text-green-400"
            }
          >
            {status}
          </span>
        </p>
      </div>
    </>
  );
}

// ============================================================
//                    AI AVATAR GENERATOR
// ============================================================
function AIAvatarGenerator() {
  const [prompt, setPrompt] = useState("");

  return (
    <>
      <h3 className="text-3xl font-semibold mb-6">AI Avatar Generator</h3>

      <div className="bg-white/10 p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">

        <p className="text-gray-300">
          Create AI-based avatars based on your description.
        </p>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your avatar…"
          className="w-full p-4 bg-white/10 border border-white/10 rounded-xl outline-none"
        />

        <button className="px-6 py-3 bg-purple-500 rounded-xl hover:bg-purple-400 shadow-lg">
          Generate Avatar
        </button>
      </div>
    </>
  );
}

// ============================================================
//                 XP SYSTEM / INVESTOR LEVEL
// ============================================================
function XPSystem() {
  const level = 12;
  const xp = 3400;
  const next = 5000;

  const progress = (xp / next) * 100;

  return (
    <>
      <h3 className="text-3xl font-semibold mb-6">Investor Rank</h3>

      <div className="bg-white/10 p-6 border border-white/10 rounded-2xl shadow-xl">
        <p className="text-lg text-gray-300 mb-2">Level {level}</p>

        <div className="w-full h-6 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1 }}
            className="h-full bg-cyan-400"
          ></motion.div>
        </div>

        <p className="text-gray-400 mt-3">
          {xp} XP / {next} XP
        </p>
      </div>
    </>
  );
}

// ============================================================
//                   PAYMENTS / SUBSCRIPTION
// ============================================================
function Payments() {
  return (
    <>
      <h3 className="text-3xl font-semibold mb-6">Payment Methods</h3>

      <div className="bg-white/10 p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">

        <div className="flex items-center gap-4">
          <CreditCard size={32} className="text-cyan-400" />
          <p className="text-gray-300">No active cards linked.</p>
        </div>

        <button className="px-6 py-3 bg-cyan-500 rounded-xl hover:bg-cyan-400 shadow-lg">
          Add Payment Method
        </button>
      </div>
    </>
  );
}

// ============================================================
//                    CONNECTIONS (GITHUB, LINKEDIN)
// ============================================================
function Connections() {
  return (
    <>
      <h3 className="text-3xl font-semibold mb-6">Social Connections</h3>

      <div className="space-y-4">

        <GlassConnection
          icon={<Github size={22} />}
          title="GitHub"
          status="Not Linked"
        />

        <GlassConnection
          icon={<Linkedin size={22} />}
          title="LinkedIn"
          status="Connected"
        />
      </div>
    </>
  );
}

// ============================================================
//                   TWO-FACTOR AUTHENTICATION
// ============================================================
function TwoFactor() {
  return (
    <>
      <h3 className="text-3xl font-semibold mb-6">Two-Factor Authentication</h3>

      <div className="bg-white/10 p-6 border border-white/10 rounded-2xl shadow-xl space-y-4">

        <p className="text-gray-300">
          Add an extra layer of protection to your profile.
        </p>

        <button className="px-6 py-3 bg-purple-500 rounded-xl hover:bg-purple-400 shadow-lg flex items-center gap-2">
          <KeyRound size={18} /> Enable 2FA
        </button>

        <button className="px-6 py-3 bg-red-500/30 rounded-xl text-red-300 hover:bg-red-500/40">
          Disable 2FA
        </button>
      </div>
    </>
  );
}
// ============================================================
//                    GLASS INPUT COMPONENT
// ============================================================
function GlassInput({ label, icon, defaultValue, disabled }) {
  return (
    <div>
      <p className="text-gray-300 mb-1 flex items-center gap-2">
        {icon} {label}
      </p>
      <input
        type="text"
        defaultValue={defaultValue}
        disabled={disabled}
        className={`w-full p-3 bg-white/10 border border-white/10 rounded-xl outline-none text-white ${
          disabled ? "opacity-50" : "focus:border-cyan-400"
        }`}
      />
    </div>
  );
}

// ============================================================
//                     GLASS TOGGLE SWITCH
// ============================================================
function GlassToggle({ label, icon }) {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center justify-between p-4 bg-white/10 border border-white/10 rounded-xl">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-gray-300">{label}</p>
      </div>

      <motion.div
        onClick={() => setEnabled(!enabled)}
        className={`w-12 h-6 rounded-full cursor-pointer relative ${
          enabled ? "bg-cyan-500" : "bg-white/20"
        }`}
      >
        <motion.div
          className="w-6 h-6 bg-white rounded-full absolute top-0"
          animate={{ x: enabled ? 24 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      </motion.div>
    </div>
  );
}

// ============================================================
//                     RANGE SLIDER INPUT
// ============================================================
function SliderInput({ label, min, max, value, setValue, unit }) {
  return (
    <div>
      <p className="text-gray-300">{label}</p>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        className="w-full mt-2"
        onChange={(e) => setValue(e.target.value)}
      />

      <p className="text-cyan-400 mt-1 text-sm">
        {unit === "₹"
          ? `₹ ${value}`
          : `${value} ${unit}`}
      </p>
    </div>
  );
}

// ============================================================
//                         SAVE BUTTON
// ============================================================
function SaveButton() {
  return (
    <button className="mt-8 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/30 text-lg">
      Save Changes
    </button>
  );
}

// ============================================================
//                SOCIAL CONNECTIONS BOX (Github / LinkedIn)
// ============================================================
function GlassConnection({ icon, title, status }) {
  return (
    <div className="flex items-center justify-between bg-white/10 p-4 border border-white/10 rounded-xl">
      <div className="flex items-center gap-3">
        <div className="text-cyan-400">{icon}</div>
        <p className="text-white">{title}</p>
      </div>

      <p
        className={`text-sm ${
          status === "Connected" ? "text-green-400" : "text-yellow-400"
        }`}
      >
        {status}
      </p>
    </div>
  );
}

// ============================================================
//        FINAL WRAPPER — ENSURES CLEAN COMPONENT CLOSURE
// ============================================================

// (Nothing more to add here — all components are above)
// We only ensure no syntax errors exist and JSX closes properly.


// END OF FILE — PROFILE PAGE V6 (Complete)

