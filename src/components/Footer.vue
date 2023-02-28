
<script>
</script>


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
      <div class="terms me-5">
        <span>Terms & Conditions</span>
      </div>
      <!-- Left -->
      <div class="copyright text-center">Copyright © 2023 | ITHS Team 7</div>
      <!-- Right -->
      <div class="social-media">
        <a href="" class="text-white me-2">
          <img
            src="../assets/images/linkedin_white.svg"
            width="24"
            height="24"
          />
        </a>
        <a href="" class="text-white me-2">
          <img
            src="../assets/images/facebook_white.svg"
            width="24"
            height="24"
          />
        </a>
        <a href="" class="text-white me-2">
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
