import type { JSX } from "react";
import { useEffect, useState } from "react";
import { getAllMessages, deleteMessage } from "../services/contactmessage";
import type { ContactMessage } from "../Interfaces/contactMessage";

type FilterType = "all" | "unread" | "read";

export default function ManageContact(): JSX.Element {
  const [allMessages, setAllMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null,
  );
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getAllMessages();
        setAllMessages(response.data.data.contacts);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const markAsRead = (id: string) => {
    setReadIds((prev) => new Set([...prev, id]));
  };

  const handleSelect = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    markAsRead(msg._id);
    setEmailSent(false);
  };

  const filteredMessages = allMessages.filter((msg) => {
    const matchesSearch =
      msg.name.toLowerCase().includes(search.toLowerCase()) ||
      msg.email.toLowerCase().includes(search.toLowerCase()) ||
      msg.message.toLowerCase().includes(search.toLowerCase());

    if (filter === "read") return matchesSearch && readIds.has(msg._id);
    if (filter === "unread") return matchesSearch && !readIds.has(msg._id);
    return matchesSearch;
  });

  const unreadCount = allMessages.filter((m) => !readIds.has(m._id)).length;

  // ── Delete ──────────────────────────────────────────────────────────────────
  const handleDeleteClick = () => {
    if (!selectedMessage) return;
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedMessage) return;
    setDeletingId(selectedMessage._id);
    try {
      await deleteMessage(selectedMessage._id);
      setAllMessages((prev) =>
        prev.filter((m) => m._id !== selectedMessage._id),
      );
      setSelectedMessage(null);
    } catch (error) {
      console.error("Error deleting message:", error);
    } finally {
      setDeletingId(null);
      setShowDeleteConfirm(false);
    }
  };

  // ── Email Modal ─────────────────────────────────────────────────────────────
  const openEmailModal = () => {
    if (!selectedMessage) return;
    setEmailSubject(`Re: Your inquiry`);
    setEmailBody(
      `Hi ${selectedMessage.name},\n\nThank you for reaching out to us.\n\n`,
    );
    setShowEmailModal(true);
    setEmailSent(false);
  };

  const handleSendEmail = async () => {
    if (!selectedMessage || !emailSubject.trim() || !emailBody.trim()) return;
    setSendingEmail(true);
    try {
      // Opens the user's mail client with pre-filled content as fallback,
      // or replace this block with your real email API call.
      const mailto =
        `mailto:${selectedMessage.email}` +
        `?subject=${encodeURIComponent(emailSubject)}` +
        `&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailto;
      setEmailSent(true);
      setShowEmailModal(false);
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setSendingEmail(false);
    }
  };

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0)
      return (
        "Today " +
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const avatarColors = [
    "bg-blue-500",
    "bg-indigo-500",
    "bg-violet-500",
    "bg-sky-500",
    "bg-cyan-500",
    "bg-teal-500",
  ];
  const getAvatarColor = (name: string) =>
    avatarColors[name.charCodeAt(0) % avatarColors.length];

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="w-full p-6 bg-bg-main dark:bg-dark-bg h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-text dark:text-dark-text-primary">
            Messages
          </h1>
          <p className="text-sm text-text-muted dark:text-dark-text-secondary mt-0.5">
            Manage customer inquiries and contact requests
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-soft dark:bg-dark-primary-soft text-primary dark:text-dark-primary text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-dark-primary animate-pulse" />
              {unreadCount} unread
            </span>
          )}
          <button
            onClick={() => setReadIds(new Set(allMessages.map((m) => m._id)))}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border-custom dark:border-dark-border text-text-muted dark:text-dark-text-secondary hover:bg-surface-hover dark:hover:bg-dark-surface-hover transition-colors"
          >
            Mark all read
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex gap-4 h-[calc(100vh-200px)]">
        {/* Left Panel */}
        <div className="w-[380px] flex-shrink-0 flex flex-col bg-surface dark:bg-dark-surface rounded-2xl border border-border-custom dark:border-dark-border overflow-hidden shadow-sm">
          {/* Search & Filter */}
          <div className="p-4 border-b border-border-custom dark:border-dark-border space-y-3">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted dark:text-dark-text-muted"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search messages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm rounded-xl bg-bg-main dark:bg-dark-bg border border-border-custom dark:border-dark-border text-text dark:text-dark-text-primary placeholder:text-text-muted dark:placeholder:text-dark-text-muted focus:outline-none focus:border-primary dark:focus:border-dark-primary transition-colors"
              />
            </div>
            <div className="flex gap-1.5">
              {(["all", "unread", "read"] as FilterType[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-lg capitalize transition-all ${
                    filter === f
                      ? "bg-primary dark:bg-dark-primary text-white shadow-sm"
                      : "bg-bg-main dark:bg-dark-bg text-text-muted dark:text-dark-text-secondary hover:bg-surface-hover dark:hover:bg-dark-surface-hover border border-border-custom dark:border-dark-border"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex flex-col gap-3 p-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="animate-pulse flex gap-3 p-3 rounded-xl bg-bg-main dark:bg-dark-bg"
                  >
                    <div className="w-10 h-10 rounded-full bg-border-custom dark:bg-dark-border flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-border-custom dark:bg-dark-border rounded w-2/3" />
                      <div className="h-3 bg-border-custom dark:bg-dark-border rounded w-full" />
                      <div className="h-2 bg-border-custom dark:bg-dark-border rounded w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-6 py-12">
                <div className="w-14 h-14 rounded-2xl bg-primary-soft dark:bg-dark-primary-soft flex items-center justify-center mb-3">
                  <svg
                    className="w-7 h-7 text-primary dark:text-dark-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-text dark:text-dark-text-primary">
                  No messages found
                </p>
                <p className="text-xs text-text-muted dark:text-dark-text-muted mt-1">
                  Try adjusting your search or filter
                </p>
              </div>
            ) : (
              <div className="p-2 space-y-1">
                {filteredMessages.map((msg) => {
                  const isRead = readIds.has(msg._id);
                  const isSelected = selectedMessage?._id === msg._id;
                  return (
                    <button
                      key={msg._id}
                      onClick={() => handleSelect(msg)}
                      className={`w-full text-left p-3 rounded-xl transition-all group ${
                        isSelected
                          ? "bg-primary-soft dark:bg-dark-primary-soft border border-primary/20 dark:border-dark-primary/30"
                          : "hover:bg-surface-hover dark:hover:bg-dark-surface-hover border border-transparent"
                      }`}
                    >
                      <div className="flex gap-3 items-start">
                        <div
                          className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white text-sm font-semibold ${getAvatarColor(msg.name)}`}
                        >
                          {getInitials(msg.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <span
                              className={`text-sm font-semibold truncate ${isSelected ? "text-primary dark:text-dark-primary" : "text-text dark:text-dark-text-primary"}`}
                            >
                              {msg.name}
                            </span>
                            <span className="text-[10px] text-text-muted dark:text-dark-text-muted whitespace-nowrap ml-2 flex-shrink-0">
                              {formatDate(msg.createdAt)}
                            </span>
                          </div>
                          <p className="text-xs text-text-muted dark:text-dark-text-secondary truncate mb-1">
                            {msg.email}
                          </p>
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-text-muted dark:text-dark-text-muted truncate flex-1">
                              {msg.message}
                            </p>
                            {!isRead && (
                              <span className="w-2 h-2 rounded-full bg-primary dark:bg-dark-primary flex-shrink-0" />
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer count */}
          <div className="px-4 py-3 border-t border-border-custom dark:border-dark-border">
            <p className="text-xs text-text-muted dark:text-dark-text-muted text-center">
              {filteredMessages.length} of {allMessages.length} messages
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-surface dark:bg-dark-surface rounded-2xl border border-border-custom dark:border-dark-border overflow-hidden shadow-sm flex flex-col">
          {selectedMessage ? (
            <>
              {/* Detail Header */}
              <div className="p-6 border-b border-border-custom dark:border-dark-border">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white text-lg font-bold ${getAvatarColor(selectedMessage.name)}`}
                    >
                      {getInitials(selectedMessage.name)}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-text dark:text-dark-text-primary">
                        {selectedMessage.name}
                      </h2>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1.5 text-sm text-text-muted dark:text-dark-text-secondary">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                            />
                          </svg>
                          {selectedMessage.email}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-text-muted dark:text-dark-text-muted">
                      {formatDate(selectedMessage.createdAt)}
                    </span>
                    {emailSent ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                        Replied
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800">
                        Read
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Message Body */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-px flex-1 bg-border-custom dark:bg-dark-border" />
                    <span className="text-xs text-text-muted dark:text-dark-text-muted px-2">
                      Customer Inquiry
                    </span>
                    <div className="h-px flex-1 bg-border-custom dark:bg-dark-border" />
                  </div>

                  <div className="bg-bg-main dark:bg-dark-bg rounded-2xl p-6 border border-border-custom dark:border-dark-border">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center text-white text-sm font-semibold ${getAvatarColor(selectedMessage.name)}`}
                      >
                        {getInitials(selectedMessage.name)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-sm font-semibold text-text dark:text-dark-text-primary">
                            {selectedMessage.name}
                          </span>
                          <span className="text-xs text-text-muted dark:text-dark-text-muted">
                            {new Date(
                              selectedMessage.createdAt,
                            ).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-text dark:text-dark-text-primary leading-relaxed">
                          {selectedMessage.message}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Customer Info Cards */}
                  <div className="grid grid-cols-3 gap-3 mt-6">
                    <div className="p-4 rounded-xl bg-bg-main dark:bg-dark-bg border border-border-custom dark:border-dark-border">
                      <p className="text-xs text-text-muted dark:text-dark-text-muted mb-1">
                        Contact ID
                      </p>
                      <p className="text-sm font-mono font-medium text-text dark:text-dark-text-primary truncate">
                        #{selectedMessage._id.slice(-6).toUpperCase()}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-bg-main dark:bg-dark-bg border border-border-custom dark:border-dark-border">
                      <p className="text-xs text-text-muted dark:text-dark-text-muted mb-1">
                        Phone
                      </p>
                      <p className="text-sm font-medium text-text dark:text-dark-text-primary">
                        {selectedMessage.number}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-bg-main dark:bg-dark-bg border border-border-custom dark:border-dark-border">
                      <p className="text-xs text-text-muted dark:text-dark-text-muted mb-1">
                        Received
                      </p>
                      <p className="text-sm font-medium text-text dark:text-dark-text-primary">
                        {formatDate(selectedMessage.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reply Footer — Call button removed */}
              <div className="p-4 border-t border-border-custom dark:border-dark-border bg-surface dark:bg-dark-surface">
                <div className="flex gap-3">
                  {/* Send Email */}
                  <button
                    onClick={openEmailModal}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary dark:bg-dark-primary text-white text-sm font-medium hover:bg-primary-hover dark:hover:bg-dark-primary-hover transition-colors shadow-sm"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Reply via Email
                  </button>

                  {/* Delete */}
                  <button
                    onClick={handleDeleteClick}
                    disabled={deletingId === selectedMessage._id}
                    className="ml-auto flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 dark:border-red-900 text-red-500 dark:text-red-400 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    {deletingId === selectedMessage._id
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
              <div className="w-20 h-20 rounded-3xl bg-primary-soft dark:bg-dark-primary-soft flex items-center justify-center mb-6 shadow-sm">
                <svg
                  className="w-10 h-10 text-primary dark:text-dark-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-text dark:text-dark-text-primary mb-2">
                Select a message
              </h3>
              <p className="text-sm text-text-muted dark:text-dark-text-secondary max-w-sm">
                Choose a message from the list on the left to view the full
                conversation and customer details.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Delete Confirmation Modal ── */}
      {showDeleteConfirm && selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-surface dark:bg-dark-surface rounded-2xl border border-border-custom dark:border-dark-border shadow-xl w-full max-w-sm mx-4 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-red-500 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-text dark:text-dark-text-primary">
                  Delete message?
                </h3>
                <p className="text-xs text-text-muted dark:text-dark-text-secondary mt-0.5">
                  This action cannot be undone.
                </p>
              </div>
            </div>
            <p className="text-sm text-text-muted dark:text-dark-text-secondary mb-6">
              You are about to permanently delete the message from{" "}
              <span className="font-medium text-text dark:text-dark-text-primary">
                {selectedMessage.name}
              </span>
              .
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-border-custom dark:border-dark-border text-text dark:text-dark-text-primary text-sm font-medium hover:bg-surface-hover dark:hover:bg-dark-surface-hover transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={!!deletingId}
                className="flex-1 py-2.5 rounded-xl bg-red-500 dark:bg-red-600 text-white text-sm font-medium hover:bg-red-600 dark:hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {deletingId ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Email Compose Modal ── */}
      {showEmailModal && selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-surface dark:bg-dark-surface rounded-2xl border border-border-custom dark:border-dark-border shadow-xl w-full max-w-lg mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-custom dark:border-dark-border">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary-soft dark:bg-dark-primary-soft flex items-center justify-center">
                  <svg
                    className="w-4.5 h-4.5 text-primary dark:text-dark-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-text dark:text-dark-text-primary">
                  Reply to {selectedMessage.name}
                </h3>
              </div>
              <button
                onClick={() => setShowEmailModal(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:bg-surface-hover dark:hover:bg-dark-surface-hover transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* To */}
              <div>
                <label className="block text-xs font-medium text-text-muted dark:text-dark-text-muted mb-1.5">
                  To
                </label>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-bg-main dark:bg-dark-bg border border-border-custom dark:border-dark-border">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary-soft dark:bg-dark-primary-soft text-primary dark:text-dark-primary">
                    {selectedMessage.name}
                  </span>
                  <span className="text-sm text-text-muted dark:text-dark-text-muted">
                    {selectedMessage.email}
                  </span>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-medium text-text-muted dark:text-dark-text-muted mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl bg-bg-main dark:bg-dark-bg border border-border-custom dark:border-dark-border text-text dark:text-dark-text-primary focus:outline-none focus:border-primary dark:focus:border-dark-primary transition-colors"
                />
              </div>

              {/* Body */}
              <div>
                <label className="block text-xs font-medium text-text-muted dark:text-dark-text-muted mb-1.5">
                  Message
                </label>
                <textarea
                  rows={6}
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl bg-bg-main dark:bg-dark-bg border border-border-custom dark:border-dark-border text-text dark:text-dark-text-primary focus:outline-none focus:border-primary dark:focus:border-dark-primary transition-colors resize-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-border-custom dark:border-dark-border">
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-4 py-2.5 rounded-xl border border-border-custom dark:border-dark-border text-text dark:text-dark-text-primary text-sm font-medium hover:bg-surface-hover dark:hover:bg-dark-surface-hover transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendEmail}
                disabled={
                  sendingEmail || !emailSubject.trim() || !emailBody.trim()
                }
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary dark:bg-dark-primary text-white text-sm font-medium hover:bg-primary-hover dark:hover:bg-dark-primary-hover transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
                {sendingEmail ? "Sending..." : "Send Email"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
