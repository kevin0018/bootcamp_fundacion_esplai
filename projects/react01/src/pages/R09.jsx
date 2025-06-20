import Password from "../components/Password";
function R09() {
  return (
    <div>
      <h2>Password</h2>
       <Password secret={[0,0,1,1,0,1]} />
    </div>
  );
}
export default R09;