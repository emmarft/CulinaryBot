import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Link, useNavigate } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Connexion réussie !');
      // Redirection vers la page d’ajout de recette
      navigate('/add-recipe');
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto p-4">
      <h2 className="text-2xl mb-4">Se connecter</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="mb-2 w-full border px-3 py-2"
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="mb-4 w-full border px-3 py-2"
      />
      <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded">
        Se connecter
      </button>
      {message && <p className="mt-4">{message}</p>}
      <p className="mt-4 text-sm">
        Pas encore de compte ?{' '}
        <Link to="/signup" className="text-orange-600 underline">
          Inscrivez-vous ici
        </Link>
      </p>
    </form>
  );
}
