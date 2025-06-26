import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Date from '../components/Date';
import Date2 from '../components/Date2';
import ColorSpinner from '../components/ColorSpinner';
import ColorSpinnerGradient from '../components/ColorSpinnerGradient';
import Autocomplete from '../components/Autocomplete';

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