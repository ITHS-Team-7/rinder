<script></script>

<template>
  <!-- Footer -->
  <footer
    class="text-center text-lg-start text-dark"
    style="
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #252525 100%);
    "
  >
    <!-- Section: Social media -->
    <section class="d-flex justify-content-between p-4 text-white">
      <!-- Left -->
      <div class="terms">
        <RouterLink class="nav-link active" aria-current="page" to="/terms"
          >Terms & Conditions
        </RouterLink>
      </div>
      <!-- Left -->
      <div class="copyright text-center">Copyright © 2023 | ITHS Team 7</div>
      <!-- Right -->
      <div class="social-media">
        <a
          href="https://www.linkedin.com"
          target="_blank"
          class="text-white me-2"
        >
          <img
            src="../assets/images/linkedin_white.svg"
            width="24"
            height="24"
          />
        </a>
        <a
          href="https://www.facebook.com"
          target="_blank"
          class="text-white me-2"
        >
          <img
            src="../assets/images/facebook_white.svg"
            width="24"
            height="24"
          />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          class="text-white me-2"
        >
          <img
            src="../assets/images/instagram_white.svg"
            width="24"
            height="24"
          />
        </a>
      </div>
      <!-- Right -->
    </section>
    <!-- Section: Social media -->
  </footer>
</template>

<style scoped>
footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80px;
}

@media screen and (max-width: 768px) {
  .text-center,
  .copyright {
    display: flex;
    justify-content: center;
  }
  .social-media,
  .terms {
    display: none;
  }
}
</style>
