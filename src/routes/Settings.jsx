import Button from '../shared/Button';
import { useUser } from 'reactfire';
import { useNavigate } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { useSdk } from '../sdk';

function Settings({ types, onTypeSubmit, lifestyles, onLifestyleSubmit, onLifestyleDelete }) {
  const { status: userStatus, data: user } = useUser();
  const { auth } = useSdk();
  const navigate = useNavigate();

  if (userStatus === 'loading') {
    return <div className="p-8">Ladataan käyttäjän tietoja...</div>;
  }

  if (!user) {
    return <div className="p-8">Käyttäjää ei löydy. Ole hyvä ja kirjaudu sisään uudelleen.</div>;
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleTypeSubmit = (event) => {
    event.preventDefault();
    const newtype = event.target.elements.type.value;
    if (newtype.trim()) {
      onTypeSubmit(newtype);
      event.target.elements.type.value = "";
    }
  };

  const handleLifestyleSubmit = (event) => {
    event.preventDefault();
    const newlifestyle = event.target.elements.lifestyle.value;
    if (newlifestyle.trim()) {
      onLifestyleSubmit(newlifestyle);
      event.target.elements.lifestyle.value = "";
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Asetukset</h2>

      {/* Profiili */}
      <h3 className="text-xl font-semibold mt-2 mb-2">Profiili</h3>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {user.photoURL && (
            <img src={user.photoURL} alt="" className="w-20 h-20 rounded-full m-4" />
          )}
          <div>
            {user.displayName}<br />{user.email}
          </div>
        </div>
        <Button primary onClick={handleSignOut}>Kirjaudu ulos</Button>
      </div>

      {/* Vointi tyypit */}
      <h3 className="text-xl font-semibold mt-4 mb-2">Vointi tyypit</h3>
      <div className="p-2 text-lg">
        {types && types.length > 0 ? (
          types.map((type) => (
            <div key={type} className="p-1 rounded">{type}</div>
          ))
        ) : (
          <div className="text-sm text-gray-500">Ei lisättyjä tyyppejä.</div>
        )}
        <form onSubmit={handleTypeSubmit}>
          <div className="flex mt-2">
            <input type="text" name="type" className="flex-1 p-2 border border-gray-400 rounded text-base outline-none" />
            <Button type="submit" primary>Lisää</Button>
          </div>
        </form>
      </div>

      {/* Elämäntapa kategoriat */}
      <h3 className="text-xl font-semibold mt-4 mb-2">Elämäntapa kategoriat</h3>
      <div className="p-2">
        {lifestyles && lifestyles.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {lifestyles.map((lifestyle) => (
              <div key={lifestyle} className="flex items-center bg-blue-50 border border-blue-200 rounded-full px-3 py-1">
                <span className="text-sm">{lifestyle}</span>
                <button
                  type="button"
                  onClick={() => onLifestyleDelete(lifestyle)}
                  className="ml-2 text-red-400 hover:text-red-600 text-lg leading-none"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500">Ei lisättyjä kategorioita.</div>
        )}
        <form onSubmit={handleLifestyleSubmit}>
          <div className="flex mt-3">
            <input type="text" name="lifestyle" placeholder="Uusi kategoria..." className="flex-1 p-2 border border-gray-400 rounded text-base outline-none" />
            <Button type="submit" primary>Lisää</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;