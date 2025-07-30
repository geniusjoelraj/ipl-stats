import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const SERVER_URL = `${import.meta.env.VITE_SERVER_BASE}` //:3000

function Profile() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

function formatToCrores(num) {
    if (typeof num !== 'number' || isNaN(num)) return '';

    if (num >= 10000000) {
      return `${(num / 10000000).toFixed(1).replace(/\.0$/, '')}cr`;
    } else if (num >= 100000) {
      return `${(num / 100000).toFixed(1).replace(/\.0$/, '')}L`;
    }

    return num.toLocaleString('en-IN');
  }
  useEffect(() => {
    // Check if user data came from navigation state
    if (location.state?.user) {
      setUser(location.state.user);
      // Store user data in localStorage for refresh persistence
      localStorage.setItem('userData', JSON.stringify(location.state.user));
      setLoading(false);
    } else {
      // Try to get user data from localStorage (for refresh)
      const storedUserData = localStorage.getItem('userData');
      const storedCredentials = localStorage.getItem('userCredentials');

      if (storedUserData) {
        setUser(JSON.parse(storedUserData));
        setLoading(false);
      } else if (storedCredentials) {
        // Re-authenticate using stored credentials
        reAuthenticate(JSON.parse(storedCredentials));
      } else {
        // No data available, redirect to login
        navigate("/");
      }
    }
  }, [location.state, navigate]);

  const reAuthenticate = async (credentials) => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${SERVER_URL}/nam`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        throw new Error((await res.json()).error || "Re-authentication failed");
      }

      const userData = await res.json();
      setUser(userData);
      localStorage.setItem('userData', JSON.stringify(userData));
    } catch (err) {
      console.error("Re-authentication error:", err);
      setError(err.message);
      // Clear invalid data and redirect
      localStorage.removeItem('userData');
      localStorage.removeItem('userCredentials');
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    const storedCredentials = localStorage.getItem('userCredentials');

    if (!storedCredentials) {
      setError("No credentials available for refresh");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const credentials = JSON.parse(storedCredentials);
      const res = await fetch(`${SERVER_URL}/nam`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!res.ok) {
        throw new Error((await res.json()).error || "Refresh failed");
      }

      const userData = await res.json();
      setUser(userData);
      localStorage.setItem('userData', JSON.stringify(userData));
    } catch (err) {
      setError("Refresh failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('userCredentials');
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-xl">Loading profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-xl">
          <div className="text-red-500 mb-4">Unable to load profile data</div>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl max-w-2xl w-full">
       <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <div className="flex gap-2">
            <button
              onClick={refreshData}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm cursor-pointer"
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh Data"}
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-400 hover:bg-red-500 px-4 py-2 rounded text-sm cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-600 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}

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

            {console.log(user.balance)}
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
        <div className="flex flex-row justify-around mt-10">
        <div className="text-2xl text-white text-center font-semibold">Balance: <span className="text-red-500">₹{formatToCrores(user.balance)}</span></div>
        <div className="text-2xl text-white text-center font-semibold">Total: <span className="text-yellow-300">₹{formatToCrores(1000000000-user.balance)}</span></div>
        </div>
 
      </div>
    </div>
  );
}

export default Profile;
