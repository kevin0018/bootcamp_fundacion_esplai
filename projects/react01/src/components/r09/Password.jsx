import { useState } from 'react';

// Password component: visual password entry with indicator balls
function Password({ secret }) {
    // State: array with value for each ball (0 or 1)
    const [values, setValues] = useState(secret.map(() => 0));

    // Toggle value at the given index
    const handleClick = (index) => {
        const newValues = [...values];
        newValues[index] = newValues[index] === 0 ? 1 : 0;
        setValues(newValues);
    };

    // Message depending on state
    let msgToShow = '---';
    if (arraysEqual(values, secret)) {
        msgToShow = 'ADELANTE!';
    }

    return (
        <div className="password-bg">
            <div className="balls-row">
                {values.map((value, index) => (
                    <button
                        key={index}
                        className={`ball${value === 1 ? ' active' : ''}`}
                        onClick={() => handleClick(index)}
                        aria-label={`Posición ${index + 1}`}
                        type="button"
                    />
                ))}
            </div>
            <div className="password-msg">
                {msgToShow}
            </div>
            <style jsx>{`
                .password-bg {
                    background: #fafae3;
                    padding: 1.5rem 0 2.5rem 0;
                    border-radius: 0.5rem;
                    max-width: 100vw;
                    text-align: center;
                }
                .balls-row {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin-bottom: 1.3rem;
                    min-height: 44px;
                }
                .ball {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background: #888;
                    border: none;
                    cursor: pointer;
                    transition: background .2s;
                    outline: none;
                    display: inline-block;
                    margin: 0;
                    padding: 0;
                }
                .ball.active {
                    background: #ffa600;
                }
                .ball:focus {
                    outline: 2px solid #222;
                }
                .password-msg {
                    font-size: 2rem;
                    font-weight: 700;
                    font-family: 'Georgia', serif;
                    color: #222;
                    letter-spacing: 1px;
                }
            `}</style>
        </div>
    );
}

// Utility: compare arrays for equality (by value and order)
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

export default Password;