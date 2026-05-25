"use client";

import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("Guest");
  const [interviewsCount, setInterviewsCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const today = new Date();
  const daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function GetGreeting(hour: number): string {
    if (hour < 12) {
      return "morning";
    } else if (hour < 17) {
      return "afternoon";
    } else {
      return "evening";
    }
  }

  return (
    <div className="flex flex-col w-full h-full font-jakarta py-20 px-15 gap-4 bg-background text-on-background">
      <h3 className="text-outline text-sm">
        {daysOfTheWeek[today.getDay()]}, {months[today.getMonth()]}{" "}
        {today.getDate()}
      </h3>
      <h1 className="text-4xl font-bold text-primary-fixed-dim tracking-tight">
        Good {GetGreeting(today.getHours())}, {username}.
      </h1>
      <h2 className="text-on-surface-variant max-w-xl">
        Keep working at it. You have{" "}
        <span className="text-secondary-fixed-dim">{interviewsCount} interviews</span> scheduled
        for next week. Take a moment to breathe before reviewing your board.
      </h2>
      <h3 className="flex -mt-1 font-bold text-outline text-xs items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 -960 960 960" width="12px" fill="currentColor"><path d="M792-56 686-160H260q-92 0-156-64T40-380q0-77 47.5-137T210-594q3-8 6-15.5t6-16.5L56-792l56-56 736 736-56 56ZM260-240h346L284-562q-2 11-3 21t-1 21h-20q-58 0-99 41t-41 99q0 58 41 99t99 41Zm185-161Zm419 191-58-56q17-14 25.5-32.5T840-340q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-27 0-52 6.5T380-693l-58-58q35-24 74.5-36.5T480-800q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 39-15 72.5T864-210ZM593-479Z"/>
        </svg>
        Progress saved to this browser.
      </h3>
    </div>
  );
}
