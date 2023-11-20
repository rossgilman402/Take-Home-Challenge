import decode from "jwt-decode";

class AuthService {
  getProfile() {
    const token = this.getToken();

    if (token) {
      return decode(token);
    } else {
      // Handle the case when the token is null (optional: you can return null, an empty object, or throw an error)
      console.error("Token is null");
      return null;
    }
  }

  loggedIn(): boolean {
    try {
      const token = this.getToken();
      // If there is a token and it's not expired, return `true`
      return token && !this.isTokenExpired(token) ? true : false;
    } catch (err) {
      console.error("Error decoding token: ", err);
      return false;
    }
  }

  isTokenExpired(token: string): boolean {
    // Decode the token to get its expiration time that was set by the server
    const decoded: { exp: number } = decode(token);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("id_token");
      return true;
    }
    // If the token hasn't passed its expiration time, return `false`
    return false;
  }

  getToken(): string | null {
    return localStorage.getItem("id_token");
  }

  login(idToken: string) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  logout() {
    localStorage.removeItem("id_token");
    window.location.reload();
  }
}

export default new AuthService();
