export const filterData = [
  {
    filterTitle: "Lokasi",
    filterType: "Location",
    filterValue: [
      "Jakarta Pusat",
      "Jakarta Utara",
      "Jakarta Timur",
      "Jakarta Selatan",
      "Tangerang Selatan",
      "Jakarta",
    ],
  },
  {
    filterTitle: "Gaji",
    filterType: "Salary",
    filterValue: [
      { min: 0, max: 1000000 },
      { min: 1000000, max: 5000000 },
      { min: 5000000, max: 10000000 },
      { min: 10000000, max: 15000000 },
      { min: 15000000, max: 20000000 },
    ],
  },
  {
    filterTitle: "Tipe Pekerjaan",
    filterType: "Job Type",
    filterValue: ["Full Time", "Part Time", "Internship", "Freelance"],
  },
  {
    filterTitle: "Pengalaman",
    filterType: "Experience Level",
    filterValue: [0, 1, 2, 3, 4, 5],
  },
];
