import Ball from "./Ball";
function BingoBall({ num }) {
    return (
        <Ball>
            <span style={{
                color: 'white',
                fontSize: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            }}>
                {num}
            </span>
        </Ball>
    );
}
export default BingoBall;