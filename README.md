# Timecard Balancer

Shows how many minutes over or under your weekly hours you are, and tells you exactly when to clock out to land on
target. Type in your punches or load a Paycom timesheet PDF; open days are planned for you, and you pick which day
makes up the difference, by clock-out time or by a shorter or longer lunch.

## Install

1. Open https://dontdoubtdusty.github.io/timecard-balancer/ in Chrome (Android) or Safari (iPhone).
2. Android: tap **Install app** if it appears, or the menu, then **Add to Home screen**, then **Install**.
   iPhone: tap **Share**, then **Add to Home Screen**, then **Add**.
3. Open **Timecard** from your home screen. It works offline after the first open.

On a computer, open the same address and click the install icon at the right of the address bar, or just bookmark it.

Updates: automatic. The app loads the newest version whenever it opens with a connection; your punches are kept.

Uninstall: remove the app from your home screen, which also removes its saved punches. Each device keeps its own data;
nothing is shared between your phone and computer.

## Usage

The top card shows minutes banked so far, the yellow card says what to do on the open day, and below that is one row
per workday. Enter In, Lunch, Back and Out times and any PTO hours; dashed fields are planned, not punched. Tick **No lunch** on a
day you worked through lunch: its lunch fields are ignored and your usual lunch length is added to that day's hours. Use the
week tabs to switch weeks, and **Planning defaults** to set your usual start, lunch length and number of workdays.
**Load Paycom PDF** fills the punches from a Paycom Web Time Sheet export. Everything saves as you type.

## Known limits

- Data lives in one browser on one device, with no sync or backup. Another device or browser starts empty.
- Load Paycom PDF needs internet the first time (it fetches a 1 MB PDF reader, then keeps it), and only reads Paycom
  Web Time Sheet exports.
- Up to four punches a day (in, lunch out, lunch in, out), Monday to Friday only.
- Days in the past with no punches count as even, on purpose, so a missing day does not skew the plan.
