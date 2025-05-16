import { Connection } from "mongoose";
//in typescript main thing is types so here we are dealaring types ...two possibility one is already connection or in process
declare global {
    var mongoose:{
        conn:Connection|null;
        promise:Promise|null
    }
}

export {};