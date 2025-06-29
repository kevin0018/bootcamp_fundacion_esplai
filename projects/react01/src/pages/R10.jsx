import Login from '../components/r10/Login.jsx';
import SignUp from '../components/r10/SignUp.jsx';
import Date from '../components/r10/Date.jsx';
import Date2 from '../components/r10/Date2.jsx';
import ColorSpinner from '../components/r10/ColorSpinner.jsx';
import ColorSpinnerGradient from '../components/r10/ColorSpinnerGradient.jsx';
import Autocomplete from '../components/r10/Autocomplete.jsx';

function R10 () {
  return (
    <div>
      <Login correctName="Kevin" correctPassword="123" />
      <SignUp />
      <Date />
      <Date2 />
      <ColorSpinner />
      <ColorSpinnerGradient />
      <Autocomplete />
    </div>
  );
}

export default R10;