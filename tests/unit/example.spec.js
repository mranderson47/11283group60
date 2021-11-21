import { shallowMount } from '@vue/test-utils';
import realStore from "../../src/store/index";

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
  });
  it("add new event", async() => {
    realStore.state.events = [];
    realStore.state.userEvents = [];
    realStore.state.likedEvents = [];
    realStore.state.profileId = "abc123";
    let newEvent = {
      creator: {id: "abc123"},
      id: "ghk",
      date: 162300,
      title: "test",
      zipcode: 12345,
      creatorName: "clau",
      likeCount:0,
      usersLiked: []
    };
    realStore.commit("addEvent", newEvent);
    expect(realStore.state.events.length).toBe(1);
    expect(realStore.state.userEvents.length).toBe(1);
    expect(realStore.state.likedEvents.length).toBe(0);
  });
  it("add new event test 2", async() => {
    realStore.state.events = [];
    realStore.state.userEvents = [];
    realStore.state.likedEvents = [];
    realStore.state.profileId = "abc123";
    let newEvent = {
      creator: {id: "abc133"},
      id: "ghk",
      date: 162300,
      title: "test",
      zipcode: 12345,
      creatorName: "clau",
      likeCount:0,
      usersLiked: []
    };
    realStore.commit("addEvent", newEvent);
    expect(realStore.state.events.length).toBe(1);
    expect(realStore.state.userEvents.length).toBe(0);
    expect(realStore.state.likedEvents.length).toBe(0);
  });
  it("test adding new event that is liked", async() => {
    realStore.state.events = [];
    realStore.state.userEvents = [];
    realStore.state.likedEvents = [];
    realStore.state.profileId = "abc123";
    let newEvent = {
      creator: {id: "abc133"},
      id: "ghk",
      date: 162300,
      title: "test",
      zipcode: 12345,
      creatorName: "clau",
      likeCount:2,
      usersLiked: ["abc123", "3456"]
    };
    realStore.commit("addEvent", newEvent);
    expect(realStore.state.events.length).toBe(1);
    expect(realStore.state.userEvents.length).toBe(0);
    expect(realStore.state.likedEvents.length).toBe(1);
  });
  it("test editing event", async() => {
    let event = {
      creator: {id: "abc143"},
      id: "ghk",
      date: 162300,
      title: "test",
      zipcode: 12345,
      creatorName: "clau",
      likeCount:2,
      usersLiked: ["abc143", "3456"]
    };
    realStore.state.profileId = "abc123";
    realStore.state.events = [event];
    realStore.state.userEvents = [];
    realStore.state.likedEvents = [];
    
    let editedEvent = {
      creator: {id: "abc143"},
      id: "ghk",
      date: 1623456,
      title: "test Edit",
      zipcode: 12345,
      creatorName: "clau",
      likeCount: 2,
      usersLiked: ["abc143", "3456"]
    };
    realStore.commit("editEvent", editedEvent);
    expect(realStore.state.events.length).toBe(1);
    expect(realStore.state.userEvents.length).toBe(0);
    expect(realStore.state.likedEvents.length).toBe(0);
    let index = realStore.state.events.findIndex((it) => it.id == event.id);
    expect(index).toBeGreaterThan(-1);
    expect(realStore.state.events[index].title).toBe("test Edit");
  });
  it("test editing event when event is also liked and created by user", async() => {
    let event = {
      creator: {id: "abc123"},
      id: "ghk",
      date: 162300,
      title: "test",
      zipcode: 12345,
      creatorName: "clau",
      likeCount:2,
      usersLiked: ["abc123", "3456"]
    };
    realStore.state.profileId = "abc123";
    realStore.state.events = [event];
    realStore.state.userEvents = [event];
    realStore.state.likedEvents = [event];
    
    let editedEvent = {
      creator: {id: "abc123"},
      id: "ghk",
      date: 1623456,
      title: "test Edit 1",
      zipcode: 12345,
      creatorName: "clau",
      likeCount: 2,
      usersLiked: ["abc123", "3456"]
    };
    realStore.commit("editEvent", editedEvent);
    let index = realStore.state.events.findIndex((it) => it.id == event.id);
    expect(index).toBeGreaterThan(-1);
    expect(realStore.state.events[index].title).toBe("test Edit 1");

    let indexU = realStore.state.userEvents.findIndex((it) => it.id == event.id);
    expect(indexU).toBeGreaterThan(-1);
    expect(realStore.state.userEvents[indexU].title).toBe("test Edit 1");

    let indexL = realStore.state.likedEvents.findIndex((it) => it.id == event.id);
    expect(indexL).toBeGreaterThan(-1);
    expect(realStore.state.likedEvents[indexL].title).toBe("test Edit 1");
  });
  it("test Deleting event", async() => {
    let event = {
      creator: {id: "abc143"},
      id: "ghk",
      date: 162300,
      title: "test",
      zipcode: 12345,
      creatorName: "clau",
      likeCount:2,
      usersLiked: ["abc143", "3456"]
    };
    realStore.state.profileId = "abc123";
    realStore.state.events = [event];
    realStore.state.userEvents = [];
    realStore.state.likedEvents = [];
    
    realStore.commit("deleteEvent", "ghk");
    expect(realStore.state.events.length).toBe(0);
    expect(realStore.state.userEvents.length).toBe(0);
    expect(realStore.state.likedEvents.length).toBe(0);
    let index = realStore.state.events.findIndex((it) => it.id == event.id);
    expect(index).toBe(-1);
  });
  it("test Deleting event when it is also liked and created by user/ multiple", async() => {
    let event = {
      creator: {id: "abc143"},
      id: "ghk",
      date: 162300,
      title: "test",
      zipcode: 12345,
      creatorName: "clau",
      likeCount:2,
      usersLiked: ["abc143", "3456"]
    };
    let event2 = { //created/liked by user
      creator: {id: "abc123"},
      id: "jqk",
      date: 1623045,
      title: "to delete",
      zipcode: 12345,
      creatorName: "paul",
      likeCount:2,
      usersLiked: ["abc123", "3456"]
    };
    realStore.state.profileId = "abc123";
    realStore.state.events = [event, event2];
    realStore.state.userEvents = [event2];
    realStore.state.likedEvents = [event2];
    
    realStore.commit("deleteEvent", "jqk");
    expect(realStore.state.events.length).toBe(1);
    expect(realStore.state.userEvents.length).toBe(0);
    expect(realStore.state.likedEvents.length).toBe(0);
    let index = realStore.state.events.findIndex((it) => it.id == event2.id);
    expect(index).toBe(-1);
  });

});

