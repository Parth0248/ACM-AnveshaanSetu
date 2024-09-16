const validatePasswordStrength = (password, setPasswordStrength) => {
    let strength = "Weak";
    const regexStrong =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const regexModerate =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

    if (regexStrong.test(password)) {
      strength = "Strong";
    } else if (regexModerate.test(password)) {
      strength = "Moderate";
    }

    setPasswordStrength(strength);
  };

export default validatePasswordStrength