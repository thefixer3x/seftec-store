
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useEffect,
  useState,
  useRef,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import {
  Search,
  Home,
  ShoppingBag,
  Phone,
  ChevronRight,
  FileQuestion,
  MessageSquare,
  X,
} from "lucide-react";

/**
 * 404 – Page Not Found
 *
 * • Logs the missing route once (even in React‑Strict dev double‑render)
 * • Provides search, quick links, and a lightweight AI‑style chat helper
 * • Uses <Link> for SPA navigation (no full reloads)
 * • Cleans up any pending setTimeout when unmounting
 */
const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ————————————————————————————————————————
  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // ————————————————————————————————————————
  // Chat state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    { sender: "ai" | "user"; text: string }[]
  >([
    {
      sender: "ai",
      text: "Hello! How can I help you find what you're looking for?",
    },
  ]);
  const [userMessage, setUserMessage] = useState("");
  const pendingBotReply = useRef<number | null>(null);

  // ————————————————————————————————————————
  // Log 404 once
  useEffect(() => {
    if (import.meta.env.PROD) {
      console.error("404 – attempted route:", location.pathname);
    }
  }, [location.pathname]);

  // Clean up simulated AI reply timeout
  useEffect(() => {
    return () => {
      if (pendingBotReply.current) clearTimeout(pendingBotReply.current);
    };
  }, []);

  // ————————————————————————————————————————
  // Nav
  const NAV_LINKS = [
    { name: "Home", href: "/", icon: Home },
    { name: "Products", href: "/products", icon: ShoppingBag },
    { name: "Services", href: "/services", icon: FileQuestion },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  // ————————————————————————————————————————
  // Handlers
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;

    // Append user message
    setChatMessages((prev) => [
      ...prev,
      { sender: "user", text: userMessage.trim() },
    ]);

    // Simulate bot reply after 1 s
    pendingBotReply.current = window.setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "I can guide you to the right place. Would you like our homepage or another section?",
        },
      ]);
    }, 1000);

    setUserMessage("");
  };

  const handleInputKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSendMessage();
  };

  // ————————————————————————————————————————
  // JSX
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 overflow-x-hidden">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full p-8">
        {/* Decorative bubbles */}
        <div className="pointer-events-none absolute -top-16 -right-16 w-32 h-32 bg-blue-100 rounded-full opacity-70" />
        <div className="pointer-events-none absolute -bottom-8 -left-8 w-24 h-24 bg-indigo-100 rounded-full opacity-70" />

        {/* Hero */}
        <div className="flex justify-center mb-8 relative z-10">
          <div className="relative">
            <span className="select-none text-9xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
              404
            </span>
            <div className="absolute -bottom-3 w-full bg-blue-200 h-3 rounded-full" />
          </div>
        </div>

        {/* Message */}
        <h1 className="sr-only">404 – Page not found</h1>
        <p className="text-center text-gray-700 mb-6">
          Oops! The page you're looking for doesn't exist or was moved.
        </p>

        {/* Search */}
        <form onSubmit={handleSearch} className="mb-8 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search our site..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
          <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
          <button
            type="submit"
            className="absolute right-2 top-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-1.5 px-4 rounded-lg hover:opacity-95 transition-all"
          >
            Search
          </button>
        </form>

        {/* Quick links */}
        <section className="mb-8">
          <h2 className="font-medium text-gray-700 mb-3">Quick navigation</h2>
          <div className="grid grid-cols-2 gap-2">
            {NAV_LINKS.map(({ name, href, icon: Icon }) => (
              <Link
                key={name}
                to={href}
                className="flex items-center p-3 rounded-lg hover:bg-blue-50 border border-gray-100 transition-all group"
              >
                <Icon className="mr-3 text-blue-500" size={18} />
                <span className="text-gray-700 font-medium">{name}</span>
                <ChevronRight
                  size={16}
                  className="ml-auto text-blue-400 opacity-0 group-hover:opacity-100 transition-all"
                />
              </Link>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="text-center pt-6 border-t border-gray-100">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
          >
            <Home size={16} className="mr-1.5" />
            Return home
          </Link>
        </div>
      </div>

      {/* Floating chat button */}
      {!chatOpen && (
        <button
          aria-label="Open live help chat"
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center"
        >
          <MessageSquare size={20} />
          <span className="ml-2 font-medium">Chat</span>
        </button>
      )}

      {/* Chat panel */}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 h-96 bg-white rounded-xl border border-gray-200 shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 flex justify-between items-center">
            <div className="font-medium flex items-center">
              <MessageSquare size={18} className="mr-2" />
              Live Help AI
            </div>
            <button
              aria-label="Close chat"
              onClick={() => setChatOpen(false)}
              className="hover:bg-white/10 rounded-full p-1"
            >
              <X size={18} />
            </button>
          </header>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3">
            {chatMessages.map((m, i) => (
              <div
                key={i}
                className={
                  m.sender === "ai"
                    ? "bg-blue-50 text-gray-800 rounded-tr-lg rounded-br-lg rounded-bl-lg p-3 max-w-[80%]"
                    : "bg-blue-500 text-white self-end rounded-tl-lg rounded-bl-lg rounded-br-lg p-3 max-w-[80%]"
                }
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 flex">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={handleInputKey}
              placeholder="Type your question…"
              className="flex-1 border border-gray-200 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 rounded-r-lg hover:opacity-90"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotFound;
