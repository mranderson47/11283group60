import { shallowMount, mount, VueWrapper } from "@vue/test-utils";
import Vuex from 'vuex';
import profile from "../src/views/Profile";


describe("Event Component", () => {

    beforeEach(() => {
        getters = {
        }
        store =  new Vuex.Store({
            state: {
                profileFirstName: "fn",
                profileLastName: "ln",
            },
            actions: {
                updateUserSettings = {}
            }
        }
        )
    });

    it("test when user settings change the name is updated", async () => {
        var wrapper = shallowMount(profile, {

            global: {
                plugins: [store]
            }
        });       

        wrapper.vm.updateProfile();

    
        expect(updateUserSettings).toHaveBeenCalled(); 
    }); 

});