export const emailValidation = (email) =>{
    const Regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    console.log(Regex.test(email), email);
    return Regex.test(email);
}

export const nameValidation = (name) =>{
    const Regex = /^[a-zA-Z\s]+$/;
    return Regex.test(name);
}

export const phoneValidation = (phone)=>{
    const Regex = /^\d{10}$/;
    return Regex.test(phone);
}