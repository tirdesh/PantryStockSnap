export const useValidation = () => {
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "email":
        return /\S+@\S+\.\S+/.test(value) ? "" : "Invalid email address";
      case "password":
        return value.length >= 6
          ? ""
          : "Password must be at least 6 characters";
      default:
        return "";
    }
  };

  return { validateField };
};
