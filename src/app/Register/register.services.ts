 import { sendRegister } from "./register.action";
import { RegisterInterface,  } from "./RegisterInterface";

export async function sendRegisterData(userdata :RegisterInterface ) {
    const res= await sendRegister(userdata)
    console.log(res);
    return res
    
}