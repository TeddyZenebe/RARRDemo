
class Auth {
    constructor() {
        this.authenticated = false;
    }

    login(password, sucess, fail) {
        if (password === "starcity") {
            this.authenticated = true;
            sucess();
        } else {
            fail()
        }
    }

    logout(cb) {
        this.authenticated = false;
        cb();
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth();