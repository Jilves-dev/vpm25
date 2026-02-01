import Button from '../shared/Button';
import { useUser } from 'reactfire';
import { useNavigate } from "react-router-dom";
import { signOut } from 'firebase/auth';
import { useSdk } from '../sdk';

function Settings({ types, onTypeSubmit }) {
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

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Asetukset</h2>

      <h3 className="text-xl font-semibold mt-2 mb-2">Profiili</h3>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div>
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt=""
                className="w-20 h-20 rounded-full m-4"
              />
            )}
          </div>
          <div>
            {user.displayName}
            <br />
            {user.email}
          </div>
        </div>
        <div>
          <Button primary onClick={handleSignOut}>
            Kirjaudu ulos
          </Button>
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-2 mb-2">Lisätieto tyypit</h3>
      <div className="p-2 text-lg">
        {types && types.length > 0 ? (
          types.map((lisätieto) => (
            <div key={lisätieto} className="p-1 rounded">
              {lisätieto}
            </div>
          ))
        ) : (
          <div>Ei lisättyjä tyyppejä. Lisää ensimmäinen alla olevalla lomakkeella.</div>
        )}
        <form onSubmit={handleTypeSubmit}>
          <div className="flex mt-2">
            <input
              type="text"
              name="type"
              className="flex-1 p-2 border border-gray-400 rounded text-base outline-none"
            />
            <Button type="submit" primary>
              Lisää
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;