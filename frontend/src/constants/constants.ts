export const Routes = {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    LOGOUT: "/logout"
}

export const Languages = {
    EN: "en",
    PL: "pl"
}

export const ApiEndpoints = {
    LOGIN: "login",
    REGISTER: "register",
    ME: "me",
    LOGOUT: "logout",
    TASKS: "tasks"
}

export const RegexPatterns = {
    USERNAME: /^.{3,20}$/,
    PASSWORD: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/
}

export const APIMethods = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
}

export const TagTypes = {
    TASKS: "Tasks",
    AUTH: "Auth"
}