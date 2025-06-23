import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Date from '../components/Date';

function R10 () {
  return (
    <div>
      <Login correctName="Kevin" correctPassword="123" />
      <SignUp />
      <Date />
    </div>
  );
}

export default R10;