<template>
  <div class="container-fluid">
    <div class="row justify-content-center" style="padding-top: 10vh">
      <div class="card col-sm-4 border-0 cardtop">
        <div class="card border-0 con">
          <img
            src="../assets/images/Profil bild.png"
            class="img-fluid rounded-circle"
            alt=""
          />
        </div>
        <div class="card-body">
          <h5 class="card-title">test</h5>
          <p class="card-text">test</p>
          <p class="card-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati,
            voluptatibus. Ea sapiente at repudiandae. Ducimus expedita vero
            perspiciatis, inventore, sapiente a sequi, quidem sunt ab deleniti
            officia. Unde, quod quas.
          </p>
        </div>
      </div>

      <div class="card col-sm-4 border-0 cardtop">
        <div class="card border-0 con">
          <img
            src="../assets/images/Profil bild.png"
            class="img-fluid rounded-circle"
            alt=""
          />
        </div>
        <div class="card-body">
          <h5 class="card-title">test</h5>
          <p class="card-text">test</p>
          <p class="card-text">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum et
            saepe aliquid consequatur, neque omnis eius nostrum nesciunt
            voluptas itaque aliquam adipisci ex molestiae harum dignissimos
            facere quod ipsum totam.
          </p>
        </div>
      </div>

      <div class="card col-sm-4 border-0 cardtop">
        <div class="card border-0 con">
          <img
            src="../assets/images/Profil bild.png"
            class="img-fluid rounded-circle"
            alt=""
          />
        </div>
        <div class="card-body">
          <h5 class="card-title">test</h5>
          <p class="card-text">test</p>
          <p class="card-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel sit
            rerum dolorem reiciendis, dolorum velit, minus voluptates modi
            possimus expedita nulla soluta quia magnam odio illo hic, debitis
            nam dolores.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
html {
  overflow-y: scroll;
}
.con {
  max-width: 175px;
}
.cardtop {
  width: 24rem;
  margin: auto;
}
.card-body {
  border-radius: 1em;
  text-align: center;
  background-color: #9747ff;
}
.card-title {
  padding-top: 70px;
}
.img-fluid {
  max-width: 175px;
  position: absolute;
  top: -100px;
  left: 103%;
  transform: translateX(-50%);
}
.cardtop {
  padding-top: 10vh;
  padding-bottom: 5vh;
}
@media screen and (max-width: 600px) {
  .cardtop {
    width: 20rem;
    margin: auto;
  }
  .img-fluid {
    max-width: 150px;
    position: absolute;
    top: -75px;
    left: 85%;
    transform: translateX(-50%);
  }
  .cardtop {
    padding-top: 15vh;
    padding-bottom: 10vh;
  }
}
</style>
