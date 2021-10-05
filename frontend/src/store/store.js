import { createStore } from "vuex";
import service from "./../services/Service";
export default createStore({
    "state": {
        //we'll have our state variable's here
        "count": 0,
        
    },
    "getters": {
    },
    "mutations": {
        
    },
    "actions": {
        async example({commit}, input) {
            //do stuff
            console.log("this is the input: ", input);
            try {
                var resp = await service.beachAvengersAPI.get("/test");
            }
            catch {
                return {error: "failed"};
            }
            
            console.log(resp);
            return 1;
        },
    },
    "modules": {
    }
});

