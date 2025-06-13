import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Link, useNavigate } from 'react-router-dom';

export function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Inscription réussie ! Un email de confirmation a été envoyé.');
      // Optionnel : rediriger après un délai
      setTimeout(() => navigate('/login'), 3000);
    }
  };

  return (
    <form onSubmit={handleSignup} className="max-w-md mx-auto p-4">
      <h2 className="text-2xl mb-4">Créer un compte</h2>
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
        S'inscrire
      </button>
      {message && <p className="mt-4">{message}</p>}
      <p className="mt-4 text-sm">
        Déjà un compte ?{' '}
        <Link to="/login" className="text-orange-600 underline">
          Connectez-vous ici
        </Link>
      </p>
    </form>
  );
}
