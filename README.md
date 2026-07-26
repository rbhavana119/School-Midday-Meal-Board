# School Midday Meal Review Board

## Project Overview

The Midday Meal Review Board is a web-based dashboard developed for the Block Education Officer to review daily school midday meal records.

The system reads the daily meal register data and displays:
- Student attendance details
- Meals served
- Rice and dal consumption
- Per-meal grain consumption
- School-wise performance summary
- Exception days that require attention

The main goal of this project is to identify unusual records that are hidden in monthly totals.

---

## Technologies Used

- HTML
- CSS
- JavaScript
- JSON Dataset

The project runs completely in the browser without any backend or database.

---

## How to Run the Project

1. Download or clone the repository.
2. Keep all files in the same folder:
   - index.html
   - style.css
   - script.js
   - data.json
3. Open the project using VS Code.
4. Run `index.html` using Live Server.
5. The dashboard will open in the browser.

---

# Dataset Details

The daily register dataset contains records from 4 schools for 15 school working days.

Each record contains the following fields:

| Field | Description | Unit |
|------|-------------|------|
| Date | Date of meal distribution | YYYY-MM-DD |
| School | Name of school | Text |
| Enrolled | Total number of registered students | Count |
| Present | Students present on that day | Count |
| Meals Served | Number of meals provided | Count |
| Rice Drawn | Rice taken from store | Kilograms (kg) |
| Dal Drawn | Dal taken from store | Kilograms (kg) |
| Organiser | Person who signed the register | Name |

---

# Calculations Used

## Attendance Percentage

Attendance share is calculated as:

Attendance % = (Number of Present Students / Total Enrolled Students) × 100

Example:
If 90 students are present out of 100 enrolled:

Attendance = (90/100) × 100 = 90%

---

## Per Meal Consumption

The total grain quantity is converted into grams.

### Rice per meal:

Rice consumption = (Rice drawn in kg × 1000) / Meals served


### Dal per meal:

Dal consumption = (Dal drawn in kg × 1000) / Meals served


---

# Norm Used

The dashboard compares consumption with the following assumed norms:

- Rice: 200 grams per meal
- Dal: 30 grams per meal

These values are used to identify records where consumption is significantly above or below the expected level.

---

# Exception Handling

The dashboard highlights records with:

- Meals served greater than students present
- Missing register fields
- Rice consumption outside the normal range
- Dal consumption outside the normal range

Incomplete records are displayed instead of removing them, so the officer can verify them with the original register.

---

# Zero Meals Handling

If meals served is zero, the dashboard does not calculate per-meal consumption to avoid division errors.

The consumption value is displayed as unavailable.

---

# Features

## Daily Register View
- Displays all daily records
- Shows attendance percentage
- Shows grain consumption per meal
- Marks unusual records

## School Summary
- Calculates average attendance
- Compares schools based on consumption

## Exception View
- Displays only records requiring review

---

# Project Structure
