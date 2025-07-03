
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login and redirect to /admin with auth param
    navigate('/admin?auth=true');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <form
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-center text-secondary mb-2 flex items-center gap-2 justify-center">
          <span className="material-icons text-accent text-4xl">person</span>
          Login
        </h2>
        <div className="border-b border-secondary/30 mb-4" />
        <label className="text-secondary font-medium">Username</label>
        <input
          className="border border-secondary/30 rounded px-3 py-2 focus:outline-accent"
          type="text"
          placeholder="Enter Username..."
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <label className="text-secondary font-medium">Password</label>
        <input
          className="border border-secondary/30 rounded px-3 py-2 focus:outline-accent"
          type="password"
          placeholder="Enter Password..."
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <div className="flex items-center justify-between text-sm mt-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
              className="accent-accent"
            />
            Remember Me
          </label>
          <a href="#" className="text-accent hover:underline">Forgot Password?</a>
        </div>
        <button
          type="submit"
          className="mt-4 bg-accent text-white font-bold py-2 rounded flex items-center justify-center gap-2 hover:bg-secondary transition-colors"
        >
          <span className="material-icons">login</span>
          Login
        </button>
      </form>
    </div>
  );
}
