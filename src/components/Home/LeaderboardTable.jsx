export default function LeaderboardTable() {
  const leaderboardData = [
    {
      rank: 1,
      user: "5pl234...88fflaa",
      actionPoints: "10,787,595,291",
      referralPoints: "309,773,608",
      total: "11,097,368,900",
    },
    {
      rank: 2,
      user: "5pl234...88fflove",
      actionPoints: "10,499,139,118",
      referralPoints: "0",
      total: "10,499,139,118",
    },
    {
      rank: 3,
      user: "5pl234...88fGabb",
      actionPoints: "10,129,979,028",
      referralPoints: "0",
      total: "10,129,979,028",
      highlighted: true,
    },
    {
      rank: 4,
      user: "5pl234...88fbbcc",
      actionPoints: "8,686,801,069",
      referralPoints: "0",
      total: "8,686,801,069",
    },
    {
      rank: 5,
      user: "5pl234...88fddee",
      actionPoints: "7,601,102,649",
      referralPoints: "0",
      total: "7,601,102,649",
    },
  ];

  const bottomData = [
    {
      rank: "22,009",
      user: "helloworld.reef",
      actionPoints: "204,088",
      referralPoints: "0",
      total: "204,088",
    },
    {
      rank: "22,010",
      user: "benerichi.reef",
      actionPoints: "203,977",
      referralPoints: "0",
      total: "203,977",
    },
    {
      rank: "You",
      user: "derek.reef",
      actionPoints: "203,958",
      referralPoints: "0",
      total: "203,958",
      isUser: true,
    },
    {
      rank: "22,012",
      user: "abdullah.reef",
      actionPoints: "203,955",
      referralPoints: "0",
      total: "203,955",
    },
    {
      rank: "22,013",
      user: "5p9876...playmet",
      actionPoints: "203,951",
      referralPoints: "0",
      total: "203,951",
    },
  ];

  return (
    <div className="">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900">Leaderboard</h2>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-sm ">
        <table className="w-full">
          <thead className=" bg-transparent">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-[#000000]">
                Rank
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-[#000000]">
                User
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-[#000000]">
                Action Points
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-[#000000]">
                Referral Points
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-[#000000]">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-[#F8F9FF] ">
            {leaderboardData.map((row, index) => (
              <tr key={index}>
                <td className="px-4 py-3 text-sm text-[##000000] font-semibold">
                  {row.rank}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">{row.user}</td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right">
                  {row.actionPoints}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right">
                  {row.referralPoints}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">
                  {row.total}
                </td>
              </tr>
            ))}
            <tr>
              <td
                colSpan="5"
                className="px-4 py-2 bg-transparent text-center text-gray-500"
              >
                ...
              </td>
            </tr>
            {bottomData.map((row, index) => (
              <tr
                key={`bottom-${index}`}
                className={
                  row.isUser ? "bg-blue-50 border-l-4 border-blue-400" : ""
                }
              >
                <td className="px-4 py-3 text-sm text-[#000000] font-semibold">
                  {row.rank}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">{row.user}</td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right">
                  {row.actionPoints}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right">
                  {row.referralPoints}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">
                  {row.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
