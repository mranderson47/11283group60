<template>
  <footer>
    <div class="container">
      <div class="left">
        <div class="col-1">
          <router-link class="header" :to="{ name: 'Home' }">Beach Avengers</router-link>
          <ul>
            <li>
              <font-awesome-icon icon="recycle" size="2x"/>
            </li>
            <li>
              <font-awesome-icon icon="water" size="2x"/>
            </li>
            <li>
              <font-awesome-icon icon="umbrella-beach" size="2x"/>
            </li>
            <li>
              <font-awesome-icon icon="comments" size="2x"/>
            </li>
          </ul>
        </div>
        <div class="col-2">
          <ul>
            <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
            <router-link v-if="!user" class="link" :to="{ name: 'Login' }">Login In / Register</router-link>
          </ul>
        </div>
      </div>
      <div class="right">
        <p>Mason Anderson</p>
        <p>Claudia Rubio</p>
        <p>Kyle Helstrom</p>
        <p>Shivan Desai</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
    name: "footer-vue",
    components: {},
    computed: {
        user() {
      return this.$store.state.user;
    },
    },

}
</script>


<style lang="scss" scoped>
footer {
  margin-top: auto;
  padding: 100px 25px;
  background-color: #212529;
  .container {
    display: flex;
    flex-direction: column;
    gap: 32px;
    @media (min-width: 800px) {
      flex-direction: row;
      gap: 0px;
    }

    > div {
      display: flex;
      flex: 1;
    }

    .left {
      gap: 32px;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      @media (min-width: 800px) {
        flex-direction: row;
        align-items: initial;
        gap: 0;
      }

      .header {
        text-align: center;
        font-size: 24px;
        color: #FFF;
        margin-bottom: 16px;
        text-decoration: none;
        font-weight: 600;
        @media (min-width: 800px) {
          text-align: initial;
        }
        &:hover{
            color: rgba(255, 255, 255, 0.384);
        }
      }
      ul {
        gap: 16px;
        list-style: none;
        display: flex;
      }

      .col-1,
      .col-2 {
        gap: 32px;
        display: flex;
        flex: 1;
        @media (min-width: 800px) {
          gap: 0;
        }
      }

      .col-1 {
        flex-direction: column;

        h2 {
          text-align: center;
          @media (min-width: 800px) {
            text-align: initial;
          }
        }
        ul {
          margin-top: auto;

          li {
            display: flex;
            align-items: center;
            .svg-icon {
              width: 24px;
              height: auto;
              color: #FFF;
            }
          }
        }
      }

      .col-2 {
        ul {
          height: 100%;
          justify-content: center;
          flex-direction: row;
          flex-wrap: wrap;
          @media (min-width: 800px) {
            flex-direction: column;
          }
          .link {
            font-size: 16px;
            font-weight: 500;
            color: #FFF;
            text-decoration: none;

            &:hover{
              color: rgba(255, 255, 255, 0.384);
            }
          }
        }
      }
    }

    .right {
      gap: 32px;
      color: #FFF;
      align-items: center;
      flex-direction: column;
      @media (min-width: 800px) {
        align-items: flex-end;
        gap: 0;
      }
    }

    p {
      margin-top: auto;
    }
  }
}
</style>