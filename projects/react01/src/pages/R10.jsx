import Login from '../components/Login';
import SignUp from '../components/SignUp';

function R10 () {
  return (
    <div>
      <Login correctName="Kevin" correctPassword="123" />
      <SignUp />
    </div>
  );
}

export default R10;