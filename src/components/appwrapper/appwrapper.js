import React from 'react';
import App from '../app';
import Startup from '../startup';
import { useSigninCheck } from 'reactfire';

function Appwrapper() {
 const { status, data: signInCheckResult } = useSigninCheck();

 if (status === 'loading') {
 return <span>Odota, ladataan tietoja...</span>;
 }

 if (signInCheckResult.signedIn === true) {
     return <App />
 } else {
     return <Startup />
 }
}
export default Appwrapper;