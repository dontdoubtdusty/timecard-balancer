# Timecard Balancer

Shows how many minutes over or under your weekly hours you are, and tells you exactly when to clock out to land on
target. Type in your punches or load a Paycom timesheet PDF; open days are planned for you, and you pick which day
makes up the difference, by clock-out time or by a shorter or longer lunch.

## Install

1. On the repo page, click **Code**, then **Download ZIP**.
2. Right-click the zip, choose **Extract All...**, then **Extract**.
3. Open the extracted folder and double-click `index.html`. It opens in your browser.

Updates: download the zip again and replace the old folder. Your data stays as long as the new `index.html` is in the
same place and opened in the same browser.

Uninstall: delete the folder. To remove saved data too, clear the site data for the page in your browser.

## Usage

The top card shows minutes banked so far, the yellow card says what to do on the open day, and below that is one row
per workday. Enter In, Lunch, Back and Out times and any PTO hours; dashed fields are planned, not punched. Tick **No lunch** on a
day you worked through lunch: its lunch fields are ignored and your usual lunch length is added to that day's hours. Use the
week tabs to switch weeks, and **Planning defaults** to set your usual start, lunch length and number of workdays.
**Load Paycom PDF** fills the punches from a Paycom Web Time Sheet export. Everything saves as you type.

## Known limits

- Data lives in one browser on one computer. Another browser, or the file moved to another folder, starts empty.
- Load Paycom PDF needs internet (it fetches the PDF reader), and only reads Paycom Web Time Sheet exports.
- Up to four punches a day (in, lunch out, lunch in, out), Monday to Friday only.
- Days in the past with no punches count as even, on purpose, so a missing day does not skew the plan.
