export const timeAgo = (dateString) => {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now - past) / 1000);

  const timeIntervals = {
    tahun: 31536000,
    bulan: 2592000,
    minggu: 604800,
    hari: 86400,
    jam: 3600,
    menit: 60,
    detik: 1,
  };

  for (const [unit, secondsInUnit] of Object.entries(timeIntervals)) {
    const interval = Math.floor(diffInSeconds / secondsInUnit);
    if (interval > 0) {
      return `${interval} ${unit} lalu`;
    }
  }

  return "baru saja";
};
