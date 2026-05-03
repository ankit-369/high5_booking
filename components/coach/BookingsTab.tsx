"use client";

import { useState } from "react";
import {
  startOfWeek, addWeeks, addDays, format, parseISO,
} from "date-fns";
import {
  ChevronLeft, ChevronRight, Calendar,
  ChevronDown, ChevronUp,
  Pencil, MoreHorizontal,
  UserPlus, ArrowLeftRight, Trash2,
} from "lucide-react";
import { mockBookings, mockClients } from "@/lib/mockData";
import { SESSION_LABELS, SESSION_COLORS } from "@/lib/constants";
import type { Slot, Booking, Client, SessionType } from "@/lib/types";
import AddAsMemberModal  from "./AddAsMemberModal";
import ChangeCoachModal  from "./ChangeCoachModal";
import DeleteBookingModal from "./DeleteBookingModal";

// ─── Avatar helpers ───────────────────────────────────────────────────────────

const AVATAR_COLORS = [
  "#0B0C2A", "#7C3AED", "#059669", "#DC2626", "#D97706", "#0891B2",
];
function avatarBg(name: string) {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}
function getInitials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

// ─── Slot totals ──────────────────────────────────────────────────────────────

function slotTotals(slot: Slot) {
  const b = slot.breakdown;
  const keys = ["trial", "consultation", "physio", "goalSetting", "assessment"] as const;
  let booked = 0, total = 0;
  for (const k of keys) { booked += b[k].booked; total += b[k].total; }
  return { booked, total };
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface BookingsTabProps {
  selectedCoachId: string;
  slots: Slot[];
  onEditSlot: (slot: Slot) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function BookingsTab({
  selectedCoachId,
  slots,
  onEditSlot,
}: BookingsTabProps) {

  // ── State ──────────────────────────────────────────────────────────────────

  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [clients, setClients]   = useState<Client[]>(mockClients);

  // Week calendar — initialise to week containing first slot date so data is visible
  const [weekStart, setWeekStart] = useState<Date>(() =>
    startOfWeek(parseISO("2026-05-10"), { weekStartsOn: 0 })
  );
  const [selectedDate, setSelectedDate] = useState("2026-05-10");

  // Expand / collapse
  const [collapsedSlots, setCollapsedSlots]             = useState<Set<string>>(new Set());
  const [expandedDeletedSlots, setExpandedDeletedSlots] = useState<Set<string>>(new Set());

  // Dropdown open booking id
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Action modals
  const [addMemberTarget,   setAddMemberTarget]   = useState<Booking | null>(null);
  const [changeCoachTarget, setChangeCoachTarget] = useState<Booking | null>(null);
  const [deleteTarget,      setDeleteTarget]      = useState<Booking | null>(null);

  // ── Derived ────────────────────────────────────────────────────────────────

  const weekDays   = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const monthLabel = format(weekDays[3], "MMMM yyyy");

  // Dates that have confirmed bookings for the selected coach
  const datesWithBookings = new Set<string>();
  bookings.forEach((b) => {
    if (b.coachId !== selectedCoachId || b.status !== "confirmed") return;
    const slot = slots.find((s) => s.id === b.slotId);
    if (slot) datesWithBookings.add(slot.date);
  });

  // Slots for the selected date + coach, sorted by start time
  const daySlots = slots
    .filter((s) => s.coachId === selectedCoachId && s.date === selectedDate)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  // ── Handlers ───────────────────────────────────────────────────────────────

  function toggleSlot(slotId: string) {
    setCollapsedSlots((prev) => {
      const next = new Set(prev);
      if (next.has(slotId)) { next.delete(slotId); } else { next.add(slotId); }
      return next;
    });
  }

  function toggleDeletedSection(slotId: string) {
    setExpandedDeletedSlots((prev) => {
      const next = new Set(prev);
      if (next.has(slotId)) { next.delete(slotId); } else { next.add(slotId); }
      return next;
    });
  }

  function handleAddAsMember(booking: Booking) {
    setClients((prev) => {
      const exists = prev.find((c) => c.phone === booking.clientPhone);
      if (exists) {
        return prev.map((c) =>
          c.phone === booking.clientPhone ? { ...c, isMember: true } : c
        );
      }
      // Client not in list yet — add them as a member
      return [
        ...prev,
        {
          id:       `cl-${Date.now()}`,
          name:     booking.clientName,
          phone:    booking.clientPhone,
          email:    booking.clientEmail,
          dob:      booking.clientDob,
          gender:   booking.clientGender,
          isMember: true,
        },
      ];
    });
    setAddMemberTarget(null);
  }

  function handleChangeCoach(booking: Booking, newCoachId: string) {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === booking.id
          ? { ...b, coachId: newCoachId, status: "transferred" }
          : b
      )
    );
    setChangeCoachTarget(null);
  }

  function handleDeleteBooking(booking: Booking) {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === booking.id ? { ...b, status: "cancelled" } : b
      )
    );
    setDeleteTarget(null);
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-4">

      {/* ── Week calendar strip ────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 pt-3 pb-4">

        {/* Navigation row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => setWeekStart((prev) => addWeeks(prev, -1))}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
              aria-label="Previous week"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setWeekStart((prev) => addWeeks(prev, 1))}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
              aria-label="Next week"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Month label — right aligned */}
          <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
            <Calendar size={14} className="text-gray-400" />
            {monthLabel}
          </div>
        </div>

        {/* 7-day strip */}
        <div className="overflow-x-auto -mx-1 px-1">
        <div className="grid grid-cols-7 gap-1 min-w-[320px]">
          {weekDays.map((day) => {
            const isoDate  = format(day, "yyyy-MM-dd");
            const isActive = isoDate === selectedDate;
            const hasDot   = datesWithBookings.has(isoDate);

            return (
              <button
                key={isoDate}
                onClick={() => setSelectedDate(isoDate)}
                className="flex flex-col items-center gap-0.5 py-1.5 rounded-xl transition-colors"
              >
                {/* Day abbrev */}
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider leading-none ${
                    isActive ? "text-[#0B0C2A]" : "text-gray-400"
                  }`}
                >
                  {format(day, "EEE")}
                </span>

                {/* Date number — blue pill when active */}
                <span
                  className={[
                    "w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-all",
                    isActive
                      ? "bg-[#0B0C2A] text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-100",
                  ].join(" ")}
                >
                  {format(day, "d")}
                </span>

                {/* Booking dot */}
                <div
                  className={[
                    "w-1.5 h-1.5 rounded-full transition-opacity",
                    hasDot ? "bg-[#0B0C2A] opacity-80" : "opacity-0",
                  ].join(" ")}
                />
              </button>
            );
          })}
        </div>
        </div>
      </div>

      {/* ── Slot sections for selected date ───────────────────────────────── */}
      {daySlots.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
          <p className="text-gray-400 text-sm">No slots scheduled for this date.</p>
        </div>
      ) : (
        daySlots.map((slot) => {
          const { booked, total }   = slotTotals(slot);
          const slotBookings        = bookings.filter((b) => b.slotId === slot.id);
          const activeBookings      = slotBookings.filter((b) => b.status === "confirmed");
          const inactiveBookings    = slotBookings.filter((b) => b.status !== "confirmed");
          const isCollapsed         = collapsedSlots.has(slot.id);
          const deletedSectionOpen  = expandedDeletedSlots.has(slot.id);

          return (
            <div
              key={slot.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              {/* ── Section header ───────────────────────────────────────── */}
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-50">
                <span className="text-sm font-bold text-gray-900 flex-1">
                  {slot.startTime} – {slot.endTime}
                </span>

                <button
                  onClick={() => onEditSlot(slot)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border
                             border-gray-200 text-gray-600 text-xs font-semibold
                             hover:bg-gray-50 transition-colors shrink-0"
                >
                  <Pencil size={12} />
                  Edit
                </button>

                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full
                                 bg-green-50 text-green-700 border border-green-100 whitespace-nowrap shrink-0">
                  {booked}/{total} Booked
                </span>

                <button
                  onClick={() => toggleSlot(slot.id)}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors shrink-0"
                  aria-label={isCollapsed ? "Expand" : "Collapse"}
                >
                  {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                </button>
              </div>

              {/* ── Expanded body ─────────────────────────────────────────── */}
              {!isCollapsed && (
                <div>
                  {/* Active bookings */}
                  {activeBookings.length === 0 ? (
                    <p className="text-xs text-gray-400 px-5 py-4 italic">
                      No confirmed bookings for this slot.
                    </p>
                  ) : (
                    <div className="divide-y divide-gray-50">
                      {activeBookings.map((booking) => {
                        const isOpen   = openDropdown === booking.id;
                        const client   = clients.find((c) => c.phone === booking.clientPhone);
                        const isMember = client?.isMember ?? false;

                        return (
                          <div
                            key={booking.id}
                            className="flex items-center gap-3 px-5 py-3"
                          >
                            {/* Avatar */}
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center
                                         text-white text-[11px] font-bold shrink-0 select-none"
                              style={{ backgroundColor: avatarBg(booking.clientName) }}
                            >
                              {getInitials(booking.clientName)}
                            </div>

                            {/* Client name */}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-900 truncate flex items-center gap-1.5">
                                {booking.clientName}
                                {isMember && (
                                  <span className="text-[10px] font-bold bg-blue-50 text-blue-600
                                                   border border-blue-100 px-1.5 py-0.5 rounded-full">
                                    Member
                                  </span>
                                )}
                              </p>
                            </div>

                            {/* Session type */}
                            <span
                              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0
                                          ${SESSION_COLORS[booking.sessionType as SessionType]}`}
                            >
                              {SESSION_LABELS[booking.sessionType as SessionType]}
                            </span>

                            {/* Phone */}
                            <span className="text-xs text-gray-400 shrink-0 hidden sm:block">
                              +91 {booking.clientPhone}
                            </span>

                            {/* Edit dropdown */}
                            <div className="relative shrink-0">
                              <button
                                onClick={() =>
                                  setOpenDropdown(isOpen ? null : booking.id)
                                }
                                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border
                                           border-gray-200 text-gray-600 text-xs font-semibold
                                           hover:bg-gray-50 transition-colors"
                              >
                                <MoreHorizontal size={13} />
                                Edit
                              </button>

                              {isOpen && (
                                <div
                                  className="absolute right-0 top-full mt-1 z-20 w-52 bg-white
                                             rounded-xl shadow-lg border border-gray-100 py-1 overflow-hidden"
                                >
                                  <button
                                    onClick={() => {
                                      setAddMemberTarget(booking);
                                      setOpenDropdown(null);
                                    }}
                                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm
                                               text-gray-700 hover:bg-gray-50 transition-colors text-left"
                                  >
                                    <UserPlus size={14} className="text-gray-400 shrink-0" />
                                    Add As Member
                                  </button>

                                  <button
                                    onClick={() => {
                                      setChangeCoachTarget(booking);
                                      setOpenDropdown(null);
                                    }}
                                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm
                                               text-gray-700 hover:bg-gray-50 transition-colors text-left"
                                  >
                                    <ArrowLeftRight size={14} className="text-gray-400 shrink-0" />
                                    Change Coach
                                  </button>

                                  <div className="h-px bg-gray-100 mx-2 my-0.5" />

                                  <button
                                    onClick={() => {
                                      setDeleteTarget(booking);
                                      setOpenDropdown(null);
                                    }}
                                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm
                                               text-red-600 hover:bg-red-50 transition-colors text-left"
                                  >
                                    <Trash2 size={14} className="shrink-0" />
                                    Delete Booking
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Deleted / transferred section */}
                  {inactiveBookings.length > 0 && (
                    <div className="border-t border-gray-100">
                      <button
                        onClick={() => toggleDeletedSection(slot.id)}
                        className="w-full flex items-center justify-between px-5 py-2.5
                                   text-xs font-semibold text-red-500 hover:bg-red-50/40
                                   transition-colors"
                      >
                        <span>
                          Deleted booking or transferred slot
                          {inactiveBookings.length > 1
                            ? ` (${inactiveBookings.length})`
                            : ""}
                        </span>
                        {deletedSectionOpen
                          ? <ChevronUp size={13} />
                          : <ChevronDown size={13} />}
                      </button>

                      {deletedSectionOpen && (
                        <div className="divide-y divide-gray-50 bg-gray-50/50">
                          {inactiveBookings.map((b) => (
                            <div
                              key={b.id}
                              className="flex items-center gap-3 px-5 py-2.5 opacity-55"
                            >
                              <div
                                className="w-7 h-7 rounded-full flex items-center justify-center
                                           text-white text-[10px] font-bold shrink-0 select-none
                                           grayscale"
                                style={{ backgroundColor: avatarBg(b.clientName) }}
                              >
                                {getInitials(b.clientName)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-gray-600 truncate line-through">
                                  {b.clientName}
                                </p>
                                <p className="text-[11px] text-red-500">
                                  {b.status === "cancelled"
                                    ? "Deleted booking"
                                    : "Transferred slot"}
                                </p>
                              </div>
                              <span
                                className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full
                                            shrink-0 opacity-60
                                            ${SESSION_COLORS[b.sessionType as SessionType]}`}
                              >
                                {SESSION_LABELS[b.sessionType as SessionType]}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })
      )}

      {/* ── Dropdown backdrop ─────────────────────────────────────────────── */}
      {openDropdown && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setOpenDropdown(null)}
        />
      )}

      {/* ── Action modals ──────────────────────────────────────────────────── */}
      {addMemberTarget && (
        <AddAsMemberModal
          booking={addMemberTarget}
          onConfirm={() => handleAddAsMember(addMemberTarget)}
          onClose={() => setAddMemberTarget(null)}
        />
      )}

      {changeCoachTarget && (
        <ChangeCoachModal
          booking={changeCoachTarget}
          currentCoachId={selectedCoachId}
          onConfirm={(newCoachId) => handleChangeCoach(changeCoachTarget, newCoachId)}
          onClose={() => setChangeCoachTarget(null)}
        />
      )}

      {deleteTarget && (
        <DeleteBookingModal
          booking={deleteTarget}
          onConfirm={() => handleDeleteBooking(deleteTarget)}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
