import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom'; // si tu utilises react-router

export function Profile() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth/login');
  };

  return (
    <div>
      <h1>Profil utilisateur</h1>
      {/* ... infos utilisateur ... */}
      <button onClick={handleLogout}>Se déconnecter</button>
    </div>
  );
}
