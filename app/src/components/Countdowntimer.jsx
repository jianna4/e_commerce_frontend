import { useEffect, useState } from "react";

const getTimeLeft = (endDate) => {
  const now = new Date().getTime();
  const end = new Date(endDate).getTime();
  const diff = end - now;

  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const CountdownTimer = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(endDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(endDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  if (!timeLeft) {
    return (
      <span className="text-sm text-gray-500">
        Offer ended
      </span>
    );
  }

  return (
    <div className="flex gap-2 text-sm font-mono text-red-600">
      <span>{timeLeft.days}d</span>
      <span>{timeLeft.hours}h</span>
      <span>{timeLeft.minutes}m</span>
      <span>{timeLeft.seconds}s</span>
    </div>
  );
};

export default CountdownTimer;
