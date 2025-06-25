export const validatePassword = (password: string): string | null => {
  if (password.length < 8) {
    return "Mật khẩu phải có ít nhất 8 ký tự.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Mật khẩu phải có ít nhất một chữ in hoa.";
  }
  if (!/[a-z]/.test(password)) {
    return "Mật khẩu phải có ít nhất một chữ thường.";
  }
  if (!/[0-9]/.test(password)) {
    return "Mật khẩu phải có ít nhất một chữ số.";
  }
  if (!/[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password)) {
    return "Mật khẩu phải có ít nhất một ký tự đặc biệt.";
  }
  return null;
};
