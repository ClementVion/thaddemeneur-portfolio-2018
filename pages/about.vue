<template>
  <div class="ScrollContainer">
    <section class="About">

      <div class="About__Header">
        <div class="About__HeaderBack" @click="clickedOnGoBack()">
          <span> Back home </span>
          <svg width="24" height="15" xmlns="http://www.w3.org/2000/svg"><path d="M.293 5.943l3.83-4.788a.957.957 0 0 1 1.494 1.197L3.031 5.584H16.36c3.285 0 6.723 2.149 6.723 5.745v1.915a.957.957 0 1 1-1.915 0V11.33c0-2.397-2.463-3.83-4.808-3.83H3.031l2.585 3.232a.957.957 0 1 1-1.494 1.197L.292 7.14a.96.96 0 0 1 0-1.197z"/></svg>
        </div>
      </div>

      <h1 class="About__Title"> Design student and freelance digital designer from Paris, France. </h1>

      <div class="About__Block">
        <div class="About__SubTitle"> About me </div>
        <p class="About__Paragraph">
          My name is Thaddé Méneur, I am a fourth year student at HETIC, in Paris. I’ve been studying design engeneering for 4 years and have performed my skills in many freelance projects and for many different brands. I’m also currently writing a memoire on service design.
        </p>
      </div>

      <div class="About__Numbers">
        <div class="About__NumbersContainer">

          <div class="About__SubTitle"> Numbers </div>

          <div class="About__NumbersCols">

            <div class="About__NumbersCol">
              <p class="About__NumbersBig"> 12 </p>
              <p class="About__NumbersDesc"> Freelances projects I worked on in 2017 </p>
            </div>

            <div class="About__NumbersCol">
              <p class="About__NumbersBig"> 1m+ </p>
              <p class="About__NumbersDesc"> Number of people using products I’ve designed for </p>
            </div>

            <div class="About__NumbersCol">
              <p class="About__NumbersBig"> 3 </p>
              <p class="About__NumbersDesc"> Professional experiences abroad so far </p>
            </div>

          </div>

        </div>
      </div>


      <div class="About__Block About__Experience">
        <div class="About__SubTitle"> Experience </div>
        <p class="About__Paragraph">
          ⎔ I spent 4 months in Berlin as a design intern for Ming Labs, an award-winning digital agency.
        </p>
        <p class="About__Paragraph">
          ⎔ I spent 4 months in Paris and 2 in Bangkok for OhMyGeorge, a french and thailandeese trading start-up, as an intern and as a freelance.
        </p>
        <p class="About__Paragraph">
          ⎔ I spent more than a year with Health & Parenting, a London based company that’s creating apps for pregnant women.
        </p>
        <p class="About__Paragraph">
          ⎔ Finally, I worked as a freelance for 3 years, starting as a developer then as a designer, and worked with brands like PayFit, Pickorr, Zoe de Las Cases, MBS Accounting NY, BNP Paribas, Carte Bancaire…
        </p>
      </div>


      <div class="About__Reviews">

        <div class="About__SubTitle About__ReviewsTitle"> Client reviews </div>

        <div class="About__ReviewsSlider" ref="container">
          <div class="About__ReviewsContainer" >
            <div class="About__ReviewsTrack" ref="track">

              <div class="About__Review">
                <div class="About__ReviewContainer">
                  <p> « Thaddé is a pleasure to work with. He is hard working and demonstrates a high level of care and commitment to his clients. An excellent UI/UX designer with strong creative ideas and the ability to see them through.  </p>
                  <p> He learns quickly and is highly capable of managing projects on his own. Thaddé is focused and dedicated to every project he’s given and takes a structured, considered approach to any challenge he encounters. » </p>
                  <p class="About__ReviewAuthor"> — Amber Vodegel, Digital Platform solutions at Philips </p>
                </div>
              </div>

              <div class="About__Review">
                <div class="About__ReviewContainer">
                  <p> « Working with Thaddé was a real pleasure. Throughout the mission, he has been creative and provided useful and appropriate advices. UX for media, news consumption … he has perfectly adapted his skills and work to our project. And always with smile and kindness ! » </p>
                  <p class="About__ReviewAuthor"> — Alexis Raison, CEO at Pickorr </p>
                </div>
              </div>

              <div class="About__Review">
                <div class="About__ReviewContainer">
                  <p> « Thaddé is a very creative person with a deep understanding of commercial and technical constraints, which enables him to consistently deliver actionable design outputs. He's got the right mix of artistic sensitivity, programming knowledge and pragmatic business acumen, so he is of great value in a lead design role. » </p>
                  <p class="About__ReviewAuthor"> — Lucien Tavano </p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      <div class="About__Block About__Awards">
        <div class="About__SubTitle"> Awards and distinctions </div>
        <p class="About__Paragraph">
          Portfolio 2017 — Featured on Co Drops →
        </p>
        <p class="About__Paragraph">
          Portfolio 2017 — Featured on Web Designer Depot →
        </p>
        <p class="About__Paragraph">
          Portfolio 2017 — SOTD French Design Index →
        </p>
        <p class="About__Paragraph">
          Portfolio 2017 — SOTD CSS Design →
        </p>
        <p class="About__Paragraph">
          Portfolio 2017 — Special Kudos CSS Design Awards →
        </p>
      </div>

      <h1 class="About__Beer"> Drop me a line if you want to have a beer or something. If you have a project you want us to work together on, that’s even better. </h1>

    </section>
  </div>
