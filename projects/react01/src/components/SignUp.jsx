import { useState } from "react";

function SignUp() {
    // State to manage form inputs and validation status
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);

    // Regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Regex for password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@#&])[A-Za-z\d$@#&]{8,}$/;

    // Handles form submission and validation
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        let valid = true;
        let error = "";

        // Email validation
        if (!emailRegex.test(email)) {
            setIsEmailValid(false);
            error = "Email incorrecto.";
            valid = false;
        } else {
            setIsEmailValid(true);
        }
        // Password validation
        if (!passwordRegex.test(password)) {
            setIsPasswordValid(false);
            if (!error) {
                if (password.length < 8) {
                    error = "La contraseña es demasiado corta.";
                } else {
                    error = "La contraseña debe contener mayúscula, minúscula, número y uno de los siguientes caracteres especiales: $@#&.";
                }
            }
            valid = false;
        } else {
            setIsPasswordValid(true);
        }
        // Confirm password validation
        if (password !== confirmPassword) {
            setIsConfirmPasswordValid(false);
            if (!error) error = "Las contraseñas no coinciden.";
            valid = false;
        } else if (passwordRegex.test(password)) {
            setIsConfirmPasswordValid(true);
        }
        setErrorMessage(valid ? "" : error);
        if (valid) {
            setErrorMessage("");
        }
    };

    // Handles input changes and resets error message
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "email") setEmail(value);
        if (id === "password") setPassword(value);
        if (id === "confirm-password") setConfirmPassword(value);
        setErrorMessage("");
    };

    // Returns the color of the status circle
    const getCircleColor = (isValid) => {
        return submitted && isValid ? "#28a745" : "#dc3545";
    };

    // Renders the status circle for a field
    const renderStatusCircle = (isValid, ariaLabel) => (
        <span
            className="ms-2"
            style={{
                display: "inline-block",
                width: 30,
                height: 20,
                borderRadius: "50%",
                backgroundColor: getCircleColor(isValid),
                border: "2px solid #dee2e6",
            }}
            aria-label={ariaLabel}
        ></span>
    );

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center p-3">
            <form className="w-100" style={{ maxWidth: 350 }} onSubmit={handleSubmit}>
                <h2 className="text-center mb-4">Registro</h2>
                <div className="mb-3 d-flex align-items-center gap-2">
                    <label htmlFor="email" className="form-label mb-0 flex-shrink-0" style={{ width: 80 }}>Correo:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleInputChange}
                        required
                        className="form-control flex-grow-1"
                    />
                    {renderStatusCircle(isEmailValid, "Estado del email")}
                </div>
                <div className="mb-3 d-flex align-items-center gap-2">
                    <label htmlFor="password" className="form-label mb-0 flex-shrink-0" style={{ width: 80 }}>Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handleInputChange}
                        required
                        className="form-control flex-grow-1"
                    />
                    {renderStatusCircle(isPasswordValid, "Estado de la contraseña")}
                </div>
                <div className="mb-3 d-flex align-items-center gap-2">
                    <label htmlFor="confirm-password" className="form-label mb-0 flex-shrink-0" style={{ width: 80 }}>Verificar:</label>
                    <input
                        type="password"
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="form-control flex-grow-1"
                    />
                    {renderStatusCircle(isConfirmPasswordValid, "Estado de la verificación")}
                </div>
                <button type="submit" className="btn btn-primary w-100">Registrar</button>
            </form>
            {errorMessage && (
                <div className="mt-3 alert alert-danger w-100 text-center p-2" role="alert" style={{ maxWidth: 350 }}>
                    {errorMessage}
                </div>
            )}
        </div>
    );
}

export default SignUp;