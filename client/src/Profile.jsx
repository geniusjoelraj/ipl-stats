import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Profile() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;
  console.log(user)
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) return null;



  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-4">{user.name}</h1>

        <h2 className="text-xl font-semibold mb-2">Players</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-700 text-sm">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-2 border-b border-gray-600 text-left">Name</th>
                <th className="px-4 py-2 border-b border-gray-600 text-left">Type</th>
                <th className="px-4 py-2 border-b border-gray-600 text-left">Price (₹)</th>
                <th className="px-4 py-2 border-b border-gray-600 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {(user.batsmanDTOList || []).map((player) => (
                <tr key={`batsman-${player.id}`} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="px-4 py-2">{player.name}</td>
                  <td className="px-4 py-2">Batsman</td>
                  <td className="px-4 py-2">₹{player.soldPrice.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-2">{player.status}</td>
                </tr>
              ))}
              {(user.bowlerDTOList || []).map((player) => (
                <tr key={`bowler-${player.id}`} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="px-4 py-2">{player.name}</td>
                  <td className="px-4 py-2">Bowler</td>
                  <td className="px-4 py-2">₹{player.soldPrice.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-2">{player.status}</td>
                </tr>
              ))}
              {(user.allRounderDTOList || []).map((player) => (
                <tr key={`allrounder-${player.id}`} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="px-4 py-2">{player.name}</td>
                  <td className="px-4 py-2">All Rounder</td>
                  <td className="px-4 py-2">₹{player.soldPrice.toLocaleString("en-IN")}</td>
                  <td className="px-4 py-2">{player.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

}

export default Profile;
