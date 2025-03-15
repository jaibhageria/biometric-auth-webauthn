# Biometric Authentication with WebAuthn API

This project implements biometric authentication using the Web Authentication API (WebAuthn). It allows users to authenticate using Touch ID, Face ID, or other biometric authentication methods before submitting their email.

## Features

- WebAuthn Biometric Authentication: Uses device biometrics for authentication.
- Frontend in React: Implements `navigator.credentials.create()` for biometric authentication.
- Backend in Flask (Python): Verifies token and captures email submission.

## Technologies Used

- Frontend: React.js, Web Authentication API
- Backend: Flask, Python

## Prerequisites

- Node.js (v18+)
- Python (v3.8+)
- npm (for managing frontend dependencies)
- WebAuthn-supported browser (Chrome, Edge, Safari, or Firefox)

## Installation & Setup

### Clone the Repository

```sh
git clone https://github.com/jaibhageria/biometric-auth-webauthn.git
cd biometric-auth-webauthn
```

### Install Frontend Dependencies

```sh
cd frontend
npm install
```

### Start the Frontend

```sh
npm start
```

### Install Backend Dependencies

```sh
cd backend
pip install -r requirements.txt
```

### Start the Backend

```sh
python app.py
```

## Usage

1. Enter your email in the input field.
2. Authenticate using biometrics (Touch ID, Face ID, etc.).
3. Upon successful authentication, your email is submitted securely.

## API Endpoints

### `POST /verify`

- Accepts `{ "userId": "user@example.com", "deviceId": "device123", "expires": 1742046888859 }` and processes submission after biometric authentication.

## Future Enhancements

- Database storage for user credentials.
- Multi-platform authentication (Mobile & Desktop).
- Custom UI components for a better user experience.

## Contact

For any questions or contributions, feel free to reach out:

- GitHub Issues: [Create an Issue](https://github.com/jaibhageria/biometric-auth-webauthn.git/issues)
- Email: jaia4@illinois.edu
