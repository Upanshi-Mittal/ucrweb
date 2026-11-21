import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Users, 
  Swords, 
  ShieldCheck, 
  Trophy, 
  CheckCircle2, 
  Sparkles, 
  Phone,
  Mail,
  GraduationCap,
  Download, 
  Layers,
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import Footer from '../components/Footer';
import clawclashImg from '../assets/clawclash.webp';
import clawclashPdf from '../assets/resource/Clawclash.pdf';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import db from '../firebase';

export interface TeamRegistration {
  id: string;
  groupName: string;
  botName: string;
  leaderName: string;
  enrollment: string;
  phone: string;
  contactEmail: string;
  teamSize: string;
  registeredAt: string;
  status: 'Confirmed' | 'Pending Review';
  gripperType?: string;
  mcuType?: string;
  botNotes?: string;
}

const STORAGE_KEY = 'clawclash_team_registrations';

const Clawclash: React.FC = () => {
  const [formData, setFormData] = useState({
    groupName: '',
    botName: '',
    leaderName: '',
    enrollment: '',
    phone: '',
    contactEmail: '',
    teamSize: '4 Members'
  });

  const [registrations, setRegistrations] = useState<TeamRegistration[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<TeamRegistration | null>(null);
  const [activeTab, setActiveTab] = useState<'register' | 'rules' | 'roster'>('register');
  const [isFirebaseLive, setIsFirebaseLive] = useState(false);

  // Check if Firebase is configured via Vite environment variables
  const isFirebaseConfigured = Boolean(
    import.meta.env.VITE_FIREBASE_PROJECT_ID && 
    import.meta.env.VITE_FIREBASE_API_KEY
  );

  // Real-time Firestore sync when deployed/configured, with localStorage fallback
  useEffect(() => {
    if (isFirebaseConfigured) {
      try {
        const teamsQuery = query(
          collection(db, 'clawclashTeams'),
          orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(
          teamsQuery,
          (snapshot) => {
            setIsFirebaseLive(true);
            const liveTeams: TeamRegistration[] = snapshot.docs.map((doc) => {
              const data = doc.data();
              return {
                id: data.slotId || (doc.id.startsWith('CC-') ? doc.id : `CC-${doc.id.slice(0, 4).toUpperCase()}`),
                groupName: data.groupName || 'Unnamed Group',
                botName: data.botName || 'Unnamed Bot',
                leaderName: data.leaderName || 'N/A',
                enrollment: data.enrollment || 'N/A',
                phone: data.phone || 'N/A',
                contactEmail: data.contactEmail || 'N/A',
                teamSize: data.teamSize || '4 Members',
                registeredAt: data.registeredAt || (data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString()),
                status: 'Confirmed'
              };
            });
            setRegistrations(liveTeams);
          },
          (error) => {
            console.warn('Firestore onSnapshot listener error, falling back to local storage:', error);
            setIsFirebaseLive(false);
            loadLocalRegistrations();
          }
        );

        return () => unsubscribe();
      } catch (err) {
        console.warn('Could not initialize Firestore listener:', err);
        setIsFirebaseLive(false);
        loadLocalRegistrations();
      }
    } else {
      setIsFirebaseLive(false);
      loadLocalRegistrations();
    }
  }, [isFirebaseConfigured]);

  const loadLocalRegistrations = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setRegistrations(parsed);
          return;
        }
      }
      setRegistrations([]);
    } catch {
      setRegistrations([]);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const trimmedGroup = formData.groupName.trim();
    const trimmedBot = formData.botName.trim();
    const trimmedLeader = formData.leaderName.trim();
    const trimmedEnrollment = formData.enrollment.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedEmail = formData.contactEmail.trim();

    if (
      !trimmedGroup || 
      !trimmedBot || 
      !trimmedLeader || 
      !trimmedEnrollment || 
      !trimmedPhone || 
      !trimmedEmail ||
      !formData.teamSize
    ) {
      alert("Please fill in all compulsory fields (Group Name, Bot Name, Leader Name, Enrollment, Phone, Email, and Team Size).");
      return;
    }

    setIsSubmitting(true);

    const slotId = `CC-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowIso = new Date().toISOString();

    const newEntry: TeamRegistration = {
      id: slotId,
      groupName: trimmedGroup,
      botName: trimmedBot,
      leaderName: trimmedLeader,
      enrollment: trimmedEnrollment,
      phone: trimmedPhone,
      contactEmail: trimmedEmail,
      teamSize: formData.teamSize,
      registeredAt: nowIso,
      status: 'Confirmed'
    };

    // Optional Google Sheet sync if VITE_GOOGLE_SHEET_URL is configured
    const sheetWebhookUrl = import.meta.env.VITE_GOOGLE_SHEET_URL;
    if (sheetWebhookUrl) {
      fetch(sheetWebhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEntry)
      }).catch(err => console.warn('Google Sheet sync error:', err));
    }

    if (!isFirebaseConfigured) {
      // Local fallback mode
      const updated = [newEntry, ...registrations.filter(r => r.id !== slotId)];
      setRegistrations(updated);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (saveErr) {
        console.warn('LocalStorage save error:', saveErr);
      }
      setIsSubmitting(false);
      setSubmittedData(newEntry);
      return;
    }

    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Firebase connection timed out after 8 seconds. Check your Firestore Security Rules.')), 8000)
      );

      await Promise.race([
        addDoc(collection(db, 'clawclashTeams'), {
          slotId: slotId,
          groupName: newEntry.groupName,
          botName: newEntry.botName,
          leaderName: newEntry.leaderName,
          enrollment: newEntry.enrollment,
          phone: newEntry.phone,
          contactEmail: newEntry.contactEmail,
          teamSize: newEntry.teamSize,
          registeredAt: nowIso,
          createdAt: serverTimestamp()
        }),
        timeoutPromise
      ]);

      setIsSubmitting(false);
      setSubmittedData(newEntry);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to write to Firebase';
      console.error('Firebase submission error:', err);
      setIsSubmitting(false);
      setSubmitError(`Could not save to Firebase: ${message}`);
      alert(`⚠️ Firebase Error: ${message}\n\nPlease check your Firestore "Rules" tab in the Firebase console.`);
    }
  };

  const handleResetForm = () => {
    setSubmittedData(null);
    setSubmitError(null);
    setFormData({
      groupName: '',
      botName: '',
      leaderName: '',
      enrollment: '',
      phone: '',
      contactEmail: '',
      teamSize: '4 Members'
    });
  };

  return (
    <div className="pt-20 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center space-y-4">
            
            {/* Live Event Pill */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-black bg-red-500 text-white font-bold text-xs sm:text-sm shadow-[3px_3px_0_black]"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              <span>FLAGSHIP ARENA EVENT • CLAWCLASH 2026</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-black"
            >
              Claw<span className="text-red-600">Clash</span> Arena
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-xl md:text-2xl max-w-3xl text-neutral-700 leading-relaxed font-medium"
            >
              Register your group and combat robot for the pick-and-place championship. All submissions sync directly to the official arena roster.
            </motion.p>

            {/* Quick stats pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-3 pt-2"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 border-black bg-yellow-400 text-black text-xs sm:text-sm font-bold shadow-[2px_2px_0_black]">
                <Bot className="w-4 h-4" />
                <span>Pick & Place Category</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 border-black bg-white text-black text-xs sm:text-sm font-bold shadow-[2px_2px_0_black]">
                <Swords className="w-4 h-4 text-red-600" />
                <span>Time-Trial Obstacles</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 border-black bg-blue-500 text-white text-xs sm:text-sm font-bold shadow-[2px_2px_0_black]">
                <Trophy className="w-4 h-4" />
                <span>Prizes & Podiums</span>
              </div>
            </motion.div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 sm:gap-4 mt-6 pt-2">
              <button
                onClick={() => setActiveTab('register')}
                className={`px-5 py-2.5 rounded-xl border-2 border-black font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer ${
                  activeTab === 'register'
                    ? 'bg-yellow-400 text-black shadow-[4px_4px_0_black] -translate-y-0.5'
                    : 'bg-white text-neutral-700 shadow-[2px_2px_0_black] hover:bg-neutral-50'
                }`}
              >
                Registration Form
              </button>
              <button
                onClick={() => setActiveTab('rules')}
                className={`px-5 py-2.5 rounded-xl border-2 border-black font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer ${
                  activeTab === 'rules'
                    ? 'bg-yellow-400 text-black shadow-[4px_4px_0_black] -translate-y-0.5'
                    : 'bg-white text-neutral-700 shadow-[2px_2px_0_black] hover:bg-neutral-50'
                }`}
              >
                Arena Rules & Specs
              </button>
              <button
                onClick={() => setActiveTab('roster')}
                className={`px-5 py-2.5 rounded-xl border-2 border-black font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer ${
                  activeTab === 'roster'
                    ? 'bg-yellow-400 text-black shadow-[4px_4px_0_black] -translate-y-0.5'
                    : 'bg-white text-neutral-700 shadow-[2px_2px_0_black] hover:bg-neutral-50'
                }`}
              >
                Live Roster ({registrations.length})
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* TAB 1: REGISTRATION FORM */}
          {activeTab === 'register' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              
              {/* Left Column: Event Card + Live Pass Preview */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Event Poster Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="rounded-2xl border-3 border-black bg-[#fffdf7] p-5 shadow-[6px_6px_0_black] relative overflow-hidden"
                >
                  <div className="relative rounded-xl border-2 border-black overflow-hidden mb-4 aspect-video bg-neutral-900 shadow-[2px_2px_0_black]">
                    <img
                      src={clawclashImg}
                      alt="ClawClash Event"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute top-2 right-2 px-2.5 py-1 rounded-lg border-2 border-black bg-red-500 text-white font-bold text-xs shadow-[2px_2px_0_black]">
                      ARENA READY
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-black mb-1">Pick & Place Robotic Challenge</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
                    Build a bot equipped with a motorized gripper or claw. Navigate the obstacle grid, pick target objects, and deposit them into the scoring depot.
                  </p>

                  <div className="space-y-2.5 border-t-2 border-black/10 pt-3 text-xs sm:text-sm">
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-neutral-600">Event Host:</span>
                      <span className="text-black font-bold">μCR Robotics Hub, JIIT-62</span>
                    </div>
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-neutral-600">Bot Max Dimensions:</span>
                      <span className="text-black font-bold">15 X 20 cm</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t-2 border-black/10">
                    <a
                      href={clawclashPdf}
                      download="Clawclash_Rules.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl border-2 border-black bg-white hover:bg-neutral-50 text-black font-bold text-xs sm:text-sm shadow-[3px_3px_0_black] hover:shadow-[3px_3px_0_#facc15] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4 text-red-600" />
                      <span>Download ClawClash Slide Deck & Rules (PDF)</span>
                    </a>
                  </div>
                </motion.div>

                {/* Live Arena Pass Preview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-2xl border-3 border-black bg-gradient-to-br from-yellow-300 via-amber-200 to-yellow-400 p-5 shadow-[6px_6px_0_black] relative"
                >
                  <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg border-2 border-black bg-black text-yellow-400 flex items-center justify-center">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-black tracking-wider uppercase text-black">
                        Live Arena Pass Preview
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-md border border-black bg-black text-white font-mono text-[10px] font-bold">
                      SLOT: #NEW
                    </span>
                  </div>

                  <div className="bg-white rounded-xl border-2 border-black p-4 space-y-3 shadow-[3px_3px_0_black]">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                        Group / Team Name
                      </div>
                      <div className="text-lg font-black text-black truncate">
                        {formData.groupName.trim() || (
                          <span className="text-neutral-400 italic font-normal">Enter Group Name below...</span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-black/10">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                          Bot's Name
                        </div>
                        <div className="text-sm font-bold text-red-600 truncate">
                          {formData.botName.trim() || (
                            <span className="text-neutral-400 italic font-normal">Enter Bot Name...</span>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                          Team Size
                        </div>
                        <div className="text-xs font-semibold text-neutral-800 truncate">
                          {formData.teamSize}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-black/10 text-[11px] font-medium text-neutral-600">
                      <span>Pilot: {formData.leaderName.trim() || '—'}</span>
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Arena Pass
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Registration Form or Confirmed Ticket */}
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="rounded-2xl border-3 border-black bg-[#fffdf7] p-6 sm:p-8 shadow-[6px_6px_0_black] relative"
                >
                  <AnimatePresence mode="wait">
                    {submittedData ? (
                      /* Success View */
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="space-y-6 py-4"
                      >
                        <div className="text-center space-y-3">
                          <div className="w-16 h-16 rounded-2xl border-3 border-black bg-emerald-400 text-black mx-auto flex items-center justify-center shadow-[4px_4px_0_black]">
                            <CheckCircle2 className="w-9 h-9" />
                          </div>
                          <span className="px-3 py-1 rounded-full text-xs font-bold border-2 border-black bg-emerald-100 text-emerald-800">
                            REGISTRATION CONFIRMED
                          </span>
                          <h2 className="text-2xl sm:text-3xl font-extrabold text-black">
                            Registration Successful!
                          </h2>
                          <p className="text-sm text-neutral-600 max-w-md mx-auto">
                            Your group and combat robot have been officially registered for the ClawClash tournament.
                          </p>
                        </div>

                        {/* Confirmation Pass Ticket */}
                        <div className="rounded-2xl border-3 border-black bg-white p-5 sm:p-6 shadow-[4px_4px_0_black] relative overflow-hidden">
                          <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-2 rotate-12">
                            <span className="px-4 py-1 border-2 border-black bg-yellow-400 text-black text-xs font-black uppercase shadow-[2px_2px_0_black]">
                              ARENA PASS
                            </span>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center justify-between border-b-2 border-black pb-3">
                              <div>
                                <span className="text-[10px] font-bold uppercase text-neutral-500">Battle Slot ID</span>
                                <div className="text-xl font-mono font-black text-black">{submittedData.id}</div>
                              </div>
                              <div className="text-right">
                                <span className="text-[10px] font-bold uppercase text-neutral-500">Registration Date</span>
                                <div className="text-xs font-bold text-neutral-700">
                                  {new Date(submittedData.registeredAt).toLocaleDateString()}
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="p-3 rounded-xl border-2 border-black/15 bg-neutral-50">
                                <span className="text-xs font-bold text-neutral-500 uppercase">Registered Group Name</span>
                                <p className="text-lg font-black text-black mt-0.5">{submittedData.groupName}</p>
                              </div>
                              <div className="p-3 rounded-xl border-2 border-black/15 bg-red-50">
                                <span className="text-xs font-bold text-red-600 uppercase">Registered Bot's Name</span>
                                <p className="text-lg font-black text-red-600 mt-0.5">{submittedData.botName}</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
                              <div>
                                <span className="text-neutral-500 font-medium">Team Leader:</span>
                                <p className="font-bold text-black">{submittedData.leaderName}</p>
                              </div>
                              <div>
                                <span className="text-neutral-500 font-medium">Enrollment:</span>
                                <p className="font-bold text-black">{submittedData.enrollment}</p>
                              </div>
                              <div>
                                <span className="text-neutral-500 font-medium">Phone / WhatsApp:</span>
                                <p className="font-bold text-black">{submittedData.phone}</p>
                              </div>
                              <div>
                                <span className="text-neutral-500 font-medium">Squad:</span>
                                <p className="font-bold text-black">{submittedData.teamSize}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                          <button
                            type="button"
                            onClick={handleResetForm}
                            className="flex-1 py-3 px-5 rounded-xl border-2 border-black bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-sm shadow-[3px_3px_0_black] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <RotateCcw className="w-4 h-4" />
                            <span>Register Another Bot</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveTab('roster')}
                            className="flex-1 py-3 px-5 rounded-xl border-2 border-black bg-white hover:bg-neutral-50 text-black font-bold text-sm shadow-[3px_3px_0_black] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <Users className="w-4 h-4 text-neutral-700" />
                            <span>View Full Arena Roster</span>
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      /* The Main Registration Form */
                      <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="flex items-center space-x-3 mb-6 pb-4 border-b-2 border-black/10">
                          <div className="w-12 h-12 rounded-xl border-2 border-black bg-yellow-400 text-black flex items-center justify-center shadow-[3px_3px_0_black]">
                            <Swords className="w-6 h-6" />
                          </div>
                          <div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-black">
                              ClawClash Registration
                            </h2>
                            <p className="text-xs sm:text-sm text-neutral-600">
                              Submit your group name and robot's name to enter the live arena battle.
                            </p>
                          </div>
                        </div>

                        {submitError && (
                          <div className="mb-5 p-3.5 rounded-xl border-2 border-black bg-amber-50 text-amber-900 text-xs sm:text-sm flex items-start gap-2 shadow-[2px_2px_0_black]">
                            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold">Firebase Notice: </span>
                              <span>{submitError} (Saved locally as backup).</span>
                            </div>
                          </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                          {/* PRIMARY REQUIRED FIELDS: Group Name and Bot's Name */}
                          <div className="p-4 sm:p-5 rounded-xl border-2 border-black bg-yellow-50/80 shadow-[3px_3px_0_black] space-y-4">
                            <div className="flex items-center gap-2 text-xs font-black uppercase text-amber-900 tracking-wide">
                              <Sparkles className="w-4 h-4 text-amber-600" />
                              <span>Required Arena Information</span>
                            </div>

                            {/* Group Name */}
                            <div>
                              <label htmlFor="groupName" className="text-black font-bold text-sm mb-1.5 flex items-center justify-between">
                                <span className="flex items-center gap-1.5">
                                  <Users className="w-4 h-4 text-black" />
                                  <span>Group Name / Team Name</span>
                                  <span className="text-red-500 font-black">*</span>
                                </span>
                                <span className="text-[11px] font-semibold text-neutral-500">e.g. CyberClaws, RoboTitans</span>
                              </label>
                              <input
                                id="groupName"
                                type="text"
                                name="groupName"
                                required
                                value={formData.groupName}
                                onChange={handleInputChange}
                                placeholder="Enter your team or group name..."
                                className="w-full px-4 py-3 rounded-xl border-2 border-black bg-white text-black text-sm font-semibold placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-black transition-all shadow-[2px_2px_0_black]"
                              />
                            </div>

                            {/* Bot's Name */}
                            <div>
                              <label htmlFor="botName" className="text-black font-bold text-sm mb-1.5 flex items-center justify-between">
                                <span className="flex items-center gap-1.5">
                                  <Bot className="w-4 h-4 text-red-600" />
                                  <span>Bot's Name / Robot Name</span>
                                  <span className="text-red-500 font-black">*</span>
                                </span>
                                <span className="text-[11px] font-semibold text-neutral-500">e.g. ClawTitan v1, Gripper-X</span>
                              </label>
                              <input
                                id="botName"
                                type="text"
                                name="botName"
                                required
                                value={formData.botName}
                                onChange={handleInputChange}
                                placeholder="Enter your robot's name..."
                                className="w-full px-4 py-3 rounded-xl border-2 border-black bg-white text-black text-sm font-semibold placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-black transition-all shadow-[2px_2px_0_black]"
                              />
                            </div>
                          </div>

                          {/* Leader & Contact Details */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Team Leader Name */}
                            <div>
                              <label htmlFor="leaderName" className="block text-black font-bold text-sm mb-1.5 flex items-center gap-1.5">
                                <Users className="w-3.5 h-3.5 text-neutral-600" />
                                <span>Team Leader / Contact Person</span>
                                <span className="text-red-500 font-black">*</span>
                              </label>
                              <input
                                id="leaderName"
                                type="text"
                                name="leaderName"
                                required
                                value={formData.leaderName}
                                onChange={handleInputChange}
                                placeholder="e.g. Shivam Diwaker"
                                className="w-full px-4 py-2.5 rounded-xl border-2 border-black bg-white text-black text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-black transition-all shadow-[2px_2px_0_black]"
                              />
                            </div>

                            {/* Enrollment Number */}
                            <div>
                              <label htmlFor="enrollment" className="block text-black font-bold text-sm mb-1.5 flex items-center gap-1.5">
                                <GraduationCap className="w-3.5 h-3.5 text-neutral-600" />
                                <span>Enrollment No. / College ID</span>
                                <span className="text-red-500 font-black">*</span>
                              </label>
                              <input
                                id="enrollment"
                                type="text"
                                name="enrollment"
                                required
                                value={formData.enrollment}
                                onChange={handleInputChange}
                                placeholder="e.g. 2401034232"
                                className="w-full px-4 py-2.5 rounded-xl border-2 border-black bg-white text-black text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-black transition-all shadow-[2px_2px_0_black]"
                              />
                            </div>

                            {/* Phone / WhatsApp */}
                            <div>
                              <label htmlFor="phone" className="block text-black font-bold text-sm mb-1.5 flex items-center gap-1.5">
                                <Phone className="w-3.5 h-3.5 text-neutral-600" />
                                <span>Phone / WhatsApp Number</span>
                                <span className="text-red-500 font-black">*</span>
                              </label>
                              <input
                                id="phone"
                                type="tel"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="e.g. +91 9876543210"
                                className="w-full px-4 py-2.5 rounded-xl border-2 border-black bg-white text-black text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-black transition-all shadow-[2px_2px_0_black]"
                              />
                            </div>

                            {/* Contact Email */}
                            <div>
                              <label htmlFor="contactEmail" className="block text-black font-bold text-sm mb-1.5 flex items-center gap-1.5">
                                <Mail className="w-3.5 h-3.5 text-neutral-600" />
                                <span>Contact Email</span>
                                <span className="text-red-500 font-black">*</span>
                              </label>
                              <input
                                id="contactEmail"
                                type="email"
                                name="contactEmail"
                                required
                                value={formData.contactEmail}
                                onChange={handleInputChange}
                                placeholder="email@college.edu"
                                className="w-full px-4 py-2.5 rounded-xl border-2 border-black bg-white text-black text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-black transition-all shadow-[2px_2px_0_black]"
                              />
                            </div>
                          </div>

                          {/* Team Size Selection (4 or 5 Members) */}
                          <div>
                            <label htmlFor="teamSize" className="block text-black font-bold text-sm mb-1.5 flex items-center gap-1.5">
                              <Users className="w-3.5 h-3.5 text-neutral-600" />
                              <span>Team Size</span>
                              <span className="text-red-500 font-black">*</span>
                            </label>
                            <select
                              id="teamSize"
                              name="teamSize"
                              required
                              value={formData.teamSize}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2.5 rounded-xl border-2 border-black bg-white text-black text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-black shadow-[2px_2px_0_black]"
                            >
                              <option value="4 Members">4 Members</option>
                              <option value="5 Members">5 Members</option>
                            </select>
                          </div>

                          {/* Submit Button */}
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3.5 px-6 rounded-xl border-3 border-black bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold text-base sm:text-lg shadow-[5px_5px_0_black] hover:shadow-[5px_5px_0_#ef4444] hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isSubmitting ? (
                              <>
                                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                <span>Registering Team & Bot...</span>
                              </>
                            ) : (
                              <>
                                <Swords className="w-5 h-5 text-red-600" />
                                <span>Register Team & Bot Now</span>
                              </>
                            )}
                          </button>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          )}

          {/* TAB 2: ARENA RULES & SPECS */}
          {activeTab === 'rules' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Rule 1: Arena Specs */}
                <div className="rounded-2xl border-3 border-black bg-[#fffdf7] p-6 shadow-[5px_5px_0_black]">
                  <div className="w-12 h-12 rounded-xl border-2 border-black bg-red-500 text-white flex items-center justify-center mb-4 shadow-[2px_2px_0_black]">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">1. Arena & Obstacle Course</h3>
                  <ul className="text-sm text-neutral-700 space-y-2 list-disc list-inside">
                    <li>Arena footprint: 3.5m x 3.5m textured wood platform.</li>
                    <li>Ramps, speed bumps, and narrow bridge obstacles.</li>
                    <li>Starting zone, payload pickup depot, and elevated scoring bins.</li>
                  </ul>
                </div>

                {/* Rule 2: Bot Constraints */}
                <div className="rounded-2xl border-3 border-black bg-[#fffdf7] p-6 shadow-[5px_5px_0_black]">
                  <div className="w-12 h-12 rounded-xl border-2 border-black bg-yellow-400 text-black flex items-center justify-center mb-4 shadow-[2px_2px_0_black]">
                    <Bot className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">2. Bot Specifications</h3>
                  <ul className="text-sm text-neutral-700 space-y-2 list-disc list-inside">
                    <li>Maximum starting dimensions: 30cm x 30cm x 30cm.</li>
                    <li>Gripper extension permitted during arena operation.</li>
                    <li>Maximum weight: 3.0 kg including on-board battery.</li>
                    <li>Onboard battery limit: Max 12.6V (3S LiPo/Li-Ion).</li>
                  </ul>
                </div>

                {/* Rule 3: Scoring & Time Trials */}
                <div className="rounded-2xl border-3 border-black bg-[#fffdf7] p-6 shadow-[5px_5px_0_black]">
                  <div className="w-12 h-12 rounded-xl border-2 border-black bg-emerald-400 text-black flex items-center justify-center mb-4 shadow-[2px_2px_0_black]">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">3. Scoring System</h3>
                  <ul className="text-sm text-neutral-700 space-y-2 list-disc list-inside">
                    <li>Standard Block Deposit: +20 points.</li>
                    <li>Elevated Zone Bonus Deposit: +40 points.</li>
                    <li>Penalty for dropping block outside zone: -10 points.</li>
                    <li>Fastest clear time serves as primary tiebreaker.</li>
                  </ul>
                </div>
              </div>

              {/* Download Rulebook Banner */}
              <div className="rounded-2xl border-3 border-black bg-yellow-400 p-6 sm:p-8 shadow-[6px_6px_0_black] flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-black text-black">Need the full ClawClash presentation & rulebook?</h3>
                  <p className="text-sm text-neutral-800 mt-1 max-w-xl">
                    Get all circuit schematics, arena dimensions, and match fixtures shared during the initial hub orientation.
                  </p>
                </div>
                <a
                  href={clawclashPdf}
                  download="Clawclash_Presentation.pdf"
                  className="px-6 py-3.5 rounded-xl border-2 border-black bg-white hover:bg-neutral-50 text-black font-extrabold text-sm shadow-[4px_4px_0_black] hover:-translate-y-0.5 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <Download className="w-5 h-5 text-red-600" />
                  <span>Download Complete PDF</span>
                </a>
              </div>
            </motion.div>
          )}

          {/* TAB 3: ARENA ROSTER */}
          {activeTab === 'roster' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-black">
                      Arena Battle Roster
                    </h2>
                    {isFirebaseConfigured && (
                      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-black bg-emerald-100 text-emerald-800 text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Live Sync
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                    Confirmed groups and their combat robots preparing for the competition
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('register')}
                  className="px-4 py-2 rounded-xl border-2 border-black bg-yellow-400 text-black font-bold text-xs sm:text-sm shadow-[3px_3px_0_black] hover:-translate-y-0.5 transition-all flex items-center gap-1.5 self-start cursor-pointer"
                >
                  <Swords className="w-4 h-4 text-red-600" />
                  <span>Register Your Team</span>
                </button>
              </div>

              {registrations.length === 0 ? (
                <div className="text-center py-12 rounded-2xl border-2 border-black bg-white shadow-[4px_4px_0_black] p-6">
                  <Bot className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-black">No Teams Registered Yet</h4>
                  <p className="text-sm text-neutral-600 mt-1">
                    Be the first team to enter your robot into the ClawClash arena!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {registrations.map((team) => (
                    <div
                      key={team.id}
                      className="rounded-2xl border-3 border-black bg-[#fffdf7] p-5 shadow-[5px_5px_0_black] hover:-translate-y-1 hover:shadow-[5px_5px_0_#facc15] transition-all duration-200 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border-b-2 border-black/10 pb-2.5">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded border border-black bg-neutral-100 text-black">
                            {team.id}
                          </span>
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full border border-black bg-emerald-100 text-emerald-800">
                            {team.status}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold uppercase text-neutral-500">Group / Team</span>
                          <h4 className="text-xl font-extrabold text-black leading-tight">{team.groupName}</h4>
                        </div>

                        <div className="p-3 rounded-xl border-2 border-black bg-white shadow-[2px_2px_0_black]">
                          <span className="text-[10px] font-bold uppercase text-red-600">Robot Combatant</span>
                          <p className="text-base font-black text-red-600 flex items-center gap-1.5 mt-0.5">
                            <Bot className="w-4 h-4 text-red-600" />
                            <span>{team.botName}</span>
                          </p>
                        </div>

                        <div className="space-y-1 text-xs text-neutral-700">
                          <p><span className="font-semibold text-black">Enrollment: </span>{team.enrollment}</p>
                          <p><span className="font-semibold text-black">Squad: </span>{team.teamSize}</p>
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t-2 border-black/10 flex items-center justify-between text-[11px] text-neutral-500">
                        <span>Lead: {team.leaderName}</span>
                        <span>{new Date(team.registeredAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Clawclash;