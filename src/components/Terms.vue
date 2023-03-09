<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="center terms">
    <div class="main-container">
      <div>
        <h2 class="title text-white">Terms and Conditions</h2>
        <h3 class="text-white">Welcome to rinder!</h3>

        <p class="text-white">
          These terms and conditions outline the rules and regulations for the
          use of rinder's Website, located at test.com. By accessing this
          website we assume you accept these terms and conditions. Do not
          continue to use rinder if you do not agree to take all of the terms
          and conditions stated on this page. The following terminology applies
          to these Terms and Conditions, Privacy Statement and Disclaimer Notice
          and all Agreements: "Client", "You" and "Your" refers to you, the
          person log on this website and compliant to the Company’s terms and
          conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers
          to our Company. "Party", "Parties", or "Us", refers to both the Client
          and ourselves. All terms refer to the offer, acceptance and
          consideration of payment necessary to undertake the process of our
          assistance to the Client in the most appropriate manner for the
          express purpose of meeting the Client’s needs in respect of provision
          of the Company’s stated services, in accordance with and subject to,
          prevailing law of Netherlands. Any use of the above terminology or
          other words in the singular, plural, capitalization and/or he/she or
          they, are taken as interchangeable and therefore as referring to same.
        </p>
        <h2 class="title text-white">Cookies</h2>
        <p class="text-white">
          We employ the use of cookies. By accessing rinder, you agreed to use
          cookies in agreement with the rinder's Privacy Policy. Most
          interactive websites use cookies to let us retrieve the user’s details
          for each visit. Cookies are used by our website to enable the
          functionality of certain areas to make it easier for people visiting
          our website. Some of our affiliate/advertising partners may also use
          cookies.
        </p>
        <h2 class="title text-white">License</h2>
        <p class="text-white">
          Unless otherwise stated, rinder and/or its licensors own the
          intellectual property rights for all material on rinder. All
          intellectual property rights are reserved. You may access this from
          rinder for your own personal use subjected to restrictions set in
          these terms and conditions.
        </p>

        <p class="text-white">You must not:</p>
        <ul>
          <li class="text-white" style="list-style: none">
            Republish material from rinder
          </li>
          <li class="text-white" style="list-style: none">
            Sell, rent or sub-license material from rinder
          </li>
          <li class="text-white" style="list-style: none">
            Reproduce, duplicate or copy material from rinder
          </li>
          <li class="text-white" style="list-style: none">
            Redistribute content from rinder
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.terms {
  padding-right: 5rem;
  padding-left: 5rem;
  backdrop-filter: blur(25px);

}
.main-container {
  position: relative;
  max-width: 50%;
  margin: 0 auto;
  padding: 16px;
  width: 100%;
}

@media screen and (max-width: 768px) {
  .terms {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  .main-container {
    max-width: 100%;
  }
}
</style>
