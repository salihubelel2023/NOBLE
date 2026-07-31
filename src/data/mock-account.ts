/**
 * Placeholder account data. This entire page is a visual shell, not a
 * working system — the moment auth and real User/Order/Address records
 * exist (see /ARCHITECTURE.md Section 4), these placeholders swap for real
 * data and the layout itself doesn't change. See wireframe notes on Account.
 */
export const mockAccountUser = {
  name: "Adaeze Okonkwo",
  email: "adaeze.okonkwo@example.com",
  phone: "+234 801 234 5678",
};

export const mockOrders = [
  { id: "NB-10482", date: "June 28, 2026", total: 1240, status: "Delivered", items: 1 },
  { id: "NB-10317", date: "May 14, 2026", total: 730, status: "Delivered", items: 2 },
];

export const mockAddresses = [
  { id: "addr1", label: "Home", line1: "14 Aminu Kano Crescent", city: "Abuja", isDefault: true },
];