</template>

<script>
import EventBus from '~/components/bus/EventBus.js';
import Scroll from '~/mixins/Scroll.js';
import Grab from '~/mixins/Grab.js';

export default {

  beforeRouteEnter (to, from, next) {
    setTimeout(() => {
      EventBus.$emit('switchToAbout');
    }, 300);
    next();
  },

  transition: {
    name: 'page',
    duration: 1000,
  },

  mixins: [Scroll, Grab],

  mounted() {

  },

  methods: {

    clickedOnGoBack() {
      this.$router.go(-1);
    }

  }

}
</script>

<style lang="scss">
$containerWidth: 638px;

.About {
  position: relative;
  z-index: 10;
  overflow-x: hidden;
}

.page-enter-active .About {
  transition: ease 0.5s 0.5s;
}

.page-leave-active .About {
  transition: ease 0.3s;
}

.page-enter .About,
.page-leave-active .About{
  opacity: 0;
}


.About__Header {
  position: fixed;
  top: 55px;
  right: 5%;
  z-index: 10;
}

.About__HeaderBack {
  color: #000;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    fill: #000;
    transform: scaleX(-1);
    margin-left: 20px;
  }
}

.page-enter-active .About__HeaderBack {
  transition: ease 0.3s;
}

.page-leave-active .About__HeaderBack {
  transition: ease 0.3s;
}

.page-enter .About__HeaderBack,
.page-leave-active .About__HeaderBack{
  opacity: 0;
}

.About__Title, .About__Beer {
  font-size: 3.8rem;
  font-weight: 600;
  max-width: 632px;
  text-align: center;
  padding: 240px 0 75px 0;
  margin: 0 auto;
  line-height: 5.2rem;
  color: #000;
}

.About__Beer {
  padding: 140px 0 75px 0;
  max-width: 900px;
}

.About__Block {
  margin: 35px auto;
  max-width: $containerWidth;
}

.About__SubTitle {
  font-weight: 600;
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.About__Paragraph {
  font-size: 1.8rem;
  line-height: 2.8rem;
}

.About__Experience .About__Paragraph {
  margin-bottom: 40px;
}

.About__Numbers {
  background: #FFF;
  width: 910px;
  margin: 75px auto;
  height: 240px;
  display: flex;
  align-items: center;
}

.About__NumbersContainer {
  max-width: $containerWidth;
  margin: auto;
}

.About__NumbersCols {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
}

.About__NumbersBig {
  font-size: 3.8rem;
  font-weight: 600;
}

.About__NumbersDesc {
  margin-top: 20px;
  line-height: 2.5rem;
  font-size: 1.7rem;
  color: #818181;
}

.About__Reviews {
  max-width: 910px;
  margin: 110px auto;
}

.About__ReviewsTitle {
  max-width: $containerWidth;
  margin: 0 auto 50px auto;
}

.About__ReviewsSlider {
  width: 100%;
  display: flex;
  align-items: center;
  cursor: grab;
}

.About__ReviewsTrack {
  white-space: nowrap;
  user-select: none;
  display: block;
}

.About__Review {
  display: inline-flex;
  vertical-align: top;
  justify-content: center;
  align-items: center;
  margin-left: 55px;
  width: 910px;
  height: 320px;
  background: #FFF;
}

.About__ReviewContainer {
  width: 75%;

  p {
    font-size: 1.8rem;
    line-height: 2.5rem;
    white-space: normal;
    margin-top: 32px;

    &:first-child {
      margin-top: 0;
    }
  }
}


</style>
