
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/admin?auth=true');
  };

  return (
    <div className="flex items-center justify-center bg-primary py-8">
      <form
        className="bg-secondary rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-center text-primary mb-2 flex items-center gap-2 justify-center">
          Login
        </h2>
        <div className="border-b border-accent/30 mb-4" />
        <label className="text-primary font-medium">Username</label>
        <input
          className="border border-accent/30 rounded px-3 py-2 focus:outline-accent text-primary"
          type="text"
          placeholder="Enter Username..."
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <label className="text-primary font-medium">Password</label>
        <input
          className="border border-accent/30 rounded px-3 py-2 focus:outline-accent text-primary"
          type="password"
          placeholder="Enter Password..."
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <div className="flex items-center justify-between text-sm mt-2">
          <label className="flex items-center gap-2 text-primary">
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
          className="mt-4 bg-accent text-primary font-bold py-2 rounded flex items-center justify-center gap-2 hover:bg-accent/80 transition-colors"
        >
          Login
        </button>
      </form>
      <style jsx="true">
        {`
          form {
            padding: 10px;
          }
        `}
      </style>
    </div>
  );
}
