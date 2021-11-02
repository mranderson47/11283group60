import { shallowMount, mount, VueWrapper } from "@vue/test-utils";
import Vuex from 'vuex';
import profile from "../../src/views/Profile";
import Vue from 'vue'
import realStore from "../../src/store/index";
Vue.use(Vuex);

describe("Store", () => {
    it("update User State - user id/signed in", async () => {
        realStore.state.user = "abc";
        realStore.commit("updateUser", "cba");               
        
        expect(realStore.state.user).toBe("cba");
    });
    it("change User Settings -- First Name", async () => {
        realStore.state.profileFirstName = "Claudia";
        realStore.commit("changeFirstName", "Michaela");               
        
        expect(realStore.state.profileFirstName).toBe("Michaela");
    });
    it("change User Settings -- Last Name", async () => {
        realStore.state.profileLastName = "Rubio";
        realStore.commit("changeLastName", "Perez");               
        
        expect(realStore.state.profileLastName).toBe("Perez");
    });
    it("change User Settings -- change profile info", async () => {
        realStore.state.profileFirstName = "Claudia";
        realStore.commit("changeFirstName", "Michaela");               
        
        expect(realStore.state.profileFirstName).toBe("Michaela");
    });
    it("Set ID Tokent", async() => {
        realStore.state.token = null;
        realStore.commit("setIdToken", "fjoiajf");

        expect(realStore.state.token).toBe("fjoiajf");
    });
    it("Clear all user information", async() => {
        realStore.state.token = "123";
        realStore.state.profileFirstName = "claudia";
        realStore.state.profileLastName = "rubio";
        realStore.state.user = "abc"
        realStore.commit("clearUser");

        expect(realStore.state.token).toBe(null);
        expect(realStore.state.profileFirstName).toBe(null);
        expect(realStore.state.profileLastName).toBe(null);
        expect(realStore.state.user).toBe(null);
    })
});

describe("Profile Component", () => {
    let store;
    beforeEach(() => {
        //store =  new Vuex.Store({
        //    state: {
        //        profileFirstName: "fn",
        //        profileLastName: "ln",
        //    },
        //    actions: {
        //        updateUserSettings: {}
        //    }
        //}
        //)
    });

    it("test when user settings change the name is updated", async () => {
        var wrapper = shallowMount(profile, {
            computed: {
                firstName: {
                    get() {return "First Name";},
                    set(payload) {},
                },
                lastName: {
                    get() {return "Last Name";},
                    set(payload) {},
                }
            },
            //global: {
            //    plugins: [store]
            //}
        });       
        //var mockUpdateSettings = jest.spyOn(wrapper.vm, 'updateSettings').mockImplementation( ) => {});
        
        expect(wrapper.text()).toContain("First Name");
    
       // expect(updateUserSettings).toHaveBeenCalled(); 
    }); 

});