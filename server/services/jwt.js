import jwt from "jwt-simple";
import moment from "moment";

const SECRET_KEY = "hgfJFPj0agaDG8sfsal9sj97asfpafpaa001ks7DH";

export const createAccessToken = (user) => {
    const payload = {
        //informacion del usuario dentro del token
        id: user._id,
        nombre: user.name,
        apellido: user.lastname,
        email: user.email,
        createToken: moment().unix(),
        exp: moment().add(3, "hours").unix()
    };

    return jwt.encode(payload, SECRET_KEY);
}

export const createRefreshToken = (user) => {
    const payload = {
        id: user._id,
        exp: moment().add(30, "days").unix()
    };

    return jwt.encode(payload, SECRET_KEY);
}

export const decodeToken = (token) => {
    return jwt.decode(token, SECRET_KEY, true);
}