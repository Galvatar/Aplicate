import { timeAgo } from "@/lib/timeAgo";


interface SignalCardProps {
  company: string;
  title: string;
  timestamp: Date;
}

export default function SignalCard({
  company,
  title,
  timestamp,
}: SignalCardProps) {
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
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  function GetPadded(count: number): string {
    if (count >= 10) {
      return String(count);
    } else {
      return String(count).padStart(2, '0');
    }
  }

  return (
    <div className="flex rounded-xl border-b border-surface-container justify-between p-5 hover:bg-surface-container-lowest transition-colors duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-on-surface">
          {title} <b>{company}</b>
        </h1>
        <h2 className="text-on-surface-variant text-sm">
            {daysOfTheWeek[timestamp.getDay()]}, {months[timestamp.getMonth()]} {timestamp.getDate()} at {GetPadded(timestamp.getHours())}:{GetPadded(timestamp.getMinutes())}
        </h2>
      </div>
      <div className="flex flex-col">
        <h1 className="text-xs font-semibold text-outline">
          {timeAgo(timestamp)}
        </h1>
      </div>
    </div>
  );
}
