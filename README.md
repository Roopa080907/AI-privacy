# AI Privacy Guard

This is a simple Chrome extension that helps users avoid accidentally sharing sensitive information while typing online.

## What it does
The extension monitors text input fields and checks for things like OTPs, passwords, email IDs, and other personal data.  
If something risky is detected, it shows a warning with a privacy risk percentage.

## Why I built this
While using websites, people often type sensitive data without realizing the risk.  
This project is meant to act as a small safety layer that alerts users before they share something important.

## Features
- Detects common sensitive inputs (OTP, passwords, etc.)
- Shows a privacy risk level
- Works in real-time while typing
- Lightweight and runs in the background

## How to use
1. Download or clone this repository  
2. Open Chrome and go to `chrome://extensions/`  
3. Enable Developer Mode  
4. Click "Load unpacked"  
5. Select the `extension` folder  

## Current limitations
- Detection is based on keywords/patterns (not full AI yet)
- May not catch all edge cases

## Future improvements
- Use ML model for better detection  
- Improve accuracy of risk scoring  
- Add better UI for alerts  
